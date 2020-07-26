import { observable, action, toJS } from "mobx";
import storeMgr from "utils/storeManager";
import { queryOrderDetail, queryOrderProcess, queryMaterialListByOrderId, synchronousData, checkOrderStatus, endOrder } from "./service";
import { DetailStore } from "super/store";
import history from "utils/history";
import { message } from "components";
export const moduleName = "TransferDetail";

class TransferDetailStore extends DetailStore {
  // pageNameMap:状态与当前页面的关系表
  // {status: 当前页面的值}
  pageNameMap = {
    // 1-权籍预审，2-受理预审，3-维修资金预审，4-复审
    50: 1, // 1-权籍预审
    54: 4,
    15: 3,
    10: 2, // 2-受理预审
    51: 2, // 2-受理预审 维修资金受理驳回
    55: 2, // 2-受理预审
  }
  //  editUserMap:{status: 可以审批的用户角色}
  editUserMap = {
    /**
     * 2453-权籍预审，50；
     * 2454-受理预审，10,51,55;
     * 2454-维修资金受理，15
     * 2456-复审，54
     */
    50: 2453, // 1-权籍预审
    54: 2456,
    15: 2455,
    10: 2454, // 2-受理预审
    51: 2454, // 2-受理预审 维修资金受理驳回
    55: 2454, // 2-受理预审
  }
  // 判断当前页面的操作部分是否需要显示
  @observable
  canAudit = false;
  crumbList = [];
  @observable
  needRepairHelp = false;
  @observable
  showFamilyModal = false
  //终止原因模态框显示隐藏 控制状态
  @observable
  versible = false;
  //通过 status为51或10 复审 原因模态框显示隐藏 控制状态
  @observable
  passVersible_51_10 = false;
  //通过 status为54 复审 原因模态框显示隐藏 控制状态
  @observable
  passVersible_54 = false;
  //驳回 status为15 原因模态框显示隐藏 控制状态
  @observable
  rejectVersible_15 = false;
  //驳回 status为10 原因模态框显示隐藏 控制状态
  @observable
  rejectVersible_10 = false;
  //驳回、中止区分状态
  @observable
  orderStatus = 0
  @observable
  showFamilyInfoFlag = false;
  @observable
  familyInfoTitle = "";
  @observable
  familyMemberList = [];
  @observable
  showViewer = false;
  //登记费
  @observable
  registerFee = undefined;
  //工本费
  @observable
  cost = undefined;
  //有无土地出让金
  @observable
  isTransfer = undefined;
  //土地出让金
  @observable
  price = undefined;
  //有无维修资金 51
  @observable
  isRepair = 1;
  //维修资金
  @observable
  repairPrice = undefined;
  //买方附件信息有误
  @observable
  buyerMsg = false;
  //卖方附件信息有误
  @observable
  sellerMsg = false;

  @action
  broadMessage = async () => {
    window.location.reload()
  }

  @action
  setOrderStatus = async (value) => {
    this.orderStatus = value
  }
  @action
  setFamilyInfo = async (obj) => {
    this.showFamilyInfoFlag = true;
    this.familyInfoTitle = obj.name;
    this.familyMemberList = obj.familyMemberList || [
      // {name: "测试", cardTypeDesc: "身份证", cardNo: 123},
      // {name: "测试", cardTypeDesc: "身份证", cardNo: 123}
    ];
  };
  @action
  hideFamilyInfo = async () => {
    this.showFamilyInfoFlag = false;
    this.familyMemberList = [];
  };

  @action
  getData = async () => {
    const { from, id } = this.entity;

    await this.getProcess(id);

    if (from === "statistic") {
      this.crumbList = [{ name: "工单管理" }, {
        name: "业务统计",
        url: "/order/statistic/list"
      }, { name: "工单详情" }];
    } else if (from === "mail") {
      this.crumbList = [{ name: "邮寄管理" }, { name: "工单详情" }];
    } else {
      this.crumbList = [{ name: "工单管理" }, {
        name: "工单审核",
        url: "/order/audit/list"
      }, { name: "工单详情" }];
    }

    const values = { ...this.entity, ...this.getTabParams() };
    const res = await queryOrderDetail(values);

    if (res.success) {
      await this.getMaterialList(res.data.id);
      let orderNontaxDTO = res.data.orderNontaxDTO || {};
      this.data = res.data;
      this.registerFee = orderNontaxDTO.registerFee;
      this.cost = orderNontaxDTO.cost;
      this.isTransfer = orderNontaxDTO.isTransfer || 1;

      this.price = orderNontaxDTO.price;
      // 设置当前页面是否可以操作
      this.canAudit = values.activedTabKey === 'todo'
      let { userInfo } = storeMgr.getStore('frame');
      if (this.canAudit && userInfo) {
        let role = userInfo.roleList.find(item => item.id === this.editUserMap[res.data.status])
        if (role && (!(this.pageNameMap[res.data.status] === 3) || !res.data.isMaintainFundHandled)) {
          this.canAudit = true;
        } else {
          this.canAudit = false;
        }
      }
    }
  };

  // 获取审批流程图
  @action
  getProcess = async (id) => {
    const res = await queryOrderProcess(id);
    if (res.success) {
      this.orderProcess = res.data
    }
  };

  // 获取材料信息
  @action
  getMaterialList = async (id) => {
    const res = await queryMaterialListByOrderId(id, {
      // from:2 代表G端
      form: 2
    });

    if (res.success) {
      this.MaterialJson = res.data
    }
  };

  // 切换预览图
  @action
  showViewerData = async () => {
    this.showViewer = !this.showViewer;
  };

  //同步信息
  @action
  getSynchronousData = async (callBack) => {
    const values = { ...this.entity, ...this.getTabParams() };
    const { registerType, orderLandInfo, orderHouseList = [{}] } = this.data
    let certificateType = 0;
    let warrantNumber = undefined;
    if (registerType == 5010) { // 土地
      warrantNumber = orderLandInfo.bdcqzh;
    } else {
      certificateType = orderHouseList[0].certificateType;
      warrantNumber = orderHouseList[0].warrantNumber;
    }
    const res = await synchronousData({ registerType, certificateType: certificateType, estateNum: warrantNumber, orderId: values.id });
    this.data.isInfoMissing = res.data.isInfoMissing;
    // if (registerType == 5010) {
    //   this.data.orderLandInfo = { ...res.data.estateInfo, ...res.data.landProperty };
    // } else {
    //   this.data.orderHouseList[0] = { ...res.data.estateInfo, ...res.data.houseInfo };
    // }
    callBack(res)
  }
  //操作模态框显示/隐藏的方法
  @action
  handleVersible = async (flag) => {
    this.versible = flag;
  };
  //通过
  @action
  handlePassVersible_51_10 = async (flag) => {
    this.passVersible_51_10 = flag;
  };
  @action
  handlePassVersible_54 = async (flag) => {
    this.passVersible_54 = flag;
  };
  //驳回
  @action
  handleRejectVersible_15 = async (flag) => {
    this.rejectVersible_15 = flag;
  };
  @action
  handleRejectVersible_10 = async (flag) => {
    this.rejectVersible_10 = flag;
  };
  @action
  deleteFamilyMember = ({ index, type }) => {
    let allFamilyMemberList = this.data[type][0].allFamilyMemberList;
    allFamilyMemberList.splice(index, 1)
    this.data[type][0].allFamilyMemberList = [
      ...allFamilyMemberList
    ];
  };
  @action
  addFamilyMember = data => {
    let { type, name, cardNo, cardType = 1, cardTypeDesc = '身份证', editFlag = 2 } = toJS(data);

    this.data[type][0].allFamilyMemberList = [
      ...this.data[type][0].allFamilyMemberList,
      { cardNo, cardType, name, cardTypeDesc, editFlag }
    ];
    this.toggleFamilyModal(false);
  };
  @action
  toggleFamilyModal = data => {
    this.showFamilyModal = data;
  }
  @action
  checkOrderStatus = async (OrderCheckForm) => {
    let postData = {
      isPass: -1,//是否通过（0驳回 1通过 2终止 3卖方被驳回 4买方被驳回 5买卖双方都被驳回） ,
      buyerReason: '', // 买方驳回原因 
      buyerfamilyList: [{
        familyMemberList: this.data.obligeeInfoList ? this.data.obligeeInfoList[0].allFamilyMemberList : this.data.obligeeInfoList, //买方家庭信息 
        type: 2,// 家庭类型,买家的就是2 卖家的是1
      }],
      materialList: this.data.materialList, //复审材料 materialType:88 ,
      orderId: this.data.id,//订单ID ,
      orderNontaxDTO: this.data.orderNontaxDTO,//非税信息 ,
      reason: '', //通过理由 ,
      sellerReason: '', //卖方驳回原因 ,
      sellerfamilyList: [{
        familyMemberList: this.data.obligorInfoList ? this.data.obligorInfoList[0].allFamilyMemberList : this.data.obligorInfoList, //卖方家庭信息 ,
        type: 1,// 家庭类型,买家的就是2 卖家的是1
      }],
      status: this.data.status,// 工单状态 ,
      transferAdditionalInfo: {}, // 受理预审补充信息

      ...OrderCheckForm,
      pageName: this.pageNameMap[this.data.status],
    };
    const res = await checkOrderStatus(postData);
    if (res.success) {
      this.hideAllModal();
      history.push("/order/audit/list");
    } else {
      message.error(res.globalError || res.msg);
    }
  }
  @action
  changeMmterialListForRepair = ({ fileList, type }) => {
    //  材料数据，先删除维修资金材料，再将维修资金的材料增加到data
    let deleteIndex = -1;
    this.needRepairHelp = !fileList.length;
    let materialObj = this.data.materialList.find((item, index) => {
      if (item.materialType == type) {
        deleteIndex = index;
      }
      return item.materialType == type
    }) || {};
    if (deleteIndex > -1) {
      this.data.materialList.splice(deleteIndex, 1);
    }
    if (materialObj.hasOwnProperty('materialType')) {
      materialObj.fileList = fileList.map(item => item.response.data)
    } else {
      materialObj.fileList = fileList.map(item => item.response.data);
      materialObj.materialType = type;
    }
    this.data.materialList = [
      ...this.data.materialList,
      materialObj
    ];
  }
  @action
  orderEnd = async (OrderCheckForm) => {
    const res = await endOrder(OrderCheckForm);
    if (res.success) {
      message.success('终止成功');
      this.handleVersible(false);
      history.push("/order/audit/list");
    }
  }
  @action
  hideAllModal = () => {
    //终止原因模态框显示隐藏 控制状态
    this.versible = false;
    //通过 status为51或10 复审 原因模态框显示隐藏 控制状态
    this.passVersible_51_10 = false;
    //通过 status为54 复审 原因模态框显示隐藏 控制状态
    this.passVersible_54 = false;
    //驳回 status为15 原因模态框显示隐藏 控制状态
    this.rejectVersible_15 = false;
    //驳回 status为10 原因模态框显示隐藏 控制状态
    this.rejectVersible_10 = false;

    this.showFamilyInfoFlag = false;
    this.showViewer = false;
  }
  @action
  changeNeedRepairHelp = value => {
    this.needRepairHelp = value;
  }
}

storeMgr.register(moduleName, new TransferDetailStore());

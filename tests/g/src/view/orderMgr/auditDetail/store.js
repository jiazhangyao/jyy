import { observable, action } from "mobx";
import storeMgr from "utils/storeManager";
import { queryOrderDetail, queryOrderProcess, queryChainStatus, queryMaterialList,syncLandInfo } from "./service";
import { DetailStore } from "super/store";
export const moduleName = "aduiltDetail";

class Store extends DetailStore {
  crumbList = [];
  //中止/驳回原因模态框显示隐藏 控制状态
  @observable
  versible=false;
  //通过 原因模态框显示隐藏 控制状态
  @observable
  passVersible=false;
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
  @observable
  tudi = {};


  @action
  setOrderStatus = async(value) => {
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
    console.log("获取from+id",from,id);
    
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
    // console.log("this.getTabParams()",this.getTabParams(),"entity",this.entity);
    const res = await queryOrderDetail(values);
    console.log(8888,res.data);
  
    await this.getChainStatus(values);
    
    if (res.success) {
      // await this.getProcess(res.data.id);
      await this.getMaterialList(res.data.registerType);

      this.data = res.data;

        //附作物请求函数执行
        const datas = {zddm:res.data.zddm,orderId:res.data.id};
        await this.getSyncLandInfo(res.data.registerType,datas);
        
      // console.log("后台返回的数据data",data);
      
    }
   
  };

  // 获取审批流程图
  @action
  getProcess = async (id) => {
    const res = await queryOrderProcess(id);
    if (res.success) {
      this.orderProcess = res.data
      console.log("当前进程状态",this.orderProcess);
    }
  };

  // 获取上链状态
  @action
  getChainStatus = async (values) => {
    const chainStatusInfo = await queryChainStatus(values);
    if (chainStatusInfo.success) {
      this.chainStatusInfo = chainStatusInfo.data
    }
  };

  // 获取材料信息
  @action
  getMaterialList = async (id) => {
    const res = await queryMaterialList(id);
    console.log("材料数据请求的返回结果",res);
    
    if (res.success) {
      this.MaterialJson = res.data
    }
  };

  // 切换预览图
  @action
  showViewerData = async () => {
    this.showViewer = !this.showViewer;
  };

  //同步土地信息
  @action
  getSyncLandInfo = async (type,datas) => {
    const values = { ...this.entity};
    console.log('values',values);
    if (type===112) {
      const res = await syncLandInfo(datas);
      console.log("同步数据的res",res);
      if(res.success) {
        this.tudi = res.data
      }
    }
   
  //   console.log("同步数据之后的data",this.data);
    
  }
  //操作模态框显示/隐藏的方法
  @action
  handleVersible = async (flag) => {
   this.versible = flag;
  };
  @action
  handlePassVersible = async (flag) => {
   this.passVersible = flag;
   
  };
}

storeMgr.register(moduleName, new Store());

import { observable, action } from "mobx";
import storeMgr from "utils/storeManager";
import { queryOrderDetail, queryOrderProcess, queryMaterialListByOrderRegisterType, orderHandle, orderHandleEnd } from "./service";
import { DetailStore } from "super/store";
export const moduleName = "MortgageDetail";

class MortgageDetailStore extends DetailStore {
  @observable
  orderProcess=[];

  @observable
  materialJson=[];

  @observable
  showViewer = false;

  @observable
  canAudit=false;

  // 切换预览图
  @action
  showViewerData = async () => {
    this.showViewer = !this.showViewer;
  };

  @action
  getData = async () => {
    const values = { ...this.entity, ...this.getTabParams() };
    const res = await queryOrderDetail(values);
    if (res.success) {
      await this.getProcess(res.data.id);
      await this.getMaterialList(res.data.registerType);
      this.canAudit = values.activedTabKey === 'todo'
      this.data = res.data;
    }
  };

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
  orderOper = async (data, orderId, registerType, status, operType, values) => {
    let pageName ;
    if (status == 10 || status == 55 || status == 72) {
      if ( registerType == 3040 ) {
        pageName = 2
      } else {
        pageName = 1
      }
    }
    if (status == 54) {
      pageName = 4
    }
    // orderId：订单ID
    // isPass：是否通过（0驳回 1通过）
    // pageName：当前操作页面(1-受理预审(首次、转移、变更)，2-受理预审(注销)，3-查档，4-复审)
    // reason：理由
    // orderNontaxDTO：非税信息 (首次、转移、变更时填写)
    // orderNontaxDTO.registerFee ：登记费
    // registerSubType：登记类型（小类）
    let params = {
      orderId: orderId,
      // materialList: this.data.materialList, //复审材料 
      isPass: operType,
      orderNontaxDTO: data.orderNontaxDTO ? data.orderNontaxDTO : {},
      reason: values.reason,
      pageName: pageName,
      registerSubType: registerType,
    }
    if (status == 71) {
      params.pageName = 3
    }
    if ( registerType != 3040 ) {
      params.orderNontaxDTO.registerFee = values.money
    }
    let res;
    if (operType == 2) {
      if (status == 10) {
        params.pageName = 'mortgage_order_pre_audit'
      } else {
        params.pageName = 'mortgage_order_reaudit'
      }
      res = await orderHandleEnd(params);
    } else {
      res = await orderHandle(params);
    }
    if (res.success) {
      return true;
    }
  }
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
  getMaterialList = async (registerType) => {
    const res = await queryMaterialListByOrderRegisterType(registerType);// from:2 代表G端

    if (res.success) {
      this.MaterialJson = res.data
    }
  };
}

storeMgr.register(moduleName, new MortgageDetailStore());

import { action, observable, observe } from "mobx";
import storeMgr from "utils/storeManager";
import { detail, queryOrderProcess, queryMaterialList, getSealLog } from "./service";
import { DetailStore} from "super/store";
export const moduleName = "seizeDetail";

class Store extends DetailStore {
  crumbList = [];

  @observable
  showHistory = false;
  @observable
  showViewer = false;

  @action
  initCrumbList = () => {
    let crumbArray = [{
      name: "查封登记管理",
      url: "/seize/register/list"
    },];
    if (this.entity.fn === 'ck') {
      crumbArray = [...crumbArray, { name: '工单详情' }];
    } else {
      crumbArray = [...crumbArray, { name: '工单审核' }];
    }
    return crumbArray
  }

  @action
  getData = async () => {
    const {id } = this.entity;
    await this.getProcess(id);
    
    this.crumbList = this.initCrumbList()
    const values = { ...this.entity, ...this.getTabParams() };
    const res = await detail(values);
    if (res.success) {
      const {certificateType, warrantNumber} = res.data.orderHouseList[0]
      const params = {
        certificateType,
        estateNum: warrantNumber
      }
      await this.getHistoryLog(params);
      await this.getMaterialList(res.data.registerType);
      this.data = res.data;
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
    const res = await queryMaterialList(id);
    if (res.success) {
      this.MaterialJson = res.data
    }
  };

  // 获取历史查封信息
  @action
  getHistoryLog = async (data) => {
    const res = await getSealLog(data);
    if (res.success) {
      this.sealLogData = res.data
    }
  };

  @action
  showHistoryData = async (id) => {
    this.showHistory = !this.showHistory;
  };

  @action
  showViewerData = async () => {
    this.showViewer = !this.showViewer;
  };
}

storeMgr.register(moduleName, new Store());

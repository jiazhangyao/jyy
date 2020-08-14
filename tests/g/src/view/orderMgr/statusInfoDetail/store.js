import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { queryOrderDetails, queryEstate, queryCurrentEstate, synchronousData } from "./service";
import { DetailStore } from "super/store";
export const moduleName = "statusInfoDetail";

class Store extends DetailStore {
  firstOrderHouse = {}// 很多数据需要从这个数据里拿
  @observable
  postData = []

  @action
  getData = async () => {
    const { id, flag = null } = this.entity;
    const res = await queryOrderDetails(id);
    if (res.success) {
      this.data = res.data;
      this.postData = res.data;
      const { orderHouseList = [], registerType, orderLandInfo } = res.data;
      if (!this.firstOrderHouse.hasOwnProperties) {
        if (registerType == 5010) { // 土地
          this.firstOrderHouse = {
            ...orderLandInfo,
            warrantNumber: orderLandInfo.bdcqzh,
            certificateType: 0,//后端需要该字段为数字，土地是没有值的，随便写个int值
            registerType
          }
        } else {
          this.firstOrderHouse = orderHouseList[0] || {};
          this.firstOrderHouse = {
            ...this.firstOrderHouse,
            registerType
          }
        }
      }

      const { warrantNumber, certificateType } = this.firstOrderHouse;
      if (flag == "current") {
        const estateType = certificateType;
        this.getCurrentEstate(id, warrantNumber, registerType, estateType);
      } else {
        this.getEstate(id, warrantNumber);
      }
    }
  };

  @action
  getEstate = async (orderId, warrantNumber) => {
    const res = await queryEstate({ orderId, warrantNumber });
    if (res.success) {
      this.data = {
        ...this.entity,
        ...res.data
      }
    }
  };
  @action
  getCurrentEstate = async (orderId, warrantNumber, registerType, estateType) => {
    const res = await queryCurrentEstate({ orderId, warrantNumber, registerType, estateType });
    if (res.success) {
      this.data = {
        ...this.entity,
        ...res.data
      }
    }
  };

  //同步信息
  @action
  getSynchronousData = async () => {
    const values = { ...this.entity, ...this.getTabParams() };
    //默认取第一条
    const { certificateType, warrantNumber, registerType } = this.firstOrderHouse;
    const res = await synchronousData({ registerType, certificateType: certificateType, estateNum: warrantNumber, orderId: values.id });
    if (res.success) {
      this.getData();
    }
  }
}

storeMgr.register(moduleName, new Store());

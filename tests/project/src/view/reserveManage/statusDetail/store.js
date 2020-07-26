import { action } from "mobx";
import storeMgr from "utils/storeManager";
import { queryOrderDetail, queryEstate } from "./service";

import { DetailStore } from "super/store";
export const moduleName = "reserveStatusDetail";

class Store extends DetailStore {
  @action
  getData = async () => {
    const {id} = this.entity;
    const res = await queryOrderDetail(id);
    if (res.success) {
      this.data = res.data;

      const {orderHouseList} = res.data;
      const {warrantNumber} = orderHouseList[0];
      this.getEstate(id, warrantNumber);
    }

  };
  @action
  getEstate = async (orderId, warrantNumber) => {
    const res = await queryEstate({orderId, warrantNumber});
    if (res.success) {
      this.data = {
        ...this.entity,
        ...res.data
      }
    }
  };
}

storeMgr.register(moduleName, new Store());

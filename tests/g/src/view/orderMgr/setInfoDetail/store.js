import { action } from "mobx";
import storeMgr from "utils/storeManager";
import { queryOrderDetails } from "./service";
import { DetailStore } from "super/store";
export const moduleName = "setInfoDetail";

class Store extends DetailStore {
  @action
  getData = async () => {
    const { id} = this.entity;
    const res = await queryOrderDetails(id);
    if (res.success) {
      this.data = res.data;
    }
  };
}

storeMgr.register(moduleName, new Store());

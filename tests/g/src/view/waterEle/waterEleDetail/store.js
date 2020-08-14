import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { detail } from "./service";
import { DetailStore } from "super/store";
export const moduleName = "waterEleDetail";

class Store extends DetailStore {
  crumbList = [];

  @action
  initCrumbList = () => {
    let crumbArray = [{
      name: "水电气过户",
      url: "/utilities/waterele/list"
    },];
    if (this.entity._t) {
      crumbArray = [...crumbArray, { name: '过户申请详情' }];
    } else {
      crumbArray = [...crumbArray, { name: '过户申请审核' }];
    }
    return crumbArray
  }

  @action
  getData = async () => {
    this.crumbList = this.initCrumbList()
    const values = { ...this.entity, ...this.getTabParams() };
    const res = await detail(values);
    if (res.success) {
      this.data = res.data;
    }
  };
}

storeMgr.register(moduleName, new Store());

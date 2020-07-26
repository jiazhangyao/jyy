
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { detail } from "./service";
import { DetailStore } from "super/store";
export const moduleName = "busGuideDetail";

class Store extends DetailStore {
  crumbList = [
    {
      name: "办事指南",
      // url: "/guide/busguide/list"
    },
    {
      name: "业务办事指南",
      url: "/guide/busguide/list"
    },
    {
      name: "详情",
    },
  ];

  @action
  getData = async () => {
    const values = { ...this.entity, ...this.getTabParams() };
    const res = await detail(values);
    if (res.success) {
      this.data = res.data;
    }
  };
}

storeMgr.register(moduleName, new Store());

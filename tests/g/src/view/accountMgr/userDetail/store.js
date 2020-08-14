import { action } from "mobx";
import storeMgr from "utils/storeManager";
import { submit } from "./service";
import { DetailStore } from "super/store";

export const moduleName = "userDetail";

class Store extends DetailStore {
  crumbList = [
    {
      name: "账户管理",
      // url: "/account/user/list"
    },
    {
      name: "用户管理",
      url: "/account/user/list"
    },
    {
      name: "用户详情"
    }
  ];

  @action
  getData = async () => {
    const values = { ...this.entity, ...this.getTabParams() };
    const res = await submit(values);
    if (res.success) {
      this.data = res.data;
    }
  };
}

storeMgr.register(moduleName, new Store());

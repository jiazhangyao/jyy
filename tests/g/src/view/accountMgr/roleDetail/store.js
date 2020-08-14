import { action } from "mobx";
import storeMgr from "utils/storeManager";
import { submit } from "./service";
import { DetailStore } from "super/store";

export const moduleName = "roleDetail";

class Store extends DetailStore {
  crumbList = [
    {
      name: "账户管理",
      // url: "/account/user/list"
    },
    {
      name: "角色权限设置",
      url: "/account/user/list"
    },
    {
      name: "编辑角色"
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

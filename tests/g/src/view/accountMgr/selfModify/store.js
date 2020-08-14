import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { submit } from "./service";
import { DetailStore } from "super/store";

export const moduleName = "selfModify"; // 账户管理-个人账户设置-修改密码

class Store extends DetailStore {
  crumbList = [
    {
      name: "账户管理",
      // url: "/account/self/info"
    },
    {
      name: "个人账户设置",
      url: "/account/self/info"
    },
    {
      name: "修改密码"
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

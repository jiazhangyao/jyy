/*
 * @Author: minza.zhang
 * @Date: 2018-11-07 11:49:39
 * @Last Modified by: tim huang
 * @Last Modified time: 2019-01-15 13:29:47
 */
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { submit } from "./service";
import { DetailStore } from "super/store";
export const moduleName = "demoDetail";

class Store extends DetailStore {
  crumbList = [
    {
      name: "demo",
      // url: "/demo/child/list"
    },
    {
      name: "demo列表",
      url: "/demo/child/list"
    },
    {
      name: "demo详情"
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

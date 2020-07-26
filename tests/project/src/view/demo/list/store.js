/*
 * @Author: minza.zhang
 * @Date: 2018-11-07 11:49:39
 * @Last Modified by: tim huang
 * @Last Modified time: 2019-01-14 11:22:09
 */

import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { submit } from "./service";
import { ListStore } from "super/store";
export const moduleName = "demoList";

class Store extends ListStore {
  crumbList = [
    {
      name: "demo",
      // url: "/demo/audit/list"
    },
    {
      name: "demo列表"
    }
  ];

  @observable
  tabList = [{ name: "待处理", key: "todo" }, { name: "已处理", key: "done" }];

  @observable
  activedTabKey = "todo";

  getTabParams = () => {
    const result = {
      isHandle: "0"
    };
    if (this.activedTabKey === "done") {
      result.isHandle = "1";
    }
    return result;
  };
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

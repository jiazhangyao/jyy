
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { getList } from "./service";
import { ListStore } from "super/store";
export const moduleName = "seizeList";

class Store extends ListStore {
  autoSearchFields = ["dateInfo","registerType","status"];
  crumbList = [{name: "查封登记管理"}];

  @observable
  tabList = [{ name: "待处理", key: "todo" }, { name: "已处理", key: "done" }];


  @action
  setDefaultInfo = () => {
    this.activedTabKey = this.activedTabKey || "todo"; // tab默认为“待处理”
  };

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
    const res = await getList(values);
    if (res.success) {
      this.data = res.data;
    }
  };
}

storeMgr.register(moduleName, new Store());

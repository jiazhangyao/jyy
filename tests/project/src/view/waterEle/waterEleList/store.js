
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { getList } from "./service";
import { ListStore } from "super/store";
export const moduleName = "waterEleList";

class Store extends ListStore {
  autoSearchFields = ["dateInfo","transferType","transferStatus"];
  crumbList = [{name: "水电气过户"}];

  @observable
  tabList = [{ name: "待处理", key: "todo" }, { name: "已处理", key: "done" }];


  @action
  setDefaultInfo = () => {
    this.activedTabKey = this.activedTabKey || "todo"; // tab默认为“待处理”
  };

  getTabParams = () => {
    const result = {
      handleStatus: "1"
    };
    if (this.activedTabKey === "done") {
      result.handleStatus = "2";
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

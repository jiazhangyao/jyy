
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { getList, getOffline } from "./service";
import { ListStore } from "super/store";
export const moduleName = "busGuideList";

class Store extends ListStore {
  autoSearchFields = ["dateInfo", "releaseStatus"];
  crumbList = [
    {
      name: "办事指南",
      // url: "/guide/busguide/list"
    },
    {
      name: "业务办事指南",
      url: "/guide/busguide/list"
    },
  ];

  @action
  offline = async (obj) => {
    const res = await getOffline(obj);
    if (res.success) {
      this.getData()
    }
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

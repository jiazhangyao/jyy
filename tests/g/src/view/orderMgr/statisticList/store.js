import { action } from "mobx";
import storeMgr from "utils/storeManager";
import { queryList } from "./service";
import { ListStore } from "super/store";
export const moduleName = "statisticList";

class Store extends ListStore {
  autoSearchFields = ["dateInfo", "registerType", "status"];
  crumbList = [
    {
      name: "工单管理",
      // url: "/order/statistic/list"
    },
    {
      name: "业务统计"
    }
  ];

  @action
  getData = async () => {
    const values = { ...this.entity };
    const res = await queryList(values);
    if (res.success) {
      this.data = res.data;
    }
  };
}

storeMgr.register(moduleName, new Store());

/**
 * Created by ex-geqiang001 on 2019/1/18.
 */
import {action, observable} from "mobx";
import storeMgr from "utils/storeManager";
import {submit} from "./service";
import {ListStore} from "super/store";

export const moduleName = "examineList";

class Store extends ListStore {
  autoSearchFields = ["type", "certificateStatus"];
  crumbList = [
    {
      name: "认证机构管理",
      // url: "/institution/query/list"
    },
    {
      name: "认证机构审核"
    }
  ];

  @observable
  tabList = [{name: "待处理", key: "todo"}, {name: "已处理", key: "done"}];

  @action
  setDefaultInfo = () => {
    this.activedTabKey = this.activedTabKey || "todo"; // tab默认为“待处理”
  };

  getTabParams = () => {
    const result = {
      dealStatus: 1,
      auditStatus: 1
    };
    if (this.activedTabKey === "done") {
      result.dealStatus = 4;
      result.auditStatus = 4;
    }
    return result;
  };

  @action
  getData = async () => {
    const values = {...this.entity, ...this.getTabParams()};
    const res = await submit(values);
    if (res.success) {
      this.data = res.data;
    }
  };
}

storeMgr.register(moduleName, new Store());
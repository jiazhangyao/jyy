import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { submit, } from "./service";
import { getDownList } from "../../frame/service";
import { ListStore } from "super/store";
export const moduleName = "IdentityReviewList";

class Store extends ListStore {
  autoSearchFields = ["dateInfo", "companyId"];
  crumbList = [
    {
      name: "信息审核",
      // url: "/inforeview/identity/list"
    },
    {
      name: "身份认证审核",
    }
  ];

  @observable
  tabList = [{ name: "待处理", key: "todo" }, { name: "已处理", key: "done" }];

  @action
  setDefaultInfo = () => {
    this.activedTabKey = this.activedTabKey || "todo"; // tab默认为“待处理”
  };

  @observable
  companyList = [];

  getTabParams = () => {
    const result = {
      status: [3]
    };
    if (this.activedTabKey === "done") {
      result.status = [1, 2];
    }
    return result;
  };

  @action
  getData = async () => {
    const values = { ...this.entity, ...this.getTabParams() };
    const res = await submit(values);
    if (res.success) {
      this.data = res.data;
      // await this.getDownList();
    }
  };
  //获取所属机构
  @action
  getDownList = async () => {
    const res = await getDownList();
    if (res.success) {
      this.companyList = res.data;
    }
  };
}

storeMgr.register(moduleName, new Store());

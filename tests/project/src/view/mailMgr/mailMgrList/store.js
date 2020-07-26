
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { getList, getMail, subMail } from "./service";
import { ListStore } from "super/store";
export const moduleName = "MailMgrList";

class Store extends ListStore {
  autoSearchFields = ["registerType"];
  crumbList = [{name: "邮寄管理"}];

  @observable
  tabList = [{ name: "待处理", key: "todo" }, { name: "已处理", key: "done" }];

  @action
  setDefaultInfo = () => {
    this.activedTabKey = this.activedTabKey || "todo"; // tab默认为“待处理”
  };

  @observable
  mailInfo = {}

  getTabParams = () => {
    const result = {
      logisticsState: "1"
    };
    if (this.activedTabKey === "done") {
      result.logisticsState = "2";
    }
    return result;
  };

  @action
  getMailModalInfo = async (id) => {
    const res = await getMail(id);
    if (res.success) {
      this.mailInfo = res.data;
    }
  };

  @action
  subMailInfo = async (id, values) => {
    const res = await subMail({ id, data: values });
    if (res.success) {
      this.getData()
    }
  }

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

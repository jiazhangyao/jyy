/**
 * Created by EX-GEQIANG001 on 2019/1/17.
 */
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { submit, getCertificate,sureRatepay } from "./service";
import { ListStore } from "super/store";
import { message } from "components";
export const moduleName = "ratepayList";

class Store extends ListStore {
  autoSearchFields = ["dateInfo", "registerType", "isTaxed"];
  crumbList = [
    {
      name: "纳税管理",
      // url: "/ratepay/view/list"
    },
    {
      name: "税费工单"
    }
  ];
  @observable
  certificateInfo = {};

  @action
  getCertificateInfo = async id => {
    const res = await getCertificate(id);
    if (res.success) {
      this.certificateInfo = res.data;
    }
  };

  @action
  getData = async () => {
    const values = { ...this.entity };
    const res = await submit(values);
    if (res.success) {
      this.data = res.data;
    }
  };

  @action
  sureRatepay = async (id) => {
    const res = await sureRatepay(id);
    if (res.success) {
      message.success("确认支付成功");
      this.getData()
    } else {
      this.failHandler(res);
    }
  };
}

storeMgr.register(moduleName, new Store());

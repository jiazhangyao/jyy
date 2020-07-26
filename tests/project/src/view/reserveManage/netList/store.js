
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { list, deleteNet } from "./service";
import { ListStore } from "super/store";
import { timePeriod} from "../orderList/service";
import { Modal } from "antd";
import {message} from "components";
export const moduleName = "netList";

class Store extends ListStore {
  autoSearchFields = ["registerType", "timePeriod"];
  crumbList = [
    {
      name: "预约管理",
      // url: "/reserve/net/list"
    },
    {
      name: "网点管理"
    }
  ];

  @action
  getData = async () => {
    const values = { ...this.entity};
    const res = await list(values);
    if (res.success) {
      this.data = res.data;
    }
  };
  //dialogTip
   countDown = (msg) => {
    const modal = Modal.info({
      content: msg,
      okText: '我知道了',
      iconType: 'none',
      icon:'none',//兼容antd ver 3.11
    });
  }
  //删除网点
  @action
  deleteNet = async (id) => {
    const {success, globalError} = await deleteNet(id);
    if(success){
      message.success('已删除!');
      this.getData();
    }else if (globalError) {
      this.countDown(globalError);
    }
  };
}

storeMgr.register(moduleName, new Store());

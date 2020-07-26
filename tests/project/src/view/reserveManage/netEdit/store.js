import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { EditStore } from "super/store";
import { Modal } from "antd";
import {branchName, create, getData, time, update, deleteNet} from "./service";
import { EditPage } from "super/page";
import history from "utils/history";
import {message} from "components";

const { PAGE_TYPES } = EditPage;
export const moduleName = "netEdit";

class Store extends EditStore {
  crumbList = [];

  @observable
  branches = [];
  @observable
  times = [];

  @action
  updateCrumblist(page){
    this.crumbList = [
      {
        name: "预约管理"
      },
      {
        name: "网点管理",
        url: "/reserve/net/list"
      }
    ];
    if (page === PAGE_TYPES.EDIT) {
      this.crumbList.push({
        name: '编辑',
      })
    }else{
      this.crumbList.push({
        name: '新增网点',
      })
    }
  }

  @action
  init = async () => {
    const { page, id } = this.entity;
    this.updateCrumblist(page);
    if (page === PAGE_TYPES.EDIT) {
      await this.getData({ id });
    }
    this.getBranchName();
    this.getTime();
  };
  @action
  getData = async data => {
    const res = await getData(data);
    if (res.success) {
      this.setData(res.data);
      return;
    }
    this.failHandler(res);
  };

  @action
  getBranchName = async () => {
    const res = await branchName();

    if (res.success) {
      this.branches = res.data;
    }
  };
  @action
  getTime = async () => {
    const res = await time();

    if (res.success) {
      this.times = res.data;
    }
  };
  @action
  submit = async values => {
    const { page } = this.entity;
    let res;
    if (page === PAGE_TYPES.EDIT) {
      res = await update(values);
    } else {
      res = await create(values);
    }
    if (res.success) {
      const msg = page === PAGE_TYPES.EDIT ? "编辑成功" : "添加成功";
      message.success(msg);
      history.push("/reserve/net/list");
    } else {
      this.failHandler(res);
    }
  };
  //删除网点
  @action
  deleteNet = async (id) => {
    const {success, globalError} = await deleteNet(id);
    if(success){
      message.success('已删除!');
      history.push("/reserve/net/list");
    }else if (globalError) {
      this.countDown(globalError);
    }
  };
  //dialogTip
  static countDown(msg) {
    const modal = Modal.info({
      content: msg,
      okText: '我知道了',
      iconType: 'none',
      icon: 'none',//兼容antd ver 3.11
    });
  }
}

storeMgr.register(moduleName, new Store());

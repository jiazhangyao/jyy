/*
 * @Author: tim huang
 * @Date: 2019-01-28 13:26:48
 * @Last Modified by:   tim huang
 * @Last Modified time: 2019-01-28 13:26:48
 */

import { action, observable, runInAction } from "mobx";
import storeMgr from "utils/storeManager";
import { branchName, time, create, update, getData } from "./service";
import { EditStore } from "super/store";
import { message } from "components";
import history from "utils/history";
import { EditPage } from "super/page";
const { PAGE_TYPES } = EditPage;
export const moduleName = "demo-edit";

class Store extends EditStore {
  crumbList = [
    {
      name: "demo",
      // url: "/demo/child/list"
    },
    {
      name: "demo列表",
      url: "/demo/child/list"
    },
    {
      name: "demo新增"
    }
  ];

  @observable
  branches = [];
  @observable
  times = [];

  @action
  init = async () => {
    const { page, id } = this.entity;
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

    // test
    // res.success = false;
    // res.fieldErrors = [
    //   { fieldName: "registerTypeArr", msg: "registerTypeArr错了" }
    // ];

    if (res.success) {
      const msg = page === PAGE_TYPES.EDIT ? "编辑成功" : "添加成功";

      message.success(msg);
      history.push("/demo/child/list");
      return;
    } else {
      this.failHandler(res);
    }
  };
}

storeMgr.register(moduleName, new Store());

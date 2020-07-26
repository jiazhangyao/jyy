/*
 * @Author: minza.zhang
 * @Date: 2018-11-07 11:49:39
 * @Last Modified by: tim huang
 * @Last Modified time: 2019-01-28 14:38:40
 */

import { action, observable, runInAction } from "mobx";
import storeMgr from "utils/storeManager";
import { create, update, getData, getDelete, queryAllMenu } from "./service";
import {queryDepartment} from "../userAddModify/service";

import { EditStore } from "super/store";
import { message } from "components";
import history from "utils/history";
import tools from "utils/tools";
import { EditPage } from "super/page";
const { PAGE_TYPES } = EditPage;
export const moduleName = "RoleEdit";

class Store extends EditStore {
  @observable
  departmentList = [];
  @observable
  eidtLoading = false;
  @observable
  delLoading = false;
  @action
  getDepartment = async () => {
    const res = await queryDepartment();
    if (res.success) {
      this.departmentList = res.data;
    }
  };

  @observable
  Auths = []; // 复选框数据源
  @action
  getAuths = async () => {
    const res = await queryAllMenu();
    if (res.success) {
      this.Auths = res.data;
    }
  };

  @action
  init = async () => {
    this.getAuths();
    this.getDepartment();

    const { page, id } = this.entity;
    await this.setCrumbList();
    if (page === PAGE_TYPES.EDIT) {
      await this.getData({ id });
    }
  };

  @action
  setCrumbList = async () => {
    const { page } = this.entity;
    this.crumbList = [
      {
        name: "账户管理",
        // url: "/account/role/list"
      },
      {
        name: "角色权限设置",
        url: "/account/role/list"
      },
      {
        name: page === PAGE_TYPES.EDIT ? "编辑角色" : "新增角色"
      }
    ];
  };

  @action
  getData = async data => {
    const res = await getData(data);

    if (res.success) {
      let dataObj = res.data;
      dataObj.permissionIds = dataObj.permissionIdList || [];
      // dataObj.functionNameList = dataObj.functionList.map(item => item.enName);
      this.setData(dataObj);
      return;
    }
    this.failHandler(res);
  };

  @action
  submit = async values => {
    const { page } = this.entity;
    this.eidtLoading = true
    let res;
    if (page === PAGE_TYPES.EDIT) {
      res = await update(values);
    } else {
      res = await create(values);
    }

    if (res.success) {
      message.success(page === PAGE_TYPES.EDIT ? "编辑成功" : "添加成功");
      setTimeout(() => {
        history.push("/account/role/list");
        this.eidtLoading = false
        tools.resetToTop();
      }, 2000)
    } else {
      this.eidtLoading = false
      this.failHandler(res);
    }
  };

  @action
  delete = async () => {
    const data = this.entity;
    this.delLoading= true
    const res = await getDelete(data);
    if (res.success) {
      this.delLoading = false
      history.push("/account/role/list");
    }else{
      this.delLoading = false
      this.failHandler(res);
    }
   
  };

  @action
  onCancal = () => {
    history.push("/account/role/list");
  };
}

storeMgr.register(moduleName, new Store());

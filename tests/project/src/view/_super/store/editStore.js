/*
 * @Author: tim huang
 * @Date: 2018-12-25 14:59:12
 * @Last Modified by: tim huang
 * @Last Modified time: 2019-01-28 14:37:03
 */

import { action, observable } from "mobx";
import BaseStore from "./base";
import { EditPage } from "super/page";
const { PAGE_TYPES } = EditPage;

class EditStore extends BaseStore {
  @observable
  crumbList = [];
  @observable
  tabList = [];

  @observable
  data = {};
  @observable
  dataTag = Math.random();
  @observable
  pageTag = Math.random();

  @action
  setData = async nextData => {
    this.data = nextData || {};
    this.dataTag = Math.random();
  };

  @action
  setOneData = async nextData => {
    this.data = {...this.data, ...nextData};
    this.dataTag = Math.random();
  };

  @action
  initHook = async values => {
    if (values) {
      this.entity = {
        ...this.entity,
        ...values
      };
    }

    if (this.init) {
      this.init(values);
    }
  };
  @action
  unmountHook = async () => {
    this.setData({});
    if (this.unmount) {
      this.unmount();
    }
  };
  @action
  submitHook = async values => {
    const { page, id } = this.entity;
    if (page === PAGE_TYPES.EDIT) {
      values.id = id;
    }
    if (this.submit) {
      await this.submit(values);
    }
  };
  @action
  updPageTag = () => {
    this.pageTag = Math.random();
  };
}

export default EditStore;

/*
 * @Author: tim huang
 * @Date: 2019-01-14 16:04:50
 * @Last Modified by: tim huang
 * @Last Modified time: 2019-01-25 00:32:41
 */

import { action, observable } from "mobx";
import BaseStore from "./base";

class DetailStore extends BaseStore {
  @observable
  activedTabKey = undefined;

  @observable
  tabList = [];

  @observable
  data = {};

  @action
  updateEntity = values => {
    this.entity = {
      ...this.entity,
      ...values
    };
  };

  @action
  tabChange = async tabKey => {
    this.setDefaultEntity();
    this.activedTabKey = tabKey;
    if (this.getData) {
      this.getData();
    }
  };

  @action
  init = async values => {
    this.setDefaultEntity(values);
    if (this.getData) {
      this.getData();
    }
  };

  @action
  setDefaultEntity = async values => {
    const nextEntity = {
      ...values
    };
    this.entity = nextEntity;
  };
  getTabParams = () => {
    return {};
  };
  @action
  setData = (data) => {
    this.data = data || {};
  };
}

export default DetailStore;

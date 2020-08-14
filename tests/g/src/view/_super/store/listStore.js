/*
 * @Author: tim huang
 * @Date: 2019-01-11 15:37:17
 * @Last Modified by: tim huang
 * @Last Modified time: 2019-02-11 16:19:14
 */

import { action, observable } from "mobx";
import BaseStore from "./base";

class ListStore extends BaseStore {
  // 需要自动查询的字段集合
  autoSearchFields = [""];

  @observable
  activedTabKey = undefined;

  @observable
  tabList = [];

  @observable
  data = {
    list: [],
    total: 0
  };

  // 需重写，初始化时，各自设置所需默认数据的钩子
  // @action
  // setDefaultInfo = () => {};

  @action
  updateEntity = values => {
    // 展开列表页筛选栏日期组件生成的beginTime与endTime
    const { dateInfo } = values;
    if (dateInfo) {
      values = {
        ...values,
        ...dateInfo
      };
    }

    this.entity = {
      ...this.entity,
      ...values
    };
  };

  @action
  onSearchFieldsChange = async (targetField, allFields) => {
    if (this.autoSearchFields.indexOf(targetField) >= 0) {
      this.submit({ pageNo: 1, ...allFields });
    }
  };

  @action
  tabChange = async tabKey => {
    this.activedTabKey = tabKey;
    this.setDefaultEntity();
    this.getData();
  };

  @action
  init = async values => {
    this.setDefaultEntity(values);
    this.getData();
  };

  @action
  setDefaultEntity = async values => {
    this.entity = {
      pageNo: 1,
      pageSize: 10,
      ...values
    };
    if (this.setDefaultInfo) {
      this.setDefaultInfo();
    }
  };

  @action
  clear = () => {
    this.init();
  };

  @action
  unmount = () => {
    this.activedTabKey = undefined;
  };

  @action
  submit = async values => {
    await this.updateEntity(values);
    await this.getData();
  };

  getTabParams = () => {
    return {};
  };
}

export default ListStore;

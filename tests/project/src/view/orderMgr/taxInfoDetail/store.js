import {action, observable} from "mobx";
import storeMgr from "utils/storeManager";
import {taxDetail} from "./service";
import {message} from 'antd';

import {DetailStore} from "super/store";

export const moduleName = "orderTaxDetail";

class Store extends DetailStore {
  @observable
  orderProcess=[];
  @action
  getData = async () => {
    const values = {...this.entity};
    const {id = ''} = values;
    if (values.id) {
      // from:2 代表G端
      let params = id + '?from=2';
      const res = await taxDetail(params);
      if (res.success) {
        this.data = res.data;
      } else {
        message.error(`获取信息失败：${res.globalError}`);
      }
    }
  };
}

storeMgr.register(moduleName, new Store());

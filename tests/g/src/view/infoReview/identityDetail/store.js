
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { submit,} from "./service";
import { message } from 'antd';

import { DetailStore } from "super/store";
export const moduleName = "IdentityReviewDetail";

class Store extends DetailStore {
  crumbList = [
    {
      name: "信息审核",
    },
    {
      name: "身份认证审核",
      url: "/inforeview/identity/list"
    },
    {
      name: "详情"
    }
  ];

  @action
  getData = async () => {
    const values = { ...this.entity};
    if(values.id){
      const res = await submit(values);
      if (res.success) {
        this.data = res.data;
      }else{
        message.error(`获取信息失败：${res.globalError}`);
      }
    }

  };
}

storeMgr.register(moduleName, new Store());

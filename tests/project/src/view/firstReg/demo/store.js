import React from "react";
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { DetailStore } from "super/store";

export const moduleName = "firstReg-pre"; // 首次登记-预审受理

class Store extends DetailStore {
  //面包屑展示数据
  crumbList = [{name:"工单管理"},{name:"工单审核"}];

  @observable
  data = {};

  @observable
  department = {};
  //模态框显示的初始值
  @observable
  versible=false;
  //操作模态框显示/隐藏的方法
  @action
  handleVersible = async (flag) => {
   this.versible=flag;
  };
  @action
  initCrumbList = () => {
    let crumbArray = [{name:"哈哈"},{name:"呵呵"}];
    if (this.entity.id) {
      crumbArray = [
        {
          name: "账户管理",
          // url: "/account/user/list"
        },
        { name: '用户管理',
          url: "/account/user/list"
        },
        {
          name: "详情"
        }
      ];
    } else {
      crumbArray = [{
        name: "账户管理",
        // url: "/account/self/info/list"
      },
        { name: '个人账户设置' }
      ];
    }
    return crumbArray
  };
  @action
  setFamilyInfo = async (obj) => {
    this.showFamilyInfoFlag = true;
    this.familyInfoTitle = obj.name;
    this.familyMemberList = obj.familyMemberList || [
      // {name: "测试", cardTypeDesc: "身份证", cardNo: 123},
      // {name: "测试", cardTypeDesc: "身份证", cardNo: 123}
    ];
  };

}

storeMgr.register(moduleName, new Store());


import React from "react";
import { action, observable } from "mobx";
import { message, Modal } from "antd";
import storeMgr from "utils/storeManager";
import { getDepartment, getUserInfo, getBaseInfo, delUser, resetPsd } from "./service";
import { DetailStore } from "super/store";
import history from "utils/history";

export const moduleName = "selfInfo"; // 账户管理-个人账户设置

class Store extends DetailStore {
  crumbList = [];

  @observable
  data = {};

  @observable
  department = {};

  @action
  initCrumbList = () => {
    let crumbArray = [];
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
  deleteUser = async (id) => {
    const res = await delUser(id);
    if (res.success) {
      message.success("删除成功");
      history.push("/account/user/list");
    }
  };

  @action
  resetPassword = async (id) => {
    const res = await resetPsd(id);
    const { data } = res;
    if (res.success) {
      Modal.success({
        title: '密码重置成功',
        okText: '我知道了',
        icon: 'none',
        content: (
            <div className="ant-confirm-content-text">
              <div>
                <span>姓名：{ data.name }</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;账户名：{ data.userName }</span>
              </div>
              <div>
                初始密码：<span className="new-password">{ data.password }</span> , 请通知员工尽快修改密码！
              </div>
            </div>
        )
      });
    }
  };

  @action
  getData = async () => {
    this.crumbList = this.initCrumbList();
    const values = { ...this.entity };
    const departmentRes = await getDepartment(values);
    if (departmentRes.success) {
      this.department = departmentRes.data;
    }
    if(!values.id){
      const userRes = await getBaseInfo(values);
      if (userRes.success) {
        this.setData(userRes.data.accountInfo);
      }
    }else{
      const userRes = await getUserInfo(values);
      if (userRes.success) {
        this.setData(userRes.data);
      }
    }
  };
}

storeMgr.register(moduleName, new Store());

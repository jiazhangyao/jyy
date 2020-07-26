import React from "react";
import { observable, action } from "mobx";
import { message, Modal } from "antd";
import storeMgr from "utils/storeManager";
import { queryList, queryRegionList, queryDepartment } from "./service";
import { ListStore } from "super/store";
import dynamicConst from "common/dynamicConst";
import { delUser, resetPsd } from "../selfInfo/service";

export const moduleName = "userList";

class Store extends ListStore {
  autoSearchFields = ["department", "latticePoint", "status"];
  crumbList = [
    {
      name: "账户管理",
      // url: "/account/user/list"
    },
    {
      name: "用户管理"
    }
  ];

  @action
  setDefaultInfo = () => {
    this.activedTabKey = "root"; // 只有root用户才显示部门筛选项，此处借用公共filterRender过滤activeTyped的功能实现
  };

  @action
  getData = async () => {
    const dictRes = await queryRegionList();
    const departmentRes = await queryDepartment();
    let allRegionList = {}, allDepartmentList = {};
    if (dictRes.success) {
      dictRes.data.map(cur => {
        allRegionList[cur.id] = cur.name;
      })
    }
    if (departmentRes.success) {
      departmentRes.data.map(cur => {
        allDepartmentList[cur.key] = cur.name;
      })
    }
    dynamicConst.build({
      allRegionList,
      allDepartmentList,
      accountStatus: {
        1: "启用",
        2: "停用"
      }
    })

    const values = { ...this.entity };
    const res = await queryList(values);
    if (res.success) {
      this.data = res.data;
    }
  };

  @action
  deleteUser = async (id) => {
    const res = await delUser(id);
    if (res.success) {
      message.success("删除成功");
      // history.push("/account/user/list");
      this.getData();
    } else {
      message.error(res.globalError || res.msg);
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
              <span>姓名：{data.name}</span>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;账户名：{data.userName}</span>
            </div>
            <div>
              初始密码：<span className="new-password">{data.password}</span> , 请通知员工尽快修改密码！
            </div>
          </div>
        )
      });
    } else {
      message.error(res.globalError || res.msg);
    }
  };
}

storeMgr.register(moduleName, new Store());

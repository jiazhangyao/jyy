import React from "react";
import { action, observable, runInAction } from "mobx";
import storeMgr from "utils/storeManager";
import {
  queryDepartment,
  queryRegionList,
  queryRoleList,
  create,
  update,
  getData
} from "./service";
import { Modal } from "antd";
import { EditStore } from "super/store";
import { message } from "components";
import { EditPage } from "super/page";
import { DEFAULT_PARAMS } from "common/const";
import history from "utils/history";
const { PAGE_TYPES } = EditPage;
export const moduleName = "add-modify-user";

class Store extends EditStore {
  @action
  setCrumbList = async () => {
    const { page } = this.entity;
    this.crumbList = [
      {
        name: "账户管理",
        // url: "/account/user/list"
      },
      {
        name: "用户管理",
        url: "/account/user/list"
      },
      {
        name: page === PAGE_TYPES.EDIT ? "编辑用户" : "新增用户"
      }
    ];
  };

  accountStatus = [
    {
      key: "1",
      name: "启用"
    },
    {
      key: "2",
      name: "停用"
    }
  ];

  @observable
  departmentList = [];
  @observable
  regionList = [];
  @observable
  roleList = [];
  @observable
  loginLoading = false;

  @action
  init = async () => {
    await this.setCrumbList();

    const { page, id } = this.entity;
    if (page === PAGE_TYPES.EDIT) {
      await this.getData(id);
    }

    this.getDepartment();
    this.getRegionList();
  };

  @action
  getData = async data => {
    const res = await getData(data);

    if (res.success) {
      let data = res.data;
      data.department = data.groupIds[0];
      data.roleId = data.userRolesIds;

      // 根据用户当前所在部门，响应式query角色列表
      this.getRoleList(data.groupIds[0]);

      this.setData(data);
    } else {
      this.failHandler(res);
    }
  };

  @action
  getDepartment = async () => {
    const res = await queryDepartment();
    if (res.success) {
      this.departmentList = res.data;
    }
  };

  @action
  getRegionList = async () => {
    const res = await queryRegionList();

    if (res.success) {
      this.regionList = res.data;
    }
  };

  @action
  getRoleList = async (groupId) => {
    // const values = DEFAULT_PARAMS;
    // const res = await queryRoleList({...values, groupId});
    const res = await queryRoleList({groupId});

    if (res.success) {
      this.roleList = res.data;
    }
  };

  @action
  onCancal = () => {
    history.push("/account/user/list");
  }

  dealParam = val => typeof val === "string" ? [val] : val;
  @action
  submit = async values => {
    // 统一下拉选框入参格式，无论单选还是多选，统一以数组字符串入参
    // console.log('❤values', values)
    this.loginLoading = true;
    values.department = this.dealParam(values.department)
    values.latticePoint = this.dealParam(values.latticePoint)

    const { page } = this.entity;
    let res;
    if (page === PAGE_TYPES.EDIT) {
      res = await update(values);
    } else {
      res = await create(values);
    }
    if (res.success) {
      // const msg = page === PAGE_TYPES.EDIT ? "编辑成功" : "添加成功";
      if (page === PAGE_TYPES.EDIT) {
        message.success("编辑成功");
        setTimeout(() => {
          // by tim: 请勿用 window.history.back，有bug
          // window.history.back();
          history.push("/account/user/list");
          this.loginLoading = false;
        }, 2000);
      } else {
        const { data } = res;
        this.loginLoading = false;
        Modal.success({
          title: "账户创建成功",
          okText: "我知道了",
          content: (
            <div>
              <div>
                姓名：{data.name} &nbsp;&nbsp;账户名：{data.userName}
              </div>
              <div>
                初始密码：<span className="new-password">{data.password}</span>{" "}, 请通知员工尽快修改密码！
              </div>
            </div>
          ),
          onOk() {
            history.push("/account/user/list");
            
          }
        });
      }
    } else {
      this.loginLoading = false;
      this.failHandler(res);
    }
  };
}

storeMgr.register(moduleName, new Store());

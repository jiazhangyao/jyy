import React, { Component } from "react";
import { Route } from "components";

import SelfInfo from "./selfInfo";
import EditPwd from "./editPwd";
import SelfModify from "./selfModify";

import UserList from "./userList";
import AddModifyUser from "./userAddModify";

import RoleList from "./roleList";
import RoleDetail from "./roleDetail";
import RoleEdit from "./roleEdit";

import { withRouter } from "react-router";

@withRouter
class AccountMgr extends Component {
  render() {
    const { match, routes } = this.props;
    return (
      <>
        {/** 个人账户设置 */}
        <Route path={`${match.path}/self/info/list`} component={SelfInfo} />
        <Route path={`${match.path}/self/info/edit`} component={EditPwd} page="edit" />
        <Route path={`${match.path}/self/modify`} component={SelfModify} />

        {/** 用户管理 */}
        <Route path={`${match.path}/user/list`} component={UserList} />
        <Route path={`${match.path}/user/detail`} component={SelfInfo} />
        <Route path={`${match.path}/user/add`} component={AddModifyUser} />
        <Route path={`${match.path}/user/edit`} component={AddModifyUser} page="edit" />

        {/** 角色权限设置 */}
        <Route path={`${match.path}/role/list`} component={RoleList} />
        <Route path={`${match.path}/role/detail`} component={RoleDetail} />
        <Route path={`${match.path}/role/add`} component={RoleEdit} />
        <Route path={`${match.path}/role/edit`} component={RoleEdit} page="edit" />
      </>
    );
  }
}

export default AccountMgr;

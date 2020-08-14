import React from "react";
import { Modal } from 'antd';
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import Table from "mt-table";
import { LinkButton, Button, SearchInput, SelectFromDict } from "components";
import history from "utils/history";
import dynamicConst from "common/dynamicConst";

import { moduleName } from "./store";
import "./style.less"
const { Column } = Table;
const { PrimaryButton } = Button;

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class UserList extends ListPage {
  /** 页面右上角按钮 */
  topActionRender = () => {
    return (
      <>
        <PrimaryButton onClick={() => history.push("/account/user/add")}>新增账户</PrimaryButton>
      </>
    )
  };

  /** 筛选栏 */
  filterRender = () => {
    const {
      userInfo: { isRoot }
    } = this.props;

    return (
      <>
        <SearchInput
          id="loginNo"
          width={240}
          placeholder="请输入用户姓名/用户手机号"
          onClick={this.doFormSubmit}
        />
        <SelectFromDict
          id="department"
          placeholder="部门"
          width={104}
          activeType={isRoot === 1 ? "root" : "user"}
          dictKey="allDepartmentList"
        />
        <SelectFromDict
          id="latticePoint"
          placeholder="网点"
          width={104}
          dictKey="allRegionList"
        />
        <SelectFromDict
          id="status"
          placeholder="状态"
          dictKey="accountStatus"
          width={104}
        />
      </>
    );
  }

  /** 列表 */
  tableRender = () => {
    return (
      <Table scroll={{ x: 1200 }}>
        <Column dataIndex="userName" render={this.renderUsername} width={150}>账号</Column>
        <Column dataIndex="name" width={100}>用户姓名</Column>
        <Column dataIndex="mobile" width={150}>用户手机号</Column>

        <Column dataIndex="groupName" width={100} render={this.commonRender}>部门</Column>
        <Column dataIndex="userRolesName" width={150} render={this.commonRender}>角色</Column>
        <Column dataIndex="latticePointName" width={200} render={this.commonRender}>网点</Column>

        <Column dataIndex="status" width={100} render={this.renderAccountStatus}>状态</Column>
        <Column dataIndex="action" width={250} render={this.renderOpt}>操作</Column>
      </Table>
    );
  }
  commonRender = val => <span>{val || "--"}</span>
  renderUsername = (value, item) => {
    return <LinkButton to={`/account/user/detail?id=${item.id}`}>{value}</LinkButton>
  }
  renderAccountStatus = (value) => {
    return <span>{dynamicConst.getTextFromValue("accountStatus", value)}</span>
  }
  renderOpt = (value, item) => {
    return <span>
      <LinkButton to={`/account/user/edit?id=${item.id}`}>编辑</LinkButton>
      <span className="optSpan" onClick={this.deleteUser.bind(this, item.id)}>删除</span>
      <span className="optSpan" onClick={this.resetPwd.bind(this, item.id)}>重置密码</span>
    </span>
  }
  deleteUser = id => {
    const { store: { deleteUser } } = this.props;
    Modal.confirm({
      iconType: "none",
      content: "确认删除该用户？",
      width: 400,
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        deleteUser(id);
      }
    })
  }
  resetPwd = id => {
    const { store: { resetPassword } } = this.props;
    Modal.confirm({
      iconType: "none",
      content: "确认重置密码？",
      width: 400,
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        resetPassword(id);
      }
    })
  }
}

export default UserList;

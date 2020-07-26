import React from "react";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import Table from "mt-table";
import { Modal } from "antd";
import SearchInput from "components/searchInput";
import { LinkButton, Button } from "components";
import history from "utils/history";

import { moduleName } from "./store";
import "./style.less"

const { confirm } = Modal;
const { Column } = Table;
const { PrimaryButton } = Button;

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class RoleList extends ListPage {
  /** 页面右上角按钮 */
  topActionRender = () => {
    return (
      <>
        <PrimaryButton onClick={() => history.push("/account/role/add")}>新增角色</PrimaryButton>
      </>
    )
  };

  /** 筛选栏 */
  filterRender = () => {
    return (
      <>
        <SearchInput
          id="roleName"
          width={240}
          placeholder="请输入角色名称"
          onClick={this.doFormSubmit}
        />
      </>
    );
  }

  // 删除角色
  deleteRole = id => {
    const { store: { deleteRole } } = this.props;
    confirm({
      iconType: 'none',
      content: '确认删除该角色？',
      width: 400,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        deleteRole(id)
      }
    });
  }

  /** 列表 */
  tableRender = () => {
    return (
      <Table>
        <Column dataIndex="name">角色名称</Column>
        <Column render={this.renderOpt}>操作</Column>
      </Table>
    );
  }
  renderOpt = (value, item) => {
    return <>
      <LinkButton to={`/account/role/edit?id=${item.id}`}>编辑</LinkButton>
      <LinkButton onClick={this.deleteRole.bind(this, item.id)}>删除</LinkButton>
    </>
  }
}

export default RoleList;

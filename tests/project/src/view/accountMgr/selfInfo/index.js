import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import Table from "mt-table";
import { Modal } from "antd";
import Card from "mt-card";
import { Button } from "components";
import history from "utils/history";
import queryString from "query-string";
import DetailField from "components/detailField";
import { moduleName } from "./store";
import "./style.less";
import { AccountStatus } from "common/enum";
const { PrimaryButton, DangerButton } = Button;

const Confirm = Modal.confirm;

const { Column } = Table;

@inject(stores => ({
  store: stores[moduleName]
}))
@observer
class SelfInfo extends DetailPage {
  //获取路由上参数的方法
  getParams = () => {
    const { location } = this.props;
    let params = {};
    if (location && location.search) {
      params = queryString.parse(location.search);
    }
    return params;
  };

  /** 页面右上角按钮 */
  topActionRender = () => {
    const { id } = this.getParams();
    if (id) {
      return (
        <div className="list-page-crumb-action">
          <DangerButton onClick={this.onDelete}>
            删除
          </DangerButton>
          <PrimaryButton onClick={this.onResetPassword}>
            重置密码
          </PrimaryButton>
          <PrimaryButton onClick={this.goTeEditAccount}>
            编辑账户
          </PrimaryButton>
        </div>
      );
    } else {
      return (
        <div className="list-page-crumb-action">
          <PrimaryButton onClick={this.goToEditPwd}>
            修改密码
          </PrimaryButton>
        </div>
      );
    }
  };

  //去修改密码
  goToEditPwd = () => {
    history.push(`/account/self/info/edit`);
  };

  //删除弹窗
  onDelete = () => {
    const { id } = this.getParams();
    Confirm({
      iconType: "none",
      width: 400,
      content: "确认删除该用户？",
      onOk: () => {
        this.props.store.deleteUser(id);
      },
      onCancel() { }
    });
  };

  //重置密码
  onResetPassword = () => {
    const { id } = this.getParams();
    Confirm({
      iconType: "none",
      width: 400,
      content: "确认重置密码？",
      onOk: () => {
        this.props.store.resetPassword(id);
      },
      onCancel() { }
    });

  };

  //去编辑账户
  goTeEditAccount = () => {
    const { id } = this.getParams();
    history.push(`/account/user/edit?id=${id}`);
  };

  //获取部门
  getDepartmentName = () => {
    const { group = [] } = this.props.store.data;
    let result = "";
    if(group){
      for (let i = 0; i < group.length; i++) {
        result += group[i].name + " ";
      }
    }
    return result;
  };
  //获取网点
  getRegion = () => {
    const { region = [] } = this.props.store.data;
    let result = "";
    if(region){
      for (let k = 0; k < region.length; k++) {
        result += region[k].name + " ";
      }
    }
    return result;
  };

  renderRoleList = () => {
    const { data } = this.props.store;
    const { id } = this.getParams();
    if(id){
      const { userRoles=[] } = data;
      if(userRoles!==null && userRoles.length){
        return userRoles.map( (item,key) => (
            <span>{item.name}{ key == userRoles.length-1 ? "" : ","} </span>
        ))
      }
    }else{
      const { roleList=[] } = data;
      if(roleList!==null && roleList.length){
        return roleList.map( (item,key) => (
            <span>{item.name}{ key == roleList.length-1 ? "" : ","}</span>
        ))
      }
    }

  };

  doRender() {
    const { store } = this.props;
    const { data } = store;
    const { status } = data;
    const { id } = this.getParams();
    return (
      <>
        <Card className="accountCard" rowLen={1}>
          <DetailField label="账户名">{data.userName}</DetailField>
          <DetailField label="姓名">{data.name}</DetailField>
          <DetailField label="手机号">{data.mobile}</DetailField>
          <DetailField label="身份证号">{data.cardNo}</DetailField>
          {id && (
            <DetailField label="部门">{this.getDepartmentName()}</DetailField>
          )}
          <DetailField label="网点">{this.getRegion()}</DetailField>
          {id && <DetailField label="状态">{AccountStatus[status]}</DetailField>}
          <DetailField label="角色">{this.renderRoleList()}</DetailField>
        </Card>
      </>
    );
  }
}

export default SelfInfo;

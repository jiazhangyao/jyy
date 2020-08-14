import React from "react";
import {inject, observer} from "mobx-react";
import "./style.less";
import {EditPage} from "super/page";
import {moduleName} from "./store";
import {Icon, Input, Select} from "antd";
import Card from "mt-card";
import {Button} from "components";

const {PrimaryButton, NoBorderButton} = Button;
const {Option} = Select;
const {editForm, PAGE_TYPES} = EditPage;

@inject(stores => ({store: stores[moduleName]}))
@editForm({clsPrefix: "user-add-modify"})
@observer
class AddModifyUser extends EditPage {
  static defaultProps = {
    page: PAGE_TYPES.ADD
  };

  buildOptions = dataArr => {
    return dataArr.map(({id, key, name, label}) => {
      key = id || key;
      name = name || label;
      return (
        <Option key={key} value={`${key}`}>
          {name}
        </Option>
      );
    });
  };

  renderForm() {
    const {FormField} = this;
    const {
      store: {
        departmentList = [], // 部门
        regionList = [], // 网点
        accountStatus = [], // 状态
        roleList = [], // 角色
        data = {}
      },
      page,
      form: {getFieldValue}
    } = this.props;

    let latticePointReadonly = false;
    let pointRequired = true;
    let department = getFieldValue("department") || data.department;
    if (department === "3" || department === "4" || department === "5") {
      latticePointReadonly = true;
      pointRequired = false;
    }

    return (
      <>
        <Card rowLen={1}>
          {page === "edit" &&
          <div className="accountName">
            <FormField
              id="userName"
              label="账户名"
              required
              options={{width: "300px"}}
            >
              <Input disabled={true} placeholder="请输入"/>
            </FormField>
          </div>
          }

          <FormField
            id="name"
            label="姓名"
            required
            message="请输入"
            options={{width: "300px"}}
          >
            <Input placeholder="请输入"/>
          </FormField>

          <FormField
            id="mobile"
            label="手机号"
            required
            message="请输入"
            options={{width: "300px"}}
          >
            <Input placeholder="请输入"/>
          </FormField>

          <FormField
            id="cardNo"
            label="身份证号"
            required
            message="请输入"
            options={{width: "300px"}}
          >
            <Input placeholder="请输入"/>
          </FormField>

          <FormField
            id="department"
            label="部门"
            required
            message="请选择"
            options={{width: "300px"}}
          >
            <Select placeholder="请选择" suffixIcon={<Icon type="caret-down"/>} onChange={this.changeDepartment}>{this.buildOptions(departmentList)}</Select>
          </FormField>

          <FormField
            id="latticePoint"
            label="办公网点"
            required={pointRequired}
            message="请选择"
            options={{width: "300px"}}
          >
            <Select placeholder="请选择" suffixIcon={<Icon type="caret-down" />} disabled={latticePointReadonly}>{this.buildOptions(regionList)}</Select>
          </FormField>

          <FormField
            id="status"
            label="状态"
            required
            message="请选择"
            options={{width: "300px"}}
          >
            <Select placeholder="请选择" suffixIcon={<Icon type="caret-down"/>}>{this.buildOptions(accountStatus)}</Select>
          </FormField>

          <FormField
            id="roleId"
            label="角色"
            required
            message="请选择"
            options={{
              width: "300px",
              rules: [{validator: this.limitRolesNum}],
              validateTrigger: 'onBlur'
            }}
          >
            <Select mode="multiple" placeholder="请选择" suffixIcon={<Icon type="caret-down"/>}>
              {this.buildOptions(roleList)}
            </Select>
          </FormField>
        </Card>
      </>
    )
  }

  changeDepartment = e => {
    const {
      form: {setFieldsValue},
      store: {getRoleList}
    } = this.props;
    getRoleList(e);
    setFieldsValue({roleId: []});
  }

  limitRolesNum = (rule, value = [], callback) => {
    if (value.length > 3) {
      callback('角色最多只能选择3个')
    } else {
      callback()
    }
  };

  actionRender() {
    const {
      store: {loginLoading}
    } = this.props;
    return (
      <>
        <PrimaryButton activePage={PAGE_TYPES.ADD} onClick={this.onSubmitClick} loading={loginLoading}>确认新增</PrimaryButton>
        <PrimaryButton activePage={PAGE_TYPES.EDIT} onClick={this.onSubmitClick} loading={loginLoading}>确认修改</PrimaryButton>
        <NoBorderButton onClick={this.onCancal}>取消</NoBorderButton>
      </>
    );
  }
}

export default AddModifyUser;

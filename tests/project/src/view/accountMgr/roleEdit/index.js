import React from "react";
import { inject, observer } from "mobx-react";
import { EditPage } from "super/page";
import { moduleName } from "./store";
import { Input, Select, Icon } from "antd";
import Card from "mt-card";
import { Button, RolesTree } from "components";
import { AUTHS } from 'common/const';

const { PrimaryButton, NoBorderButton, DangerButton } = Button;
const { editForm, PAGE_TYPES } = EditPage;
const clsPrefix = "role-edit";
const {Option} = Select;

@inject(stores => ({ store: stores[moduleName] }))
@editForm({ clsPrefix: clsPrefix })
@observer
class Edit extends EditPage {
  constructor(props) {
    super(props);
    this.entityDesc = "角色"
  }

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
    const { FormField } = this;
    const {
      store: {
        departmentList = [], // 部门
        Auths = [] // 权限列表
      }
    } = this.props;

    return (
      <>
        <Card rowLen={1}>
          <FormField
            id="roleName"
            label="角色名称"
            required
            message="请输入角色名称"
            options={{ width: "200px" }}
          >
            <Input placeholder="请输入"/>
          </FormField>
          <FormField
            id="groupId"
            label="部门"
            required
            message="请选择"
            options={{ width: "200px" }}
          >
            <Select
              placeholder="请选择"
              suffixIcon={<Icon type="caret-down" />}
            >{this.buildOptions(departmentList)}</Select>
          </FormField>
          <FormField
            id="permissionIds"
            label="权限配置"
            required
            message="请选择权限"
          >
            {/*<RolesTree readonly={false} datasource={AUTHS} />*/}
            <RolesTree readonly={false} datasource={Auths} />
          </FormField>
        </Card>
      </>
    );
  }

  actionRender() {
    const {
      store: {delLoading,eidtLoading}
    } = this.props;
    return (
      <>
        <PrimaryButton activePage={PAGE_TYPES.ADD} onClick={this.onSubmitClick}  loading={eidtLoading}>
          确认新增
        </PrimaryButton>
        <PrimaryButton
          activePage={PAGE_TYPES.EDIT}
          onClick={this.onSubmitClick}
          loading={eidtLoading}
        >
          确认编辑
        </PrimaryButton>
        <DangerButton activePage={PAGE_TYPES.EDIT} onClick={this.onDelete}  loading={delLoading}>
          删除
        </DangerButton>
        <NoBorderButton onClick={this.onCancal} >取消</NoBorderButton>
      </>
    );
  }
}

export default Edit;

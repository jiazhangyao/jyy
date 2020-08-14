import React from "react";
import { inject, observer } from "mobx-react";
import { EditPage } from "super/page";
import { moduleName } from "./store";
import { Input } from "antd";
import Card from "mt-card";
import { Button, AntEditor } from "components";
import { VIEW_URL } from "common/const";
import "./style.less";

const { PrimaryButton, NoBorderButton } = Button;
const { editForm, PAGE_TYPES } = EditPage;
const clsPrefix = "bus-guide-edit";
const uploadProps = {
  viewUrl: VIEW_URL,
  action: VIEW_URL
};
@inject(stores => ({ store: stores[moduleName] }))
@editForm({ clsPrefix: clsPrefix })
@observer
class Edit extends EditPage {
  static defaultProps = {
    page: PAGE_TYPES.ADD
  };

  renderForm() {
    const { FormField } = this;
    return (
      <>
        <Card rowLen={1}>
          <FormField
            id="title"
            label="标题"
            required
            message="请输入标题"
            options={{ width: "200px" }}
          >
            <Input placeholder="请输入"  maxLength={50}/>
          </FormField>
          <FormField
            id="content"
            label="详情描述"
            required
            message="请填写业务办事指南"
            options={{ width: "800px" }}
          >
            <AntEditor
              uploadDomain={uploadProps.viewUrl}
              viewDomain={uploadProps.action}
            />
          </FormField>
        </Card>
      </>
    );
  }

  actionRender() {
    return (
      <>
        <PrimaryButton activePage={PAGE_TYPES.ADD} onClick={this.onSubmitClick}>
          确认新增
        </PrimaryButton>
        <PrimaryButton
          activePage={PAGE_TYPES.EDIT}
          onClick={this.onSubmitClick}
        >
          确认编辑
        </PrimaryButton>
        <NoBorderButton onClick={this.onCancal}>取消</NoBorderButton>
      </>
    );
  }
}

export default Edit;

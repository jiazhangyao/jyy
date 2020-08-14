import React from "react";
import { inject, observer } from "mobx-react";
import "./style.less";
import { EditPage } from "super/page";
import { moduleName } from "./store";
import { Input, Select} from "antd";
import { BusinessStatuses } from "./enum";
import Card from "mt-card";

import {Button} from "components";
const { Option } = Select;
const { editForm, PAGE_TYPES } = EditPage;
const { PrimaryButton, DangerButton, BorderButton,NoBorderButton } = Button;



@inject(stores => ({ store: stores[moduleName] }))
@editForm({ clsPrefix: "demo-edit" })
@observer
class Edit extends EditPage {
  static defaultProps = {
    page: PAGE_TYPES.ADD
  };
  topActionRender = () => {
    return (
      <>
        <Button type="primary" onClick={this.btnFn}>
          创建
        </Button>
        <Button activeType="done" type="danger" onClick={this.btnFn}>
          删除
        </Button>
        <Button activeType="todo" type="primary" onClick={this.btnFn}>
          编辑
        </Button>
      </>
    );
  };
  getBranchOptions = () => {
    const { store } = this.props;
    return store.branches.map(({ id, name }) => {
      return (
        <Option key={id} value={id + ""}>
          {name}
        </Option>
      );
    });
  };
  getTimeOptions = () => {
    const { store } = this.props;
    return store.times.map(({ text }) => {
      return (
        <Option key={text} value={text}>
          {text}
        </Option>
      );
    });
  };
  renderForm() {
    const { FormField } = this;
    return (
      <>
        <Card rowLen={1}>
          <FormField
            id="branchName"
            label="网点名称"
            required
            message="请选择"
            options={{ width: "300px" }}
          >
            <Select placeholder="请选择">{this.getBranchOptions()}</Select>
          </FormField>
          <FormField
            id="reserveTimePeriod"
            label="办理时间段"
            required
            message="请选择"
            options={{ width: "500px" }}
          >
            <Select mode="multiple" placeholder="请选择">
              {this.getTimeOptions()}
              </Select>
          </FormField>
          <FormField
            id="registerTypeArr"
            label="办理业务"
            required
            message="请选择"
            options={{ width: "500px" }}
          >
            <Select mode="multiple" placeholder="请选择">
              {BusinessStatuses.toCustomArray(({ text, value }) => (
                <Option key={value} value={value + ""}>
                  {text}
                </Option>
              ))}
            </Select>
          </FormField>
          <div style={{ position: "relative" }}>
            <FormField
              id="upperLimit"
              label="每时间段上限人数"
              required
              message="请输入"
              options={{
                width: "250px",
                rules: [{ validator: this.upperLimitValidator }]
              }}
            >
              <Input
                placeholder="请输入"
              />
            </FormField>
            <span
              style={{ position: "absolute", bottom: "6px", left: "233px" }}
            >
              人
            </span>
          </div>
          <FormField
            id="branchAddress"
            label="网点地址"
            required
            message="请输入"
            options={{ width: "500px" }}
          >
            <Input
              placeholder="请输入"

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
        <PrimaryButton activePage={PAGE_TYPES.EDIT} onClick={this.onSubmitClick}>
          确认保存
        </PrimaryButton>
        <DangerButton activePage={PAGE_TYPES.EDIT}>删除</DangerButton>
        <NoBorderButton>取消</NoBorderButton>
      </>
    );
  }
}

export default Edit;

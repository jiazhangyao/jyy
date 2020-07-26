import React from "react";
import { EditPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import {Icon, Input, Select} from 'antd';
import { Button } from "components";
import Card from "mt-card";
import { BusinessStatuses } from "./enum";
import history from "utils/history";

const { Option } = Select;
const { editForm, PAGE_TYPES } = EditPage;
const { PrimaryButton, DangerButton,NoBorderButton } = Button;


@inject(stores => ({
  store: stores[moduleName],
}))
@editForm({ clsPrefix: "net-edit" })
@observer
class NetEdit extends EditPage{
  static defaultProps = {
    page: PAGE_TYPES.ADD
  };
  getBranchOptions = () => {
    const { store } = this.props;
    return store.branches.map(({ id, name }) => {
      return (
        <Option key={id} value={name}>
          {name}
        </Option>
      );
    });
  };
  getTimeOptions = () => {
    const { store } = this.props;
    return Object.keys(store.times).map(( key ) => {
      return (
        <Option key={key} value={store.times[key]}>
          {store.times[key]}
        </Option>
      );
    });
  };
  onHandelCancel = () => {
    history.push('/reserve/net/list')
  }
  onDeleteNet = (id) => {
    if(id){
      const {store}=this.props;
      store.deleteNet(id);
    }
  }
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
            <Select
              placeholder="请选择"
              suffixIcon={<Icon type="caret-down" />}
            >{this.getBranchOptions()}</Select>
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
    const {store:{entity:{id}}}=this.props;
    return (
      <>
        <PrimaryButton activePage={PAGE_TYPES.ADD} onClick={this.onSubmitClick}>
          确认新增
        </PrimaryButton>
        <PrimaryButton activePage={PAGE_TYPES.EDIT} onClick={this.onSubmitClick}>
          确认保存
        </PrimaryButton>
        <DangerButton activePage={PAGE_TYPES.EDIT} onClick={(e) => this.onDeleteNet(id)}>删除</DangerButton>
        <NoBorderButton onClick={this.onHandelCancel}>取消</NoBorderButton>
      </>
    );
  }
}

export default NetEdit;

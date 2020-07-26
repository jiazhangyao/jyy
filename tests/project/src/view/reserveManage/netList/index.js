import React from "react";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Table from "mt-table";
import { Modal } from 'antd';
import { LinkButton, SearchInput, SelectFromDict, Button } from "components";
import dynamicConst from "common/dynamicConst";
import history from "utils/history";
import { OrderRegisterType } from "common/enum";
const { Column } = Table;
const confirm = Modal.confirm;
const { PrimaryButton, } = Button;

@inject(store => ({
  store: store[moduleName],
  userInfo: store.frame.userInfo
}))
@observer
class NetList extends ListPage {
  /** 页面右上角按钮 */
  topActionRender = () => {
    return (
      <>
        <PrimaryButton onClick={this.btnFn}>
          新增网点
        </PrimaryButton>
      </>
    );
  };
  btnFn = () => {
    history.push("/reserve/net/add");

  };
  /** 筛选栏 */
  filterRender = () => {
    return (
      <>
        <SearchInput
          id="branchName"
          placeholder="请输入网点名称"
          onClick={this.doFormSubmit}
          width={240}
        />
        <SelectFromDict
          id="registerType"
          placeholder="登记类型"
          width={104}
          dictKey="registerType"
        />
        <SelectFromDict
          id="timePeriod"
          placeholder="预约时间段"
          width={104}
          dictKey="timePeriod"
        />
      </>
    );
  };
  onDelete = id => () => {
    const { store: { deleteNet } } = this.props;
    confirm({
      iconType: 'none',
      content: '确认删除该网点？',
      width: 400,
      okText: '删除 ',
      cancelText: '取消 ',
      onOk: () => { deleteNet(id) },
      onCancel() { }
    });
  }
  actionFieldsRender = (value, item) => {
    const { id } = item;
    return (
      <div>
        <LinkButton to={`/reserve/net/edit?id=${id}`}>编辑</LinkButton>
        <LinkButton onClick={this.onDelete(id)}>删除</LinkButton>
      </div>
    );
  };
  registerTypeShow = (value) => {
    const bs = OrderRegisterType.toArray();
    const arr1 = [];
    for (var i = 0; i < value.length; i++) {
      if (isNaN(parseFloat(value[i]))) {
        arr1.push(value[i]);
      } else {
        const hi = bs[value[i] - 1].text;
        arr1.push(hi);
      }
    }
    return arr1.join(',');
  }
  tableRender = () => {
    return (
      <Table scroll={{x:1600}}>
        <Column dataIndex="branchName" width={150}>网点名称</Column>
        <Column dataIndex="branchAddress" width={200}>网点地址</Column>
        <Column dataIndex="reservePeriod" width={350}>办理时间段</Column>
        <Column dataIndex="registerTypeArr" render={this.registerTypeShow} width={450}>可办理业务</Column>
        <Column dataIndex="upperLimit" width={200}>上限人数</Column>
        <Column dataIndex="action" width={110} render={this.actionFieldsRender} fixed="right">操作</Column>
      </Table>
    )
  }
}

export default NetList;

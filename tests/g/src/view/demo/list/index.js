import React from "react";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Table from "mt-table";
import {
  LinkButton,
  SearchInput,
  SelectFromDict,
  SubDate,
  Button
} from "components";
import history from "utils/history";
const { PrimaryButton, DangerButton, BorderButton, NoBorderButton } = Button;
const { Column } = Table;

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class List extends ListPage {
  /** 页面右上角按钮 */
  topActionRender = () => {
    return (
      <>
        <PrimaryButton onClick={this.btnFn}>通过</PrimaryButton>
        <DangerButton onClick={this.btnFn}>驳回</DangerButton>
        <NoBorderButton activeType="done">无边框</NoBorderButton>
        <BorderButton activeType="done">有边框</BorderButton>
      </>
    );
  };
  btnFn = () => {
    history.push("/demo/child/add?id=xxx");
  };

  /** 筛选栏 */
  filterRender = () => {
    return (
      <>
        <SearchInput
          id="queryString"
          width={240}
          placeholder="请输入租赁双方姓名/证件号"
          onClick={this.doFormSubmit}
        />
        <SelectFromDict
          activeType="todo"
          id="registerType"
          placeholder="登记类型"
          width={200}
          dictKey="registerType"
          initialValue={undefined}
          onSelectChange={this.doFormSubmit}
        />
        <SubDate
          activeType="done"
          label="提交时间"
          id="dateInfo"
          colon={false}
        />
        {/* <Button unfield onClick={this.doFormSubmit}>
          Submit
        </Button> */}
      </>
    );
  };

  /** 筛选栏下方按钮 */
  otherActionRender = () => {
    return (
      <>
        <PrimaryButton>其他操作</PrimaryButton>
      </>
    );
  };

  actionRender = (value, item) => {
    let { id } = item;
    return < LinkButton to={`/demo/child/edit?id=${id}`} >编辑</LinkButton >
  }

  /** 数据表 */
  tableRender = () => {
    return (
      <Table scroll={{ x: 1300 }}>
        <Column dataIndex="orderNo" render={this.orderNoRender} width={400}>
          工单编号
        </Column>
        <Column dataIndex="registerTypeDesc">登记类别</Column>
        <Column dataIndex="address">不动产坐落</Column>
        <Column dataIndex="warrantNumbers">权证/证明号</Column>
        <Column dataIndex="obligors">义务人</Column>
        <Column dataIndex="obligees">权利人</Column>
        <Column dataIndex="followerName">申请人</Column>
        <Column dataIndex="companyName">申请人所属机构</Column>
        <Column dataIndex="submitTime">提交时间</Column>
        <Column dataIndex="statusDesc">状态</Column>
        <Column dataIndex="action" fixed="right" activeType="todo" render={this.actionRender}>
          操作
        </Column>
      </Table>
    );
  };
  orderNoRender = (value, item) => {
    const {
      userInfo: { isRoot },
      store: { activedTabKey }
    } = this.props;
    const { id } = item;
    if (isRoot === 2) {
      return (
        <LinkButton to={`/demo/child/detail?id=${id}`}>{value}</LinkButton>
      );
    } else {
      return (
        <LinkButton to={`/demo/child/detail?id=${id}`}>{value}</LinkButton>
      );
    }
  };
}

export default List;

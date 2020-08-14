
import React from "react";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Table from "mt-table";
import SearchInput from "components/searchInput";
import SelectFromDict from "components/selectFromDict";
import { LinkButton, SubDate } from "components";
const { Column } = Table;

@inject(stores => ({
  store: stores[moduleName],
}))
@observer
class WaterEleList extends ListPage {
  orderNoRender = (value, item) => {
    const { id } = item;
    return (
      <LinkButton to={`/utilities/waterele/detail?id=${id}&_t=detail`}>{value}</LinkButton>
    );
  };
  /** 筛选栏 */
  filterRender = () => {
    return (
      <>
        <SearchInput
          id="keyword"
          placeholder="请输入工单编号/不动产权证号/新户主姓名"
          onClick={this.doFormSubmit}
          width={250}
        />
        <SelectFromDict
          id="transferStatus"
          placeholder="状态"
          activeType="done"
          width={104}
          dictKey="transferStatus"
        />
        <SelectFromDict
          id="transferType"
          placeholder="过户类型"
          width={104}
          dictKey="transferType"
        />
        <SubDate
          label="提交时间"
          id="dateInfo"
          colon={false}
        />
      </>
    );
  };
  actionRender = (value, item) => {
    const { id } = item;
    return (
      <LinkButton to={`/utilities/waterele/detail?id=${id}`}>审核</LinkButton>
    );
  }
  tableRender = () => {
    return (
      <Table scroll={{ x: 1600 }}>
        <Column dataIndex="orderNo" render={this.orderNoRender} width={150} fixed="left">
          工单编号
        </Column>
        <Column dataIndex="warrantNumber" width={250}>不动产权证号</Column>
        <Column dataIndex="obligeeName" width={150}>权利人</Column>
        <Column dataIndex="transferType" width={150}>过户类型</Column>
        <Column dataIndex="account" width={150}>账户</Column>
        <Column dataIndex="newHouseholderName" width={150}>新户主姓名</Column>
        <Column dataIndex="transferStatus" width={150}>状态</Column>
        <Column dataIndex="agent" width={150}>经办人</Column>
        <Column dataIndex="createTime" width={150}>提交时间</Column>
        <Column dataIndex="action" width={150} render={this.actionRender} activeType="todo" fixed="right">操作</Column>
      </Table>
    );
  };
}

export default WaterEleList;

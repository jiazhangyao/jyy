import React from "react";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import Table from "mt-table";
import { Button } from "antd";
import { LinkButton, SearchInput, SelectFromDict, SubDate } from "components";
import history from "utils/history";

import { moduleName } from "./store";
import "./style.less"
const { Column } = Table;

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class StatisticList extends ListPage {
  /** 筛选栏 */
  filterRender = () => {
    return (
      <>
        <SearchInput
          id="queryString"
          width={250}
          placeholder="请输入工单编号/申请人/申请人所属机构/不动产坐落/权证/证明号"
          onClick={this.doFormSubmit}
        />
        <SelectFromDict
          id="registerType"
          placeholder="登记类型"
          width={104}
          dictKey="registerType"
          initialValue={undefined}
        />
        <SelectFromDict
          width={104}
          id="status"
          placeholder="工单状态"
          dictKey="orderStatus"
          initialValue={undefined}
        />
        <SubDate
          label="提交时间"
          id="dateInfo"
          colon={false}
        />
      </>
    );
  }

  /** 列表 */
  tableRender = () => {
    return (
      <Table scroll={{ x: 1400 }}>
        <Column dataIndex="orderNo" render={this.renderOrderNo} width={150} fixed="left">工单编号</Column>
        <Column dataIndex="registerTypeDesc" width={150}>登记类别</Column>
        <Column dataIndex="address" width={200}>不动产坐落</Column>
        <Column dataIndex="warrantNumbers" width={200}>权证/证明号</Column>
        <Column dataIndex="obligors" width={100}>义务人</Column>
        <Column dataIndex="obligees" width={100}>权利人</Column>
        <Column dataIndex="followerName" width={100}>申请人</Column>
        <Column dataIndex="companyName" width={150}>申请人所属机构</Column>
        <Column dataIndex="submitTime" width={150}>提交时间</Column>
        <Column dataIndex="statusDesc" width={100}>状态</Column>
      </Table>
    );
  }
  renderOrderNo = (value, item) => {
    return <LinkButton to={`/order/statistic/detail?id=${item.id}&from=statistic`}>{value}</LinkButton>
  }
}

export default StatisticList;

import React from "react";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Table from "mt-table";
import { LinkButton, SearchInput, SelectFromDict, SubDate } from "components";
import dynamicConst from "common/dynamicConst";
import { OrderRegisterType, FlagStatuses } from "common/enum";

const { Column } = Table;


@inject(store => ({
  store: store[moduleName],
  userInfo: store.frame.userInfo
}))
@observer
class OrderList extends ListPage {
  orderNoRender = (value, item) => {
    const { orderId } = item;
    return (
      <LinkButton to={`/reserve/order/detail?id=${orderId}`}>{value}</LinkButton>
    )
  }
  /** 筛选栏 */
  filterRender = () => {
    let flagStatusList = {
      '1': '已预约',
      '2': '已取消',
    }


    return (
      <>
        <SearchInput
          id="queryString"
          placeholder="请输入工单编号/不动产坐落/权证/证明号"
          width={250}
          onClick={this.doFormSubmit}
        />
        <SelectFromDict
          id="registerType"
          placeholder="登记类型"
          width={104}
          dictKey="registerType"
        />
        <SubDate
          label="预约日期"
          id="dateInfo"
          colon={false}
        />
        <SelectFromDict
          id="timePeriod"
          placeholder="预约时间段"
          width={104}
          dictKey="timePeriod"
        />
        <SelectFromDict
          id="flag"
          placeholder="预约状态"
          width={104}
          dictKey="flag"
          options={flagStatusList}
        />
      </>
    );
  };
  tableRender = () => {
    return (
      <Table scroll={{ x: 1600 }}>
        <Column dataIndex="orderNo" render={this.orderNoRender} width={130} fixed="left">工单编号</Column>
        <Column dataIndex="registerType" render={value => OrderRegisterType.getTextFromValue(value)} width={90}>登记类别</Column>
        <Column dataIndex="address" width={120}>不动产坐落</Column>
        <Column dataIndex="warrantNumber" width={130}>权证/证明号</Column>
        <Column dataIndex="userName" width={80}>申请人</Column>
        <Column dataIndex="cardNo" width={140}>申请人身份证号</Column>
        <Column dataIndex="mobile" width={130}>申请人手机号</Column>
        <Column dataIndex="branchName" width={100}>预约网点</Column>
        <Column dataIndex="timePeriod" width={120}>预约时间段</Column>
        <Column dataIndex="reserveDate" width={80}>预约日期</Column>
        <Column dataIndex="flag" render={value => FlagStatuses.getTextFromValue(value)} width={100}>预约状态</Column>

      </Table>
    )
  }

}

export default OrderList;


import React from "react";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Table from "mt-table";
import SearchInput from "components/searchInput";
import SelectFromDict from "components/selectFromDict";
import { LinkButton, SubDate } from "components";
import "./style.less";
const { Column } = Table;

@inject(stores => ({
  store: stores[moduleName],
}))
@observer
class SeizeList extends ListPage {
  orderNoRender = (value, item) => {
    const { id, registerType } = item;
    return (
      registerType === 9900 ? 
      <span>{value}</span> : 
      <LinkButton to={`/seize/register/detail?id=${id}&fn=ck`}>{value}</LinkButton>
    );
  };
  /** 筛选栏 */
  filterRender = () => {
    return (
      <>
        <SearchInput
          id="queryString"
          placeholder="工单号/权利人/不动产权证号"
          onClick={this.doFormSubmit}
          width={250}
        />
        <SelectFromDict
          id="registerType"
          placeholder="登记类型"
          width={104}
          dictKey="sealResgisterOrderStatus"
        />
        <SelectFromDict
          id="status"
          placeholder="工单状态"
          activeType="done"
          width={104}
          dictKey="sealEndOrderStatus"
        />
        <SelectFromDict
          id="status"
          placeholder="工单状态"
          activeType="todo"
          width={104}
          dictKey="sealOrderStatus"
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
    const {id, status, registerType} = item;
    if (registerType === 107) {
      return (
        <span>-</span>
      )
    }
    else {
      if (status === 10) {
        return (
          <>
            <LinkButton className="sp-opt" to={`/seize/register/detail?id=${id}&fn=sp`}>审批</LinkButton>
          </>
        );
      }
      else {
        return (
          <>--</>
        )
      }

      // if (status === 10) {
      //   return (
      //     <>
      //       <LinkButton className="sp-opt" to={`/seize/register/detail?id=${id}&fn=sp`}>审批</LinkButton>
      //       <LinkButton to={`/seize/register/detail?id=${id}&fn=ck`}>查看</LinkButton>
      //     </>
      //   );
      // }
      // else {
      //   return (
      //     <LinkButton to={`/seize/register/detail?id=${id}&fn=ck`}>查看</LinkButton>
      //   )
      // }
    }
  }
  lastDayRender = (value, item) => {
    const { lastDay } = item;
    return (
      <span className={(lastDay < 16 && lastDay > -1) ? 'red' : ''}>{lastDay < 0 ? '已过期' : lastDay}</span>
    );
  }
  statusRender = (value, item) => {
    const {status, statusDesc} = item;
    const bool = (status === 20) || (status === 25) || (status === 31);
    return(
      <span className={bool ? 'red' : ''}>{statusDesc}</span>
    )
  }
  tableRender = () => {
    return (
      <Table scroll={{ x: 1600 }}>
        <Column dataIndex="orderNo" render={this.orderNoRender} width={150} fixed="left">
          工单编号
        </Column>
        <Column dataIndex="registerTypeDesc" width={250}>登记类型</Column>
        <Column dataIndex="address" width={250}>不动产坐落</Column>
        <Column dataIndex="warrantNumbers" width={250}>不动产权证号</Column>
        <Column dataIndex="companyName" width={250}>申请机构</Column>
        <Column dataIndex="obligees" width={150}>权利人</Column>
        <Column dataIndex="sealTime" width={150}>查封期限</Column>
        <Column dataIndex="submitTime" width={150}>提交时间</Column>
        <Column dataIndex="statusDesc" width={130} render={this.statusRender}>工单状态</Column>
        <Column dataIndex="lastDay" width={190} activeType="done" render={this.lastDayRender}>查封剩余有效期</Column>
        <Column dataIndex="action" width={110} render={this.actionRender} fixed="right">操作</Column>
      </Table>
    );
  };
}

export default SeizeList;

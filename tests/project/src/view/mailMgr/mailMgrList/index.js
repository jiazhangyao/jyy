import React from "react";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Table from "mt-table";
import SelectFromDict from "components/selectFromDict";
import SearchInput from "components/searchInput";
import { LinkButton } from "components";
import MailModel from "./components/mailModal"
const { Column } = Table;

@inject(stores => ({
  store: stores[moduleName],
}))
@observer
class MailMgrList extends ListPage {
  orderNoRender = (value, item) => {
    const { orderId } = item;
    return (
      <LinkButton to={`/mail/mailmgr/detail?id=${orderId}&from=mail`}>{value}</LinkButton>
    );
  };


  /** 筛选栏 */
  filterRender = () => {
    return (
      <>
        <SearchInput
          id="queryString"
          placeholder="请输入工单号/权证号/义务人/权利人"
          onClick={this.doFormSubmit}
          width={350}
        />
        <SelectFromDict
          id="registerType"
          placeholder="登记类别"
          width={104}
          dictKey="mailRegisterType"
        />
      </>
    );
  };

  actionRender = (value, item) => {
    const { id } = item;
    return (
      <div key={id}>
        <MailModel id={id} />
      </div>
    );
  }
  tableRender = () => {
    return (
      <Table scroll={{ x: 1500 }}>
        <Column dataIndex="orderNo" render={this.orderNoRender} width={200} fixed="left">
          工单编号
        </Column>
        <Column dataIndex="registerTypeDsc" width={250}>登记类别</Column>
        <Column dataIndex="warrantNumbers" width={200}>权证/证明号</Column>
        <Column dataIndex="obligors" width={200}>义务人</Column>
        <Column dataIndex="obligees" width={200}>权利人</Column>
        {/* <Column dataIndex="statusDsc" width={200}>状态</Column> */}
        <Column dataIndex="action" width={250} render={this.actionRender}>操作</Column>
      </Table>
    );
  };
}

export default MailMgrList;

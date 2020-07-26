import React from "react";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Table from "mt-table";
import { LinkButton, SearchInput, SelectFromDict, SubDate } from "components";
import moment from 'moment';

const { Column } = Table;

@inject(store => ({
  store: store[moduleName],
  userInfo: store.frame.userInfo
}))
@observer
class OrderList extends ListPage {
  /** 筛选栏 */
  filterRender = () => {
    const { store: { companyList } } = this.props;
    let companyOptions = {};
    companyList.map(item => {
      companyOptions[item.companyId] = item.companyName;
    }
    );
    return (
      <>
        <SearchInput
          id="key"
          width={350}
          placeholder="请输入申请人姓名/申请人身份证号/申请人手机号"
          onClick={this.doFormSubmit}
        />
        {/*<SelectFromDict
          id="companyId"
          placeholder="所属机构"
          width={104}
          dictKey="companyId"
          options={companyOptions}
        />
        <SubDate
          label="提交时间"
          id="dateInfo"
          colon={false}
        />*/}
      </>
    );
  };
  userNameFieldsRender = (value, item) => {
    const { id } = item;
    return (
      <span>
        <LinkButton to={`/inforeview/identity/detail?id=${id}`}>{value || '-'}</LinkButton>
      </span>
    );
  };
  dealTimeStamp = (time) => {
    return <span>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</span>
  }
  actionFieldsRender = (value, item) => {
    const { id } = item;
    return (
      <span className="single-action">
        <LinkButton to={`/inforeview/identity/detail?id=${id}`}>审核</LinkButton>
      </span>
    );
  };
  tableRender = () => {
    const { store: { activedTabKey } } = this.props;
    return (
      <Table scroll={{ x: 1400 }}>
        <Column dataIndex="baseAccount.name" render={this.userNameFieldsRender} width={activedTabKey === 'todo' ?220:270} fixed="left">申诉人姓名</Column>
        <Column dataIndex="baseAccount.identity" width={activedTabKey === 'todo' ?270:320}>申诉人身份证号</Column>
        <Column dataIndex="baseAccount.mobile" width={activedTabKey === 'todo' ?220:270}>申诉人手机号</Column>
        <Column dataIndex="applyTime" render={this.dealTimeStamp} width={270}>申诉人提交时间</Column>
        <Column dataIndex="baseAccount.sourceTypeDesc" width={270}>所属机构</Column>
        {activedTabKey === "todo" ?
          <Column dataIndex="action" render={this.actionFieldsRender} width={200}>操作</Column>
          : null
        }
      </Table>
    )
  }

}

export default OrderList;

import React, { Component } from "react";
import { Route } from "components";

import AuditList from "./auditList";
import AuditDetail from "./auditDetail";
import MortgageDetail from "./mortgageDetail";
import TransferDetail from "./transferDetail";
import StatusInfoDetail from "./statusInfoDetail";
import SetInfoDetail from "./setInfoDetail";
import TaxInfoDetail from "./taxInfoDetail";

import StatisticList from "./statisticList";

import { withRouter } from "react-router";

@withRouter
class OrderMgr extends Component {
  render() {
    const { match } = this.props;
    return (
      <>
        {/** 工单审核 */ }
        <Route path={ `${match.path}/audit/list` } component={ AuditList } />
        {/** 查封详情 */ }
        <Route path={`${match.path}/audit/detail`} component={AuditDetail}/> 
        {/** 抵押详情 */ }
        <Route path={`${match.path}/mortgage/detail`} component={MortgageDetail}/> 
        {/** 转移详情 */ }
        <Route path={ `${match.path}/transfer/detail` } component={ TransferDetail } />
        {/** 现状信息 */ }
        <Route path={ `${match.path}/audit/statusInfoDetail` } component={ StatusInfoDetail } />
        {/** 税费信息 */ }
        <Route path={ `${match.path}/audit/taxInfoDetail` } component={ TaxInfoDetail } />
        {/** 套次信息 */ }
        <Route path={ `${match.path}/audit/setInfoDetail` } component={ SetInfoDetail } />

        {/** 业务统计 */ }
        <Route path={ `${match.path}/statistic/list` } component={ StatisticList } />
        <Route path={ `${match.path}/statistic/detail` } component={ AuditDetail } />
      </>
    );
  }
}

export default OrderMgr;

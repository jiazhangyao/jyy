import React, { Component } from "react";
import { Route } from "components";
import MailMgrList from "./mailMgrList";
import AuditDetail from "../orderMgr/auditDetail";
import { withRouter } from "react-router";

@withRouter
class MailMgr extends Component {
  render() {
    const { match, routes } = this.props;
    return (
      <>
        <Route path={`${match.path}/mailmgr/list`} component={MailMgrList} />
        <Route path="/mail/mailmgr/detail" component={AuditDetail}/>
      </>
    );
  }
}

export default MailMgr;

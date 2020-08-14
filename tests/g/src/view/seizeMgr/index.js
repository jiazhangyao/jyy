import React, { Component } from "react";
import { Route } from "components";
import SeizeList from "./seizeList";
import SeizeDetail from "./seizeDetail";
import { withRouter } from "react-router";

@withRouter
class SeizeMgr extends Component {
  render() {
    const { match, routes } = this.props;
    return (
      <>
        {/* 查封登记列表 */}
        <Route path={`${match.path}/register/list`} component={SeizeList} />

        {/* 查封登记详情 */}
        <Route path={`${match.path}/register/detail`} component={SeizeDetail} />
      </>
    );
  }
}

export default SeizeMgr;

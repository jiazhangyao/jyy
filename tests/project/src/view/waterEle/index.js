import React, { Component } from "react";
import { Route } from "components";
import WaterEleList from "./waterEleList";
import WaterEleDetail from "./waterEleDetail";
import { withRouter } from "react-router";

@withRouter
class WaterEleMgr extends Component {
  render() {
    const { match, routes } = this.props;
    return (
      <>
        <Route path={`${match.path}/waterele/list`} component={WaterEleList} />
        <Route path={`${match.path}/waterele/detail`} component={WaterEleDetail} />
      </>
    );
  }
}

export default WaterEleMgr;

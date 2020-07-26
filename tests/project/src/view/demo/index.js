import React, { Component } from "react";
import { Route } from "components";
import List from "./list";
import Detail from "./detail";
import Edit from "./edit";
import { withRouter } from "react-router";

@withRouter
class Demo extends Component {
  render() {
    const { match, routes } = this.props;
    return (
      <>
        <Route path={`${match.path}/child/list`} component={List} />
        <Route path={`${match.path}/child/detail`} component={Detail} />
        <Route path={`${match.path}/child/add`} component={Edit} />
        <Route path={`${match.path}/child/edit`} component={Edit} page="edit" />
      </>
    );
  }
}

export default Demo;

import React, { Component } from "react";
import { Route } from "components";
import busGuideList from "./busGuide/list";
import busGuideDetail from "./busGuide/detail";
import busGuideEdit from "./busGuide/edit";
import applyList from "./applyList/index";
import { withRouter } from "react-router";

@withRouter
class Guide extends Component {
  render() {
    const { match, routes } = this.props;
    return (
      <>
        <Route path={`${match.path}/busguide/list`} component={busGuideList} />
        <Route path={`${match.path}/busguide/detail`} component={busGuideDetail} />
        <Route path={`${match.path}/busguide/add`} component={busGuideEdit} />
        <Route path={`${match.path}/busguide/edit`} component={busGuideEdit} page="edit" />
        <Route path={`${match.path}/apply/list`} component={applyList} />
      </>
    );
  }
}

export default Guide;

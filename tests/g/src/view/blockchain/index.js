import React, { Component } from "react";
import { Route } from "components";
import BlockQuestion from './question';
import SearchList from "./searchList";
import SearchDetail from "./searchDetail"
import Preview from "./preview"
import { withRouter } from "react-router";

@withRouter
class BlockQuestionDe extends Component {
  render() {
    const { match, routes } = this.props;
    return (
      <>
        <Route path={`${match.path}/qa/list`} component={BlockQuestion} />
        {/*链上信息查询*/}
        <Route path={`${match.path}/infosearch/list`} component={SearchList} />
        <Route path={`${match.path}/infosearch/detail`} component={SearchDetail} />
        {/*Q&A*/}
        <Route path={`${match.path}/preview/list`} component={Preview} />
      </>
    );
  }
}

export default BlockQuestionDe;

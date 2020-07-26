/**
 * Created by EX-GEQIANG001 on 2019/1/17.
 */
import React, { Component } from "react";
import { Route } from "components";
import QueryList from "./queryList";
import QueryDetail from "./queryDetail";
import ExamineList from "./examineList";
import ExamineDetail from "./examineDetail";
import { withRouter } from "react-router";

@withRouter
class institution extends Component {
    render() {
        const { match, routes } = this.props;
        return (
            <>
            <Route path={`${match.path}/query/list`} component={QueryList} />
            <Route path={`${match.path}/query/detail`} component={QueryDetail} />
            <Route path={`${match.path}/examine/list`} component={ExamineList} />
            <Route path={`${match.path}/examine/detail`} component={ExamineDetail} />
            </>
        );
    }
}

export default institution;

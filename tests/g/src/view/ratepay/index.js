/**
 * Created by EX-GEQIANG001 on 2019/1/17.
 */
import React, { Component } from "react";
import { Route } from "components";
import RatepayList from "./ratepayList";
import RatepayDetail from "./ratepayDetail";
import { withRouter } from "react-router";

@withRouter
class ratepay extends Component {
    render() {
        const { match, routes } = this.props;
        return (
            <>
            <Route path={`${match.path}/view/list`} component={RatepayList} />
            <Route path={`${match.path}/view/detail`} component={RatepayDetail} />
            </>
        );
    }
}

export default ratepay;

import React from 'react'
import { Route } from "components";
import RegDemo from "./demo"
import { withRouter } from "react-router";

@withRouter
class FirstReg extends React.Component {
    render() {
    const { match, routes } = this.props;
    // console.log(match)
        return(
            <>
                <Route path={`${match.path}/demo`} component={RegDemo} />
            </>
        )
    }
}
export default FirstReg
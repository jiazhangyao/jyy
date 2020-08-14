import React,{ Component } from 'react';
import { Route } from 'components';
import { withRouter } from 'react-router';
import IdentityList from './identityList/index';
import IdentityDetail from './identityDetail/index';
@withRouter
class ReserveManage extends Component{
  render(){
    const { match } = this.props;
    return (
      <>
        <Route path={`${match.path}/identity/list`} component={IdentityList}/>
        <Route path={`${match.path}/identity/detail`} component={IdentityDetail}/>
      </>
    )
  }
}
export default ReserveManage;



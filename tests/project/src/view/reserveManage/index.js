import React,{ Component } from 'react';
import { Route } from 'components';
import { withRouter } from 'react-router';
import OrderList from './orderList';
import OrderDetail from './orderDetail';
import NetList from './netList';
import NetEdit from './netEdit';
import StatusDetail from './statusDetail';
import TaxDetail from './taxDetail';
@withRouter
class ReserveManage extends Component{
  render(){
    const { match } = this.props;
    return (
      <>
        <Route path={`${match.path}/order/list`} component={OrderList}/>
        <Route path={`${match.path}/order/detail`} component={OrderDetail}/>
        <Route path={`${match.path}/net/list`} component={NetList}/>
        <Route path={`${match.path}/net/edit`} component={NetEdit} page="edit"/>
        <Route path={`${match.path}/net/add`} component={NetEdit}/>
        <Route path={`${match.path}/order/statusdetail`} component={StatusDetail}/>
        <Route path={`${match.path}/order/taxdetail`} component={TaxDetail}/>
      </>
    )
  }
}
export default ReserveManage;



import React from 'react'
import { Menu } from 'antd';
import ChangePwd from '../forms/changePwd'
import AccountLists from '../forms/accountList'
import CreateAccount from '../forms/createAccount'

import './style.scss'

export default class Sider extends React.Component {
  state = {
    adjustNum : 'lists'
  };

  myAccount = () => {
    this.setState({
      adjustNum: 'lists'
    })
  }

  changePwd = () => {
    this.setState({
      adjustNum: 'change'
    })
  }

  changePage = opt => {
    console.log('opt', opt);
    this.setState({
      adjustNum: opt
    })
  }

  render() {
    const { adjustNum } = this.state;
    return (
      <section style={{width: '80%', marginLeft: '10%', paddingTop: '10%'}}>
        <article className="account-panel" style={{width: '15%', background: '#fff', padding: "20px 20px 10px"}}>
          <ul>
            <li style={{fontSize: 18}}>账号管理</li>
            <li style={{marginTop: 10}} onClick={this.myAccount}>我的账号</li>
          </ul>
          <ul>
            <li style={{fontSize: 18}}>安全中心</li>
            <li style={{marginTop: 10}} onClick={this.changePwd}>修改密码</li>
          </ul>
        </article>
        <section style={{width: '80%', float: 'right', marginTop: '-178px'}}>
          {
            adjustNum === 'lists' ? <AccountLists changePages={this.changePage} /> : adjustNum === 'create' ? <CreateAccount changePages={this.changePage}/> : <ChangePwd />
          }
        </section>
      </section>
    );
  }
}

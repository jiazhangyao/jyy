import React from "react";
import {Router} from "react-router-dom";
import {Provider} from "mobx-react";
import {Route} from "components";
import appHistory from "utils/history";

import Home from "view/home";
import Logon from "view/logon";
import OrderMgr from "view/orderMgr";
import SeizeMgr from "view/seizeMgr";
import WaterEle from "view/waterEle";
import Guide from "view/guide";
import Ratepay from "view/ratepay";
import Institution from "view/institution";
import AccountMgr from "view/accountMgr";
import MailMgr from "view/mailMgr";
import Frame from "view/frame";
import ReserveManage from "view/reserveManage";
import InfoReview from "view/infoReview";
import BlockChain from "view/blockchain";
import Demo from "view/demo";
import FirstReg from "view/firstReg";


export default function (store, history) {
  return (
    <Provider {...store}>
      <Router history={history}>
        <>
          <Route exact path="/" render={() => appHistory.goHome()}/>
          {/** 登录 */}
          <Route path="/logon" component={Logon}/>

          {/** 首页 */}
          <Route parent={Frame} path="/home" component={Home}/>

          {/** 工单管理 */}
          <Route parent={Frame} path="/order" component={OrderMgr}/>

          {/** 查封登记管理 */}
          <Route parent={Frame} path="/seize" component={SeizeMgr}/>

          {/** 预约管理 */}
          <Route parent={Frame} path="/reserve" component={ReserveManage}/>

          {/** 水电气 */}
          <Route parent={Frame} path="/utilities" component={WaterEle}/>

          {/** 办事指南 */}
          <Route parent={Frame} path="/guide" component={Guide}/>

          {/** 账户管理 */}
          <Route parent={Frame} path="/account" component={AccountMgr}/>

          {/** 邮寄信息 */}
          <Route parent={Frame} path="/mail" component={MailMgr}/>

          {/** 纳税管理 */}
          <Route parent={Frame} path="/ratepay" component={Ratepay}/>

          {/** 机构管理 */}
          <Route parent={Frame} path="/institution" component={Institution}/>

          {/** 信息审核 */}
          <Route parent={Frame} path="/inforeview" component={InfoReview}/>

          {/** 区块链 */}
          <Route parent={Frame} path="/blockchain" component={BlockChain}/>
            
          {/** 保留list demo */}
          <Route parent={Frame} path="/demo" component={Demo}/>
          {/* 首次登记 */}
          <Route parent={Frame} path="/firstreg" component={FirstReg}/>
        </>
      </Router>
    </Provider>
  );
}

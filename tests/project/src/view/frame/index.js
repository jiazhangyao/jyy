import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Header from "./components/header";
import SideMenu from "./components/sideMenu";
import MoatLayout from "mt-layout";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

import "./index.less";

const {
  Header: MoatHeader,
  Content: MoatContent,
  SideMenu: MoatSideMenu
} = MoatLayout;

@inject(stores => ({ store: stores[moduleName] }))
@observer
class Frame extends Component {
  componentDidMount() {
    const { store } = this.props;
    if (!store.userInfo) {
      store.init();
    }
    return null;
  }

  onLogoutClick = () => {
    const { store } = this.props;
    store.logout();
  };

  render() {
    // console.log('❤frame.props', this.props)
    const { children, store } = this.props;
    const {
      sideMenusArr,
      newSideMenuArr,
      moduleInfo: { TRADING_GM_NAME }
    } = store;

    if (store.userInfo) {
      return (
        <LocaleProvider locale={zh_CN}>
          {/* <ConfigProvider autoInsertSpaceInButton={false}> */}
          <MoatLayout className="app-inner">
            <MoatHeader>
              <Header
                logo={require("./logo.png")}
                title={TRADING_GM_NAME}
                userInfo={
                  <span>
                    {/*{store.userInfo.roleName + " " + store.userInfo.userName}*/}
                    {store.userInfo.userName}
                  </span>
                }
                onLogoutClick={this.onLogoutClick}
              />
            </MoatHeader>
            <MoatSideMenu>
              <SideMenu sideMenusArr={newSideMenuArr} />
            </MoatSideMenu>
            <MoatContent>
              <div className="app-content-contaner">{children}</div>
            </MoatContent>
          </MoatLayout>
          {/* </ConfigProvider> */}
        </LocaleProvider>
      );
    } else {
      return <div>Loading ...</div>;
    }
  }
}

export default Frame;

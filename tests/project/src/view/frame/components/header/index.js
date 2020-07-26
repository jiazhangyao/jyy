import React, { Component } from "react";
// import MoatHeader from "../moatLayout/header";
import T from "prop-types";
import "./style.less";

class AppHeader extends Component {
  static defaultProps = {
    isshow: true,
    logoutPage: () => {},
    prefixCls: "header-klass",
    userInfo: {}
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  onLogoutClick = () => {
    const { onLogoutClick } = this.props;
    if (onLogoutClick) {
      onLogoutClick();
    }
  };
  getCssHeight = () => {
    let { height } = this.props;
    let cssHeight = "100%";
    if (!height) {
      return cssHeight;
    }
    if (height) {
      height += "";
      if (height.lastIndexOf("px") !== height.length - 2) {
        cssHeight = height + "px";
      } else {
        cssHeight = height;
      }
    }
    return cssHeight;
  };
  render() {
    const { prefixCls, title, logo, userInfo } = this.props;
    let height = this.getCssHeight();
    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}-logo`}>
          <img src={logo} alt={title} />
        </div>
        <div
          className={`${prefixCls}-title`}
          style={{ height, lineHeight: height }}
        >
          {title}
        </div>
        <div
          className={`${prefixCls}-user`}
          style={{ height, lineHeight: height }}
        >
          <span className={`${prefixCls}-user-info`}>{userInfo}</span>
          <button
            className={`${prefixCls}-user-logout`}
            onClick={this.onLogoutClick}
          >
            退出
          </button>
        </div>
      </div>
    );
  }
}

AppHeader.propTypes = {
  prefixCls: T.string,
  title: T.string,
  userInfo: T.object,
  onLoginClick: T.func,
  onOutClick: T.func,
  isShow: T.bool,
  logo: T.string.isRequired
};
export default AppHeader;

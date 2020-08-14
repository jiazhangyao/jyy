import React, { Component } from "react";
import T from "prop-types";
import history from "utils/history";
import { Menu } from "antd";
import "./style.less";
const { SubMenu } = Menu;

class SideMenu extends Component {
  static defaultProps = {
    prefixCls: "side-menu-klass"
  };

  constructor(props) {
    super(props);
    this.state = {
      pathname: "", // URL
      openKey: [], // 当前处于展开状态的大模块
      selectedKey: [] // 当前处于选中状态的子模块
    };
  }

  componentWillMount() {
    this.updateSelectedKey();
  }

  componentWillUpdate() {
    if (window.location.pathname !== this.state.pathname) {
      this.updateSelectedKey();
    }
  }

  updateSelectedKey() {
    let pathArr = window.location.pathname.split("/");

    let concatStr = pathArr[2];
    if (pathArr.length > 3) {
      concatStr += pathArr[3].substr(0, 1).toUpperCase() + pathArr[3].substr(1);
    }

    this.setState({
      pathname: window.location.pathname,
      openKey: [pathArr[2]],
      selectedKey: [concatStr]
    });
  }

  createSubMenu = obj => {
    if (obj.children && obj.children.length) {
      return (
        <SubMenu
          key={obj.key}
          title={
            <span>
              <i className={`icon iconfont ${obj.icon}`} />
              {obj.name}
            </span>
          }
        >
          {obj.children.map(cur => (
            <Menu.Item key={cur.key}>
              <div
                className="ant-menu-title"
                onClick={() => history.push(`${cur.path}`)}
              >
                <span className="nav-text">{cur.name}</span>
              </div>
            </Menu.Item>
          ))}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={obj.key}>
          <div
            className="ant-menu-item-alone"
            onClick={() => history.push(`${obj.path}`)}
          >
            <i className={`icon iconfont ${obj.icon}`} />
            <span className="nav-text">{obj.name}</span>
          </div>
        </Menu.Item>
      );
    }
  };

  onOpenChange = openKeys => {
    this.setState({
      openKey: openKeys.length ? [openKeys[openKeys.length - 1]] : []
    });
  };

  render() {
    const {
      prefixCls,
      sideMenusArr,
      title,
      logo,
      children,
      userInfo
    } = this.props;

    return (
      <div className={prefixCls}>
        <Menu
          mode="inline"
          openKeys={this.state.openKey}
          selectedKeys={this.state.selectedKey}
          onOpenChange={this.onOpenChange}
          style={{ height: "100%", borderRight: 0 }}
        >
          {sideMenusArr.map(obj => this.createSubMenu(obj))}
        </Menu>
      </div>
    );
  }
}

SideMenu.propTypes = {
  prefixCls: T.string
};

export default SideMenu;

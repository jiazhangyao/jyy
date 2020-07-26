import React from "react";
import queryString from "query-string";
import { Icon, BreadCrumbRow } from "components";
import BasePage from "../base";
import { Tabs } from "antd";
import "./style.less";
const { TabPane } = Tabs;

class DetailPage extends BasePage {
  pageClassName = "detail-page";
  componentWillMount() {
    const { store, location } = this.props;
    if (store && store.init) {
      let params = {};
      if (location && location.search) {
        params = queryString.parse(location.search);
      }
      store.init(params);
    }
  }
  onTabChange = key => {
    const { store } = this.props;
    if (store && store.tabChange) {
      store.tabChange(key);
    }
  };
  tabsRender = () => {
    const {
      store: { tabList = [] }
    } = this.props;

    if (tabList.length > 1) {
      return (
        <Tabs
          defaultActiveKey={tabList[0].key}
          onChange={this.onTabChange}
          animated={false}
          className="list-tabs"
        >
          {tabList.map(({ name, key }) => (
            <TabPane tab={name} key={key} />
          ))}
        </Tabs>
      );
    }
  };

  render() {
    const {
      store: { crumbList, activedTabKey }
    } = this.props;

    return (
      <div className={this.pageClassName}>
        <BreadCrumbRow
          crumbList={crumbList}
          topActionRender={this.topActionRender}
          activedTabKey={activedTabKey}
        />

        <div className={`${this.pageClassName}-tab`}>{this.tabsRender()}</div>
        <div className={`${this.pageClassName}-body`}>{this.doRender()}</div>
      </div>
    );
  }
}

export default DetailPage;

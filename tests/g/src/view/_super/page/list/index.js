import React, { Children } from "react";
import queryString from "query-string";
import { Icon, BreadCrumbRow, ListResultStatus } from "components";
import BasePage from "../base";
import { Tabs, Button } from "antd";
import Table from "mt-table";
import { ListSearchForm } from "mt-rc-form";
import PageBreadcrumb from "mt-breadcrumb";
import "./style.less";

const { TabPane } = Tabs;
const baseClass = "list-page";

const autoBindFns = [
  "tabsRender",
  "topActionRender",
  "filterRender",
  "otherActionRender",
  "tableRender",
  "filterRenderHook",
  "otherActionRenderHook",
  "tableRenderHook",
  "footerRenderHook",
  "footerRender"
];

class ListPage extends BasePage {
  constructor(...args) {
    super(...args);
    autoBindFns.forEach(fn => {
      if (this[fn]) {
        this[fn] = this[fn].bind(this);
      }
    });
  }

  pageClassName = "";

  componentDidMount() {
    const { store, location } = this.props;
    if (store && store.init) {
      let params = {};
      if (location && location.search) {
        params = queryString.parse(location.search);
      }
      store.init(params);
    }
  }

  submit = values => {
    const { store } = this.props;
    let params = {
      pageNo: 1, // 默认在第一页，搜索的时候需要
      ...values
    }

    if (store && store.submit) {
      store.submit(params);
    }
  };

  doFormSubmit = () => {
    this.listSearchForm.onSubmit();
  };

  clearHandler = params => {
    const { store } = this.props;
    // page
    this.listSearchForm.props.form.resetFields();

    // store data
    if (store.clear) {
      store.clear();
    }
  };

  onTabChange = key => {
    const { store } = this.props;
    // page
    this.listSearchForm.props.form.resetFields();

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
          defaultActiveKey={ tabList[0].key }
          onChange={ this.onTabChange }
          animated={ false }
          className="list-tabs"
        >
          { tabList.map(({ name, key }) => (
            <TabPane tab={ name } key={ key } />
          )) }
        </Tabs>
      );
    }
  };

  tableRenderHook = () => {
    const tableNode = this.tableRender();
    let columns = null;
    let props = {};
    Children.forEach(tableNode, (child, index) => {
      if (index > 0) {
        return;
      }
      if (child.type !== Table) {
        throw new Error("tableRender 方法必须采用mt-table包裹");
      }
      const { children, ...rest } = child.props;
      props = rest;
      columns = children;
    });

    let tableProps = this.getTableProps(props);
    return tableProps.dataSource.length ? (
      <Table { ...tableProps }> { columns }</Table>
    ) : (
        <ListResultStatus list={ tableProps.dataSource } />
      );
  };

  footerRenderHook = () => {
    if (this.footerRender) {
      return this.footerRender();
    }
  };

  getPagination = () => {
    const {
      store: { entity, data }
    } = this.props;
    const partialParams = entity;
    return {
      showSizeChanger: true,
      pageSize: entity.pageSize,
      total: data.total || 0,
      current: entity.pageNo,
      onChange: pageNo => {
        const params = {
          ...partialParams,
          pageNo
        };
        this.submit(params);
      },
      onShowSizeChange: (current, pageSize) => {
        const params = {
          ...partialParams,
          pageSize,
          pageNo: 1
        };
        this.submit(params);
      },
      showTotal(total, range) {
        return (<span>当前页第{ range[0] }-{ range[1] }条， 共{ total }条 <span style={ { marginLeft: '20px' } }>每页显示：</span></span>);
      }
    };
  };

  getTableProps = tableProps => {
    const {
      store: { data, activedTabKey }
    } = this.props;
    const result = {
      ...tableProps,
      dataSource: data.list.toJS(),
      rowKey: this.tableRowKey || "id",
      pagination: this.noPagination ? false : this.getPagination(),
      // rowSelection: this.needBatch ? rowSelection : null,
      rowClassName: "rowClassName"
    };
    if (activedTabKey) {
      result.currentType = activedTabKey;
    }
    return result;
  };

  clearButton = () => {
    return (
      <Button
        unfield
        size={ "default" }
        className={ `button-reset` }
        onClick={ this.clearHandler }
      >
        重置
      </Button>
    );
  };

  onSearchFieldsChange = (targetField, allFields) => {
    const keys = Object.keys(targetField);
    if (!keys.length) {
      return;
    }
    const target = targetField[keys[0]].name;
    const fields = {};
    Object.keys(allFields).forEach(fieldName => {
      fields[fieldName] = allFields[fieldName].value;
    });

    const { store } = this.props;
    if (store && store.onSearchFieldsChange) {
      store.onSearchFieldsChange(target, fields);
    }
  };

  filterRenderHook = () => {
    const {
      store: { entity, isSerarch, activedTabKey }
    } = this.props;
    const fieldsNode = this.filterRender();
    let fields = null;
    Children.forEach(fieldsNode, (child, index) => {
      if (index > 0) {
        return;
      }
      fields = child.props.children;
    });
    return (
      <ListSearchForm
        onFieldsChange={ this.onSearchFieldsChange }
        wrappedComponentRef={ inst => (this.listSearchForm = inst) }
        onSubmit={ this.submit }
        entity={ entity }
        formType={ activedTabKey }
      >
        { fields }
        { this.clearButton() }
      </ListSearchForm>
    );
  };

  otherActionRenderHook = () => {
    if (!this.otherActionRender) {
      return null;
    }
    const {
      store: { activedTabKey }
    } = this.props;
    const nodeArr = Children.toArray(this.otherActionRender());
    if (!nodeArr.length || !nodeArr.length > 1) {
      throw new Error("所有的其他操作必须包裹在一个标签中！");
    }
    const otherActions = [];
    Children.forEach(nodeArr[0].props.children, (child, index) => {
      const { activeType, children, ...rest } = child.props;
      if (activeType && activeType !== activedTabKey) {
        return;
      }
      rest.key = Math.random();
      otherActions.push(React.createElement(child.type, rest, children));
    });

    return <div className={ `${baseClass}-body-action` }>{ otherActions }</div>;
  };

  componentWillUnmount() {
    const { store } = this.props;
    if (store && store.unmount) {
      store.unmount();
    }
  }

  doRender() {
    const {
      store: { crumbList, activedTabKey }
    } = this.props;

    return (
      <div className={ baseClass + " " + this.pageClassName }>
        <BreadCrumbRow
          crumbList={ crumbList }
          topActionRender={ this.topActionRender }
          activedTabKey={ activedTabKey }
        />

        <div className={ `${baseClass}-tab` }>{ this.tabsRender() }</div>
        <div className={ `${baseClass}-body` }>
          { this.filterRenderHook() }
          { this.otherActionRenderHook() }
          { this.tableRenderHook() }
          { this.footerRenderHook() }
        </div>
      </div>
    );
  }
}

export default ListPage;

import React, {Children} from 'react';
import PageBreadcrumb from "mt-breadcrumb";
import {Icon} from "components";
import './style.less';

export default class BreadCrumbRow extends React.Component {
  constructor(props) {
    super(props);
  }

  topActionRenderHook = () => {
    const {topActionRender, activedTabKey} = this.props;

    if (!topActionRender) {
      return null;
    }
    const nodeArr = Children.toArray(topActionRender());
    if (!nodeArr.length || !nodeArr.length > 1) {
      throw new Error("所有的操作必须包裹在一个标签中！");
    }
    const actions = [];
    Children.forEach(nodeArr[0].props.children, (child, index) => {
      const {activeType, children, ...rest} = child.props;
      if (activeType && activeType !== activedTabKey) {
        return;
      }
      rest.key = Math.random();
      actions.push(React.createElement(child.type, rest, children));
    });
    return <div className="breadcrumb-action">{actions}</div>;
  };

  render = () => {
    const {crumbList, topActionRender} = this.props;
    const breadCrumbFlag = crumbList && crumbList.length; // 标识业务组件store内是否有定义面包屑，有定义时才render面包屑导航
    const renderBreadCrumbFlag = breadCrumbFlag || topActionRender; // 标识是否需要render面包屑容器div，有面包屑或者有顶部操作按钮时才render容器div

    return (
      renderBreadCrumbFlag ? <div className="row-breadcrumb">
          <PageBreadcrumb
            crumbList={crumbList}
            separator={<Icon type="arrow_line_right"/>}
          />
          {this.topActionRenderHook()}
        </div> : null
    )
  }
}

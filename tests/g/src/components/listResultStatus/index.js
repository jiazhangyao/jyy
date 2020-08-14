/**
 * 列表结果状态区基类
 */
import React from 'react';
import "./index.less";
const lrsPrefix = "list-result-status";

export default class ListResultStatus extends React.Component {

  render() {

    let { isSearch, list, listEmptyTitle } = this.props;

    let isLoading = !list;

    let isListEmpty = (list && list.length === 0);

    let text;
    let imageClassName = "search-empty";
    if (isLoading) {
      text = '数据加载中。。。';
    }
    else if (isSearch && isListEmpty) {
      text = '暂无数据';
    }
    else if (!isSearch && isListEmpty) {
      text = listEmptyTitle || '暂无数据';
    }

    return (
      <div className={lrsPrefix}>
        <div className={`${lrsPrefix}-warn-wrapper`}>
          <div className={`${lrsPrefix}-image ${imageClassName}`} />
          <div className={`${lrsPrefix}-label`}>{text}</div>
        </div>
      </div>
    );
  }
}

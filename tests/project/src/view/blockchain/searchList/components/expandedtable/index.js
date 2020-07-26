import React, { Component } from 'react';
import { Table } from 'antd';

class ExpandedTable extends Component {

  constructor(props) {
    super(props);
    const { dataSource, rowKey } = props
    this.state = {
      expandedRowKeys: dataSource && dataSource.length ? dataSource.map(({ [rowKey]: key }) => key) : []
    }
  }

  componentWillReceiveProps({ dataSource, rowKey }) {
    const { dataSource: preDataSource } = this.props
    if (dataSource && dataSource.length && dataSource != preDataSource) {
      this.setState({
        expandedRowKeys: dataSource.map(({ [rowKey]: key }) => key)
      })

    } else if (!dataSource) {
      this.setState({
        expandedRowKeys: []
      })
    }
  }

  onTableExpand = (expanded, { tradeId }) => {
    const { expandedRowKeys } = this.state
    let nextExpandedRowKeys = []
    if (expanded) {
      nextExpandedRowKeys = expandedRowKeys.concat([tradeId])
    } else {
      nextExpandedRowKeys = expandedRowKeys.filter(key => key != tradeId)
    }
    this.setState({
      expandedRowKeys: nextExpandedRowKeys
    })
  }

  onTableRowClick = ({ tradeId }) => {
    return {
      onClick: (event) => {
        const { expandedRowKeys } = this.state
        const filtered = expandedRowKeys.filter(key => key == tradeId)
        let nextExpandedRowKeys = []
        if (filtered && filtered.length) {
          // 存在
          nextExpandedRowKeys = expandedRowKeys.filter(key => key != tradeId)

        } else {
          // 不存在
          nextExpandedRowKeys = expandedRowKeys.concat([tradeId])
        }
        this.setState({
          expandedRowKeys: nextExpandedRowKeys
        })
      },
    };
  }

  render() {
    const { expandedRowKeys } = this.state;
    const listProps = {
      ...this.props,
      expandedRowKeys,
      onRow: record => this.onTableRowClick(record),
      onExpand: this.onTableExpand,
    };
    return (
      <Table {...listProps} scroll={{ x: 1000 }} />
    );
  }
}

export default ExpandedTable;

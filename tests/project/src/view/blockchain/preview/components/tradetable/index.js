import React, {Component} from 'react';
import { Tooltip } from 'antd';

import TitleInfo from '../TitleInfo';
import PropTypes from 'prop-types';
import {Table, Card} from 'antd';

import './index.less';

class TradeTable extends Component {
    static propTypes = {
        // columns: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        // expandedRowRender: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        // className: PropTypes.string,
        // pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    }

    constructor(props) {
        super(props);
        this.state = {
            expandedRowKeys: []
        }
    }

    createExpandedRow = (records = []) => {
        const model = this.props[this.modelName];
        const tradeText = [];

        const columns = [
            { title: '序号', dataIndex: 'seqNo', key: 'seqNo' },
            { title: '交易哈希', dataIndex: 'tradeId', key: 'tradeId' , width: 550 },
            { title: '记账类型', dataIndex: 'accountType', key: 'accountType', },
            { title: '交易时间', dataIndex: 'tradeTime', key: 'tradeTime', }
        ];

        const listProps = {
            dataSource: records.tradeData,
            pagination: false,
            columns
        };

        return (
            <Table {...listProps} scroll={{x: true}} />
        );
    }

    getItem = (item) => {
        if(item){
            return (
                <Tooltip title={item} overlayClassName="dashboard-tooltip">
                    <span >{`${item.substring(0,15)}······${item.substring(item.length-10)}`}</span>
                </Tooltip>
            )
        } else {
            return (
                <span>{item}</span>
            )
        }
    }

    onTableExpand = (expanded, {blockId})=>{
        const { expandedRowKeys } = this.state
        let nextExpandedRowKeys = []
        if(expanded) {
            nextExpandedRowKeys = expandedRowKeys.concat([blockId])
        } else {
            nextExpandedRowKeys = expandedRowKeys.filter(key => key !=blockId )
        }
        this.setState({
            expandedRowKeys: nextExpandedRowKeys
        })
    }

    onTableRowClick = ({blockId}) => {
        return {
            onClick: (event) => {
                const { expandedRowKeys } = this.state
                const filtered = expandedRowKeys.filter(key => key == blockId)
                let nextExpandedRowKeys = []
                if (filtered && filtered.length) {
                    // 存在
                    nextExpandedRowKeys = expandedRowKeys.filter(key => key != blockId)

                } else {
                    // 不存在
                    nextExpandedRowKeys = expandedRowKeys.concat([blockId])
                }
                this.setState({
                    expandedRowKeys: nextExpandedRowKeys
                })
            }
        }
    };

    render() {
        const { data } = this.props;
        const { expandedRowKeys } = this.state
        // const { columns, expandedRowRender = false, rowKey, dataSource, pagination, className, defaultExpandAllRows = false } = this.props;
        const columns = [
            { title: '区块高度', dataIndex: 'blockHeight', key: 'blockHeight', width: 120 },
            { title: '当前区块哈希', dataIndex: 'blockId', key: 'blockId', width: 150, render: (item) =>  this.getItem(item) },
            { title: '前哈希', dataIndex: 'prevBlockId', key: 'prevBlockId', width: 150, render: (item) => this.getItem(item)},
            { title: '后哈希', dataIndex: 'nextBlockId', key: 'nextBlockId', width: 150,render: (item) => this.getItem(item)},
            { title: '交易数量', dataIndex: 'tradeData', key: 'tradeData', width: 120,render: (item) => item.length },
            { title: '出块时间', dataIndex: 'blockOutTime', key: 'blockOutTime', width: 200, render: (item) => <span>{item}</span> },
        ];
        const listProps = {
            className: 'blockchain-table',
            dataSource: data,
            pagination: false,
            expandedRowRender: record => this.createExpandedRow(record),
            onRow: record => this.onTableRowClick(record),
            onExpand: this.onTableExpand,
            columns,
            rowKey: 'blockId',
            expandedRowKeys,
            // defaultExpandAllRows: true
        };

        return (
            <Card className="result-card">
                <TitleInfo title="区块信息列表" />
                <Table {...listProps} scroll={{x: 1100}} style={{ marginTop: '24px'}} />
            </Card>
        );
    }
}
export default TradeTable;

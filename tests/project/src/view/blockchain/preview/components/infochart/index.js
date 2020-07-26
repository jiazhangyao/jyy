import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, Col, Row} from 'antd';

class infoCard extends Component {
    constructor(props) {
        super(props)
    }

    colItemRender = ({title, unit, condition, htmlText}) => {
        const colItemProps = {xs: 6, sm: 6, md: 6, lg: 6, xl: 6, style:{ padding: '0 6px'}};
        return (
            <Col {...colItemProps}>
                <Card bordered={false} className='boxShadow'>
                    <div className='cardContent'>
                        <div className='cardTitle'><div className='squareInfo'></div>{title}</div>
                        {!condition
                            ? <span className="noData">暂无数据</span>
                            : <div className='cardMainInfo'>{condition}<span className='cardMainInfoSmall'> {unit}</span></div>
                        }
                        {htmlText}
                    </div>
                </Card>
            </Col>
        )
    };

    render () {
        const {
            curTradeCount,
            totalTradeCount,
            curBlockCount,
            totalBlockCount,
            curResponseTime,
            totalResponseTime,
            nodeAvailability,
            nodeOnlineTime
            } = this.props.tradeGenData;

        const curTrade = {
            title: '今日交易数量',
            unit: '笔',
            condition: curTradeCount,
            htmlText: curTradeCount ? <div className='cardSummary'>累计交易总数{totalTradeCount} 笔</div> : null
        };
        const curBlock = {
            title: '今日区块数量',
            unit: '个',
            condition: curBlockCount,
            htmlText: curBlockCount ? <div className='cardSummary'>累计区块总数{totalBlockCount} 个</div> : null
        };
        const curResponse = {
            title: '今日平均服务响应速度',
            unit: 'ms',
            condition: curResponseTime,
            htmlText: curResponseTime ? <div className='cardSummary'>历史平均服务响应速度{totalResponseTime} ms</div> : null
        };
        const curNode = {
            title: '节点可用性',
            unit: '%',
            condition: nodeAvailability,
            htmlText: nodeAvailability ? <div className='cardSummary'>今日节点活跃时长{nodeOnlineTime} min</div> : null
        };

        return (
            <div id='infoCard'>
                <Row gutter={16}>
                    {this.colItemRender({...curTrade})}
                    {this.colItemRender({...curBlock})}
                    {this.colItemRender({...curResponse})}
                    {this.colItemRender({...curNode})}
                </Row>
            </div>
        );
    };
}

export default infoCard;

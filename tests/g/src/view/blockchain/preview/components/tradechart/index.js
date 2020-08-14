import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Menu, Dropdown, Button, Icon, Row, Col} from 'antd';
import png from '../../../../../static/img/placeholder_data.png';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/legend';

class TradingChart extends Component {
    componentWillReceiveProps(NextProps) {

        const {tradeData = null, blockData = null, tradeAve, blockAve, type} = NextProps.tradeDataByDate;
        let echartDistance = null;
        let blockChart = null;
        if(tradeData && this.props.tradeDataByDate.tradeData !== tradeData){
            const chartEle = document.getElementById('myTradingChart');
            if(!chartEle){
                return;
            }else{
                echartDistance = echarts.init(chartEle);
                echartDistance.setOption(this.getSeries(tradeData));
            }
        }

        if(blockData && this.props.tradeDataByDate.blockData !== blockData){
            const blockEle = document.getElementById('blockChart')
            // const blockChart = echarts.init(blockEle);
            if(!blockEle){
                return;
            }else{
                blockChart = echarts.init(blockEle);
                blockChart.setOption(this.getBlockOption(blockData));
            }
        }

        window.onresize = () => {
            echartDistance.resize();
            blockChart.resize();
        }
    }
    getSeries(data) {
        let xData = [];
        let yData = [];
        let xDataDate;
        let xDataMonth;
        let xDataDay;
        if(!!data){
            for(let i=0;i < data.length; i++){
                xDataDate = new Date(data[i].date);
                xDataMonth = xDataDate.getMonth()+1;
                xDataDay = xDataDate.getDate();
                xData.push( xDataMonth + '月'+ xDataDay +'日');
                yData.push(data[i].value);
            }
        }
        return {
            tooltip: {
                trigger: 'axis',
                padding: [10, 10, 10, 10],
                backgroundColor: 'rgba(255,255,255,0.90)',
                borderWidth: '1px',
                borderColor: 'rgba(150,150,150,0.1)',
                textStyle: {
                    color: '#333',
                    fontSize: '12',
                },
            },
            legend: {
                show: false,
                data: ['交易数量', '区块数量', '日平均交易数量', '日平均区块数量']
            },
            dataset: {
                dimensions: ['date','tradingNum'],
                source: data ? data : [{date: '', blockNum: '', tradingNum: ''}]
            },
            textStyle: {
                color: '#666666'
            },
            grid: {
                top: 20,
                bottom: 30,
                left: 65,
                right: 45
            },
            xAxis: {
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: '#eeeeee'
                    }
                },
                axisTick: {
                    show: true,
                    alignWithLabel: true,
                    interval: 0
                },
                axisLabel: {
                    // formatter: (val) => {
                    // 		let res = val.split('-')[2];
                    // 		return res == 1 ? val.split('-')[1] + '月1日': res;
                    // },
                    color: '#666666'
                },
                splitLine: {
                    interval: 0
                },
                splitNumber: data ? data.length : 30,
                data: xData
            },
            yAxis: [
                {
                    nameGap: 30,
                    nameTextStyle: {
                        align: 'left'
                    },
                    type: 'value',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#eeeeee'
                        }
                    },
                    axisLabel: {
                        color: '#666666'
                    }
                }
            ],
            series: [
                {
                    name: '交易数量',
                    type: 'line',
                    symbol:'circle',//拐点样式
                    symbolSize: 8,//拐点大小
                    lineStyle: {
                        color: '#448aff'
                    },
                    itemStyle: {
                        color: '#448aff',
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    },
                    markLine: {
                        precision: 2,
                        label: {
                            show: false
                        },
                        data: [
                            {type: 'average', name: '平均值'}
                        ],
                        symbol: ['', ''],
                        effect: {
                            show: false
                        }
                    },
                    data:yData
                }
            ]
        };
    }

    getBlockOption(data) {
        let xData = [];
        let yData = [];
        let xDataDate;
        let xDataMonth;
        let xDataDay;
        if(!!data){
            for(let i=0;i < data.length; i++){
                xDataDate = new Date(data[i].date);
                xDataMonth = xDataDate.getMonth()+1;
                xDataDay = xDataDate.getDate();
                xData.push( xDataMonth + '月'+ xDataDay +'日');
                yData.push(data[i].value);
            }
        }

        return {
            tooltip: {
                trigger: 'axis',
                padding: [10, 10, 10, 10],
                textStyle: {
                    color: '#333',
                    // fontWeight: '100',
                    fontSize: '12',
                },
                backgroundColor: 'rgba(255,255,255,0.90)',
                borderWidth: '1px',
                borderColor: 'rgba(150,150,150,0.1)'
            },
            legend: {
                show: false,
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            dataset: {
                dimensions: ['date','tradingNum'],
                source: data ? data : [{date: '', blockNum: '', tradingNum: ''}]
            },
            grid: {
                top: 20,
                bottom: 30,
                left: 65,
                right: 45
            },
            xAxis: {
                type: 'category',
                // boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#eeeeee'
                    }
                },
                axisTick: {
                    show: true,
                    alignWithLabel: true,
                    interval: 0
                },
                axisLabel: {
                    // formatter: (val) => {
                    // return val;
                    // let res = val.split('-')[2];
                    // return res == 1 ? val.split('-')[1] + '月1日': res;
                    // },
                    color: '#666666'
                },
                splitLine: {
                    interval: 0
                },
                splitNumber: data ? data.length : 30,
                data: xData
            },
            yAxis: {
                type: 'value',
                nameGap: 30,
                nameTextStyle: {
                    align: 'left'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#E9EEF6'
                    }
                },
                axisLabel: {
                    color: '#666666'
                }
            },
            series: [
                {
                    name: '区块数量',
                    type:'line',
                    symbol:'circle',//拐点样式
                    symbolSize: 8,//拐点大小
                    lineStyle: {
                        color: '#448aff'
                    },
                    itemStyle: {
                        color: '#448aff', //浮框字体颜色
                        borderWidth: 2,
                        borderColor: '#ffffff'//原点颜色
                    },
                    markLine: {
                        precision: 2,
                        label: {
                            show: false
                        },
                        data: [
                            {type: 'average', name: '平均值'}
                        ],
                        symbol: ['', ''],
                        effect: {
                            show: false
                        }
                    },
                    // stack: '总量',
                    data:yData
                }
            ]
        };

    }
    render() {
        const {tradeData = null, blockData = null, tradeAve, blockAve, type} = this.props.tradeDataByDate;
        const nodataDiv = {
            padding: '100px 0',
            position: 'absolute',
            top: '60px',
            width: '90%',
            background: 'white'
        }
        return (
            <Row gutter={16}>
                <Col className="gutter-row" span={12} style={{padding: '0 6px'}}>
                    <div className='trading-box boxShadow'>
                        <div className='tradingTitle'>
                            <span style={{float: 'left', fontWeight: 'bold'}}><div className='squareInfo'></div>每日交易数量</span>
                        </div>
                        {!tradeData || tradeData.length === 0 ? null :
                            <div className='axisTitle'>
                                <span>交易数量(笔)</span>
                            </div>
                        }

                        <div id="myTradingChart" style={{width: '100%', height: '270px'}}></div>
                        {(!tradeData || tradeData.length === 0) &&
                        <div className="pngBox" id="noTradingData" style={ nodataDiv }>
                            <img src={png}/>
                            <span>暂无数据</span>
                        </div>
                        }

                        {!tradeData || tradeData.length === 0 ? null :
                            <div className='tradingLegend vertical-container'>
                                <div className='vertical-container'><div className='tradingLegendBar'></div>&nbsp;每日交易数量</div>
                                <div className='vertical-container'><div className='tradingAveBar'>----</div>&nbsp;日均交易数量</div>
                            </div>
                        }
                    </div>
                </Col>
                <Col className="gutter-row" span={12}  style={{padding: '0 6px'}}>
                    <div className='trading-box boxShadow'>
                        <div className='tradingTitle'>
                            <span style={{float: 'left', fontWeight: 'bold'}}><div className='squareInfo'></div>每日区块数量</span>
                        </div>
                        {!blockData || blockData.length === 0 ? null :
                            <div className='axisTitle'>
                                <span>区块数量(个)</span>
                            </div>
                        }

                        <div id="blockChart" style={{ height: '270px', width: '100%'}}></div>
                        {(!blockData || blockData.length === 0) &&
                        <div className="pngBox" style={ nodataDiv }>
                            <img src={png}/>
                            <span>暂无数据</span>
                        </div>
                        }

                        {!blockData || blockData.length === 0 ? null :
                            <div className='tradingLegend vertical-container'>
                                <div className='vertical-container'><div className='tradingLegendBar'></div>&nbsp;每日区块数量</div>
                                <div className='vertical-container'><div className='tradingAveBar'>----</div>&nbsp;日均区块数量</div>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        )
    }
}

export default TradingChart;
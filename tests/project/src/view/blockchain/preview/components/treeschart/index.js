import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/tree';
import TitleInfo from '../TitleInfo';
import { getTreeData } from '../utils';
import png from '../../../../../static/img/placeholder_data.png';
import '../index.less';

class TreesChart extends Component {
    componentWillReceiveProps(NextProps){
        const { data } = NextProps;
        const tree = document.getElementById('tree');
        if(data && this.props.data !== data){
            if(!tree){
                return
            }
            const myChart = echarts.init(tree);
            myChart.setOption(this.getSeries(data));
            window.addEventListener('resize', myChart.resize);
        }

    }
    componentWillUnmount() {
        window.removeEventListener('resize', ()=>{});
    }
    colorShow = () => {

    }
    getSeries = (data) => {
        let nodeStatusData ={};
        nodeStatusData = {
            "name" : data.node,
            "value" : "",
            "children": data.children && data.children.map(function(item){
                return {
                    "name" : item.node,
                    "status" : item.status,
                    "children" : item.children && item.children.map(function(inner){
                        return {
                            "name" : inner.node,
                            "value" : inner.address,
                            "status" : inner.status
                        }
                    })
                }

            })
        }

        return {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove',
                position: "right",
                formatter: (nodeStatusData) => {
                    return 'name'+ ': ' + nodeStatusData.data.name;
                },

                backgroundColor: 'rgba(255,255,255,0.90)',
                borderWidth: '1px',
                borderColor: 'rgba(150,150,150,0.1)',
                textStyle: {
                    color: '#333',
                    fontSize: '12',
                },
            },
            legend: {
                height: 0,
                padding: [0,0,0,0]
            },
            series:[
                {
                    type: 'tree',
                    // data: getTreeData(data),
                    data: [nodeStatusData],
                    symbol: 'circle',
                    orient: 'vertical',
                    expandAndCollapse: true,
                    itemStyle: {
                        borderColor: "rgba(94,207,124,0.40)",
                        // color: "#FBC34B"
                        color: function (item) {
                            if(item.data.status == "不可用"){
                                return "#F85C62";
                            }else{
                                return "#4CAC65";
                            }
                        }
                    },
                    label: {
                        normal: {
                            position: 'top',
                            rotate: 0,
                            verticalAlign: 'middle',
                            fontFamily: 'SFUIText-Regular',
                            align: 'middle',
                            fontSize: 13,
                            distance: 13,
                            formatter: (dataIndex) => {

                                // let res = val.split('-')[2];
                                // return res == 1 ? val.split('-')[1] + '月1日': res;
                            },
                        }

                    },

                    leaves: {
                        label: {
                            normal: {
                                position: 'top',
                                rotate: 0,
                                verticalAlign: 'middle',
                                fontFamily: 'SFUIText-Regular',
                                align: 'middle',
                                fontSize: 12,
                                distance: 13,
                                formatter: (item) => {
                                    // return "hehe";
                                    // let res = val.split('-')[2];
                                    // return res == 1 ? val.split('-')[1] + '月1日': res;
                                }
                            },
                            formatter: (item) => {
                                // return "hhh";
                            }

                        },

                    },

                    animationDurationUpdate: 750
                }
            ]
        }
    }
    render() {
        const { data } = this.props;
        const nodataDiv = {
            padding: '50px 0',
            position: 'absolute',
            top: '65px',
            width: '90%',
            textAlign: 'center',
            background: 'white'
        }
        return (
            <div className="boxShadow" style={{height: 312, backgroundColor: '#FFF'}}>
                <TitleInfo title="拓扑结构"/>
                <div className="tree-box">
                    <div id="tree" style={{height: 250, width: '92%', marginLeft: '4%', position: 'relative', marginBottom: '-20px'}}></div>
                    {!data || data.length === 0 ? null :
                        <div className='legend'>
                            <div><div className='point' style={{backgroundColor: '#4CAC65'}}></div>可用</div>
                            <div><div className='point' style={{backgroundColor: '#F85C62'}}></div>不可用</div>
                            {/* <div><div className='point' style={{backgroundColor: '#FBC34B'}}></div>半可用</div> */}
                        </div>
                    }
                    {(!data || data.length === 0) &&
                    <div className="pngBox" style={ nodataDiv }>
                        <img src={png}/>
                        <span>暂无数据</span>
                    </div>
                    }
                </div>
            </div>
        )
    }
}
export default TreesChart;
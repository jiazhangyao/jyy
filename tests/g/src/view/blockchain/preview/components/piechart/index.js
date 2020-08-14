import React, { Component } from 'react';
import {getPieData} from '../utils';
import TitleInfo from '../TitleInfo';
import png from '../../../../../static/img/placeholder_data.png';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

class PieChart extends Component {
    componentWillReceiveProps(NextProps){
        const { data } = NextProps;
        const pie = document.getElementById('pie');
        if(data && this.props.data !== data){
            if(!pie){
                return
            }
            const myChart = echarts.init(pie);
            myChart.setOption(this.getSeries(data));
            window.addEventListener('resize', myChart.resize);
        }
    }
    getSeries2 = (data) => {

    }
    getSeries = (data) => {
        const newData = getPieData(data).map(item => item.name);
        // const newData = data;
        return {
            tooltip : {
                formatter: "{b} :({d}%)",
                backgroundColor: 'rgba(255,255,255,0.90)',
                borderWidth: '1px',
                borderColor: 'rgba(150,150,150,0.1)',
                textStyle: {
                    color: '#333',
                    fontSize: '12',
                },
            },
            legend: {
                orient: 'horizontal',
                data: getPieData(data).map(item =>  {
                    return {
                        name: item.name,
                        icon: 'circle'
                    }
                }),
                selectedMode: false,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    fontSize: 12,
                    fontFamily: 'PingFangSC-Regular',
                    color: '#333333'
                },
                y: 'bottom',
                bottom: 50
            },
            series : [
                {
                    type: 'pie',
                    radius : '60%',
                    center: ['50%', '45%'],
                    hoverAnimation: false,
                    data: getPieData(data),
                    itemStyle: {
                        color: function (item) {
                            if(newData.indexOf(item.data.name) === 0)
                                return '#5ECF7C';//绿色
                            else if (newData.indexOf(item.data.name) === 1)
                                return '#448AFF';//蓝色
                            else if (newData.indexOf(item.data.name) === 2)
                                return '#FBD44B';//黄色
                            else
                                return '#F85C62';//红色
                        }
                    },
                    label: {
                        formatter: "{d}%",
                        width: '100px'
                    }
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
        };
        return (
            <div className="boxShadow" style={{height: 312, backgroundColor: '#FFFFFF'}}>
                <TitleInfo title="服务响应时长占比"/>
                <div className="pie-box">
                    <div id="pie" style={{ height: 250 }}></div>
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

export default PieChart;
import React, { Component } from 'react';
import TitleInfo from '../TitleInfo';
import png from '../../../../../static/img/placeholder_data.png';
import { timestampToTime } from "../utils";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/legend';
import '../index.less';


class CpuChart extends Component {
    componentWillReceiveProps(NextProps){
        const { data } = NextProps;
        const cpu = document.getElementById('cpu');

        if(data && this.props.data !== data && data.length > 0){
            if(!cpu){
                return
            }
            const myChart = echarts.init(cpu);
            myChart.setOption(this.getSeries(data));
            window.addEventListener('resize', myChart.resize);
        }
    }
    getData2 =() => {

    }
    getData = (data) => {
        return data.map(item => {
            return {
                name: item.nodeName.split('.')[0],
                type: 'line',
                symbol: 'line',
                showSymbol: false,
                data: item.cpuUsageData.map((item) => {
                    // return item.t
                    return [timestampToTime(item.t),item.v]
                }),
                lineStyle: { width: 1 },
                tooltip: {
                    trigger: 'axis',
                    // formatter: function (params) {
                    // 		params = params[0];
                    // 		var date = new Date(params.name);
                    // 		return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                    // }
                },
            }
        })
    }

    getSeries = (data) => {
        if(!data || data.length === 0){
            return;
        }
        return {
            legend: {
                data:data.map(item => item.nodeName.split('.')[0]),
                selectedMode: false,
                y: 'bottom',
                padding: [0,0,0,0]
            },
            grid: {
                top: '6%',
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'time',
                boundaryGap: true,
                // interval: 100000*100*15,
                scale: true,
                splitLine:{
                    show:false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eeeeee',
                        // border
                    }
                },
                axisLabel: {
                    formatter: function (value) {
                        return timestampToTime(value).substring(11, 16)
                    },
                    color: "#666",
                    fontFamily: 'PingFangSC-Regular',
                },
                data: data.map(function (item) {
                    return item[0];
                }),
                // data: data.map(function (item) {
                // 		return item[0];
                // })
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    lineStyle: {type: 'dashed'}

                },
                axisLabel: {
                    formatter: `{value}%`
                }
            },
            // dataZoom: [{
            // 		startValue: '2018-12-01'
            // }, {
            // 		type: 'inside'
            // }],

            series: this.getData(data),
            color: ['#448AFF','#5ECF7C','#FBD44B', '#F85C62']
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
            <div className="boxShadow" id='cpuChart' style={{height: 312, width: '100%', backgroundColor: '#FFFFFF'}}>
                <TitleInfo title="节点CPU使用率"/>
                <div className="cpu-box">
                    <div id="cpu" style={{ height: 235, marginTop: 10 }}></div>
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

export default CpuChart;

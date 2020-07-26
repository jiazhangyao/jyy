/**
 * Created by wanghao on 2018/7/9.
 */
export function getTreeData(data){
    const newData = [];
    const treeData = data.map(item => {
        const nodeName = item.node.split('.')[0];
        return {
            node: nodeName,
            status: item.status
        }
    });
    treeData.forEach((item) => {
        if(item.node === "Org1"){
            newData.push({
                name: item.node,
                //address: item.address,
                itemStyle: getItemStyle(item.status === "半可用" ? '#FBC34B' : (item.status === "可用" ? '#4CAC65' : '#F85C62')),
                children: getChildren(treeData, treeData.filter(i => i.node === 'orderer' || i.node === 'ca0' || i.node === 'peer1' || i.node === 'peer0'))
            })
        }
    });
    return newData;
}

function getChildren(allData,data) {
    const newData = [];
    data.forEach((item) => {
        if (item.node !== 'couchdb0' && item.node !== 'couchdb1' && item.node !== 'orderer1' && item.node !== 'orderer2' && item.node !== 'orderer' && item.node !== 'orderder0'){
            if (item.node === 'peer0'){
                newData.push({
                    name: item.node,
                    //address: item.address,
                    itemStyle: getItemStyle(item.status === "半可用" ? '#FBC34B' : (item.status === "可用" ? '#4CAC65' : '#F85C62') ),
                    children: getChildren(allData, allData.filter(i => item.status === '可用' ? i.node === 'couchdb0' && i.status === '可用' : i.node === 'couchdb0' && i.status === '不可用' ))
                })
            } else if (item.node === 'peer1'){
                newData.push({
                    name: item.node,
                    //address: item.address,
                    itemStyle: getItemStyle(item.status === "半可用" ? '#FBC34B' : (item.status === "可用" ? '#4CAC65' : '#F85C62') ),
                    children: getChildren(allData, allData.filter(i => item.status === '可用' ? i.node === 'couchdb1' && i.status === '可用' : i.node === 'couchdb1' && i.status === '不可用' ))
                })
            } else {
                newData.push({
                    name: item.node,
                    //address: item.address,
                    itemStyle: getItemStyle(item.status === "可用" ? '#4CAC65' : '#F85C62' ),
                })
            }
        } else if (item.node === 'orderer'){
            newData.push({
                name: item.node,
                //address: item.address,
                itemStyle: getItemStyle(item.status === "半可用" ? '#FBC34B' : (item.status === "可用" ? '#4CAC65' : '#F85C62') ),
                children: getChildren(allData, allData.filter(i => i.node === 'orderer2' || i.node === 'orderer1' || i.node === 'orderer0'))
            })
        } else {
            newData.push({
                name: item.node,
                //address: item.address,
                itemStyle: getItemStyle(item.status === "可用" ? '#4CAC65' : '#F85C62' ),
            })
        }
    });
    return newData;
}

function getItemStyle(value) {
    return {
        borderColor: value,
        color: value,
        shadowBlur: 10,
        shadowColor: value,
        borderWidth: 4,
    }
}

export function getCpuData(data) {
    const newData = [];
    const AllData = data.map((item) => {
        return item.cpuUsageData.map(i => {
            return (
                {
                    [item.nodeName.split('.')[0]]: Number(i.v),
                    t: timestampToTime(i.t),
                }
            )
        })
    });
    if(AllData.length !== 0){
        AllData[0].forEach(item => {
            newData.push(item)
        });
    }
    AllData.forEach((item => {
        item.forEach((i, index) => {
            newData[index] = Object.assign(newData[index], i)
        })
    }));
    return newData;
}

export function timestampToTime(time) {
    // const Date.parse(new Date())
    
    // const date = new Date(Number(timestamp));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    const D = date.getDate() < 10 ? '0'+ date.getDate() + ' ' : date.getDate()+ ' ';
    const h = date.getHours() < 10 ? '0'+ date.getHours() + ':' : date.getHours()+ ':';
    const m = date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes();
    const s = ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}
export function tradeNumFormatter(num) {
    return parseInt(num, 10).toLocaleString() || '';
}
export function averageByKey(array, byKey) {
    if(array.length === 0) {
        return 0;
    }
    const curArray = [].concat(...array);
    return curArray.reduce((total, currentValue) => {
        return total + currentValue[byKey];
    }, 0) / array.length;
}

export function getPieData(data) {
    return data.map((item) => {
        if(item.section.indexOf('s') === 0){
            return {
                name: item.section.substring(1),
                value: item.reqCount,
            }
        } else {
            return {
                name: item.section.substring(0,item.section.indexOf('=')-3)+ '-'+ item.section.substring(item.section.indexOf('=')+3),
                value: item.reqCount,
            }
        }
    })
}

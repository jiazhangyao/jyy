/*
* Created by Alex Zhang on 2019/3/19
*/
export function demo(data) {
    //去掉所有的html标记
    let arr = data.sort((a,b)=>{
        return a-b
    })
    arr = arr.filter((v)=>{
        return v!==''
    })
    arr = arr.map((v)=>{
        return v+'层'
    })
    return arr.join(';')
}
export function hideByTime(data) {
    const nowTime = new Date().getTime();
    const newList = data.filter((item)=>{
        const time = item.publishTime || item.time;
        const iTime = new Date(time).getTime()
        return iTime<nowTime
    })
    return newList
}

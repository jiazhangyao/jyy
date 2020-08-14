import request from "../utils/request";

export const getSealUpType = async () => {
    return request({
        url: '/web/api/order/query/getCompany',
        method: "GET",
    })
}

export const searchSealUp = async data => {
    return request({
        url: '/web/api/estate/immovable',
        method: "POST",
        data
    })
}

export const reminderSubmit = async data => {
    return request({
        url: '/web/api/order/operate/archive',
        method: "POST",
        data
    })
}

export const addTypeSealUp = async data => {
    return request({
        url: '/web/api/estate/getRegisterType',
        method: "POST",
        data
    })
}

export const addFormSubmits = async data => {
    return request({
        url: '/web/api/order/submitSealOrder',
        method: "POST",
        data
    })
}

export const getRegisterType = async data => {
    return request({
        url: '/web/api/order/submitSealOrder',
        method: "POST",
        data
    })
}
// 保存历史查封工单（续封和注销时）
export const closures = async data => {
    return request({
        url: '/web/api/order/saveHistorySealOrder',
        method: "POST",
        data
    })
}
// 查询历史订单信息
export const historySealOrder = async data => {
    return request({
        url: `/web/api/order/historySealOrder/${data}`,
        method: "GET",
        data
    })
}

export const orderDetail = async data => {
    return request({
        url: `/web/api/order/query/sealDetail/${data}`,
        method: "GET"
    })
}

//获取业务类型返回材料列表
export async function getMaterialList(registerType) {
    return request(`/web/api/order/material/materialList/${registerType}`, {
        method: "GET"
    });
}

// 暂存工单 (查封)
export const saveSealOrder = async data => {
    return request({
        url: '/web/api/order/saveSealOrder',
        method: "POST",
        data
    })
}

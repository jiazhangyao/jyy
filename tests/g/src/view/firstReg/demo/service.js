import { request } from "utils/request";

//订单详情请求数据方法
export async function queryOrderDetail(data) {
    return request(`/order/query/detail/${data.id}`,{method:"GET"})
}
 //同步数据请求方法
export async function syncLandInfo(data) {
    return request(`/order/operate/syncLandInfo`,{method:"GET",data})
}
// 获取订单审批流程节点信息
export async function queryOrderProcess(id) {
    return request(`/order/query/orderProcessSchema/${id}`, {method: 'GET'});
  }
// 获取材料列表
export async function queryMaterialList(id) {
    return request(`/order/material/materialList/${id}`, { method: "GET"});
  }
// 通过 + 驳回 请求方法
export async function checkOrderStatus(data) {
    // debugger
    return request("/order/operate/check",{method:"post",data})
}
// 中止 请求方法
export async function endOrder(data) {
  // debugger
  return request("/order/operate/end",{method:"post",data})
}
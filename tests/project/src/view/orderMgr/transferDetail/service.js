import { request } from "utils/request";

// 查询订单详情
export async function queryOrderDetail(data) {
  return request(`/order/query/transfer/detail/${data.id}`, { method: "GET" });
}
// 获取订单审批流程节点信息
export async function queryOrderProcess(id) {
  return request(`/order/query/orderProcessSchema/${id}`, { method: 'GET' });
}
// 获取材料列表
export async function queryMaterialList(id) {
  return request(`/order/material/materialList/${id}`, { method: "GET" });
}

// 获取材料列表
export async function queryMaterialListByOrderId(id, data) {
  return request(`/order/material/list/${id}`, { method: "GET", data });
}
//同步数据请求方法
export async function synchronousData(data) {
  return request(`/order/query/synchronousData`, { method: "GET", data })
}
// 通过 + 驳回 请求方法
export async function checkOrderStatus(data) {
  return request("/order/operate/transfer/orderHandle", { method: "post", data })
}
// 中止 请求方法
export async function endOrder(data) {
  return request("/order/operate/transfer/end", { method: "post", data })
}
// 认证识别
export async function idCardValidate(data) {
  return request("/user/checkIdCard", { method: "POST", params: data }, '/web/api');
}
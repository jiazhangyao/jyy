import { request } from "utils/request";
//获取详情数据
export async function detail({ id }) {
  return request(`/order/query/seal/detail/${id}`, { method: 'GET' });
}
// 获取订单审批流程节点信息
export async function queryOrderProcess(id) {
  return request(`/order/query/orderProcessSchema/${id}`, {method: 'GET'});
}
// 获取材料列表
export async function queryMaterialList(id) {
  return request(`/order/material/materialList/${id}`, { method: "GET"});
}

// 获取历史查封记录
export async function getSealLog(data) {
  return request('/order/query/sealLog', {method: "GET", data});
}
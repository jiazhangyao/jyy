import { request } from "utils/request";

//获取详情
export async function submit(data) {
  return request(`/order/query/detail/${data.id}`, { method: "GET"});
}
// 获取上链状态
export async function chainStatus(data) {
  return request(`/order/query/chainStatus/${data.id}`, { method: "GET"});
}
// 获取订单审批流程节点信息
export async function queryOrderProcess(id) {
  return request(`/order/query/orderProcessSchema/${id}`, {method: 'GET'});
}
// 获取材料列表
export async function queryMaterialList(id) {
  return request(`/order/material/materialList/${id}`, { method: "GET"});
}

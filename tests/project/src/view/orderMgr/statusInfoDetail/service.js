import { request } from "utils/request";

// 查询订单详情
export async function queryOrderDetails(id) {
  return request(`/order/query/transfer/detail/${id}`, { method: "GET" });
}
// 查询订单详情
export async function queryEstate(data) {
  return request(`/estate/query/detail`, { method: "GET", params: data });
}
// 现状信息详情
export async function queryCurrentEstate(data) {
  return request(`/estate/query/current/detail`, { method: "GET", params: data });
}
//同步数据请求方法
export async function synchronousData(data) {
  return request(`/order/query/synchronousData`, { method: "GET", data })
}
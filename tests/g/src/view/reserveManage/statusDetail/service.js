import { request } from "utils/request";

// 查询订单详情
export async function queryOrderDetail(id) {
  return request(`/order/query/detail/${id}`, { method: "GET" });
}
// 查询订单详情
export async function queryEstate(data) {
  return request(`/estate/query/detail`, { method: "GET", params: data });
}

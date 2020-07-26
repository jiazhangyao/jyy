import { request } from "utils/request";

// 查询订单套次详情
export async function queryOrderDetails(id) {
  return request(`/estate/query/setTime/detail`, { method: "GET" , params: {orderId:id}});
}
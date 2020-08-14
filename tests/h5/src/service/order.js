import request from "../utils/request";

// 我的工单列表
export async function orderList(data, statusList) {
  return request(`/web/api/order/query/list?statusList=${statusList}`, { method: "GET", params: data });
}
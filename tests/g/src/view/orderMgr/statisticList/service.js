import { request } from "utils/request";

export async function queryList(data) {
  return request("/order/query/businessList", { method: "GET", data });
}

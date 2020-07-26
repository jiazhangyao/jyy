import { request } from "utils/request";

// 用户名密码登录
export async function submit(data) {
  return request("/order/query/list", { method: "GET", data });
}

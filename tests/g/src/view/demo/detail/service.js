import { request } from "utils/request";

// 用户名密码登录
export async function submit(data) {
  return request(`/order/query/detail/${data.id}`, {
    method: "GET",
    data
  });
}

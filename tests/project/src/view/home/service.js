import {request} from "utils/request";

// 用户名密码登录
export async function login(data) {
  return request(`/web/api/account/login`, {method: "POST", data});
}

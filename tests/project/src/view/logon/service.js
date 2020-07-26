import {request} from "utils/request";

// 用户名密码登录
export async function login(data) {
  return request("/user/login", {method: "POST", params: data});
}

// 用户名密码登录 - 用户中心
export async function newLogin(loginForm) {
  return request("/account/common/2/login", {method: "POST", params: {...loginForm, sourceType: 2}}, "/modules/api");
}

// module配置接口
export async function queryModule() {
  return request("/config/module", {method: "GET"});
}

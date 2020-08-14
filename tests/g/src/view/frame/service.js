import {request} from "utils/request";

/**
 * request(url, options, reqPrefix)
 * url  请求api  reqPrefix访问地址自动拼接的前缀 最终访问地址为 reqPrefix+url
 * 系统设置默认prefix为 /web/api
 * options 访问参数{method, data……} GET /web/api/account/C/baseinfoC
 */

// 获取用户ticket - 用户中心
export async function getToken() {
  return request("/account/common/account/jwt/ticket/info", {method: "GET"}, "/modules/api");
}

// 获取用户信息
export async function baseInfo(PackToken = "", block = true) {
  return request(`/user/baseInfo`, {method: "GET", headers: {PackToken}}, undefined, block);
}

// 获取侧边栏
export async function sideMenu() {
  // return request(`/permission/menu/all`, {method: "GET"});
  return request(`/permission/menu/user`, {method: "GET"});
}

export async function moduleInfo() {
  return request("/config/threshold", {method: "GET"});
}
// module配置接口
export async function queryModule() {
  return request("/config/module", {method: "GET"});
}

// 获取字典
export async function dict() {
  return request("/order/query/initQueryEnum", {method: "GET"});
}

export async function filehost() {
  return request("/config/filehost", {method: "GET"});
}

export async function logout() {
  // return request("/user/logout", {method: "GET"});
  return request("/account/common/logout", {method: "GET"}, "/modules/api");
}

export async function openApi() {
  return request(
    '/config/openApi',
    {
      method: 'GET'
    }
  );
}

//获取所属机构
export async function getDownList(data) {
  return request("/company/downList", {method: "GET", data});
}

import request from "../utils/request";

// 查询用户列表
export async function queryList(params) {
  return request("/web/api/user/BList", { method: "GET", params });
}

// 删除用户
export async function delUser(id) {
  return request(`/web/api/user/status/${id}`, { method: "GET"});
}

// 停用 or 启用
export async function optUser(data) {
  return request(`/web/api/user/${data.id}`, { method: "POST", data });
}
  
//增加机构用户
export async function addUsers(data) {
  return request('/web/api/user', { method: "POST", data });
}

//用户注册
export async function registerUsers(data) {
  return request('/modules/api/account/common/0/register', {
    method: "POST",
    data
  });
}

//  个人/企业验证码发送
export async function codeLogin(data) {
  return request('/modules/api/account/common/msg/code', {
    method: "POST",
    data
  });
}

//  个人/企业验证码验证
export async function codeVerify(data) {
  return request('/modules/api/account/common/register/validate', {
      method: "POST",
      data
    }
  );
}

//获取密码
export async function getUserPwd() {
  return request(
    '/web/api/user/generatorCompanyUserPwd',
    {
      method: "GET"
    }
  );
}
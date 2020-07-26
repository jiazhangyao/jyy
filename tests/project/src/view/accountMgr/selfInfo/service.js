import { request } from "utils/request";

//  获取部门
export async function getDepartment() {
  return request("/user/department", { method: "GET" });
}

//获取id用户信息
export async function getUserInfo(data) {
  return request(`/user/${data.id}`,{ method: "GET" });
}

//获取该登录用户信息
export async function getBaseInfo(){
  return request("/user/baseInfo",{ method: "GET" });
}

//删除用户
export async function delUser(id){
  return request(`/user/status/${id}`,{ method: "GET" })
}

//重置密码
export async function resetPsd(id){
  return request(`/user/resetPassword/${id}`,{ method: "GET" })
}

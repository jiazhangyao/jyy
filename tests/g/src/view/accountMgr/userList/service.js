import { request } from "utils/request";

// 查询用户列表
export async function queryList(data) {
  return request("/user/list", { method: "GET", data });
}
// 查询网点字典
export async function queryRegionList() {
  return request("/user/region", { method: "GET" });
}
// 查询部门字典
export async function queryDepartment() {
  return request("/user/department", { method: "GET" });
}

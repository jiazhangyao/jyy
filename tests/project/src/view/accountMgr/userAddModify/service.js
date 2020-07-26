import { request } from "utils/request";

export async function queryDepartment() {
  return request("/user/department", { method: "GET" });
}

export async function queryRegionList() {
  return request("/user/allRegionList", { method: "GET" });
}

export async function queryRoleList(data) {
  return request("/role/dropDownList", { method: "GET" , data});
}

export async function create(data) {
  return request("/user", {method: "POST", data});
}

export async function update({ id, ...data }) {
  return request(`/user/${id}`, {method: "POST", data});
}

export async function getData(id) {
  return request(`/user/${id}`, {method: "GET"});
}

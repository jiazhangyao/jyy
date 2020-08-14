import { request } from "utils/request";

export async function queryList(data) {
  return request("/role/list", { method: "GET", data });
}
export async function deleteRole(id) {
  return request(`/role/status/${id}`, { method: "GET" });
}

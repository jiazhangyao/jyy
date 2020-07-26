import { request } from "utils/request";


export async function list(data) {
  return request("/reserve/branch", { method: "GET", data });
}
export async function deleteNet(id) {
  return request(`/reserve/delete/${id}`, { method: "GET"});
}

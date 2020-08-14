import { request } from "utils/request";

export async function create(data) {
  return request("/role", {
    method: "POST",
    data
  });
}

// 获取权限列表
export async function queryAllMenu() {
  return request(`/permission/menu/all`, {method: "GET"});
}

export async function update({ id, ...data }) {
  return request(`/role/${id}`, {
    method: "POST",
    data
  });
}

export async function getData(data) {
  return request(`/role/${data.id}`, {
    method: "GET",
    data
  });
}
export async function getDelete(data) {
  return request(`/role/status/${data.id}`, {
    method: "GET",
  });
}


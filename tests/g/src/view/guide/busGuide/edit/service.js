import { request } from "utils/request";

export async function create(data) {
  return request("/guide", {
    method: "POST",
    data
  });
}

export async function update({ id, ...data }) {
  return request(`/guide/${id}`, {
    method: "POST",
    data
  });
}

export async function getData(data) {
  return request(`/guide/detail/${data.id}`, {
    method: "GET",
    data
  });
}

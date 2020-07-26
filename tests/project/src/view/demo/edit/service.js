import { request } from "utils/request";

export async function branchName() {
  return request("/reserve/branchName", { method: "GET" });
}

export async function time() {
  return request("/reserve/timePeriod", { method: "GET" });
}

export async function create(data) {
  return request("/reserve", {
    method: "POST",
    data
  });
}

export async function update({ id, ...data }) {
  return request(`/reserve/${id}`, {
    method: "POST",
    data
  });
}

export async function getData(data) {
  return request(`/reserve/${data.id}`, {
    method: "GET",
    data
  });
}

import { request } from "utils/request";


export async function submit(data) {
  return request("/reserve", { method: "GET", data });
}
export async function timePeriod(data) {
  return request("/reserve/timePeriod", { method: "GET", data });
}

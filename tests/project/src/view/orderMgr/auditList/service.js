import { request } from "utils/request";

// 查询工单列表
export async function queryOrderList(data) {
  return request("/order/query/list", { method: "GET", data });
}

// 查询电子证照详情
export async function queryLicenseInfo(data) {
  return request("/certificate/detail", { method: "GET", data });
}

// 查询电子证照权利人列表
export async function queryLicenseUsers(data) {
  return request("/certificate/obligee", { method: "GET", data });
}

// 查询电子证照图片
export async function queryLicensePic(data) {
  return request("/certificate/file", { method: "GET", data });
}

// 列表页  根据登记类型获取可选状态
export async function queryStatus(data) {
  return request("/order/query/status", { method: "POST", data });
}

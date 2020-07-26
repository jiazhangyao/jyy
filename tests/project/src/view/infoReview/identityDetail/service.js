import { request } from "utils/request";

// 获取详情
export async function submit(data) {
  return request("/account/common/face/validate/appeal/" + data.id, {method: "GET"}, "/modules/api");
}

import { request } from "utils/request";
//获取详情数据
export async function detail(params) {
  return request(`/blockchain/func/history/`, { method: 'GET', params });
}

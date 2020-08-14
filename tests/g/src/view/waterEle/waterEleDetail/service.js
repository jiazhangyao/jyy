import { request } from "utils/request";
//获取详情数据
export async function detail({ id }) {
  return request(`/transfer/detail/${id}`, { method: 'GET' });
}

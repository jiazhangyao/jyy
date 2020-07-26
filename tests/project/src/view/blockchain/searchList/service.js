import { request } from "utils/request";
//获取列表数据
export async function getList(data) {

  return request(
    '/blockchain/func/history',
    {
      method: 'GET',
      data
    }
  );
}

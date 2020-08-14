import { request } from "utils/request";
//获取列表数据
export async function getList(data) {
  return request('/guide/list', { method: 'GET', data });
}
//办事指南列表页面相关操作 下架，发布，删除
export async function getOffline({ id, status }) {
  return request(`/guide/${status}/${id}`, {
    method: 'GET',
  });
}

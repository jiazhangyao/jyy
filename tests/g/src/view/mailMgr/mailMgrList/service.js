import { request } from "utils/request";
//获取列表数据
export async function getList(data) {
  return request('/mail/list', { method: 'GET', data });
}

export async function type() {
  return request('/mail/registerType', { method: 'GET' });
}

export async function getMail(id) {
  return request(`/mail/${id}`, { method: 'GET' });
}

export async function subMail({ id, data }) {
  return request(`/mail/${id}`, { method: 'POST', data });
}
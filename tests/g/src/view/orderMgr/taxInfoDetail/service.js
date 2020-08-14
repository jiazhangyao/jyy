import { request } from "utils/request";

export async function taxDetail(id) {
  return request(`/order/tax/detail/${id}`, {method: 'GET'});
}

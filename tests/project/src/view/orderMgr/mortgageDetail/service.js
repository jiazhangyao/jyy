import { request } from "utils/request";

// 查询订单详情
export async function queryOrderDetail(data) {
  return request(`/order/query/detail/${data.id}`, { method: "GET" });
}
// 获取订单审批流程节点信息
export async function queryOrderProcess(id) {
  return request(`/order/query/orderProcessSchema/${id}`, { method: 'GET' });
}

// 获取材料列表
export async function queryMaterialListByOrderRegisterType(registerType, data) {
  return request(`/order/material/materialList/${registerType}`, { method: "GET" });
}

// 通过 + 驳回 请求方法
// orderId：订单ID
// isPass：是否通过（0驳回 1通过）
// pageName：当前操作页面(1-受理预审(首次、转移、变更)，2-受理预审(注销)，3-查档，4-复审)
// reason：理由
// orderNontaxDTO：非税信息 (首次、转移、变更时填写)
// orderNontaxDTO.registerFee ：登记费
// registerSubType：登记类型（小类）
export async function orderHandle(data) {
  return request("/order/operate/mortgage/orderHandle",{method:"post",data})
}

// 终止 请求方法
export async function orderHandleEnd(data) {
  return request("/order/operate/mortgage/end",{method:"post",data})
}

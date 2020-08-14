import request from "../utils/request";

//获取订单确认信息
export const transferConfirmInfo = data => {
  return request({
    url: '/web/api/order/confirm/info',
    method: "POST",
    data
  })
}

//文件上传
export const upload = data => {
  return request({
    url: '/web/api/file',
    method: "POST",
    data
  })
}

//申请书签字信息保存
export const applicationSign = data => {
  return request({
    url: '/web/api/order/confirm/applicationSign',
    method: "POST",
    data
  })
}

//合同签字信息保存
export const contractSign = data => {
  return request({
    url: '/web/api/order/confirm/contractSign',
    method: "POST",
    data
  })
}

//预核税、申请表、合同
export const transferPretaxInfo = data => {
  return request('/web/api/order/confirm/preTaxInfo', {
    method: 'POST',
    data
  })
}

export const transferPreTaxConfirm = data => {
  return request('/web/api/order/confirm/preTaxConfirm', {
    method: 'POST',
    data
  })
}

export const transferPreTaxConfirms = data => {
  return request('/web/api/order/confirm/payTax', {
    method: 'POST',
    data
  })
}

export const transferApplyInfo = data => {
  return request('/web/api/order/confirm/applicationInfo', {
    method: 'POST',
    data
  })
}

export const getContractInfo = data => {
  return request('/web/api/order/confirm/contractInfo', {
    method: 'POST',
    data
  })
}

export const contractSubmit = data => {
  return request('/web/api/order/confirm/submitContract', {
    method: 'POST',
    data
  })
}

// 不动产取得房屋转移类型
export async function getHouseTransferType(data) {
  return request("/web/api/transOrder/getHouseTransferType", { method: "POST", data });
}

// 不动产信息校验+查询
export async function validHouse(data) {
  return request("/web/api/transOrder/valid", { method: "POST", data });
}

// 实名认证检验
export async function checkIdCard(data) {
  return request("/web/api/user/checkIdCard", { method: "POST", data });
}
// 实名认证检验 add 
export async function getFaceValidateStatus(data) {
  return request('/web/api/user/queryFaceVerificationResult', {method: 'POST',data}, '/erp/api');
}

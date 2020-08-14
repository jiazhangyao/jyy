import request from "../utils/request";


//一手房订单暂存
export async function addTransOrderByNewHouse(data) {
  return request({ url: "/web/api/transOrder/addTransOrderByNewHouse", method: "POST", data: data });
}

//一手房提交
export async function submitTransOrderByNewHouse(data) {
  return request({ url: "/web/api/transOrder/submitTransOrderByNewHouse", method: "POST", data: data });
}

export async function vaildMsgCode(data) {
  return request({ url: "/web/api/Sms/validateSmsCode", method: "POST", data: data });
}

export async function sendSmsCode(data) {
  return request({ url: "/web/api/Sms/sendSmsCode", method: "POST", data: data });
}
// 认证识别
export async function idCardValidate(data) {
  return request({ url: "/web/api/order/idCardValidate", method: "POST", data: data });
}

//获取业务类型返回材料列表
export async function getMaterialList(data) {
  return request({ url: "/web/api/order/material/materialListTypeAndRole", method: "POST", data: data });
}

// 业务登记详情
export async function detail(id) {
  return request({ url: `GET /web/api/order/query/detail/${id}`, method: "GET" });
}


export async function mortGageOrderSubmission(data) {
  return request({ url: "/web/api/mortGageOrder/submission", method: "POST", data: data });
}


//终止
export async function mortGageOrderEndOrder(data) {
  return request({ url: `/web/api/mortGageOrder/endOrder/${data.id}`, method: "POST" });
}


//暂存
export async function mortGageOrderSave(data) {
  return request({ url: "/web/api/mortGageOrder/save", method: "POST", data: data });
}

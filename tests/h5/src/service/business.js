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
  return request({ url: `/web/api/transOrder/transOrderDetail/${id}`, method: "GET" });
}

//卖方提交
export async function submitTransOrderBySaler(data) {
  return request({ url: "/web/api/transOrder/submitTransOrderBySaler", method: "POST", data: data });
}

//买家提交
export async function submitTransOrderByBuyer(data) {
  return request({ url: "/web/api/transOrder/submitTransOrderByBuyer", method: "POST", data: data });
}


//终止
export async function endTransOrderBySaler(data) {
  return request({ url: `/web/api/transOrder/endTransOrderBySaler/${data.id}`, method: "POST" });
}


//卖家暂存
export async function addTransOrderBySaler(data) {
  return request({ url: "/web/api/transOrder/addTransOrderBySaler", method: "POST", data: data });
}
//买家暂存
export async function addTransOrderByBuyer(data) {
  return request({ url: "/web/api/transOrder/addTransOrderByBuyer", method: "POST", data: data });
}

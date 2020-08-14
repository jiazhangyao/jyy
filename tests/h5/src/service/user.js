import request from "../utils/request";

const sourceType = process.env.VUE_APP_SOURCE_TYPE;
/**登录 */
// 账号登录
export const AccountLogin = (data) => {
  return request(`/modules/api/account/common/${data.sourceType}/login`, {
    method: "POST",
    data
  })
}

// 验证码登录
export const CodeLogin = (data) => {
  return request(`/modules/api/account/common/${data.sourceType}/code/login`, {
    method: "POST",
    data
  })
}

export function MsgcodeValidate(data) {
  return request("/modules/api/account/common/reset/msgcode/validate", {
    method: "POST",
    data: data
  })
}

/**注册 */

// 企业注册-添加机构
export async function verifyCompanyInfo(data) {
  return request(`/web/api/company/addCompanyByEstate`, {
    method: "POST",
    data: { ...data, type: 99 }//type:99固定
  });
}

// 流程开始
export const start = data => {
  return request(`/modules/api/register/activiti/start`, {
    method: "post",
    data
  })
}

// 密码确认
export const passwordConfirm = data => {
  return request(`/modules/api/register/activiti/passwordConfirm`, {
    method: "post",
    data
  })
}

// 密码确认
export const regInfo = params => {
  const { mobile, type } = params;
  return request(`/modules/api/register/activiti/regInfo/${mobile}/${type}`, {
    method: "get"
  })
}
/**《用户服务协议》 */
export async function getAgreement(params) {
  return request("/modules/api/account/common/register/agreementContent", {
    method: "GET",
    params
  });
}

export async function getAgreementList(data) {
  return request("/modules/api/account/common/register/agreementList", {
    method: "GET",
    data
  });
}
/**忘记密码 */
// 第一步：校验身份，发送短信验证码
export const stepOne = data => {
  return request(`/modules/api/account/common/${sourceType}/forget/msgcode`, {
    method: "post",
    data
  })
}

// 第二部：校验短信验证码
export const stepTwo = data => {
  return request(`/modules/api/account/common/${sourceType}/forget/msgcode/validate`, {
    method: "post",
    data
  })
}

// 第二部：设置新密码
export const stepThree = data => {
  return request(`/modules/api/account/common/${sourceType}/reset/login`, {
    method: "post",
    data
  })
}
/**用户管理 */
// 用户登出
export const logout = () => {
  return request(`/modules/api/account/common/logout`, {
    method: "get"
  })
}

// 用户信息
export const baseinfo = (sourceType) => {
  return request(`/modules/api/account/common/${sourceType}/account/base/info`, {
    method: "get"
  })
}

// 检验身份
export const checkAuth = data => {
  return request(`/modules/api/account/common/reset/msgcode/validate`, {
    method: "post",
    data
  })
}

// 更换手机
export const resetmobile = data => {
  return request(`/modules/api/account/common/reset/mobile`, {
    method: "post",
    data
  })
}

// 更换密码
export const resetpassword = data => {
  return request(`/modules/api/account/common/reset/password`, {
    method: "post",
    data
  })
}

/**人脸识别 */
export async function faceValidate(data) {
  const { sourceType } = data

  return request(`/modules/api/account/common/${sourceType}/face/validate`, {
    method: "POST",
    data
  });
}

export async function faceValidateAppeal(data) {
  return request("/modules/api/account/common/face/validate/appeal", {
    method: "POST",
    data
  });
}

export async function workflowFaceValidate(data) {
  return request("/modules/api/face/activiti/faceValidate", {
    method: "POST",
    data
  });
}

export async function workflowFaceValidateAppeal(data) {
  return request("/modules/api/face/activiti/faceValidateAppeal", {
    method: "POST",
    data
  });
}

/**获取用户信息 */
export async function getTaskId(params) {
  const { mobile, type } = params
  return request(`/modules/api/register/activiti/start/${mobile}/${type}`, {
    method: "GET",
    params
  });
}
export async function getUserByMobile(params) {
  const { mobile, type } = params
  return request(`/modules/api/register/activiti/regInfo/${mobile}/${type}`, {
    method: "GET",
    params
  });
}
export async function getUser(params) {
  return request("/modules/api/account/common/validate/info", {
    method: "GET",
    params
  });
}

//产调查询人脸识别
export async function faceVerificationOfEstateProperty(data) {
  if (window.location.host == 'localhost:8088') {
    return {
      data: { validateSuccess: true, verificationFail: true, verificationStatus:2 },
      errorCode: 0,
      fieldErrors: null,
      msg: "",
      success: true,
      validateSuccess: true,
      verificationStatus: 2,
      verificationFail: true
    }
  }
  return request("/web/api/user/faceVerificationOfEstateProperty", {
    method: "POST",
    data
  });
}

//活体识别
export async function faceVerificationOfEstatePropertyBody(data) {
  return request("/web/api/user/bioVerification", {
    method: "POST",
    data
  });
}

/**
 * 获取已完成和正在进行中的消息数量
 * @param {number} countType 1 是已完成，0是进行中
 */
export async function messageStatusCount(countType) {
  return request("/web/api/order/query/count", {
    method: 'GET',
    params: {
      countType,
    }
  });
}

/**
 * 待办列表
 */
export async function listTodo(params) {
  return request("/web/api/order/query/listForTodo", {
    method: 'GET',
    params
  });
}

/**
 * 企业用户信息
 */
export async function getCompanyDetail() {
  return request("/web/api/company/detail", {
    method: 'GET'
  });
}

//新增机构认证
export async function addCompany(data) {
  return request("/web/api/company/addCompany", {
    method: "POST",
    data
  });
}

//机构认证 （重新认证）
export async function updateCompany(data) {
  return request("/web/api/company/updateCompany", {
    method: "POST",
    data
  });
}

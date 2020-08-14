/*
* Created by Alex Zhang on 2019/3/19
*/
// export const xxx = state => state.xxx

// 图片上传地址
export const fileHost = state => state.base.fileHost;
export const title = state => state.base.title;
export const dict = state => state.base.dict;
export const params = state => state.base.params;
export const menu = state => state.base.menu;
// 用户相关
export const baseinfo = state => state.account.baseinfo;
export const normal_baseinfo = state => state.base.baseinfo;
export const userBaseInfo = state => state.base.userBaseInfo;
// 实人认证使用的数据
export const agreement = state => state.certification.agreement;
export const from = state => state.certification.from;
export const user = state => state.certification.user;
export const accountId = state => state.certification.accountId;
export const taskId = state => state.certification.taskId;

//转移登记接口请求携带参数
export const transferParams = state => state.transfer.sessionParams

export const mortgageParams = state => state.mortgage.sessionParams

//获取userId
export const userFaceInfo = state => state.transfer.userFaceInfo

// 获取用户信息
export const userTotalInfo = state => state.account.userTotalInfo

// 获取认证管理数据
export const approveBaseInfo = state => state.approve.baseInfo
export const approveContactInfo = state => state.approve.contactInfo
export const approveImgInfo = state => state.approve.imgInfo
export const approveEditAble = state => state.approve.editable


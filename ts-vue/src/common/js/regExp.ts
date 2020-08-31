// 用户名
export const userName: RegExp = new RegExp(/^[a-zA-Z0-9]+$/);
// 姓名
export const name: RegExp = new RegExp(/^[\u4e00-\u9fa5]{1,5}$/);
// 密码
export const password: RegExp = new RegExp(/[~`!@#$%^&*()\-\+\=\{\[\}\]\|\:;\"\'<,>.?\/\w]{6,20}$/);
// 填空题答案匹配 ||| 解析为 或
export const blankAnswer: RegExp = new RegExp(/\|\|\|/g);
// 添加题目部分名称
export const sectionVer: RegExp = new RegExp(/[\u4e00-\u9fa50-9~`!@#$%^&*()\-\+\=\{\[\}\]\|\:;\"\'<,>.?\/_]{1,2000}$/);

import { request } from "utils/request";

//提交新密码接口
export async function submitNewPwd(data) {
    return request("/account/common/modify/password", {method: "POST", params: {...data}}, "/modules/api");
}
/*
 * @Author: tim huang
 * @Date: 2019-03-20 11:28:28
 * @Last Modified by: tim huang
 * @Last Modified time: 2019-03-27 18:50:06
 */
import axios from "axios";
import { Toast } from 'vant';
import router from "../router";

function errorHandle(error, block = true) {
    if (block) {
        const code = error && error.response && error.response.status;
        if (code && httpStatus[code]) {
            httpStatus[error.response.status](error);
        } else {
            // Toast.fail('error');
        }
    }
    return { success: false };
}
const httpStatus = {
    403(error) {
        if (error && error.response && error.response.data) {
            const { data } = error.response;
            if (data.msg) {
                // Toast.fail(error);
            } else {
                // Toast.fail("权限错误");
            }
        } else {
            // Toast.fail("权限错误");
        }
    },
    401(error) {
        Toast("未登录, 请先登录");
        router.push("/login");
        /** update by tim huang
         if (window.location.href.indexOf(process.env.REACT_APP_LOGIN_PAGE) < 0) {
      if (process.env.REACT_APP_THIRD_PLATFORM_LOGIN_PAGE) {
        // 第三方系统
        window.location.href = process.env.REACT_APP_THIRD_PLATFORM_LOGIN_PAGE;
      } else {
        // 站内
        history.push(process.env.REACT_APP_LOGIN_PAGE);
      }
    }*/
        /** update by jjhuo 20190220
         *  为了解决登录进入站内后长时间未操作、token过期
         *  经由history.push("/login")强制返回至登录页后，调用登录接口成功登录进入站内之后点击任意功能仍然报“未登录”的bug
         *  判断导致以上问题是因为站内路由跳转至login、然后登录进入home页这种方式不会重新加载Frame组件，而登录态baseInfo接口传新token的功能写在Frame内
         *  故而采用以下新方式处理401未登录问题，即强制刷新URL至login页
         */
        // history.logout();
    },
    500(error) {
        // Toast.fail(error);
    },
    // 502(error) {
    //   info(error);
    // },
    // 504(error) {
    //   info(error);
    // }
};

export default function upload(url, data, reqPrefix = "") {
    return axios.post(reqPrefix + url, data, {
        method: "post",
        headers: { "Content-Type": "multipart/form-data" }
    })
        .then(response => ({ data: response.data || "" }))
        .catch(error => errorHandle(error));
}

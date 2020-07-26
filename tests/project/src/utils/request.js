import { message } from "antd";
import jsonp from "fetch-jsonp";
import history from "utils/history";
import queryString from "querystring";

const Ajax = require("axios");
const delayCloseTime = 5;
export const prefix = process.env.REACT_APP_API_PREFIX;

const info = (error, text) => {
  message.error(
    (error &&
      error.response &&
      error.response.data &&
      error.response.data.msg) ||
      text ||
      "服务器错误",
    delayCloseTime
  );
};

const httpStatus = {
  403(error) {
    if (error && error.response && error.response.data) {
      const { data } = error.response;
      if (data.msg) {
        info(error);
      } else {
        info(error, "权限错误");
      }
    } else {
      info(error, "权限错误");
    }
  },
  401(error) {
    info(error, "未登录, 请先登录");
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
    history.logout();
  }
  // 500(error) {
  //   info(error);
  // },
  // 502(error) {
  //   info(error);
  // },
  // 504(error) {
  //   info(error);
  // }
};

function errorHandle(error, block = true) {
  if (block) {
    const code = error && error.response && error.response.status;
    if (code && httpStatus[code]) {
      httpStatus[error.response.status](error);
    } else {
      info(error, "服务器错误");
    }
  }
  return { success: false };
}

export const commonRequest = (url, options, prefix = "", block = true) => {
  if ((options.method === "GET" || !options.method) && options.data) {
    options.params = options.data;
    options.data = null;
  }

  if (
    (options.method === "POST" || options.method === "PUT") &&
    !options.data &&
    options.params
  ) {
    options.data = options.params;
    options.params = null;
  }

  let headers = {};
  if (options && options.headers) {
    headers = options.headers;
  }

  const timeStamp = `_t=${new Date().getTime()}`;
  const query = url.indexOf("?") >= 0 ? "&" : "?";

  if (options.jsonp) {
    const queryData = queryString.stringify(options.params);

    return jsonp(`${url}${query}${queryData}`)
      .then(response => response.json())
      .catch(error => {
        errorHandle(error);
      });
  }

  return Ajax({
    method: options.method || "GET",
    url: encodeURI(`${prefix}${url}${query}${timeStamp}`),
    data: options.data || {},
    params: options.params || {},
    headers
  })
    .then(({ data }) => {
      if (data.success) {
        return { data: data.data, success: true };
      }

      const error = {
        response: {
          ...data,
          status: data.errorCode
        }
      };

      if (block && data.errorCode && httpStatus[data.errorCode]) {
        httpStatus[data.errorCode](error);
      }

      let resp = {};
      if (data.msg) {
        resp.globalError = data.msg;
      }
      if (data.message) {
        resp.globalError = data.message;
      }
      if (data.errorCode) {
        resp.errorCode = data.errorCode;
      }
      if (data.fieldErrors) {
        resp.fieldErrors = data.fieldErrors;
      }
      return { ...resp, success: false };
    })
    .catch(error => {
      return errorHandle(error, block);
    });
};

export const request = (url, options, reqPrefix = prefix, block = true) => {
  return commonRequest(url, options, reqPrefix, block);
};

export function upload(url, data, reqPrefix = prefix) {
  return Ajax.post(reqPrefix + url, data, {
    method: "post",
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then(response => ({ data: response.data || "" }))
    .catch(error => errorHandle(error));
}

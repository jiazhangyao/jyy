/**
 * 服务端请求底层封装
 */

import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse, AxiosError } from "axios";
import { getLocalStorage, delLocalStorage } from '@/common/js/localStorage';
import { router } from '@/router/index';
import { obj2base64 } from '@/common/js/jwt';
import { PROJECT_NAME } from '@/config/env.ts';

import {
  ERR_OK,
  ERR_UNLOGIN,
  ERR_LOGIN_TIMEOUT
} from '@/config/httpCode';

import { message } from 'ant-design-vue';

export let uid: string = 'prod';

if (process.env.VUE_APP_SERVER !== 'prodServer') {
  uid = 'dev';
}

export default function base(propConfig: AxiosRequestConfig, id: number = 0): AxiosPromise {
  if (propConfig.headers === undefined || typeof propConfig.headers.token !== 'string') {
    propConfig.headers = Object.assign(propConfig.headers === undefined ? {} : propConfig.headers, { token: getToken(id) });
  }

  if (typeof propConfig.timeout !== 'number') {
    propConfig.timeout = 60000;
  }

  if (typeof propConfig.method !== 'string') {
    propConfig.method = 'GET';
  }

  return new Promise((resolve, reject) => {
    axios(propConfig).then((res: AxiosResponse) => {
      handleHttpRequestEnter(res, resolve, reject);
    }).catch((err: AxiosError) => {
      handleHttpRequestError(err, resolve, reject);
      return;
    });
  });
}

export function getToken(id: number = 0): string {
  if (getLocalStorage('token', false)) {
    let token: any = getLocalStorage('token', false);
    const base64Id: any = obj2base64({
      dataId: id,
      systemName: PROJECT_NAME
    });
    token = token + '&&&' + base64Id;
    return token;
  } else {
    return "";
  }
}


/**
 * 请求正常处理
 */
function handleHttpRequestEnter(res: AxiosResponse, resolve: any, reject: any): void {
  const status: httpCode = res.data.errcode;
  if (status === ERR_OK) {
    resolve(res);
  } else if (status === ERR_UNLOGIN) {
    goLogin();
  } else if (status === ERR_LOGIN_TIMEOUT) {
    goLogin();
  } else {
    reject(res);
  }
}

/**
 * 请求错误处理
 */
function handleHttpRequestError(err: any, resolve: any, reject: any): void {
  const status: number = err.request.status || err.status;
  message.error(`服务器异常(status code:${status ? status : 'xxxxx'})`);
  reject(err);
}
// 登录
function goLogin(): void {
  delLocalStorage('token');
  router.push({ path: '/login' });
}


import base from '../base';
import {
  LIVE_CENTER
} from "@/config/env";
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import md5 from 'js-md5';

// 登录
export function login(userName: string, password: string): AxiosPromise {
  const config: AxiosRequestConfig = {
    url: `${LIVE_CENTER}/login`,
    method: 'post',
    data: {
      username: userName,
      password: md5(password)
    }
  };
  return base(config);
}
// 获取用户头像
export function getHeader(): AxiosPromise {
  const config: AxiosRequestConfig = {
    url: `${LIVE_CENTER}/login/img`,
    method: 'get'
  };
  return base(config);
}

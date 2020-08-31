import base from './base';
import {
    INNERUSER,
    PROJECT_NAME
} from "@/config/env";
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import md5 from 'js-md5';

/**
 * 用户修改密码
 *
 * @export
 * @param {string} oldPwd
 * @param {string} newPwd
 * @returns {AxiosPromise}
 */
export function updateUserPassword(oldPwd: string, newPwd: string): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/user/updatePwd`,
        method: 'POST',
        data: {
            oldPwd: md5(oldPwd),
            newPwd: md5(newPwd)
        }
    };
    return base(config);
}

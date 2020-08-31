import base from '../base';
import {
    INNERUSER,
    PROJECT_NAME
} from "@/config/env";
import { AxiosPromise, AxiosRequestConfig } from 'axios';

const systemName: string = PROJECT_NAME;


/**
 * 获取用户组列表
 *
 * @export
 * @param {number} current
 * @param {number} size
 * @returns {AxiosPromise}
 */
export function getUserGroupList(current: number, size: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/group/list`,
        method: 'POST',
        data: {
            current, size, systemName
        }
    };
    return base(config);
}

/**
 * 新增用户组
 *
 * @export
 * @param {string} name
 * @param {string} remark
 * @returns {AxiosPromise}
 */
export function addUserGroup(name: string, remark: string): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/group/save`,
        method: 'POST',
        data: {
            name, systemName
        }
    };
    (typeof remark === 'string') && (config.data.remark = remark);
    return base(config);
}

/**
 * 修改用户组
 *
 * @export
 * @param {string} name
 * @param {string} remark
 * @returns {AxiosPromise}
 */
export function updateUserGroup(groupId: number, name: string, remark?: string): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/group/update`,
        method: 'POST',
        data: {
            groupId, name, systemName
        }
    };
    (typeof remark === 'string') && (config.data.remark = remark);
    return base(config);
}

/**
 * 获取用户组详情
 *
 * @export
 * @param {number} groupId
 * @returns {AxiosPromise}
 */
export function getUserGroupDetail(groupId: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/group/detail/${groupId}`,
        method: 'GET'
    };
    return base(config);
}

/**
 * 删除用户组
 *
 * @export
 * @param {number[]} groupIds
 * @returns {AxiosPromise}
 */
export function delUserGroup(groupIds: number[]): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/group/del`,
        method: 'POST',
        data: {
            groupIds
        }
    };
    return base(config);
}

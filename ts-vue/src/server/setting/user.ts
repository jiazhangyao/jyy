import base from '../base';
import {
    INNERUSER,
    PROJECT_NAME
} from "@/config/env";
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import md5 from 'js-md5';

// 用户列表
export function getUserList(current: number, size: number, userName: string, name: string): AxiosPromise {

    const data: any =  {current, size, };

    if (userName) data.username = userName;
    if (name) data.name = name;

    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/user/${PROJECT_NAME}/getUser`,
        method: 'post',
        data
    };
    return base(config);
}

// 获取用户组
export function getGroups(): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/user/${PROJECT_NAME}/getGroups`,
        method: 'get'
    };
    return base(config);
}
// 获取用户角色
export function getRoles(): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/user/${PROJECT_NAME}/getRoles`,
        method: 'get'
    };
    return base(config);
}
// 禁用/启用用户
export function changeStatus(id: number[], status: string): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/user/changeStatus`,
        method: 'post',
        data: {
            userIds: id,
            status
        }
    };
    return base(config);
}

// 添加用户
export function addUser(username: string, name: string, password: string, roleId: string, groups: string, status: boolean): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/user/${PROJECT_NAME}/addUser`,
        method: 'post',
        data: {
            username,
            name,
            password: md5(password),
            roleId,
            groups: JSON.parse(groups),
            status: status ? 'CLK' : 'ELB'
        }
    };
    return base(config);
}

// 编辑用户
export function editUser(id: number, username: string, name: string, roleId: string, groups: string, status: boolean): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/user/${PROJECT_NAME}/updateUser`,
        method: 'post',
        data: {
            id,
            username,
            name,
            roleId,
            groupIds: JSON.parse(groups),
            status: status ? 'CLK' : 'ELB'
        }
    };
    return base(config);
}

// 获取用户信息
export function getUserDetail(id: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/user/userDetail/${id}`,
        method: 'get'
    };
    return base(config);
}
// 修改用户密码
export function resetPwd(userId: number, pwd: string): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/user/resetPwd`,
        method: 'post',
        data: {
            userId,
            pwd: md5(pwd)
        }
    };
    return base(config);
}
// 拉取超级管理员
export function getAdmins(): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${INNERUSER}/user/getAdmins`,
        method: 'get'
    };
    return base(config);
}

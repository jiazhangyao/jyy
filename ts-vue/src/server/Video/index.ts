import { LIVE_CENTER, PROJECT_NAME, POLYV_API } from "@/config/env";
import { appId } from "@/config/polyv";
import base, { getToken } from "@/server/base";
import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance } from 'axios';

const polyvApiRequest: AxiosInstance = axios.create({
    baseURL: POLYV_API
});

/**
 * 获取polyv接口签名
 *
 * @export
 * @param {string} channelId
 * @param {string} userId
 * @param {('teacher' | 'admin' | 'guest' | 'assistant' | 'viewer')} role
 * @returns {AxiosPromise}
 */
export function getPolyvApiSignInfo(data: { [key: string]: string }): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${LIVE_CENTER}/sign/info`,
        method: 'POST',
        data: {
            signMap: data,
            hasSign: true
        }
    };
    return base(config);
}


/**
 * 调用polyv的api获取聊天室token
 *
 * @export
 * @param {string} channelId
 * @param {string} userId
 * @param {('teacher' | 'admin' | 'guest' | 'assistant' | 'viewer')} role
 * @returns {AxiosPromise}
 */
export function getPolyvChatToken(channelId: string, userId: string, role: UserType): AxiosPromise {
    return getPolyvApiSignInfo({ appId, channelId, userId, role, origin: PROJECT_NAME }).then(res => {
        return polyvApiRequest({
            url: '/live/v3/channel/common/get-chat-token',
            method: 'GET',
            params: {
                appId,
                channelId,
                userId,
                role,
                origin: PROJECT_NAME,
                timestamp: res.data.retval.timestamp,
                sign: res.data.retval.sign
            }
        });
    });
}


/**
 * 获取历史聊天记录
 *
 * @export
 * @param {string} channelId
 * @param {string} startDay
 * @param {string} endDay
 * @param {string} [page='1']
 * @param {string} [limit='1000']
 * @returns {AxiosPromise}
 */
export function getPolyvChatHistory(channelId: string, startDay: string, endDay: string, page: string = '1', limit: string = '1000'): AxiosPromise {
    return getPolyvApiSignInfo({ startDay, endDay, appId, page, limit }).then(res => {
        return polyvApiRequest({
            url: `/live/v2/chat/${channelId}/getHistory`,
            method: 'GET',
            params: {
                startDay,
                endDay,
                appId,
                page,
                limit,
                timestamp: res.data.retval.timestamp,
                sign: res.data.retval.sign
            }
        });
    });
}

/**
 * 获取历史提问记录
 *
 * @export
 * @param {string} channelId
 * @param {string} [begin='1']
 * @param {string} [end='-1']
 * @returns {AxiosPromise}
 */
export function getPolyvChatStudentQuestionHistory(channelId: string, begin: string = '1', end: string = '-1'): AxiosPromise {
    return getPolyvApiSignInfo({ appId, begin, end }).then(res => {
        return polyvApiRequest({
            url: `/live/v2/chat/${channelId}/getQuestion`,
            method: 'GET',
            params: {
                appId,
                begin,
                end,
                timestamp: res.data.retval.timestamp,
                sign: res.data.retval.sign
            }
        });
    });
}

/**
 * 获取频道禁言列表
 *
 * @export
 * @param {string} channelId
 * @param {('ip' | 'userId')} [type='userId']
 * @returns {AxiosPromise}
 */
export function getPolyvChatBannedList(channelId: string, type: 'ip' | 'userId' = 'userId'): AxiosPromise {
    return getPolyvApiSignInfo({ appId, channelId, type }).then(res => {
        return polyvApiRequest({
            url: `/live/v3/channel/chat/get-banned-list`,
            method: 'GET',
            params: {
                appId,
                channelId,
                type,
                timestamp: res.data.retval.timestamp,
                sign: res.data.retval.sign
            }
        });
    });
}

/**
 * 删除某条弹幕
 *
 * @export
 * @param {string} channelId
 * @param {string} barrageId
 * @returns {AxiosPromise}
 */
export function delPolyvChatBarrage(channelId: string, barrageId: string): AxiosPromise {
    return getPolyvApiSignInfo({ appId, channelId, id: barrageId }).then(res => {
        return polyvApiRequest({
            url: `/live/v2/chat/${channelId}/delChat`,
            method: 'GET',
            params: {
                appId,
                channelId,
                id: barrageId,
                timestamp: res.data.retval.timestamp,
                sign: res.data.retval.sign
            }
        });
    });
}

// 预查询礼物接口
export function getGiftList(): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${LIVE_CENTER}/gift/list`,
        method: 'GET'
    };
    return base(config);
}

// 获取课时信息
export function getPlanDetailInfo(planId: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${LIVE_CENTER}/course/selectByPlan/${planId}`,
        method: 'GET'
    };
    return base(config);
}

// 后端video项目socket
export function getVideoSocket(userId: string, planId: string, userType: 'THE' | 'SDT' = 'THE'): WebSocket {
    // return new WebSocket(`ws://10.8.0.30:8091/video/websocket/${userId}/${userType}/${planId}/${getToken()}`);
    return new WebSocket(`ws://${window.location.host + LIVE_CENTER}/websocket/${userId}/${userType}/${planId}/${getToken()}`);
}

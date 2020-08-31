import { LIVE_CENTER } from "@/config/env";
import base from "@/server/base";
import { AxiosRequestConfig, AxiosPromise } from 'axios';


/**
 * 弹幕列表
 *
 * @export
 * @param {string} channelId 频道号
 * @param {number} current 当前页
 * @param {number} size 每页总数
 * @param {string} [subjectId] 学员id
 * @param {string} [subjectName] 学员姓名
 * @param {string} [screenContent] 弹幕内容
 * @param {string} [sendDate] 发送日期
 * @returns {AxiosPromise}
 */
export function getScreenList(
    channelId: number,
    current: number,
    size: number,
    subjectId?: number,
    studentName?: string,
    screenContent?: string,
    sendDate?: string
    ): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${LIVE_CENTER}/bullet/screen/list`,
        method: 'POST',
        data: {
            channelId,
            current,
            size
        }
    };
    if (typeof subjectId !== 'undefined') {
        config.data.subjectId = subjectId;
    }
    if (typeof studentName !== 'undefined') {
        config.data.studentName = studentName;
    }
    if (typeof screenContent !== 'undefined') {
        config.data.screenContent = screenContent;
    }
    if (typeof sendDate !== 'undefined') {
        config.data.sendDate = sendDate;
    }
    return base(config);
}

/**
 * 禁言用户列表
 *
 * @export
 * @param {string} channelId 频道号
 * @param {number} current 当前页
 * @param {number} size 每页总数
 * @param {string} [subjectId] 学员id
 * @param {string} [subjectName] 学员姓名
 * @param {string} [sendDate] 发送日期
 * @returns {AxiosPromise}
 */
export function estoppelList(
    channelId: number,
    current: number,
    size: number,
    subjectId?: number,
    studentName?: string,
    sendDate?: string
    ): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${LIVE_CENTER}/estoppel/list`,
        method: 'POST',
        data: {
            channelId,
            current,
            size
        }
    };
    if (typeof subjectId !== 'undefined') {
        config.data.subjectId = subjectId;
    }
    if (typeof studentName !== 'undefined') {
        config.data.studentName = studentName;
    }
    if (typeof sendDate !== 'undefined') {
        config.data.sendDate = sendDate;
    }
    return base(config);
}

/**
 * 敏感词查询
 *
 * @export
 * @param {number} channelId
 * @param {number} [subjectId]
 * @param {number} [planId]
 * @returns {AxiosPromise}
 */
export function getKeyWords(channelId: number, subjectId?: number, planId?: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${LIVE_CENTER}/sensitive/word/list`,
        method: 'POST',
        data: {
            channelId
        }
    };
    if (typeof subjectId !== 'undefined') {
        config.data.subjectId = subjectId;
    }
    if (typeof planId !== 'undefined') {
        config.data.planId = planId;
    }
    return base(config);
}

/**
 * 敏感词保存
 *
 * @export
 * @param {number} channelId
 * @param {string[]} words
 * @param {number} [subjectId]
 * @param {number} [planId]
 * @returns {AxiosPromise}
 */
export function saveKeyWords(channelId: number, words: string[], subjectId?: number, planId?: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${LIVE_CENTER}/sensitive/word/save`,
        method: 'POST',
        data: {
            channelId,
            words
        }
    };
    if (typeof subjectId !== 'undefined') {
        config.data.subjectId = subjectId;
    }
    if (typeof planId !== 'undefined') {
        config.data.planId = planId;
    }
    return base(config);
}

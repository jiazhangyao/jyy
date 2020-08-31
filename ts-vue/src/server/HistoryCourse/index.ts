import { LIVE_CENTER } from "@/config/env";
import base from "@/server/base";
import { AxiosRequestConfig, AxiosPromise } from 'axios';

/**
 * 排课列表
 * @export
 * @param {number} current 当前页
 * @param {number} size 每页总数
 * @param {number} teacherId 用户id
 * @param {String} planName 课时名称
 * @param {number} presentTime 直播时间
 * @returns {AxiosPromise}
 */
export function getHistoryCourseList(
    current: number,
    size: number,
    teacherId: number,
    planName?: string,
    presentTime?: number

    ): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${LIVE_CENTER}/course/selectByHistory`,
        method: 'POST',
        data: {
            current,
            size,
            teacherId,
            planName,
            presentTime
        }
    };
    if (typeof teacherId !== 'undefined') {
        config.data.teacherId = teacherId;
    }
    if (typeof planName !== 'undefined') {
        config.data.planName = planName;
    }
    if (typeof presentTime !== 'undefined') {
        config.data.presentTime = presentTime;
    }

    return base(config);
}

import { LIVE_CENTER } from "@/config/env";
import base from "@/server/base";
import { AxiosRequestConfig, AxiosPromise } from 'axios';

/**
 * 直播统计
 * @export
 * @param {string} channelId 频道号
 * @param {number} current 当前页
 * @param {number} size 每页总数
 * @param {string} [subjectId]  课程ID
 * @param {string} [subjectName] 学员姓名
 * @returns {AxiosPromise}
 */
export function getLiveStatistics(
    channelId: number,
    current: number,
    size: number,
    subjectId?: number,
    studentName?: string
    ): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${LIVE_CENTER}/live/statistics`,
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
    return base(config);
}

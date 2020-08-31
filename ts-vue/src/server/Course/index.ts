import { LIVE_CENTER } from "@/config/env"; // VIDEO
import base from "@/server/base";
import { AxiosRequestConfig, AxiosPromise } from 'axios';

/**
 * 课时数量
 * @export
 * @param {number} current 当前页
 * @param {number} size 每页总数
 * @param {string} [courseDate] 排课日期
 * @returns {AxiosPromise}
 */

export function getCourseTotal(
  teacherId: any

  ): AxiosPromise {
  const config: AxiosRequestConfig = {
      url: `${LIVE_CENTER}/course/selectWeekByTotal/${teacherId}`,
      method: 'GET',
      data: {

      }
  };

  return base(config);
}

/**
 * 排课列表
 * @export
 * @param {number} teacherId 用户id
 * @param {Number} [presentTime] 排课日期
 * @returns {AxiosPromise}
 */

export function getCourseList(
  presentTime: number,
  teacherId: number
    ): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${LIVE_CENTER}/course/selectByDate`,
        method: 'POST',
        data: {
          presentTime,
          teacherId
        }
    };
    if (typeof presentTime !== 'undefined') {
        config.data.presentTime = presentTime;
    }
    if (typeof teacherId !== 'undefined') {
        config.data.teacherId = teacherId;
    }
    return base(config);
}




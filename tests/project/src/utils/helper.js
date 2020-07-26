/*
 * @Author: tim huang
 * @Date: 2019-01-30 19:21:10
 * @Last Modified by:   tim huang
 * @Last Modified time: 2019-01-30 19:21:10
 */

export const toBase64 = str => {
  return window.btoa(encodeURIComponent(escape(str)));
};

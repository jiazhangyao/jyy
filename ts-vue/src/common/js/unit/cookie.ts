import cookies from "browser-cookies";

/**
 * 设置cookie
 * @param name string cookie名
 * @param value string cookie值
 */
export function setCookie(name: string, value: string): void {
  // 设置samesite
  cookies.defaults.samesite = 'Strict';
  // 设置cookie 过期时间
  cookies.defaults.expires = 365;
  cookies.set(name, value);
}
/**
 * 删除cookie
 * @param name string cookie名
 */
export function delCookie(name: string): void {
  cookies.erase(name);
}
/**
 * 获取cookie
 * @param name string cookie名
 */
export function getCookie(name: string): string | null {
  return cookies.get(name);
}

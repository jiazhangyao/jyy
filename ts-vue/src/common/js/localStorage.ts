
/**
 * 设置localStorage
 * @param name string 名
 * @param value string 值
 */
export function setLocalStorage(name: string, value: string, isJSON: boolean = true): void {
  if (!value || !name) return;
  if (isJSON) {
    localStorage.setItem(name , JSON.stringify(value));
  } else {
    localStorage.setItem(name , value);
  }
}

/**
 * 删除localStorage
 * @param name string 名
 */
export function delLocalStorage(name: string): void {
  localStorage.removeItem(name);
}

/**
 * 获取localStorage
 * @param name string 名
 */
export function getLocalStorage(name: string, isJSON: boolean = true): any {
  // console.log(name);
  const data: string | null = localStorage.getItem(name);
  if (!data) {
    return null;
  }
  if (isJSON) {
    return JSON.parse(data);
  } else {
    return data;
  }
}

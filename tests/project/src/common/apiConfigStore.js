/**
 * @file API管理对象
 */

let instance = null;

class ApiConfig {

  const = {}

  constructor() {
    if (!instance) instance = this;
    return instance;
  }

  /**
   * 添加数据
   *
   */
  set(data) {
    this.const = { ...data };
  }

  get(key) {
    return this.const[key];
  }
}

export default new ApiConfig();

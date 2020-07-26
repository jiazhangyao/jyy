/** 字典管理对象 */

let instance = null;

class DynamicConst {
  const = {}

  constructor() {
    if (!instance) instance = this;
    return instance;
  }

  /**
   * 添加字典
   *
   */
  build(data) {
    this.const = {
      ...this.const,
      ...data
    };
  }

  getItem(key) {
    return this.const[key];
  }

  getArray(key) {
    const item = this.const[key];
    if (!item) {
      return [];
    }

    return Object.keys(item).map(
      key => ({label: item[key], value: key}),
    );
  }

  getTextFromValue(key, value) {
    const item = this.getItem(key);
    return item ? item[value] || "--" : null;
  }
}

export default new DynamicConst();

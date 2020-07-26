
// 2019-11-20号之前的业务页面，设置成默认展示的card
// 为数组，值是ModuleMap的value值
export const defaultModules = [
  function (data) { return this.getUserInfo({ dataSource: data.buyerSetTimes, title: '受让人套次信息' }) },
  function (data) { return this.getUserInfo({ dataSource: data.sellerSetTimes, title: '转让人套次信息' }) },
];

/**
 * ModuleMap{
 *  key: 是个函数，用于判断当前Card是否展示，返回值true展示，false不展示
 *  value: 渲染DOM的函数
 *         该函数不能是箭头函数（会取不到this），函数定义在StatusInfoDetail组件里
 */
export const ModuleMap = new Map();

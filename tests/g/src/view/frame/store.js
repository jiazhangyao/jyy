import { observable, action } from "mobx";
import { getToken, baseInfo, sideMenu, queryModule, dict, filehost, logout, openApi } from "./service";
import storeMgr from "utils/storeManager";
import { MENUS } from "common/const";
import dynamicConst from 'common/dynamicConst';
import history from "utils/history";
import tools from 'utils/tools';

export const moduleName = "frame";

class Store {
  sideMenusArr = MENUS; // 侧边栏
  @observable
  newSideMenuArr = [];

  @observable
  userInfo = undefined; // 获取用户信息，根据登录状态确定页面跳转

  @observable
  moduleInfo = {}; // 保存系统基本配置信息

  @observable
  dictInfo = {}; // 保存系统定义字典信息，只保存不操作

  @observable
  isEstateCenter = undefined; // 是否开启不动产中心，1表示开启

  /** 页面初始化 */
  @action
  init = async () => {
    
    // let res = await this.getBaseInfo("", false);
    // if (!res.success) {
      const tokenRes = await getToken();
      tokenRes.success && await this.getBaseInfo(tokenRes.data, true);
    // }
  };

  /** 获取用户信息 */
  @action
  getBaseInfo = async (token, block) => {
    this.userInfo = undefined;
    const res = await baseInfo(token, block);
    if (res.success) {
      let userInfo = res.data.accountInfo || {};
      if (userInfo.departmentId !== undefined) {
        userInfo.department = userInfo.departmentId;
      }

      this.userInfo = userInfo;

      await this.getSideMenu();
      await this.getDict();
      await this.getModule();
      await this.getFileHost();
      await this.getOpenApi();
    }
    return res;
  };

  /** 获取字典 */
  @action.bound
  async getDict() {
    const res = await dict();
    if (res.success) {
      dynamicConst.build(res.data);
    }
  }

  /** 图片host地址 */
  @action.bound
  async getFileHost() {
    const res = await filehost();
    if (res.success) {
      dynamicConst.build({ "filehost": res.data });
    }
  }

  /** 不动产中心 */
  @action.bound
  async getOpenApi() {
    const res = await openApi();
    if (res.success) {
      this.isEstateCenter = res.data.isEstateCenter;
    }
  }

  /** 侧边栏菜单 */
  @action.bound
  async getSideMenu() {
    const res = await sideMenu();
    if (res.success) {
      this.newSideMenuArr = res.data;
      const pathname = window.location.pathname;
      let moduleName = pathname.split('/')[3];
      if (!moduleName) {
        let url = tools.getFirstLevelUrl(res.data);
        history.push(url);
      }
    }
  }

  /** 获取页面基础配置信息 */
  @action.bound
  async getModule() {
    const res = await queryModule();
    if (res.success) {
      this.moduleInfo = res.data.constant;

      // 判断是否开启区块链模块，如果未开启则隐藏工单详情页的“上链状态”card
      let arr = res.data.module.filter(cur => cur.id === 17 && cur.isOpen === 1);
      // console.log('❤arr', arr)
      dynamicConst.build({ "TRADING_BLOCKCHAIN": arr.length > 0 });
    }
  }

  @action
  logout = async () => {
    this.userInfo = undefined;
    const res = await logout();
    if (res.success) {
      history.logout();
    }
  };
}

storeMgr.register(moduleName, new Store());

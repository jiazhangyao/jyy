/*
 * @Author: tim huang
 * @Date: 2018-12-10 09:06:21
 * @Last Modified by: tim huang
 * @Last Modified time: 2019-01-16 16:20:44
 */

import { createBrowserHistory } from "history";

class AppHistory {
  constructor(history) {
    this.history =
      history ||
      createBrowserHistory({
        basename: process.env.REACT_APP_ROUTE_PATH
      });
  }

  push = router => {
    this.history && this.history.push(router);
  };

  getAppHistory = () => this.history;
  goHome = () => {
    this.push(process.env.REACT_APP_DEFAULT_PAGE);
    return null;
  };
  logout = () => {
    if (window.location.href.indexOf(process.env.REACT_APP_LOGIN_PAGE) < 0) {
      if (process.env.REACT_APP_THIRD_PLATFORM_LOGIN_PAGE) {
        // 第三方系统
        window.location.href = process.env.REACT_APP_THIRD_PLATFORM_LOGIN_PAGE;
      } else {
        // 站内
        // this.push(process.env.REACT_APP_LOGIN_PAGE);

        // update by jjhuo 20190220
        window.location.replace(process.env.REACT_APP_LOGIN_PAGE);
      }
    }
  };
}

export default new AppHistory();

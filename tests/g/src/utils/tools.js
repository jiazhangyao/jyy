import { createBrowserHistory } from "history";

class AppTools {
  constructor(history) {
    this.history =
      history ||
      createBrowserHistory({
        basename: process.env.REACT_APP_ROUTE_PATH
      });
  }

  goHome = () => {
    this.push(process.env.REACT_APP_DEFAULT_PAGE);
    return null;
  }

  getFirstLevelUrl = (menus) => {
    let defaultUrl = '';
    for (let index = 0; index < menus.length; index++) {
      let menuItem = menus[index];
      if (menuItem.children && menuItem.children.length) {
        defaultUrl = menuItem.children[0].path;
        break;
      }
      defaultUrl = menuItem.path;
      break;
    }
    return defaultUrl;
  }

  resetToTop = () => {
    document.querySelector("html").scrollTop = 0;
    document.querySelector("body").scrollTop = 0;
    document.querySelector(".app").scrollTop = 0;
  }
}

export default new AppTools();


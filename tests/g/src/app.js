import ReactDOM from "react-dom";
import routes from "./routers";
import storeMgr from "utils/storeManager";
import history from "utils/history";
import "./app.less";

import moment from "moment";
import "moment/locale/zh-cn";

import { configure } from "mobx";
moment.locale("zh-cn");
// configure({
//   enforceActions: "always"
// });

ReactDOM.render(
  routes(storeMgr.getStores(), history.getAppHistory()),
  document.getElementById("app")
);

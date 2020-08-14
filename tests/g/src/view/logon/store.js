/*
 * @Author: minza.zhang
 * @Date: 2018-11-07 11:49:39
 * @Last Modified by: xiaopei
 * @Last Modified time: 2019-02-20 15:49:02
 */
import {action, observable, runInAction} from "mobx";
import storeMgr from "utils/storeManager";
import {login, newLogin, queryModule} from "./service";
import {toBase64} from "utils/helper";
import {message} from "components";
import {BaseStore, EditStore} from "super/store";
import history from "utils/history";

export const moduleName = "logon";

class Store extends EditStore {
  @observable errorRow = null;
  @observable errorCode = "";

  @observable moduleInfo = {
    TRADING_GM_NAME: ""
  };

  @observable imgAuthCode = "";

  @action init = async () => {
    const res = await queryModule();
    if (res.success) {
      this.moduleInfo = res.data.constant
    }
    this.changeCaptcha()
  }

  @action submit = async values => {
    values.password = toBase64(values.password);
    const res = await newLogin(values);
    if (res.success) {
      history.goHome();
      this.errorCode = "";
    } else {
      this.errorCode = res.errorCode;
      if (this.errorCode == 10018 || this.errorCode == 10038 || this.errorCode == 10040 || this.errorCode == 10041) {
        this.changeCaptcha()
      }
      this.failHandler(res);
    }
  };

  @action onFieldsChange = () => {
    this.errorRow = null;
  };

  @action changeCaptcha = () => {
    this.imgAuthCode = `/modules/api/account/common/imgcode?imgCodeType=2&t=${new Date().valueOf()}`;
  };
}

storeMgr.register(moduleName, new Store());

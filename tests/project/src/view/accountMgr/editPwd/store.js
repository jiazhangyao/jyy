import { action, observable, runInAction } from "mobx";
import storeMgr from "utils/storeManager";
import { submitNewPwd } from "./service";
import { EditStore } from "super/store";
import { message } from "components";
import { toBase64 } from "utils/helper";
import history from "utils/history";
import { EditPage } from "super/page";
const { PAGE_TYPES } = EditPage;
export const moduleName = "editPwd";

class Store extends EditStore {
  crumbList = [{name: "账户管理"}, {name: "个人账户设置", url: "/account/self/info/list"}, {name: "修改密码"}];

  @observable errorCode = '';
  @observable imgAuthCode = "";
  @action init = async () => {
    this.changeCaptcha()
  }
  @action submit = async values => {
    values.prePassword = toBase64(values.prePassword);
    values.newPassword = toBase64(values.newPassword);
    values.confirmPassword = toBase64(values.confirmPassword);
    const res = await submitNewPwd(values);
    if (res.success) {
      message.success("修改密码成功");
      this.errorCode = '';
      history.logout();
    } else {
      this.errorCode = res.errorCode;
      if (this.errorCode == 10039 || this.errorCode==10040 || this.errorCode == 10018) {
        this.changeCaptcha()
      }
      this.failHandler(res);
    }
  };

  @action onCancal = () => {
    history.push("/account/self/info/list");
  }
  @action changeCaptcha = () => {
    this.imgAuthCode = `/modules/api/account/common/imgcode?t=${new Date().valueOf()}`;
  };
}

storeMgr.register(moduleName, new Store());
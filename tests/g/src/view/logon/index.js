import React from "react";
import { inject, observer } from "mobx-react";
import "./style.less";
import { EditPage } from "super/page";
import createForm from "utils/createForm";
import { moduleName } from "./store";
import { Button } from "antd";
import { InputField } from "components/formItem";
import logo from "./img/logo_login.png";
import { prefix } from "common/const";

const clsPrefix = "login-page";

@inject(stores => ({ store: stores[moduleName] }))
@createForm({ clsPrefix })
@observer
class Login extends EditPage {
  constructor(props) {
    super(props);
  }
  //图形验证码提交
  selfHandleSubmit = (e) =>{
    const { handleSubmit,form} = this.props;
    handleSubmit(e);
    form.setFieldsValue({'imgAuthCode':''});
  };

  //改变图形验证码
  handleChangeCaptcha = () => {
    const { store: { changeCaptcha },form } = this.props;
    changeCaptcha();
    form.setFieldsValue({'imgAuthCode':''});
  };


  renderForm() {
    const {
      form: { getFieldDecorator: creator },
      store: {
        loading, errorRow, errorCode,
        moduleInfo: { TRADING_GM_NAME }, imgAuthCode
      }
    } = this.props;

    return (
      <>
        <div className={`${clsPrefix}-content`}>
          <div className={`${clsPrefix}-content-logo`}>
            <img
              className={`${clsPrefix}-content-logo-img`}
              src={logo}
              alt={TRADING_GM_NAME}
            />
            <span className={`${clsPrefix}-content-logo-txt`}>
              {TRADING_GM_NAME}
            </span>
          </div>
          <div className={`${clsPrefix}-content-form`}>
            {errorRow && (
              <p className={`${clsPrefix}-content-error-row`}>
                <span className="iconfont">&#xe6a3;</span>
                {errorRow}
              </p>
            )}
            <div className={`${clsPrefix}-content-field`}>
              <InputField
                field="loginNo"
                req={true}
                msg={
                  <span className="error-text">
                    <span className="iconfont">&#xe698;</span>
                    <span>账户名不能为空</span>
                  </span>
                }
                placeholder="账户名"
                creator={creator}
              />
              <hr className={`${clsPrefix}-content-field-line`} />
              <InputField
                field="password"
                req={true}
                msg={
                  <span className="error-text">
                    <span className="iconfont">&#xe698;</span>
                    <span>密码不能为空</span>
                  </span>
                }
                autoComplete="off"
                type="password"
                placeholder="密码"
                creator={creator}
                onPressEnter={this.selfHandleSubmit}
              />

              {(errorCode == 10018 || errorCode == 10038 || errorCode == 10040 || errorCode == 10041) &&
                <>
                  <hr className={`${clsPrefix}-content-field-line`} />
                  <InputField
                    field="imgAuthCode"
                    req={true}
                    msg={
                      <span className="error-text">
                        <span className="iconfont">&#xe698;</span>
                        <span>图形验证码不能为空</span>
                      </span>
                    }
                    placeholder="图形验证码"
                    creator={creator}
                    onPressEnter={this.selfHandleSubmit}
                    suffix={
                      <div className="code-captcha-img" onClick={this.handleChangeCaptcha}>
                        <img width="60" height="24" src={imgAuthCode} alt="图形验证码" />
                      </div>
                    }
                  />
                </>
              }

            </div>
          </div>
          <Button
            className={`${clsPrefix}-action-submit`}
            onClick={this.selfHandleSubmit}
            type="primary"
            size="large"
            loading={loading}
          >
            登录
          </Button>
        </div>
      </>
    );
  }
}

export default Login;

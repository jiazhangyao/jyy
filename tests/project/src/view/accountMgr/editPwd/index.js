import React from "react";
import { inject, observer } from "mobx-react";
import { EditPage } from "super/page";
import { moduleName } from "./store";
import { Input } from "antd";
import { Button } from "components";
import Card from "mt-card";
import { prefix } from "common/const";
const { PrimaryButton, NoBorderButton } = Button;
const { editForm, PAGE_TYPES } = EditPage;

@inject(stores => ({ store: stores[moduleName] }))
@editForm({ clsPrefix: "editPwd" })
@observer
class EditPwd extends EditPage {

  constructor(props) {
    super(props);
  }

  selfHandleSubmit = (e) =>{
    const { handleSubmit,form} = this.props;
    handleSubmit(e);
    form.setFieldsValue({'imgAuthCode':''});
  };

  // 改变图形验证码
  handleChangeCaptcha = () => {
    const { store: { changeCaptcha },form } = this.props
    changeCaptcha()
    form.setFieldsValue({'imgAuthCode':''});
  };

  verifyPassword = (rule, value, callback) => {
    if (value === '') {
      callback('请输入密码');
    }
    if (value && (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value) || /[\uFF00-\uFFEF]/.test(value) || !/^(?![a-zA-z]+$)(?!\d+$)(?![!\"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]+$)[a-zA-Z\d!\"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]{8,12}$/.test(value))) {
      callback('最短8位且包含字母和数字，不能超过12位');
    } else {
      callback();
    }
  }

  confirmPassword = (rule, value, callback) => {
    const { form: {getFieldValue} } = this.props

    if (value === '') {
      callback('请确认新密码');
    }
    if (value !== getFieldValue("newPassword")) {
      callback('新密码和确认密码输入不一致');
    }
    callback();
  }

  renderForm() {
    const { FormField } = this;
    const { errorCode,imgAuthCode } = this.props.store;
    return (
      <>
        <Card rowLen={1}>
          <FormField
            id="prePassword"
            label="原密码"
            required
            message="请输入原密码"
            options={{
              width: "224px" ,
              // rules:[{validator: this.verifyPassword}]
            }}
          >
            <Input type="password" placeholder="请输入"/>
          </FormField>
          <FormField
            id="newPassword"
            label="新密码"
            required
            message="请输入新密码"
            options={{
              width: "224px" ,
              rules:[{validator: this.verifyPassword}]
            }}
          >
            <Input type="password" placeholder="请输入"/>
          </FormField>
          <FormField
            id="confirmPassword"
            label="确认新密码"
            required
            message="请确认新密码"
            options={{
              width: "224px" ,
              rules:[{validator: this.confirmPassword}]
            }}
          >
            <Input type="password" placeholder="请输入"/>
          </FormField>

          { (errorCode == 10039 || errorCode == 10040 || errorCode == 10018 || errorCode == 10041) &&
              <>
                <FormField
                    id="imgAuthCode"
                    label="图形验证码"
                    required
                    message="请输入图形验证码"
                    options={{ width: "224px" }}
                >
                  <Input type="value" placeholder="请输入"
                     suffix={
                       <div className="code-captcha-img" onClick={this.handleChangeCaptcha}>
                          <img width="60" height="24" src={imgAuthCode} alt="图形验证码" />
                        </div>
                     }
                  />
                </FormField>

              </>
          }
        </Card>
      </>
    );
  }
  actionRender() {
    return (
      <>
        <PrimaryButton activePage={PAGE_TYPES.EDIT} onClick={this.selfHandleSubmit}>
          确认修改
        </PrimaryButton>
        <NoBorderButton onClick={this.onCancal}>取消</NoBorderButton>
      </>
    );
  }
}

export default EditPwd;

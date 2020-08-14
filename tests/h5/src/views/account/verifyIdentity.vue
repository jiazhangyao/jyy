<template>
  <div>
    <NavBar navTitle="实人认证"/>
    <div class="form-container">
      <van-cell-group>
        <van-field v-model="realName" placeholder="请输入真实姓名" :disabled="isNameDisabled" clearable/>
        <van-field v-model="identityID" placeholder="请输入身份证号码" :disabled="isIdDisabled" clearable/>
        <van-field v-model="smsCode" placeholder="请输入6位短信验证码" clearable class="code-wrapper">
          <sms-btn
            slot="button"
            url="/modules/api/account/common/reset/msgcode"
            :params="smsCodeParams"
            :clickable="smsBtnClickable"
            @propsAction="banAction"
          />
        </van-field>
      </van-cell-group>
      <div class="btn-confirm">
        <van-button type="info" @click="checkIdentity" :disabled="isBtnDisabled">验证</van-button>
      </div>
    </div>
    <captcha-modal
      :codeSrc="codeSrc"
      :isShow="isShowCaptcha"
      url="/modules/api/account/common/reset/msgcode/validate"
      :params="captchaParams"
      @cancel="captchaCancel"
      @succeed="captchaSucceed"
    />
  </div>
</template>
<script>
import { Field, Button, CellGroup, Checkbox, Toast } from "vant";
import SmsBtn from "../../components/smsBtn";
import CaptchaModal from "../../components/captchaModal";
import request from "../../utils/request";
const sourceType = process.env.VUE_APP_SOURCE_TYPE;
export default {
  name: "verifyIdentity",
  components: {
    SmsBtn,
    CaptchaModal,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Checkbox.name]: Checkbox
  },
  props: ["info", "type"],
  data() {
    return {
      isShowCaptcha: false,
      realName: "",
      identityID: "",
      smsCode: "",
      codeSrc: `/modules/api/account/common/imgcode?`,
      isNameDisabled: false,
      isIdDisabled: false
    };
  },
  computed: {
    baseinfo() {
      return this.info;
    },
    isBtnDisabled() {
      if (this.realName === "" || this.identityID === "" || this.smsCode === "")
        return true;
      return false;
    },
    smsBtnClickable() {
      return this.realName !== "" && this.identityID !== "";
    },
    smsCodeParams() {
      const { mobile } = this.info;
      return {
        name: this.realName,
        identity: this.identityID,
        mobile,
        type: this.type
      };
    },
    captchaParams() {
      return {
        msgCode: this.smsCode,
        type: this.type
      };
    }
  },
  methods: {
    closeCaptchaModal() {
      this.isShowCaptcha = false;
    },
    captchaCancel() {
      this.closeCaptchaModal();
    },
    captchaSucceed() {
      this.closeCaptchaModal();
      this.$emit("next");
    },
    checkIdentity() {
      request("/modules/api/account/common/reset/msgcode/validate", {
        method: "post",
        data: this.captchaParams
      }).then(({ success, errorCode, globalError }) => {
        if (success) {
          Toast("验证成功");
          this.$emit("next");
        } else if (
          [10021, 10023, 10038, 10040, 10041, 10018, 10029].indexOf(
            +errorCode
          ) > -1
        ) {
          this.isShowCaptcha = true;
        } else {
          Toast(globalError);
        }
      });
    },
    banAction() {
      this.isNameDisabled = true;
      this.isIdDisabled = true;
    }
  }
};
</script>

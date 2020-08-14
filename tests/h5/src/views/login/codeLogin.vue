<template>
  <div>
    <!-- <NavBar :navTitle="title"/> -->
    <van-field v-model="phoneNum" placeholder="请输入手机号" clearable/>
    <van-field v-model="codeNum" placeholder="请输入验证码" clearable>
      <sms-btn
        slot="button"
        url="/modules/api/account/common/msg/code"
        :params="smsCodeParams"
        :clickable="smsBtnClickable"
      />
    </van-field>
    <van-button type="info" class="login-btn" @click="onCodeLogin" :disabled="isBtnDisabled">登录</van-button>
    <captcha-modal
      :codeSrc="codeSrc"
      :isShow="isShowCaptcha"
      :url="actionUrl"
      :params="captchaParams"
      @cancel="captchaCancel"
      @succeed="captchaSucceed"
    />
  </div>
</template>
<script>
import { Field, Button } from "vant";
import SmsBtn from "../../components/smsBtn";
import CaptchaModal from "../../components/captchaModal";
import { mapState } from "vuex";
export default {
  name: "codeLogin",
  components: {
    SmsBtn,
    CaptchaModal,
    "van-field": Field,
    "van-button": Button
  },
  data() {
    return {
      title: "验证码登录",
      phoneNum: "",
      codeNum: "",
      actionUrl: `/modules/api/account/common/${this.isErp}/code/login`,
      codeSrc: `/modules/api/account/common/imgcode?`
    };
  },
  props: {
    isErp: {
      type: Number
    }
  },
  computed: {
    isBtnDisabled() {
      if (this.phoneNum === "" || this.codeNum === "") return true;
      return false;
    },
    smsBtnClickable() {
      const reg = /^1(3|4|5|7|8)\d{9}$/;
      return reg.test(this.phoneNum);
    },
    smsCodeParams() {
      return {
        mobile: this.phoneNum,
        type: 4
      };
    },
    // imgCodeParams(){
    //   return {
    //     mobile: this.phoneNum,
    //     type: 4
    //   }
    // },
    captchaParams() {
      return {
        mobile: this.phoneNum,
        msgAuthCode: this.codeNum,
        sourceType: this.isErp
      };
    },
    ...mapState({
      isShowCaptcha: state => state.login.isShowCodeCaptcha
    })
  },
  methods: {
    closeCaptchaModal() {
      this.$store.commit("login/setIsShowCodeCaptcha", false);
    },
    captchaCancel() {
      this.closeCaptchaModal();
    },
    captchaSucceed() {
      this.closeCaptchaModal();
      this.$router.push("home");
    },
    onCodeLogin() {
      this.$store.dispatch("login/codeLogin", this.captchaParams);
    }
  }
};
</script>


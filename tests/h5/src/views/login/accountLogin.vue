<template>
  <div>
    <!-- <NavBar :navTitle="title"/> -->
    <van-field v-model="userName" placeholder="请输入身份证号/手机号" clearable/>
    <password-field v-model="password" placeholder="请输入登录密码"/>
    <van-button type="info" class="login-btn" @click="onAccountLogin" :disabled="isBtnDisabled">登录</van-button>
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
import PasswordField from "../../components/passwordField";
import { toBase64 } from "../../utils/utils.js";
import CaptchaModal from "../../components/captchaModal";
import { mapState } from "vuex";
export default {
  name: "accountLogin",
  components: {
    "van-field": Field,
    "van-button": Button,
    PasswordField,
    CaptchaModal
  },
  data() {
    return {
      title: "账号登录",
      // userName: "13912345678",
      // userName: "15011290007",
      // userName: '19921609121',
      // userName: "15938365602",
      // userName: '18101550733',
      // password: "abc123456",
      userName: "",
      password: "",
      codeSrc: `/modules/api/account/common/imgcode?imgCodeType=2&`,
      actionUrl: `http://hljhg-jiaoyi.st.anhouse.com.cn//modules/api/account/common/${this.isErp}/login`
    };
  },
  props: {
    isErp: {
      type: Number
    }
  },
  computed: {
    isBtnDisabled() {
      if (this.userName === "" || this.password === "") return true;
      return false;
    },
    captchaParams() {
      return {
        loginNo: this.userName,
        password: toBase64(this.password),
        sourceType: this.isErp
      };
    },
    ...mapState({
      isShowCaptcha: state => state.login.isShowAccountCaptcha
    })
  },
  methods: {
    closeCaptchaModal() {
      this.$store.commit("login/setIsShowAccountCaptcha", false);
    },
    captchaCancel() {
      this.closeCaptchaModal();
    },
    captchaSucceed() {
      this.closeCaptchaModal();
      this.$router.push({ name: "home" });
    },
    onAccountLogin() {
      this.$store.dispatch("login/accountLogin", this.captchaParams);
    }
  }
};
</script>

<template>
  <div>
    <van-button class="btn-code" @click="onClick" :disabled="isDisabled">{{btnText}}</van-button>
    <captcha-modal
      :codeSrc="codeSrc"
      :isShow="isShowCaptcha"
      :url="actionUrl"
      :params="params"
      @cancel="captchaCancel"
      @succeed="captchaSucceed"
    />
  </div>
</template>
<script>
import { Button, Toast, Field } from "vant";
import request from "../utils/request";
import CaptchaModal from "./captchaModal";
const sourceType = process.env.VUE_APP_SOURCE_TYPE;
export default {
  name: "smsBtn",
  components: {
    "van-button": Button,
    "van-field": Field,
    CaptchaModal
  },
  props: ["url", "params", "clickable"],
  data() {
    return {
      btnText: "获取验证码",
      countdown: 60,
      timer: "",
      timing: false,
      isShowCaptcha: false,
      actionUrl: "/modules/api/account/common/msg/code",
      codeSrc: `/modules/api/account/common/imgcode?`,
    };
  },
  computed: {
    isDisabled() {
      return !this.clickable || this.timing;
    }
  },
  methods: {
    onClick(){
      request(this.url, {
        method: "post",
        data: this.params
      }).then(({ success, errorCode, msg }) => {
        if (success) {
          this.$emit("propsAction");
          Toast("已发送验证码");
          this.timing = true;
          this.timer = setInterval(() => {
            if (this.countdown > 1) {
              this.countdown--;
              this.btnText = `${this.countdown}s重新获取`;
            } else {
              this.timing = false;
              this.countdown = 60;
              this.btnText = "重新获取";
              clearInterval(this.timer);
            }
          }, 1000);
        } else if ([10021, 10023, 10038, 10040, 10041, 10018, 10029].indexOf(+errorCode) > -1) {
           this.isShowCaptcha = true;
        } else {
          Toast(msg);
        }
      });
    },
    closeCaptchaModal() {
      this.isShowCaptcha = false;
    },
    captchaCancel() {
      this.closeCaptchaModal();
    },
    captchaSucceed(){
      this.closeCaptchaModal();
    },
  }
};
</script>
<style lang="less">

</style>

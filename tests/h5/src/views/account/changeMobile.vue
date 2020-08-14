<template>
  <div>

    <NavBar :navTitle="title"/>
    <template v-if="step === 'one'">
      <verify-identity :info="baseinfo" :type="3" @next="jumpTwo"/>
    </template>
    <template v-if="step === 'two'">
      <div class="form-container">
        <van-cell-group>
          <van-field v-model="newMobile" placeholder="请输入新手机号" clearable/>
          <van-field v-model="newSmsCode" placeholder="请输入6位短信验证码" clearable class="code-wrapper">
            <sms-btn
              slot="button"
              url="/modules/api/account/common/msg/code"
              :params="smsCodeParams"
              :clickable="smsBtnClickable"
            ></sms-btn>
          </van-field>
        </van-cell-group>
        <div class="btn-confirm">
          <van-button type="info" @click="onsubmit" :disabled="isDisabled">提交</van-button>
        </div>
      </div>
    </template>
    <template v-if="step === 'three'">
      <CommonSuccess
        result="手机号更换成功"
        autoText="自动返回账号设置"
        btnText="返回账号设置"
        linkUrl="/"
      />
    </template>
    <captcha-modal
      :codeSrc="codeSrc"
      :isShow="isShowCaptcha"
      url="/modules/api/account/common/reset/mobile"
      :params="captchaParams"
      @cancel="captchaCancel"
      @succeed="captchaSucceed"
    />
  </div>
</template>
<script>
import CommonSuccess from "../../components/commonSuccess";
import VerifyIdentity from "./verifyIdentity";
import { Field, Button, CellGroup, Toast } from "vant";
import SmsBtn from "../../components/smsBtn";
import CaptchaModal from "../../components/captchaModal";
import { mapState } from "vuex";
const sourceType = process.env.VUE_APP_SOURCE_TYPE;
export default {
  name: "changeMobile",
  components: {
    CommonSuccess,
    VerifyIdentity,
    SmsBtn,
    CaptchaModal,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      title: this.step === 'one' ? "更换手机号" : (this.step === 'two' ? "新手机号校验" : "更换成功"),
      realName: "",
      identityID: "",
      smsCode: "",
      isShowModal: false,
      newMobile: "",
      newSmsCode: "",
      codeSrc: `/modules/api/account/common/imgcode?`,
    };
  },
  computed: {
    baseinfo() {
      return this.$store.getters.baseinfo || {};
    },
    smsCodeParams() {
      return {
        mobile: this.newMobile,
        type: 3
      };
    },
    captchaParams() {
      return {
        mobile: this.newMobile,
        msgAuthCode: this.newSmsCode
      };
    },
    smsBtnClickable() {
      const reg = /^1(3|4|5|7|8)\d{9}$/;
      return reg.test(this.newMobile);
    },
    isDisabled() {
      return this.newMobile === "" || this.newSmsCode === "";
    },
    ...mapState({
      step: state => state.account.resetMobileStep,
      isShowCaptcha: state => state.account.isShowCaptcha
    })
  },
  methods: {
    closeCaptchaModal() {
      this.$store.commit("account/setIsShowCaptcha", false);
    },
    captchaCancel() {
      this.closeCaptchaModal();
    },
    captchaSucceed(){
      this.closeCaptchaModal();
      this.$store.commit("account/setResetMobileStep", "three");
    },
    jumpTwo() {
      this.$store.commit("account/setResetMobileStep", "two");
    },
    onsubmit() {
      const reg = /^1(3|4|5|7|8)\d{9}$/;
      if(reg.test(this.newMobile)){ 
        this.$store.dispatch("account/resetMobile", this.captchaParams);
      }else{
        Toast("手机号格式不正确");
      }
    }
  },
  mounted() {
    this.$store.commit("account/setResetMobileStep", "one");
  }
};
</script>

<style lang="less">
.btn-confirm {
  margin-top: 40px;
  padding: 0 16px;
  .van-button {
    width: 100%;
  }
}
</style>
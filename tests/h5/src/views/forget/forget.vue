<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="form-container">
      <template v-if="step === 'one'">
        <van-cell-group>
          <van-field v-model="realName" placeholder="请输入真实姓名" clearable/>
          <van-field v-model="identityID" placeholder="请输入身份证号" clearable/>
        </van-cell-group>
        <div class="btn-confirm">
          <van-button type="info" @click="getSMSCode" :disabled="isFirstBtnDisabled">下一步</van-button>
        </div>
      </template>
      <template v-if="step === 'two'">
        <p class="phone-info">验证码已发送到手机{{phoneNumber}}</p>
        <van-cell-group>
          <van-field v-model="smsCode" placeholder="请输入6位短信验证码" class="code-wrapper" clearable>
            <van-button
              class="btn-code"
              slot="button"
              @click="getSMSCode"
              :disabled="isCountdown"
            >{{ btnText }}</van-button>
          </van-field>
        </van-cell-group>
        <div class="btn-confirm">
          <van-button type="info" @click="checkAuth" :disabled="isSecondBtnDisabled">验证</van-button>
        </div>
      </template>
      <template v-if="step === 'three'">
        <div class="setpassword-container">
          <van-cell-group>
            <password-field v-model="newPassword" placeholder="请输入新密码"/>
          </van-cell-group>
          <p class="tips">8-15位，数字、大小写字母、符号至少包含两种（除空格）</p>
          <div class="btn-confirm">
            <van-button type="info" @click="resetPassword" :disabled="isThirdBtnDisabled">确定</van-button>
          </div>
        </div>
      </template>
      <template v-if="step === 'four'">
        <CommonSuccess result="设置成功" autoText="自动返回登录" btnText="返回登录" linkUrl="/login"/>
      </template>
      <captcha-modal
        :codeSrc="codeSrc"
        :isShow="isShowCaptcha"
        :url="actionUrl"
        :params="captchaParams"
        @cancel="captchaCancel"
        @succeed="captchaSucceed"
      />
      <captcha-modal
        :codeSrc="codeSrc"
        :isShow="isShowCaptcha1"
        :url="actionUrl1"
        :params="captchaParams1"
        @cancel="captchaCancel1"
        @succeed="captchaSucceed1"
      />
    </div>
  </div>
</template>
<script>
import { Field, Button, CellGroup, Toast } from "vant";
import PasswordField from "../../components/passwordField";
import CaptchaModal from "../../components/captchaModal";
import CommonSuccess from "../../components/commonSuccess";
import { toBase64, validatePassword } from "../../utils/utils.js";
import { mapState } from "vuex";

const sourceType = process.env.VUE_APP_SOURCE_TYPE;

export default {
  name: "authentication",
  components: {
    CaptchaModal,
    CommonSuccess,
    PasswordField,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      title:
        this.step === "three"
          ? "设置新密码"
          : this.step === "four"
          ? "设置成功"
          : "忘记密码",
      realName: "",
      identityID: "",
      smsCode: "",
      newPassword: "",
      btnText: "获取验证码",
      countdown: 60,
      timer: "",
      imgcode: "",
      actionUrl: `/modules/api/account/common/${sourceType}/forget/msgcode`,
      actionUrl1: `/modules/api/account/common/${sourceType}/forget/msgcode/validate`,
      codeSrc: `/modules/api/account/common/imgcode?`
    };
  },
  computed: {
    isFirstBtnDisabled() {
      return this.realName === "" || this.identityID === "";
    },
    isSecondBtnDisabled() {
      return this.smsCode === "";
    },
    isThirdBtnDisabled() {
      return this.newPassword === "";
    },
    captchaParams() {
      return {
        identity: this.identityID,
        name: this.realName,
        type: 6
      };
    },
    captchaParams1() {
      return {
        identity: this.identityID,
        name: this.realName,
        msgCode: this.smsCode,
        type: 6
      };
    },
    ...mapState({
      step: state => state.forget.step,
      phoneNumber: state => state.forget.phoneNumber,
      isCountdown: state => state.forget.isCountdown,
      isShowCaptcha: state => state.forget.isShowCaptcha,
      isShowCaptcha1: state => state.forget.isShowCaptcha1
    })
  },
  watch: {
    isCountdown() {
      if (this.isCountdown) {
        this.timer = setInterval(() => {
          if (this.countdown > 1) {
            this.countdown--;
            this.btnText = `${this.countdown}s重新获取`;
          } else {
            this.countdown = 60;
            this.$store.commit("forget/setIsCountdown", false);
            this.btnText = "重新获取";
            clearInterval(this.timer);
          }
        }, 1000);
      }
    }
  },
  methods: {
    closeCaptchaModal() {
      this.$store.commit("forget/setIsShowCaptcha", false);
    },
    closeCaptchaModal1() {
      this.$store.commit("forget/setIsShowCaptcha1", false);
    },
    captchaCancel() {
      this.closeCaptchaModal();
    },
    captchaSucceed() {
      this.closeCaptchaModal();
      this.$store.commit("forget/setStep", "two");
      this.$store.commit("forget/setPhoneNumber", data);
      this.$store.commit("forget/setIsCountdown", true);
    },
    captchaCancel1() {
      this.closeCaptchaModal1();
    },
    captchaSucceed1() {
      this.closeCaptchaModal1();
      this.$store.commit("forget/setStep", "three");
    },
    getSMSCode() {
      this.$store.dispatch("forget/step1", this.captchaParams);
    },
    checkAuth() {
      this.$store.dispatch("forget/step2", this.captchaParams1);
    },
    resetPassword() {
      if (validatePassword(this.newPassword)) {
        this.$store.dispatch("forget/step3", {
          identity: this.identityID,
          password: toBase64(this.newPassword)
        });
      } else {
        Toast("密码不符合规定");
      }
    }
  },
  mounted() {
    this.$store.commit("forget/setStep", "one");
  }
};
</script>
<style lang="less" scoped>
.phone-info {
  font-size: 14px;
  padding: 16px;
}
.van-hairline--top-bottom::after {
  border: none;
}
.form-container {
  .btn-confirm {
    margin-top: 40px;
    padding: 0 16px;
  }
  .tips {
    padding: 12px 16px 0 16px;
    color: #aab0b9;
    text-align: left;
  }
}
button.van-button {
  width: 100%;
}
</style>
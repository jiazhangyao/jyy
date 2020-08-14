<template>
  <div class="add-proxy">
    <NavBar navTitle="添加共有人" :goBack="hide" />
    <div class="wrap">
      <Field
        v-model="name"
        label="姓名"
        placeholder="请输入"
        input-align="right"
      />
      <Field
        v-model="cardNo"
        label="身份证号码"
        placeholder="请输入"
        input-align="right"
      />
      <Field
        v-model="mobile"
        type="number"
        label="手机号码"
        placeholder="请输入"
        input-align="right"
        class="code-wrapper"
      >
        <Button
          class="btn-code"
          slot="button"
          @click="getSMSCode"
          :disabled="countDown!==COUNTDOWN"
        >{{ btnText }}</Button>
      </Field>
      <Field label="手机验证码" v-model="smsCode" placeholder="请输入短信验证码" input-align="right"></Field>
    <div class="fix-bottom" @click="finish">
      <FullButton name="完成" cls="select-bottom" />
    </div>
    </div>
    <SelectPage
      :show="select_show"
      :select="select_arr"
      v-on:pageChange="pageChange"
      v-on:hideSelect="hideSelect"
      :propsValue="propsValue"
      nextPage="three"
    />
  </div>
</template>

<script>
import FullButton from "@/components/fullButton.vue";
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import { Field, Button, Toast } from "vant";
import { mapGetters, mapState } from "vuex";
import { verifyPhone } from "@/mixins/commonValid.js";
import { vaildMsgCode, sendSmsCode } from "@/service/business";
import businessMix from "@/mixins/business.js";
export default {
  mixins: [selectMix, businessMix],
  props: {
    item: {},
    hide: {},
    done: {},
  },
  data() {
    return {
      editableForEdit: false, // 编辑props下是否也已经开启编辑的状态
      COUNTDOWN: 60,
      mobile: "",
      cardNo: "",
      name: "",
      cardType: 1,
      smsCode: "",
      countDown: 60,
      btnText: "获取验证码",
    };
  },
  components: {
    FullButton,
    SelectPage,
    Field,
    Button
  },
  computed: {
    ...mapGetters(["dict"]),
    ...mapState("transferbusiapply", ["transferbusiapplyForm"]),
  },
  methods: {
    finish() {
      let applicant = {
        ...this.item,
        mobile: this.mobile,
        cardNo: this.cardNo,
        name: this.name,
        cardType: 1, // 身份证
        smsCode: this.smsCode,
        isApplicant: 1
      }; 
      let validResult = this.applicantValid(applicant);
      if (!validResult.result) {
        Toast(validResult.msg);
        return false;
      }
      if (!applicant.smsCode) {
        Toast("校验码不能为空");
        return false;
      }
      
      vaildMsgCode(applicant).then(msgRes => {
        if (msgRes.success) {
          if (this.cardType == 1) {
            // 身份证
            this.idCardValidateRes(applicant).then(res => {
              if (res.success) {
                this.done({...applicant, credooIdentity: 1});
              } else {
                Toast("身份证实名认证未通过");
                return false;
              }
            });
          } else {
            this.done(applicant);
          }
        } else {
          Toast(msgRes.msg);
          return false;
        }
      });
    },
    getSMSCode() {
      let mobileValid = verifyPhone(this.mobile);
      if (mobileValid != true) {
        Toast(mobileValid);
        return false;
      }
      if (this.countDown !== this.COUNTDOWN) return false;

      sendSmsCode({
        location: this.transferbusiapplyForm.location || "",
        mobile: this.mobile,
        name: this.name,
        registerType: this.transferbusiapplyForm.registerType
      });

      let countDownTimer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
          this.btnText = `${this.countDown}s重新获取`;
        } else {
          this.countDown = this.COUNTDOWN;
          this.btnText = "重新获取";
          clearInterval(countDownTimer);
        }
      }, 1000);
    }
  },
  watch: {
  },
  mounted() {
    this.cardType = this.item.cardType; // 放在最后一行，出现不更新的情况 TODO
    this.mobile = this.item.mobile;
    this.cardNo = this.item.cardNo;
    this.name = this.item.name;
  }
};
</script>

<style lang="less" scoped>
.add-proxy .nav {
  z-index: 9999;
}
.wrap {
  min-height: calc(100vh - 44px);
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 2;
  width: 100%;
  background: #fff !important;
  opacity: 1;

  .select-item {
    display: flex;
  }
}
</style>
<style lang="less">
.add-proxy .fix-bottom {
  width: 100%;
  height: 48px;
  position: fixed;
  bottom: 40px;
  display: block;
  .button {
    width: 343px;
    margin: 0 16px;
    background: #309de5;
  }
}
</style>
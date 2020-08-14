<template>
  <div>
    <NavBar :navTitle="title"/>
    <template v-if="step === 'one'">
      <div class="form-container">
        <Tabs type="card" @click="chooseType" background="#efefef" color="#fff" title-active-color="#333" title-inactive-color="#333">
          <Tab title="个人注册" name="1">
            <van-cell-group>
              <van-field v-model="realName" placeholder="请输入真实姓名" clearable/>
              <van-field v-model="identityID" placeholder="请输入身份证号码" clearable/>
              <van-field v-model="phoneNumber" placeholder="请输入手机号" clearable/>
              <van-field v-model="smsCode" placeholder="请输入6位短信验证码" clearable class="code-wrapper">
                <sms-btn
                  slot="button"
                  url="/modules/api/account/common/msg/code"
                  :params="smsCodeParams"
                  :clickable="smsBtnClickable"
                />
              </van-field>
              <password-field v-model="password" placeholder="请输入密码" autocomplete="new-password"/>
            </van-cell-group>
          </Tab>
          <Tab title="企业/单位注册" name="0">
            <van-cell-group>
              <van-field v-model="name" placeholder="请输入企业/单位名" clearable/>
              <van-field readonly clickable v-model="cardTypeValue" placeholder="请选择证件类型" :value="cardTypeValue" @click="showPicker = true" right-icon="arrow" />
              <Popup v-model="showPicker" position="bottom">
                <Picker
                  show-toolbar
                  :columns="selectArray"
                  @confirm="onConfirm"
                  @cancel="showPicker = false"
                />
              </Popup>
              <van-field v-model="socialCredit" placeholder="请输入证件号码" clearable/>
              <van-field v-model="legalPerson" placeholder="请输入法人/负责人姓名" clearable/>
              <van-field v-model="corporationIdNumber" placeholder="请输入身份证号码" clearable class="code-wrapper" />
              <van-field v-model="mobile" placeholder="请输入手机号" clearable class="code-wrapper" />
              <van-field v-model="msgAuthCode" placeholder="请输入6位短信验证码" clearable class="code-wrapper">
                <sms-btn
                  slot="button"
                  url="/modules/api/account/common/msg/code"
                  :params="companyCodePapams"
                  :clickable="getCodeBtnClickable"
                />
              </van-field>
              <password-field v-model="companyPassword" placeholder="请输入密码" autocomplete="new-password"/>
              <password-field v-model="checkPassword" placeholder="请再次输入密码" clearable class="code-wrapper" />
            </van-cell-group>
          </Tab>
        </Tabs>
        <p class="tips">8-15位，数字、大小写字母、符号至少包含两种（除空格）</p>
        <van-checkbox v-model="checked" shape="square">
          我已阅读并同意
          <router-link to="/agreement" class="btn-link-text">《用户服务协议》</router-link>
        </van-checkbox>
        <div class="btn-confirm" v-if="sourceType == 1">
          <van-button type="info" @click="onPersonSubmit" :disabled="isDisabled">注册</van-button>
        </div>
        <div class="btn-confirm" v-else>
          <van-button type="info" @click="companyValidate" :disabled="isCompanyDisabled">注册</van-button>
        </div>
      </div>
    </template>
    <template v-if="step === 'two'">
      <CommonSuccess result="注册成功" autoText="自动返回" btnText="立即返回" linkUrl="/"/>
    </template>
  </div>
</template>
<script>
import { Field, Button, CellGroup, Checkbox, Toast, Tab, Tabs, Picker, Popup } from "vant";
import PasswordField from "../../components/passwordField";
import CommonSuccess from "../../components/commonSuccess";
import SmsBtn from "../../components/smsBtn";
import { toBase64, validatePassword } from "../../utils/utils.js";
import { mapState } from "vuex";
import {CompanyCardTypes} from "./const";

export default {
  name: "register",
  components: {
    CommonSuccess,
    SmsBtn,
    PasswordField,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Checkbox.name]: Checkbox,
    Tab,
    Tabs,
    Picker,
    Popup
  },
  data() {
    return {
      title: "新用户注册",
      realName: "",
      identityID: "",
      phoneNumber: "",
      smsCode: "",
      password: "",
      checked: true,

      // 企业单位
      name: "",
      cardType: 1,
      socialCredit: "",
      legalPerson: "",
      corporationIdNumber: "",
      mobile: "",
      msgAuthCode: "",
      companyPassword: "",
      checkPassword: "",
      cardTypeValue: "统一社会信用代码",

      showPicker: false,
      sourceType: 1
    };
  },
  created() {
    this.selectArray = CompanyCardTypes.toSelectArray();
  },
  computed: {
    isDisabled() {
      const arr = [
        this.realName === "",
        this.identityID === "",
        this.phoneNumber === "",
        this.smsCode === "",
        this.password === "",
        this.checked === false
      ];
      const emptyNum = arr.filter(item => item === true).length;
      return emptyNum !== 0;
    },
    isCompanyDisabled() {
      const arr = [
        this.name === "",
        this.cardType === "",
        this.socialCredit === "",
        this.legalPerson === "",
        this.corporationIdNumber === "",
        this.mobile === "",
        this.msgAuthCode === "",
        this.companyPassword === "",
        this.checkPassword === "",
        this.checked === false
      ];
      const emptyNum = arr.filter(item => item === true).length;
      return emptyNum !== 0;
    },
    smsCodeParams() {
      return {
        mobile: this.phoneNumber,
        type: 1
      };
    },
    companyCodePapams() {
      return {
        mobile: this.mobile,
        type: 1
      };
    },
    smsBtnClickable() {
      const reg = /^1\d{10}$/;
      return reg.test(this.phoneNumber);
    },
    getCodeBtnClickable() {
      const reg = /^1\d{10}$/;
      return reg.test(this.mobile);
    },
    ...mapState({
      step: state => state.register.step
    })
  },
  methods: {
    onConfirm(value) {
      this.cardType = value.id;
      this.cardTypeValue = value.text;
      this.showPicker = false;
    },
    chooseType(name, title) {
      this.sourceType = name;
    },
    onPersonSubmit() {
      // 个人注册
      if (validatePassword(this.password)) {
        this.$store.dispatch("register/step1", {
          identity: this.identityID,
          mobile: this.phoneNumber,
          msgAuthCode: this.smsCode,
          name: this.realName,
          password: toBase64(this.password),
          sourceType: this.sourceType
        });
      } else {
        Toast("密码不符合规定");
      }
    },
    companyValidate() {
      if (validatePassword(this.companyPassword)) {
        const verifyCompanyInfos = {
          name: this.name,
          cardType: this.cardType,
          socialCredit:this.socialCredit,
          legalPerson: this.legalPerson,
          corporationIdNumber: this.corporationIdNumber,
          corporationMobile: this.mobile
        }
        this.$store.commit('register/changeVerifyCompanyInfos', verifyCompanyInfos)
        this.$store.dispatch("register/step1", {
          identity: this.corporationIdNumber,
          mobile: this.mobile,
          msgAuthCode: this.msgAuthCode,
          name: this.legalPerson,
          sourceType: this.sourceType,
          password: toBase64(this.companyPassword)
        });
      }
      
      // if (validatePassword(this.companyPassword)) {
      //   verifyCompanyInfo({
      //     name: this.name,
      //     cardType: this.cardType,
      //     socialCredit:this.socialCredit,
      //     legalPerson: this.legalPerson,
      //     corporationIdNumber: this.corporationIdNumber,
      //     corporationMobile: this.mobile
      //   }).then(res => {
      //     const {success, msg} = res;
      //     if (success) {
      //       this.$store.dispatch("register/step1", {
      //         identity: this.corporationIdNumber,
      //         mobile: this.mobile,
      //         msgAuthCode: this.msgAuthCode,
      //         name: this.legalPerson,
      //         sourceType: this.sourceType,
      //         password: toBase64(this.companyPassword)
      //       });
      //     }else {
      //       Toast(msg);
      //     }
      //   })
      // }
    }
  },
  mounted() {
    this.$store.commit("register/setStep", "one");
  }
};
</script>
<style lang="less" scoped>
.van-checkbox {
  padding-left: 16px;
  text-align: center;
  margin-top: 12px;
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
/deep/.van-tabs__wrap {
  height: 54px;
}
/deep/.van-tabs__nav--card {
  margin: 0;
  height: 54px;

  .van-tab {
    height: 54px;
    line-height: 54px;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
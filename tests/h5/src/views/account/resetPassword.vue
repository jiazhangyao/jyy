<template>
  <div>

    <NavBar :navTitle="title"/>
    <template v-if="step === 'one'">
      <verify-identity :info="baseinfo" :type="5" @next="jumpTwo"/>
    </template>
    <template v-if="step === 'two'">
      <div class="form-container">
        <van-cell-group>
          <password-field v-model="newPassword" placeholder="请输入新密码" />
        </van-cell-group>
        <p class="tips">8-15位，数字、大小写字母、符号至少包含两种（除空格）</p>
        <div class="btn-confirm">
          <van-button type="info" @click="onSubmit" :disabled="isDisabled">确定</van-button>
        </div>
      </div>
    </template>
    <template v-if="step === 'three'">
      <CommonSuccess
        result="登录密码重置成功"
        autoText="自动返回账号设置"
        btnText="返回账号设置"
        linkUrl="/"
      />
    </template>
  </div>
</template>
<script>
import CommonSuccess from "../../components/commonSuccess";
import VerifyIdentity from "./verifyIdentity";
import { Field, Button, CellGroup, Checkbox, Toast } from "vant";
import PasswordField from "../../components/passwordField";
import { mapState } from "vuex";
import { toBase64, validatePassword } from "../../utils/utils.js";
export default {
  name: "resetPassword",
  components: {
    CommonSuccess,
    VerifyIdentity,
    PasswordField,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Checkbox.name]: Checkbox
  },
  data() {
    return {
      title: this.step === 'one' ? "重置登录密码" : (this.step === 'two' ? "设置新密码" : "重置成功"),
      newPassword: ""
    };
  },
  computed: {
    baseinfo() {
      return this.$store.getters.baseinfo || {};
    },
    isDisabled() {
      return this.newPassword === "";
    },
    ...mapState({
      step: state => state.account.resetPasswordStep
    })
  },
  methods: {
    jumpTwo() {
      this.$store.commit("account/setResetPasswordStep", "two");
    },
    onSubmit() {
      if(validatePassword(this.newPassword)){
        this.$store.dispatch("account/resetPassword", {
          password: toBase64(this.newPassword),
        });
      }else{
        Toast("密码不符合规定");
      }
    }
  },
  mounted() {
    this.$store.commit("account/setResetPasswordStep", "one");
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
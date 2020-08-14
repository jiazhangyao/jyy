<template>
  <div>
    <NavBar :navTitle="title" />
    <ul class="login-tab">
      <li
        v-for="(item, index) of lists"
        :key="index"
        :class="Math.abs(isActive - 1) == index ? 'activeLis' : 'activeNon'"
        @click="changeActive(index)"
      >{{item}}</li>
    </ul>
    <div class="login-container">
      <!-- <div class="top-item">
        <span class="login-title">{{ title }}</span>
        <img src="../../assets/avatar.png" alt class="avatar">
      </div>-->
      <section>
        <component :is="whichLogin" :isErp="isErp"></component>
      </section>
      <div class="login-link">
        <span class="btn-link" @click="changeLoginType">{{ linkText }}</span>
        <span class="split-line" />
        <router-link to="/forget">忘记密码</router-link>
        <span class="split-line" />
        <router-link to="/register">新用户注册</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import AccountLogin from "./accountLogin";
import CodeLogin from "./codeLogin";
import { mapState, mapMutations } from "vuex";
import nav from "@/mixins/navBar.js";
import { create } from "domain";

export default {
  name: "login",
  mixins: [nav],
  components: {
    AccountLogin,
    CodeLogin
  },
  data() {
    return {
      lists: ["个人登录", "企业/单位登录"],
      isActive: 1,
      isErp: 1,
      whichLogin: AccountLogin,
      title: "账号登录",
      linkText: "验证码登录"
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (['login', '', undefined, null, 'accountSetting'].includes(from.name)) {
        vm.setNextPage({ name: "home" });
      } else if (['transferList', 'transferBusiApplyEdit',"mortgageBusiapply","mortgageSign","mortgageList","mortgageTaxes"].includes(from.name)) {
        const { orderId } = from.query
        if (orderId) {
          localStorage.setItem('orderIds', orderId)
        }
        vm.setNextPage(from);    
      }
    });
  },
  computed: {
    ...mapState({
      loginStatus: state => state.login.loginStatus
    })
  },
  methods: {
    ...mapMutations("login", ["setNextPage"]),
    changeLoginType() {
      if (this.whichLogin === AccountLogin) {
        this.whichLogin = CodeLogin;
        this.title = "验证码登录";
        this.linkText = "账号登录";
      } else {
        this.whichLogin = AccountLogin;
        this.title = "账号登录";
        this.linkText = "验证码登录";
      }
    },
    changeActive(num) {
      if (num == this.isActive) {
        this.isActive = !this.isActive;
        this.isErp = Math.abs(num - 1);
      }
    }
  },
  mounted() {
    if (this.loginStatus) {
      this.$store.dispatch("account/logOut");
    }
  }
};
</script>
<style lang="less">
ul.login-tab {
  background-color: rgba(223, 223, 223, 0.5);
  li {
    // float: left;
    display: inline-block;
    width: 50%;
    height: 54px;
    line-height: 54px;
    font-size: 16px;
    text-align: center;
    // border: 1px solid #dfdfdf;
    color: #333;
    font-weight: bold;
  }
  .activeLis {
    background-color: #fff;
    border: 0;
  }
  .activeNon {
    // background-color: #DFDFDF;
  }
}
.login-container {
  padding: 24px 32px 0;
  section {
    // margin-top: 70px;
  }
  .top-item {
    clear: both;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    .login-title {
      font-size: 18px;
      color: #0f213e;
      font-weight: bold;
    }
    .avatar {
      width: 56px;
      height: 56px;
    }
  }
  .login-btn {
    margin-top: 40px;
    width: 100%;
  }
  .login-link {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    a,
    .btn-link {
      font-size: 14px;
      line-height: 14px;
      color: #5d6471;
    }
    .split-line {
      margin: 0 16px;
      width: 1px;
      background: linear-gradient(#cbd2de, #cbd2de) no-repeat;
      background-size: 1px 90%;
      background-position: 0 center;
    }
  }
  .van-cell {
    padding: 10px 0;
  }
  .van-cell::after {
    left: 0px;
  }
}
</style>

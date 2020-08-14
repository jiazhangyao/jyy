<template>
  <div>
    <NavBar :navTitle="title" />
    <div class="account-container">
      <van-cell-group>
        <van-cell title="更换手机号" is-link :value="baseinfo.mobile" to="/account/changemobile" />
        <van-cell title="实人认证" is-link :value="faceVerificationStatusDesc" :to="faceLink" />
        <van-cell title="登录密码" is-link value="重置" to="/account/resetpassword" />
      </van-cell-group>
      <footer @click="logout">
        <FullButton name="退出登录" cls="water-edit-footer-btn" />
      </footer>
    </div>
  </div>
</template>
<script>
import FullButton from "@/components/fullButton.vue";
import { Button, Cell, CellGroup, Dialog } from "vant";
export default {
  name: "setting",
  components: {
    FullButton,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      title: "账户设置"
    };
  },
  computed: {
    baseinfo() {
      return this.$store.getters.baseinfo;
    },
    faceLink() {
      const { faceVerificationStatus, id } = this.baseinfo;
      if (faceVerificationStatus === "2") {
        return "/account/authenticated";
      } else {
        return {
          path: `/certification/${id}/1/${process.env.VUE_APP_SOURCE_TYPE}`,
          query: {
            from: "h5"
          }
        };
      }
    },
    faceVerificationStatusDesc() {
      const { faceVerificationStatus } = this.baseinfo;
      return faceVerificationStatus === "2" ? "认证成功" : "未认证";
    }
  },
  methods: {
    logout() {
      Dialog.confirm({
        title: "确定退出登录？",
        confirmButtonText: "退出"
      })
        .then(() => {
          this.$store.dispatch("account/logOut");
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less" scoped>
.van-cell-group{
  padding-left: 16px;
  .van-cell{
    border-bottom: 1Px solid rgba(203, 210, 222, 0.5);
    padding: 16px 16px 16px 0;
    font-size: 15px;
    text-align: left;
  }
}
footer {
  position: absolute;
  bottom: 40px;
  width: 100%;
  .button {
    display: block;
    width: 343px;
    line-height: 48px;
    margin: auto;
    text-align: center;
  }
}
</style>
<style lang="less" >
.account-container .van-cell-group .van-cell::after {
  content: none;
}
</style>



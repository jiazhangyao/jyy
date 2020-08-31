<template>
  <div class="top">
    <div class="top-container">
      <div class="logo" @click="logo"></div>
      <div class="subname">网校直播</div>
      <div class="menu">
        <div class="panel" @click="handleGoManage">
          <span class="iconfont">&#xe603;</span>管理
        </div>
        <div class="panel" @click="handleExit">
          <span class="iconfont">&#xe602;</span>离开
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { getLocalStorage, delLocalStorage } from "@/common/js/localStorage";
import { mapGetters } from "vuex";
import { decodeJWTsub } from "@/common/js/jwt";
@Component({
  computed: mapGetters(["userInfo", "admins"]),
  components: {}
})
export default class Top extends Vue {
  private created(): void {
    this.$store.dispatch("admins");
    this.$store.dispatch('getHeaderImg');
  }

  private mounted(): void {
    const token: any = getLocalStorage("token", false);
    if (!token) {
      this.unLogin();
      return;
    }
  }

  private unLogin(): void {
    this.$store.commit("setPaperEditDetailDataInit");
    delLocalStorage("token");
    this.$router.push({ path: "/login" });
  }

  private logo(): void {
    this.$router.push({ path: "/" });
  }

  private handleExit(): void {
    console.log(1111);
    this.$router.back();
  }

  private handleGoManage(): void {
    console.log(1111);
    this.$router.replace({
      name: "manage",
      query: this.$route.query
    });
  }
}
</script>


<style lang="scss" scoped>
@import "../../../common/sass/function";
@import "../../../common/sass/variable";
.top {
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  height: 64px;
  background-color: #fff;
  position: relative;
  z-index: 2;
  .top-container {
    margin: 0 auto;
    padding: 0 24px;
    // width: $page-width;
    @include clearfix;
    background-color: #fff;
  }
  .logo {
    float: left;
    width: 124px;
    height: 64px;
    background-image: url("../../../assets/logo.png");
    background-repeat: no-repeat;
    background-size: 124px 36px;
    background-position: 0 12px;
    margin-right: 32px;
    cursor: pointer;
  }
  .subname {
    float: left;
    color: #0098ff;
    box-sizing: border-box;
    padding-top: 26px;
    font-size: 18px;
    position: relative;
    &::after {
      content: " ";
      position: absolute;
      top: 27px;
      left: -16px;
      height: 16px;
      width: 1px;
      border-right: 1px solid #e8e8e8;
    }
  }
  .menu {
    height: 64px;
    line-height: 64px;
    float: right;
    .panel {
      float: left;
      color: #333;
      padding: 0 24px;
      font-size: 16px;
      position: relative;
      cursor: pointer;
      &::after {
        content: " ";
        position: absolute;
        top: 50%;
        right: 0;
        height: 16px;
        width: 1px;
        border-right: 1px solid #e8e8e8;
        margin-top: -8px;
      }
      .iconfont {
        font-size: 14px;
        margin-right: 7px;
      }
      &:hover {
        color: #0098ff;
      }
    }
    .panel:last-child {
      padding-right: 0;
      &::after {
        border: none;
      }
    }
  }
}
</style>

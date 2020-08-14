<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="query-identity">
      <img src="@/assets/home/插图@2x.png">
      <div class="query-identity-note">您爱没有完成实人认证,暂不能使用该功能，如需要使用不动产信息查询功能，请先完成实人认证哦～</div>
      <div class="query-identity-div">
        <router-link to="/query/query">
          <FullButton name="去认证" class="query-identity-btn"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import FullButton from "@/components/fullButton.vue";
// import img from '@/assets/home/插图@2x.png'
export default {
  components: {
    FullButton
  },
  data() {
    return {
      title: "不动产信息查询"
    };
  }
};
</script>

<style lang="less" scoped>
.query-identity {
  & > img {
    width: 267px;
    height: auto;
    margin-top: 50px;
  }
  &-note {
    font-size: 14px;
    color: #323d4e;
    line-height: 24px;
    margin: 30px 30px 40px;
  }
  &-div {
    padding: 0 32px;
  }
  &-btn {
    border-radius: 4px;
  }
}
</style>
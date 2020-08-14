<template>
  <div class="header">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon name="wap-nav" slot="right" />
    </van-nav-bar>
  </div>
</template>
<script>
import { NavBar, Icon } from "vant";
export default {
  name: "commonHeader",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  props: ["title"],
  methods: {
    onClickLeft(){
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.header{
  border-bottom: 1px solid #CBD2DE
}
</style>

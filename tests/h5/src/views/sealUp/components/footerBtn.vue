<template>
  <footer v-if="curNav=='main'">
    <Button @save="save">保存</Button>
    <!-- <Button >取消</Button> -->
  </footer>

  <footer v-else>
    <!-- 上一页 -->
    <Button class="border-btn" @click="goPrev" v-if="curNav !== 'orderHouse'">上一页</Button>
    <!-- 下一页 -->
    <Button v-if="curNav == 'material'" @click="goNext">保存</Button>
    <Button v-else-if="curNav == 'orderHouse'" @click="goNext">下一页</Button>
    <Button v-else @click="goNext">保存并下一页</Button>
  </footer>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props: {
    curNav: { default: undefined },
    save: { default: undefined }
  },
  data() {
    return {};
  },
  computed: {
    ...mapActions("sealUp", [""]),
    ...mapState("sealUp", ["registerType"]),
    getNavs({ state }, params) {
      // main:导航，history：历史查封信息，estate：不动产信息、sealInfo：查封信息、material:附件上传
      if (this.registerType === 4050 || this.registerType === 4060) {
        return ["history", "orderHouse", "sealInfo", "material"];
      } else {
        return ["orderHouse", "sealInfo", "material"];
      }
    }
  },
  methods: {
    ...mapMutations("sealUp", ["changeCurNav"]),

    goPrev() {
      let curIndex = this.getNavs.indexOf(this.curNav) - 1;
      this.changeCurNav(this.getNavs[curIndex]);
    },
    goNext() {
      console.log("TODO print by jxl", "next");

      let curIndex = this.getNavs.indexOf(this.curNav) + 1;
      this.changeCurNav(this.getNavs[curIndex]);
    }
  }
};
</script>
<style lang="less" scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0px 16px;
  justify-content: center;
  width: 100%;
  display: block;
  background: #f5f5f5;
  button {
    width: 90%;
    display: block;
    margin: auto auto 12px auto;
    background: #309de5;
    border-radius: 4px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 18px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    border: none;
    line-height: 48px;
    &.border-btn {
      background: #ffffff;
      border: 1px solid #309de5;
      color: #309de5;
    }
  }
}
</style>
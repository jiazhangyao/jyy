<template>
  <footer v-if="curComponent == 'layout'">
    <template v-if="canEdit()">
      <Button class="border-btn" @click="goHome">取消</Button>
      <Button @click="commitBiz">提交</Button>
    </template>
    <template v-else-if="!canEdit() && transferbusiapplyForm.editable==1">
      <Button @click="changeToCommit">编辑</Button>
    </template>
  </footer>
  <footer v-else>
    <Button class="border-btn" @click="goPrev" v-if="curComponent !== 'orderHouse'">上一页</Button>
    <Button v-if="canEdit()" @click="nextPage">保存并下一页</Button>
    <Button v-else @click="goNext">下一页</Button>
  </footer>
</template>
<script>
import { mapState } from "vuex";
import businessMix from "@/mixins/business.js";
export default {
  mixins: [businessMix],
  data() {
    return {};
  },
  props: {
    toNextPage: { default: undefined }
  },
  computed: {
    ...mapState("transferbusiapply", ["transferbusiapplyForm"]),
    curComponent() {
      return this.$store.state.transferbusiapply.whichEdit;
    }
  },
  methods: {
    changeToCommit(){
      this.$store.commit( "transferbusiapply/setPageEditable", true );
    },
    nextPage() {
      if (typeof this.toNextPage === "function") {
        this.toNextPage();
      } else {
        this.goNext();
      }
    }
  },
  mounted() {}
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
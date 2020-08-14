<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="guide-detail">
      <h2>{{data.title}}</h2>
      <div v-html="data.content" class="content"></div>
    </div>
  </div>
</template>

<script>
import { getDetail } from "@/service/guide";
export default {
  data() {
    return {
      title: "业务办事指南",
      data: ""
    };
  },
  created() {
    getDetail(this.$route.params.id).then(res => {
      if (res.success) {
        this.data = res.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.guide-detail {
  padding: 24px;
  overflow: auto;
}
.content {
  margin-top: 16px;
  line-height: 24px;
  font-size: 14px;
  color: #323d4e;
  text-align: left;
}
</style>
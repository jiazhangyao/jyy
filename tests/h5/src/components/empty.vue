<template>
  <div v-if="show" class="empty-wrap">
    <img src="@/assets/插图.png">
    <div>暂无数据</div>
  </div>
</template>

<script>
export default {
  name: "empty",
  data() {
    return {
      show: false
    };
  },
  created() {
    setTimeout(() => {
      this.show = true;
    }, 500);
  }
};
</script>

<style lang="less" scoped>
.empty-wrap {
  text-align: center;
}
img {
  width: 267px;
  margin-top: 94px;
  margin-bottom: 32px;
}
div {
  font-size: 14px;
  color: #323d4e;
}
</style>
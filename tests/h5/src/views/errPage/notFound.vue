/*
* Created by Alex Zhang on 2019/3/25
*/
<template>
  <div>
    <NavBar navTitle="404"/>
    <div class="err-pager">
      <h1 class="err-content">哎呀，没找到页面!</h1>
      <router-link :to="{ name: 'home'}">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  title: "404",
  name: "notFound"
};
</script>

<style scoped lang="less">
.err-pager {
  width: 100%;
  height: 100vh;
  background: #ffffff;
  text-align: center;
  .err-content {
    margin-top: 200px;
    margin-bottom: 30px;
  }
}
</style>
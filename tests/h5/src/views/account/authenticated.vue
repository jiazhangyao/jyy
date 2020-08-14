<template>
  <div>
    <NavBar :navTitle="title" />
    <div class="account-container">
      <van-cell-group>
        <van-cell title="真实姓名" :value="baseinfo.name" />
        <van-cell title="证件类型" value="身份证" />
        <van-cell title="证件号码" :value="baseinfo.identity" />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { Cell, CellGroup } from "vant";
export default {
  name: "authenticated",
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      title: "实人认证"
    };
  },
  computed: {
    baseinfo() {
      return this.$store.getters.baseinfo || {};
    }
  }
};
</script>
<style lang="less" scoped>
.van-cell-group {
  padding-left: 16px;
  text-align: left;
  .van-cell {
    border-bottom: 1Px solid #cbd2de;
    padding: 16px 16px 16px 0;
    font-size: 15px;
  }
}
</style>



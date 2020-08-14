<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="success-icon">
      <i class="icon iconfont iconresult_succeed"></i>
    </div>
    <h1>提交成功</h1>
    <p>我们会尽快审核您提交的材料</p>
    <section class="button-group" v-if="showBack">
      <Button size="large" @click="backHome" type="info">返回</Button>
    </section>
  </div>
</template>

<script>
import { Button } from "vant";
import { mapGetters } from "vuex";
export default {
  name: "submitSuccess",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["from"]),
    showBack() {
      return this.from === "h5";
    }
  },
  methods: {
    backHome() {
      const { type } = this.$route.params;
      if (type == 1) {
        this.$router.replace({ name: "accountSetting" });
      } else {
        this.$router.replace({ name: "home" });
      }
    }
  },
  components: {
    Button
  }
};
</script>

<style scoped lang="less">
.success-icon {
  text-align: center;
  .iconfont {
    font-size: 72px !important;
  }
  color: #53c41a;
  margin-top: 80px;
}
.button-group {
  box-sizing: border-box;
  padding: 0 20px;
  margin-top: 20px;
}
h1 {
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #0f213e;
  text-align: center;
  line-height: 18px;
  margin-top: 24px;
  font-weight: normal;
}
p {
  text-align: center;
  color: #666666;
  font-size: 14px;
  margin-top: 24px;
}
</style>
<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="files">
      <img src alt srcset>
    </div>
  </div>
</template>
<script>
import { IdCheck } from "@/service/common";
import { AppointList } from "@/service/common";
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
export default {
  mixins: [selectMix],
  data() {
    return {};
  },
  components: { SelectPage },
  methods: {
    getData() {}
  },
  computed: {
    title() {
      if (this.select_show) {
        return this.selectTitle;
      } else {
        return "我的证照";
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped lang="less">
.info-card {
  padding: 17px 0 0 16px;
  .table {
    border: @border;
    border-radius: 4px;
    line-height: 36px;
    font-size: 16px;
    color: #0f213e;
    letter-spacing: 0;
    margin-right: 16px;
    header {
      background: rgba(203, 210, 222, 0.2);
    }
    .main {
      text-align: left;
      div {
        padding-left: 8px;
        border-top: @border;
      }
      label {
        width: 30%;
        display: inline-block;
        border-right: @border;
        margin-right: 15px;
      }
    }
  }
  .list {
    margin-top: 40px;
    text-align: left;
    li {
      height: 56px;
      padding: 20px 0;
      font-size: 15px;
      color: #5d6471;
      border-bottom: @border;
      line-height: 15px;
    }
  }
}
</style>

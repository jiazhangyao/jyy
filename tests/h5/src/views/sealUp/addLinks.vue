<template>
  <div>
    <NavBar :navTitle="typeTitle" :goBack="goBack" />
    <div class="bisiapply-edit">
      <component :is="whichEdit"></component>
    </div>
  </div>
</template>

<script>
import sealUpMix from "@/mixins/sealUp.js";
import NavBar from "@/components/navBar.vue";
import layout from "./detailNav.vue";
import add_file from "./add_file.vue";
import add_estate from "./add_estate.vue";
import add_history from "./add_history.vue";
import add_seal from "./add_seal.vue";
import history_detail from "./history_detail.vue";
import sealInfo_detail from "./sealInfo_detail.vue";
import estate_detail from "./estate_detail.vue";

import { tabItems } from "./consts/index.js";
import { mapState, mapMutations } from "vuex";
export default {
  mixins: [sealUpMix],
  name: "sealUp",
  data() {
    return {};
  },
  watch: {
    immediate: true
  },
  methods: {
    // 子模块返回，回到layout页
    goBack() {
      if (this.whichEdit == "layout") {
        this.$router.back();
      } else {
        this.changeComponent({
          label: "",
          component: "layout"
        });
      }
    }
  },
  computed: {
    ...mapState("sealUp", ["id", "whichEdit"]),
    typeTitle(registerType) {
      return this.whichEdit == "layout"
        ? "查封登记"
        : tabItems[this.whichEdit].label;
    }
  },
  mounted() {
    // edit 1或者0, 1是编辑，0是详情，没有值是编辑
    this.$store.commit(
      "sealUp/setPageEditable",
      this.$route.query.edit !== "0"
    );
  },
  created() {
    this.changeComponent({
      label: "",
      component: "layout"
    });
    const { id } = this.$route.query;
    if (id) {
      this.$store.dispatch("sealUp/orderDetails", id);
    }
    this.$store.dispatch("sealUp/getMaterialTypeList");
  },
  destroyed() {
    this.$store.commit("sealUp/setDefaultState");
  },
  components: {
    NavBar,
    layout,
    AddFile: add_file,
    AddEstate: add_estate,
    AddHistory: add_history,
    AddSeal: add_seal,
    DetailHistory: history_detail,
    DetailSeal: sealInfo_detail,
    DetailEstate: estate_detail
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit {
  text-align: left;
  background: #f5f5f5;
  background: #f5f5f5;
  position: absolute;
  top: 43px;
  left: 0;
  right: 0;
  bottom: 0;
  .van-icon {
    color: #aab0b9 !important;
  }
  /deep/.van-field__label {
    width: 120px;
  }
  /deep/.btn-code {
    height: 24px;
    display: inline-block;
    line-height: 24px;
    color: #309de5;
    font-size: 15px;
    border: 0;
    padding-right: 0;
  }
  /deep/.tips {
    font-size: 14px;
    color: #666666;
    padding: 16px;
    background: #f5f5f5;
  }
}
.danger {
  color: #ff2626;
}
</style>
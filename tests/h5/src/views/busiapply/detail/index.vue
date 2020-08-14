<template>
  <div>
    <NavBar :navTitle="typeTitle" />
    <div class="bisiapply-edit">
      <component
        :title="title"
        :is="whichEdit"
        :componentKey="componentKey"
        :updateForm="updateForm"
        :changeComponent="changeComponent"
        :form="form"
        v-bind="$attrs"
        :materialTypeList="materialTypeList"
      ></component>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navBar.vue";
import { detail, getMaterialList } from "@/service/business";
import layout from "./layout.vue";
import mortgagee from "./mortgagee.vue";
import mortgagor from "./mortgagor.vue";
import signInfo from "./signInfo.vue";
import mortgageInfo from "./mortgageInfo.vue";
import obligee from "./obligee.vue";
import obligor from "./obligor.vue";
import orderHouse from "./orderHouse.vue";
import materialList from "./materialList.vue";
import post from "./post.vue";
import { mapGetters } from "vuex";
import { Toast } from "vant";
import { tabsRelateToType } from "../const";
export default {
  data() {
    return {
      materialTypeList: [],
      typeTitle: "",
      title: "",
      whichEdit: layout,
      componentKey: "",
      form: {
        signInfo: {},
        obligorInfo: { applicantList: [] },
        obligeeInfo: { applicantList: [] },
        orderHouse: {},
        materialList: []
      }
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["dict"])
  },
  async mounted() {
    let { name, tabs } = tabsRelateToType[this.$route.query.type];
    this.typeTitle = name;
    this.title = name;
    if (this.$route.query.id) {
      let { success, data, msg } = await detail(this.$route.query.id);
      if (success) {
        this.form = data;
        let materialRes = await getMaterialList(data.registerType);
        this.materialTypeList =
          materialRes.success && materialRes.data ? materialRes.data : [];
      } else {
        Toast(msg);
        setTimeout(() => {
          this.$router.back();
        }, 2000);
      }
    }

    this.$store.dispatch("getFileHost", {});
  },
  components: {
    layout,
    signInfo,
    obligee,
    obligor,
    orderHouse,
    materialList,
    post,
    mortgageInfo,
    mortgagee,
    mortgagor
  },
  created() {},
  methods: {
    changeComponent(component) {
      this.whichEdit = component.component;
      this.title = component.label || this.typeTitle;
      this.componentKey = component.key;
    },
    updateForm(value) {
      this.form = { ...this.form, ...value };
    }
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit {
  text-align: left;
  .van-icon {
    color: #aab0b9 !important;
  }
  footer {
    position: fixed;
    bottom: 0;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-top: 1Px solid #cbd2de;
    button {
      min-width: 109px;
    }
  }
}
.danger {
  color: #ff2626;
}
</style>
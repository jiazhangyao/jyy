<template>
  <div class="wrap">
    <Field disabled v-model="proxy.name" label="代理人姓名" placeholder="-" input-align="right" />
    <Field
      input-align="right"
      :value="getCardTypeName(proxy.cardType)"
      label="证件类型"
      placeholder="-"
      disabled
    />
    <Field disabled v-model="proxy.cardNo" label="证件号码" placeholder="-" input-align="right" />
    <Field disabled v-model="proxy.mobile" label="手机号码" placeholder="-" input-align="right" />
  </div>
</template>

<script>
import FullButton from "@/components/fullButton.vue";
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import { Field } from "vant";
export default {
  mixins: [selectMix],
  props: {
    proxy: {}
  },
  data() {
    return {};
  },
  components: {
    FullButton,
    SelectPage,
    Field
  },
  computed: {},
  methods: {
    getCardTypeName(type) {
      let res = this.$store.getters.dict["cardType"].find(
        item => item.key == type
      );
      return res ? res.name : "-";
    }
  },
  watch: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  background: #fff;
}
</style>
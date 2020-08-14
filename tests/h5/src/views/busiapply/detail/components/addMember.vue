<template>
  <div class="add-member">
    <div class="wrap">
      <Field disabled v-model="member.name" label="成员姓名" placeholder="-" input-align="right" />
      <Field
        input-align="right"
        :value="getCardTypeName(member.cardType)"
        label="证件类型"
        placeholder="-"
        disabled
      />
      <Field disabled v-model="member.cardNo" label="证件号码" placeholder="-" input-align="right" />
      <Field disabled v-model="member.mobile" label="手机号码" placeholder="-" input-align="right" />
    </div>
  </div>
</template>

<script>
import { Field } from "vant";
export default {
  props: {
    member: {}
  },
  data() {
    return {};
  },
  components: {
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
.add-member {
  padding-bottom: 20px;
}
.wrap {
  width: 100%;
  background: #fff;
}
</style>
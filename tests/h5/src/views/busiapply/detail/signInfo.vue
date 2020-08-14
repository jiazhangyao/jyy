<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-info" v-if="form">
      <Input
        label="网签合同编号"
        disabled
        :value.sync="form.signInfo.contractNo"
        readonly
        placeholder="-"
      />
      <Input label="备案日期" disabled :value.sync="form.signInfo.signDate" readonly placeholder="-" />
      <Input
        :label="['3','7','8',3,7,8].indexOf(form.registerType)>-1  ? '房地产商名称' : '中介公司名称'"
        disabled
        :value.sync="form.signInfo.signCompanyName"
        readonly
        placeholder="-"
      />
      <Input
        label="合同总价"
        disabled
        :value.sync="form.signInfo.totalPrice"
        readonly
        placeholder="-"
        sufix="元"
      />

      <footer @click="goNext">
        <FullButton name="下一项" cls="water-edit-footer-btn" />
      </footer>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navBar.vue";
import { Toast } from "vant";
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
import { contractInfo } from "@/service/business";
import businessMix from "@/mixins/business.js";
export default {
  mixins: [businessMix],
  data() {
    return {};
  },
  props: {
    title: {},
    changeComponent: {},
    updateForm: {},
    form: {}
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {},
  created() {},
  components: {
    Toast,
    Input,
    FullButton
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-info {
  footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    .button {
      display: block;
      line-height: 48px;
      margin: auto;
      text-align: center;
    }
  }
}
</style>
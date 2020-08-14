// TODO required的位置
<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-info" v-if="form">
      <Input
        input-align="right"
        :value.sync="mortgageInfo.typeDesc"
        label="抵押类型"
        placeholder="-"
        disabled
      />
      <div @click="show=true">
        <Input
          label="债务履行日期"
          :value="(mortgageInfo.beginDate ||'-')+'~'+(mortgageInfo.endDate||'-')"
          readonly
          icon="arrow"
          placeholder="-"
          disabled
        />
      </div>
      <Input
        v-if="mortgageInfo.type==1"
        label="被担保债权数额"
        :value.sync="mortgageInfo.mainClaimAmount"
        disabled
        placeholder="-"
        sufix="元"
      />
      <Input
        v-else-if="mortgageInfo.type==2"
        label="最高债权数额"
        :value.sync="mortgageInfo.highestClaimAmount"
        disabled
        placeholder="-"
        sufix="元"
      />
      <Input
        label="房屋评估价"
        :value.sync="mortgageInfo.evaluationPrice"
        disabled
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
import businessMix from "@/mixins/business.js";
import NavBar from "@/components/navBar.vue";
import { CellGroup, Field, Button, Popup, Toast } from "vant";
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
export default {
  mixins: [businessMix],
  data() {
    return {
      mortgageInfo: {
        type: "",
        typeDesc: "",
        mortgageInfoDate: "",
        mainClaimAmount: "",
        evaluationPrice: ""
      },
      currentDate: new Date()
    };
  },
  props: {
    title: {},
    changeComponent: {},
    form: {}
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {
    this.mortgageInfo = { ...this.mortgageInfo, ...this.form.mortgageInfo };
  },
  created() {},
  components: {
    CellGroup,
    Field,
    Button,
    Popup,
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
      width: 100%;
      line-height: 48px;
      margin: auto;
      text-align: center;
    }
  }
}
</style>
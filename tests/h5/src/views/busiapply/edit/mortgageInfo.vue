// TODO required的位置
<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-info" v-if="form">
      <div @click="changeS(mortgageType,'type','抵押类型', type)">
        <Input
          input-align="right"
          :value.sync="type"
          label="抵押类型"
          placeholder="请选择"
          icon="arrow"
          required
          disabled
        />
      </div>
      <div @click="beginSelectDate">
        <Input
          label="债务履行日期"
          :value="mortgageInfoDate"
          readonly
          icon="arrow"
          placeholder="请选择"
          required
        />
      </div>
      <Input
        v-if="type=='一般抵押'"
        label="被担保债权数额"
        :value.sync="mortgageInfo.mainClaimAmount"
        required
        sufix="元"
      />
      <Input
        v-else-if="type=='最高额抵押'"
        label="最高债权数额"
        :value.sync="mortgageInfo.highestClaimAmount"
        required
        sufix="元"
      />
      <Input label="房屋评估价" :value.sync="mortgageInfo.evaluationPrice" sufix="元" required />

      <footer @click="finish(mortgageInfo)">
        <FullButton name="完成" cls="water-edit-footer-btn" />
      </footer>
      <Popup v-model="show" position="bottom">
        <van-row>
          <van-col span="12">
            <DatetimePicker
              @change="changeBeginDate"
              :value="beginDate"
              class="date"
              type="date"
              :show-toolbar="false"
            />
          </van-col>
          <van-col span="12">
            <DatetimePicker
              @change="changeEndDate"
              :value="endDate"
              class="date"
              type="date"
              :show-toolbar="false"
            />
          </van-col>
        </van-row>
      </Popup>
      <SelectPage
        :show="select_show"
        :select="select_arr"
        v-on:pageChange="pageChange"
        v-on:hideSelect="hideSelect"
        :propsValue="propsValue"
        nextPage="three"
      />
    </div>
  </div>
</template>

<script>
import businessMix from "@/mixins/business.js";
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import NavBar from "@/components/navBar.vue";
import {
  Row,
  Col,
  CellGroup,
  Button,
  Popup,
  DatetimePicker,
  Toast
} from "vant";
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
import { MortgageType } from "../const";
export default {
  mixins: [businessMix, selectMix],
  data() {
    return {
      type: "",
      mortgageInfo: {
        type: "",
        mainClaimAmount: "",
        evaluationPrice: "",
        beginDate: "", //格式2019-01-01
        endDate: "" //格式2019-01-01
      },
      show: false,

      mortgageType: MortgageType
    };
  },
  props: {
    title: {},
    changeComponent: {},
    updateForm: {},
    form: {}
  },
  computed: {
    mortgageInfoDate() {
      let beginDate = this.mortgageInfo.beginDate || "-";
      let endDate = this.mortgageInfo.endDate || "-";
      return beginDate + "~" + endDate;
    },
    beginDate() {
      return new Date(this.mortgageInfo.beginDate);
    },
    endDate() {
      return new Date(this.mortgageInfo.endDate);
    }
  },
  methods: {
    beginSelectDate() {
      this.show = true;
    },
    finish() {
      let mortgageInfo = {
        ...this.mortgageInfo,
        type: this.type ? this.arrGet(this.mortgageType, this.type, "key") : ""
      };
      let res = this.mortgageInfoValid(mortgageInfo);
      if (res.result) {
        this.updateForm({
          mortgageInfo: mortgageInfo
        });
        this.goBack();
      } else {
        Toast(res.msg);
      }
    },
    changeBeginDate(picker) {
      this.mortgageInfo.beginDate = picker.getValues().join("-");
    },
    changeEndDate(picker) {
      this.mortgageInfo.endDate = picker.getValues().join("-");
    }
  },
  watch: {},
  mounted() {
    this.mortgageInfo = { ...this.mortgageInfo, ...this.form.mortgageInfo };
    this.type = this.getNameByKey(this.mortgageType, this.mortgageInfo.type);
  },
  created() {},
  components: {
    "van-row": Row,
    "van-col": Col,
    CellGroup,
    Button,
    Popup,
    DatetimePicker,
    Toast,
    Input,
    FullButton,
    SelectPage
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-info {
  footer {
    position: absolute;
    bottom: 40px;
    width: 100%;
    .button {
      display: block;
      width: 343px;
      line-height: 48px;
      margin: auto;
      text-align: center;
    }
  }
}
</style>
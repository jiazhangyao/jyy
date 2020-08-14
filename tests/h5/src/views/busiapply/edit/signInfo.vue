// TODO required的位置
<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-info" v-if="form">
      <field
        v-model="form.signInfo.contractNo"
        :value.sync="form.signInfo.contractNo"
        placeholder="输入网签合同编号"
        size="large"
        class="placeholder-require"
        required
      >
        <Button slot="button" size="small" type="info" @click="getRegister">获取网签</Button>
      </field>
      <notice-bar v-if="notice" :text="notice.text" :mode="notice.mode" :hasClose="hasClose" />
      <div @click="show=true">
        <Input
          label="备案日期"
          :value.sync="form.signInfo.signDate"
          readonly
          icon="arrow"
          placeholder="请选择"
        />
      </div>
      <Input
        :label="['3','7','8',3,7,8].indexOf(form.registerType)>-1 ? '房地产商名称' : '中介公司名称'"
        :value.sync="form.signInfo.signCompanyName"
      />
      <Input label="合同总价" type="number" :value.sync="form.signInfo.totalPrice" sufix="元" required />

      <footer @click="finish(form.signInfo)">
        <FullButton name="完成" cls="water-edit-footer-btn" />
      </footer>
      <Popup v-model="show" position="bottom">
        <DatetimePicker
          v-model="currentDate"
          :min-date="new Date()"
          type="date"
          class="date"
          @cancel="show=false"
          @confirm="confirm"
        />
      </Popup>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navBar.vue";
import { CellGroup, Field, Button, Popup, DatetimePicker, Toast } from "vant";
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
import NoticeBar from "@/components/noticeBar";
import { contractInfo } from "@/service/business";
import businessMix from "@/mixins/business.js";
export default {
  mixins: [businessMix],
  data() {
    return {
      hasClose: false,
      show: false,
      currentDate: new Date(),
      notice: false
    };
  },
  props: {
    title: {},
    changeComponent: {},
    updateForm: {},
    form: {}
  },
  computed: {},
  methods: {
    getRegister() {
      if (this.form.signInfo.contractNo) {
        contractInfo({ contractNo: this.form.signInfo.contractNo }).then(
          ({ success, msg, data }) => {
            if (success) {
              let orderHouseList = data.houseList.map((item, idx) => ({
                id: idx + 1,
                space: item.buildArea,
                inFloor: item.floor,
                buildYear: item.buildYear,
                totalFloor: item.houseFloorCount,
                planUse: item.purposeCode,
                houseStructure: item.structureCode,
                address: data.houseAddr,
                unitNumber: item.houseCode,
                warrantNumber: data.houseWarrantNo,
                regionId: data.districtCode
              }));
              let res = {
                obligeeInfo: { applicantList: data.sellerList },
                obligorInfo: { applicantList: data.buyerList },
                orderHouseList: orderHouseList,
                signInfo: {
                  contractNo: data.contractNo,
                  signDate: data.recordDate,
                  signCompanyName: data.mediumCompanyName,
                  totalPrice: data.contractAmt
                }
              };
              this.updateForm(res);
              this.notice = {
                text: "获取信息已自动填入，请填写未获取内容",
                mode: "reason"
              };
            } else {
              this.notice = {
                // text: msg,
                // mode: "warn"
                text: "未获取到网签信息，请补充填写表单",
                mode: "tips"
              };
            }
          }
        );
      } else {
        Toast("网签合同编号不能为空");
      }
    },
    finish(signInfo) {
      let res = this.signInfoValid(signInfo);
      if (res.result) {
        this.updateForm({ signInfo });
        this.goBack();
      } else {
        Toast(res.msg);
      }
    },
    confirm() {
      this.form.signInfo.signDate = this.dateDeal(this.currentDate);
      this.show = false;
    },
    dateDeal(val) {
      if (!val) return;
      if (!(val instanceof Date)) {
        val = new Date(val);
      }
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      return year + "-" + month + "-" + day;
    },
    /**
     * @author: jixuelian
     * @description: 将获取网签的数据转换成详情的数据
     * @param {type}
     * @return:
     */
    transformSignInfoToForm(data) {
      let from = {};
      // 备案信息
      from.signInfo = {
        contractNo: data.contractNo,
        signDate: data.recordDate,
        signCompanyName: data.mediumCompanyName,
        totalPrice: data.contractAmt
      };
      return from;
    }
  },

  watch: {},
  mounted() {},
  created() {},
  components: {
    CellGroup,
    Field,
    Button,
    Popup,
    DatetimePicker,
    Toast,
    NoticeBar,
    Input,
    FullButton
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
.bisiapply-edit-info .placeholder-require.van-cell--required::before {
  left: 9.5em;
}
</style>
<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-mortgagee">
      <AddApplicant :name="title" :applicantList="applicantList" v-bind="$attrs" />

      <footer @click="finish">
        <FullButton name="完成" cls="water-edit-footer-btn" />
      </footer>
      <Popup v-model="show" position="bottom"></Popup>

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
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import businessMix from "@/mixins/business.js";
import NavBar from "@/components/navBar.vue";
import AddApplicant from "./components/addApplicant.vue";
import { CellGroup, Field, Button, Popup, Toast, Icon } from "vant";
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
import { contractInfo } from "@/service/business";
import { mapGetters } from "vuex";
export default {
  mixins: [selectMix, businessMix],
  data() {
    return {
      value: "",
      show: false,
      cardType: [],
      applicantList: []
    };
  },
  ...mapGetters(["dict"]),
  props: {
    title: {},
    changeComponent: {},
    updateForm: {},
    form: { default: { mortgageeInfo: { applicantList: [] } } }
  },
  computed: {},
  methods: {
    onApplicantChange() {
      console.log("TODO print by jxl", arguments);
    },
    getCardName(type) {
      return this.cardType[type] ? this.cardType[type].name : "";
    },
    addProxy(index) {
      if (!this.applicantList[index].proxyList) {
        this.applicantList[index].proxyList = [];
      }
      this.applicantList[index].proxyList.push({});
    },
    delProxy() {},
    addmortgagee() {
      this.applicantList.push({
        cardType: "",
        cardNo: "",
        mobile: "",
        proxyList: []
      });
    },
    delmortgagee(index) {
      this.applicantList.splice(index, 1);
    },
    finish() {
      let mortgageeInfo = {
        applicantList: this.applicantList
      };
      this.idCardValid(mortgageeInfo, res => {
        if (!res.result) {
          Toast(res.msg);
          return false;
        }
        res = this.mortgageeValid(mortgageeInfo);
        if (res.result) {
          this.updateForm({ mortgageeInfo });
          this.goBack();
        } else {
          Toast(res.msg);
        }
      });
    }
  },
  watch: {
    form(form, oldform) {
      let { applicantList } = form.mortgageeInfo;
      this.applicantList = applicantList.length ? applicantList : [{}];
    }
  },
  mounted() {
    let { applicantList } = this.form.mortgageeInfo;
    this.applicantList = applicantList.length ? applicantList : [{}];
    this.cardType = this.$store.getters.dict["cardType"];
  },
  created() {},
  components: {
    CellGroup,
    Field,
    Button,
    Popup,
    Toast,
    Input,
    Icon,
    FullButton,
    SelectPage,
    AddApplicant
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-mortgagee {
  padding-bottom: 88px;
  &-wrap {
    background: rgba(203, 210, 222, 0.2);
    width: 343px;
    margin: 16px auto 0 auto;
    padding: 16px 12px;
    .title {
      position: relative;
      i.van-icon {
        margin-right: 6px;
        font-size: 16px !important;
        vertical-align: text-bottom;
        position: absolute;
        right: 0;
      }
    }
    .form {
      width: 320px;
      margin: auto;
      padding-top: 16px;
      .add-btn {
        color: #0061ff;
        line-height: 25px;
        font-size: 15px;
        text-align: center;
        i.van-icon {
          margin-right: 6px;
          padding-top: 25px;
          font-size: 25px !important;
          vertical-align: text-bottom;
          color: #0061ff !important;
        }
      }
    }
  }
  &-infowrap {
    background: rgba(203, 210, 222, 0.2);
    width: 100%;
    padding: 6px 16px;
    color: #5d6471;
  }
  .border-btn {
    display: block;
    background: #ffffff;
    border: 1Px solid #0061ff;
    border-radius: 2px;
    min-width: 160px;
    height: 36px;
    line-height: 36px;
    font-size: 15px;
    color: #0061ff;
    margin: 32px auto;
  }
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
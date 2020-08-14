<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-obligor">
      <AddApplicant :name="title" :applicantList="applicantList" v-bind="$attrs" />
      <AddFamily
        v-if="hasObligorFamily"
        :applicantList="applicantList"
        :familyList="familyList"
        v-bind="$attrs"
      />
      <footer @click="finish">
        <FullButton name="完成" cls="water-edit-footer-btn" />
      </footer>
      <Popup v-model="show" position="bottom"></Popup>
    </div>
  </div>
</template>

<script>
import selectMix from "@/mixins/selectPage.js";
import businessMix from "@/mixins/business.js";
import NavBar from "@/components/navBar.vue";
import AddApplicant from "./components/addApplicant.vue";
import AddFamily from "./components/addFamily.vue";
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
      applicantList: [],
      familyList: []
    };
  },
  ...mapGetters(["dict"]),
  props: {
    title: {},
    changeComponent: {},
    updateForm: {},
    form: { default: { obligorInfo: { applicantList: [] } } }
  },
  computed: {
    hasObligorFamily() {
      return (
        this.form.registerType == 1 ||
        this.form.registerType == 8 ||
        this.form.registerType == 9
      );
    }
  },
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
    addObligor() {
      this.applicantList.push({
        cardType: "",
        cardNo: "",
        mobile: "",
        proxyList: []
      });
    },
    delObligor(index) {
      this.applicantList.splice(index, 1);
    },
    finish() {
      let obligorInfo = {
        applicantList: this.applicantList,
        familyList: this.familyList
      };
      this.idCardValid(obligorInfo, res => {
        if (!res.result) {
          Toast(res.msg);
          return false;
        }
        res = this.obligorValid(obligorInfo);
        if (res.result) {
          this.updateForm({ obligorInfo });
          this.goBack();
        } else {
          Toast(res.msg);
        }
      });
    }
  },
  watch: {
    form(form, oldform) {
      let { applicantList, familyList } = form.obligorInfo;
      this.applicantList = applicantList.length ? applicantList : [{}];
      this.familyList = familyList ? familyList : [{ familyMemberList: [] }];
    }
  },
  mounted() {
    let { applicantList, familyList } = this.form.obligorInfo;
    this.applicantList = applicantList.length ? applicantList : [{}];
    this.familyList = familyList ? familyList : [{ familyMemberList: [] }];
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
    AddApplicant,
    AddFamily
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-obligor {
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
  .input_ {
    position: relative;
    padding: 0 16px;
    background: #fff;
    .van-cell--large .van-cell__title {
      font-size: 15px;
    }
    .an-field__clear,
    .van-field__right-icon {
      padding-left: 7px;
    }
    .van-field__left-icon .van-icon,
    .van-field__right-icon .van-icon {
      color: #aab0b9 !important;
    }
    .van-cell--large {
      padding: 16px 0;
      font-size: 15px;
      & > .van-cell__title {
        font-size: 15px;
      }
    }

    .van-field__label--left {
      text-align: left;
    }
    &:after {
      content: "";
      width: calc(100% - 16px);
      height: 1Px;
      background: #ddd;
      position: absolute;
      bottom: 0;
      left: 16px;
      transform: scaleY(0.5);
    }
  }
}
</style>
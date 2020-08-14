<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-mortgagor">
      <AddApplicant :name="title" :applicantList="applicantList" v-bind="$attrs" />
      <AddFamily :applicantList="applicantList" :familyList="familyList" v-bind="$attrs" />

      <footer @click="goNext">
        <FullButton name="下一项" cls="water-edit-footer-btn" />
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
    form: { default: { mortgagorInfo: { applicantList: [] } } }
  },
  computed: {},
  methods: {
    getCardName(type) {
      return this.cardType[type] ? this.cardType[type].name : "";
    }
  },
  watch: {
    form(form, oldform) {
      let { applicantList, familyList } = form.mortgagorInfo;
      this.applicantList = applicantList.length ? applicantList : [{}];
      this.familyList = familyList ? familyList : [{}];
    }
  },
  mounted() {
    let { applicantList, familyList } = this.form.mortgagorInfo;
    this.applicantList = applicantList.length ? applicantList : [{}];
    this.familyList = familyList ? familyList : [{}];
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
    AddApplicant,
    AddFamily
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-mortgagor {
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
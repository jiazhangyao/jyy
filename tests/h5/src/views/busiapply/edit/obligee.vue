// TODO required的位置
<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-obligee">
      <div class="bisiapply-edit-obligee-wrap">
        <AddApplicant :name="title" :applicantList="applicantList" :onChange="onApplicantChange" />
        <AddFamily
          v-if="hasObligeeFamily"
          :applicantList="applicantList"
          :familyList="familyList"
          v-bind="$attrs"
        />
        <div v-if="hasownedWay">
          <div @click="changeS(ownershipTypeConst,'ownershipType','共有方式', ownershipType)">
            <Field
              input-align="right"
              :value.sync="ownershipType"
              label="共有方式"
              placeholder="请选择"
              icon="arrow"
              required
              :onSelect="onOwnershipSelect"
              disabled
            />
          </div>
          <div v-if="ownershipType=='按份额共有'">
            <div
              class="indent"
              v-for="(holdItem, holdItemIndex) in applicantList"
              :key="'holdItem'+holdItemIndex"
            >
              <div v-if="holdItem.name">
                <Input
                  input-align="right"
                  :value.sync="holdItem.rightProportion"
                  :label="holdItem.name"
                  required
                  sufix="%"
                />
              </div>
            </div>
          </div>
          <div @click="changeS(holdingTypeConst,'holdingType','持证方式', holdingType)">
            <Field
              input-align="right"
              :value.sync="holdingType"
              label="持证方式"
              placeholder="请选择"
              icon="arrow"
              required
              :onSelect="onHoldingTypeSelect"
              disabled
            />
          </div>
          <div v-if="holdingType=='共同持证'">
            <div class="indent" @click="changeS(applicantList,'isHolder','持证人', isHolder)">
              <Field
                input-align="right"
                label="持证人"
                required
                :value.sync="isHolder"
                placeholder="请选择"
                icon="arrow"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <footer @click="finish()">
        <FullButton name="完成" cls="water-edit-footer-btn" />
      </footer>
      <Popup v-model="show" position="bottom"></Popup>

      <SelectPage
        v-if="select_show"
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
import { ownershipTypeConst, holdingTypeConst } from "../const";
export default {
  mixins: [selectMix, businessMix],
  data() {
    return {
      value: "",
      show: false,
      applicantList: [],
      familyList: [],
      ownershipType: "",
      holdingType: "",
      ownershipTypeConst: ownershipTypeConst,
      holdingTypeConst: holdingTypeConst,
      cardType: [],
      isHolder: ""
    };
  },
  ...mapGetters(["dict"]),
  props: {
    title: {},
    changeComponent: {},
    updateForm: {},
    form: { default: { obligeeInfo: { applicantList: [] } } }
  },
  computed: {
    hasObligeeFamily() {
      return (
        this.form.registerType == 1 ||
        this.form.registerType == 8 ||
        this.form.registerType == 9 ||
        this.form.registerType == 3
      );
    }
  },
  methods: {
    hideSelect() {
      this.propsValue = ""; // 多个选择器的时候，值会互相污染
      this.select_show = false;
    },
    onApplicantChange() {},
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
    addObligee() {
      this.applicantList.push({
        cardType: "",
        cardNo: "",
        mobile: "",
        proxyList: []
      });
    },
    delObligee(index) {
      this.applicantList.splice(index, 1);
    },
    finish() {
      let obligeeInfo = {
        applicantList: this.applicantList,
        familyList: this.familyList,
        ownershipType: this.ownershipType
          ? this.arrGet(this.ownershipTypeConst, this.ownershipType, "key")
          : "",
        holdingType: this.holdingType
          ? this.arrGet(this.holdingTypeConst, this.holdingType, "key")
          : ""
      };
      this.idCardValid(obligeeInfo, res => {
        if (!res.result) {
          Toast(res.msg);
          return false;
        }
        res = this.obligeeValid(obligeeInfo);
        if (res.result) {
          this.updateForm({
            obligeeInfo: obligeeInfo
          });
          this.goBack();
        } else {
          Toast(res.msg);
        }
      });
    },
    changeOwnership() {},
    onHoldingTypeSelect() {},
    onOwnershipSelect() {}
  },
  watch: {
    ownershipType(curV, beforeV) {},
    isHolder(curV, beforeV) {
      // 持证人信息更改，将持证人信息放在对用的权利人处，TODO同名会有问题
      for (const item of this.applicantList) {
        item.isHolder = item.name == curV ? 1 : 0;
      }
    },
    form(form, oldform) {
      let { applicantList, familyList } = form.obligeeInfo;
      this.applicantList = applicantList.length ? applicantList : [{}];
      this.familyList = familyList ? familyList : [{ familyMemberList: [] }];
    }
  },
  mounted() {
    let {
      applicantList,
      familyList,
      ownershipType,
      holdingType
    } = this.form.obligeeInfo;
    this.applicantList = applicantList.length ? applicantList : [{}];
    this.familyList = familyList ? familyList : [{ familyMemberList: [] }];
    this.holdingType = this.getNameByKey(this.holdingTypeConst, holdingType);
    this.ownershipType = this.getNameByKey(
      this.ownershipTypeConst,
      ownershipType
    );
    let applicant = this.applicantList.find(item => item.isHolder == 1);
    this.isHolder = applicant ? applicant.name : "";
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
.bisiapply-edit-obligee {
  padding-bottom: 88px;
  &-wrap {
    padding-bottom: 40px;
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
  .indent {
    margin-left: 15px;
  }
}
</style>
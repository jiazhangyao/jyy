<template>
  <div>
    <NavBar :navTitle="componentTitle" :goBack="goBack" />
    <div class="bisiapply-edit-buyerInfoForSaler">
      <div class="tips">受让人必须是产权人之一</div>
      <Button v-if="canEdit() && !applicantList.name" class="add-btn" @click="addapplicant">添加受让人</Button>
      <div class="tips" v-if="!canEdit() && !applicantList.name">暂无受让人信息</div>
      <div v-if="applicantList.name" >
        <Field
          input-align="right"
          :value="getNameByKey(orgTypeConst, applicantList.orgType)"
          label="不动产权利类型"
          placeholder="请选择"
          icon="arrow"
          disabled
        />
        <div v-if="applicantList.orgType==2">
          <Field
            v-model="applicantList.name"
            label="名称"
            placeholder="请输入"
            input-align="right"
            disabled
          />
          <Field
            input-align="right"
            v-model="cardTypeName"
            label="企业/单位证件类型"
            placeholder="请选择"
            icon="arrow"
            disabled
          />
          <Field
            v-model="applicantList.cardNo"
            label="证件号码"
            placeholder="请输入"
            input-align="right"
            disabled
          />
          <Field
            v-model="applicantList.corporationName"
            label="法人/负责人证件姓名"
            placeholder="请输入"
            input-align="right"
            disabled
          />

          <Field
            input-align="right"
            v-model="corporationCardTypeName"
            label="法人/负责人证件类型"
            placeholder="请选择"
            icon="arrow"
            disabled
          />
          <Field
            v-model="applicantList.corporationCardNo"
            label="法人/负责人证件号码"
            placeholder="请输入"
            input-align="right"
            disabled
          />
          <Field
            v-model="applicantList.mobile"
            type="number"
            label="手机号码"
            placeholder="请输入"
            input-align="right"
            class="code-wrapper"
            disabled
          ></Field>
        </div>
        <div v-else>
          <Field
            v-model="applicantList.name"
            label="权利人姓名"
            placeholder="请输入"
            input-align="right"
            disabled
          />
          <Field
            v-model="applicantList.mobile"
            type="number"
            label="手机号码"
            placeholder="请输入"
            input-align="right"
            class="code-wrapper"
            disabled
          ></Field>
        </div>
      </div>
      <Footer :toNextPage="finish" />
      <Popup v-model="show" position="bottom"></Popup>
      <AddBuyer
        v-if="showApplicant"
        :item="dialogApplicant"
        :done="doneApplicantDialog"
        :del="()=>{}"
        :hide="()=>showApplicant=false"
        title="添加受让人"
        editType="add"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import businessMix from "@/mixins/business.js";
import NavBar from "@/components/navBar.vue";
import AddBuyer from "./components/addBuyer.vue";
import AddFamilyMember from "./components/addFamilyMember";
import { CellGroup, Field, Button, Popup, Toast, Icon } from "vant";
import { contractInfo, vaildMsgCode, sendSmsCode } from "@/service/business";
import { orgTypeConst } from "@/views/transferbusiapply/const";
import { verifyPhone } from "@/mixins/commonValid.js";
import {
  newApplicantDTO,
  newApplicantInfoDTO,
  newFamilyMemberDTO
} from "./dao.js";
import Footer from "./components/footer.vue";
export default {
  mixins: [selectMix, businessMix],
  data() {
    return {
      applicantList: {},
      isTaxesPayer: undefined,
      orgType: undefined,
      // 控制添加权利人的弹窗
      showApplicant: false,
      // 权利人弹窗的数据
      dialogApplicant: undefined,
      value: "",
      show: false,
      cardType: [],
      orgTypeConst: orgTypeConst,
      COUNTDOWN: 60,
      cardTypeName: "",
      smsCode: "",
      countDown: 60,
      btnText: "获取验证码",
      corporationCardTypeName: ""
    };
  },
  ...mapGetters(["dict"]),
  computed: {
    ...mapGetters(["dict"]),
    ...mapState("transferbusiapply", [
      "transferbusiapplyForm",
      "componentTitle",
      "pageEditable"
    ]),
    cardTypes() {
      if (this.getKeyByName(orgTypeConst, this.orgType) == "2") {
        return this.$store.getters.dict["companyCardType"];
      } else {
        return this.$store.getters.dict["personCardType"];
      }
    },
    companyLegalPersonCardType() {
      return this.$store.getters.dict["companyLegalPersonCardType"];
    }
  },
  methods: {
    addapplicant() {
      this.dialogApplicant = newApplicantDTO({
        type: 2, // 代表权利人
        orgType: this.getKeyByName(orgTypeConst, this.orgType)
      });
      this.showApplicant = true;
    },
    doneApplicantDialog(value) {
      this.showApplicant = false;

      this.applicantList = {
        ...newApplicantDTO({isTaxesPayer: 0}),
        ...value,
        isStarter: 1 // 1代表转让人填写的受让人信息
      };
    },

    finish() {
      let applicantList = this.applicantList;

      let postData = {
        applicantList: [{ ...applicantList }],
        orgType: applicantList.orgType,
        holdingType: 1,
        ownershipType: 1
      };
       
      this.$store.commit("transferbusiapply/setForm", {
        buyerInfo: { ...postData }
      });
      this.stage().then(this.goNext);
    },
  },
  watch: {},
  mounted() {
    let buyerInfo = {
      ...newApplicantInfoDTO(),
      ...this.transferbusiapplyForm.buyerInfo
    };
    buyerInfo.applicantList = buyerInfo.applicantList || [];
    this.applicantList = buyerInfo.applicantList.length
      ? buyerInfo.applicantList[0]
      : { ...newApplicantDTO() };
    let orgType = this.applicantList && this.applicantList.orgType ||  1; // 默认个人
    this.orgType = this.getNameByKey(orgTypeConst, orgType);
    this.corporationCardTypeName = this.getNameByKey(
      this.companyLegalPersonCardType,
      this.applicantList.corporationCardType
    );
    this.cardTypeName = this.getNameByKey(
      this.cardTypes,
      this.applicantList.cardType
    );

    let payer = this.applicantList.isTaxesPayer == 1 ? this.applicantList : {};

    this.isTaxesPayer = payer.name;
  },
  created() {},
  components: {
    CellGroup,
    Field,
    Button,
    Popup,
    Toast,
    Icon,
    Button,
    SelectPage,
    AddBuyer,
    AddFamilyMember,
    Footer
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-buyerInfoForSaler {
  padding-bottom: 122px;
  .van-field__label {
    width: 100px;
  }
  h2 {
    font-weight: bold;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    padding: 16px 0;
  }
  .add-btn {
    border: 1px solid #309de5;
    border-radius: 2px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #309de5;
    text-align: center;
    display: block;
    background: #ffffff;
    margin: 32px auto;
    padding: 0 16px;
  }

  .applicant {
    position: relative;
    background: #ffffff;
    width: 100%;
    height: 55px;
    border-radius: 2px;
    line-height: 55px;
    padding: 0 16px;
    font-size: 14px;
    color: #333333;
    margin-bottom: 16px;
    span.tag {
      background-image: linear-gradient(90deg, #52bafe 18%, #46caeb 100%);
      margin-left: 8px;
      line-height: 30px;
      display: inline-block;
      padding: 0 12px;
      font-size: 14px;
      color: #ffffff;
    }

    span.right-icon {
      width: 8px;
      height: 8px;
      display: inline-block;
      position: absolute;
      top: 25px;
      right: 16px;
      border-top: 1px solid #666;
      border-right: 1px solid #666;
      transform: rotate(45deg);
    }
  }

  .familymember {
    background: #ffffff;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.06);
    border-radius: 2px;
    font-size: 14px;
    color: #999999;
    letter-spacing: 0;
    padding: 20px 16px;
    position: relative;
    margin-bottom: 16px;

    .name {
      font-weight: bold;
      font-size: 18px;
      color: #333333;
      letter-spacing: 0;
    }

    .cardno {
      font-weight: bold;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      text-align: justify;
      padding: 8px 0 3px 0;
    }

    .tag {
      background-image: linear-gradient(90deg, #52bafe 18%, #46caeb 100%);
      border-radius: 0 0 2px 2px;
      position: absolute;
      top: 0;
      right: 16px;
      padding: 5px 15px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #ffffff;
    }

    .del-btn {
      position: absolute;
      bottom: 20px;
      right: 16px;
      border: 1px solid #fe3824;
      border-radius: 2px;
      font-size: 14px;
      color: #fe3824;
      letter-spacing: 0;
      text-align: center;
      padding: 5px 27px;
    }
  }

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
  }
  &-infowrap {
    background: rgba(203, 210, 222, 0.2);
    width: 100%;
    padding: 6px 16px;
    color: #5d6471;
  }
}
</style>
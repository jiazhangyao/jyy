<template>
  <div>
    <NavBar :navTitle="componentTitle" :goBack="goBack" />
    <div class="bisiapply-edit-salerInfo">
      <h2>业务办理</h2>
      <div
        v-for="(item, itemIndex) in applicantList"
        :key="'item'+itemIndex"
        class="bisiapply-edit-applicant-wrap"
      >
        <div @click="showApplicantDialog(itemIndex)" class="applicant">
          <span class="name">{{item.name}}</span>
          <span class="tag">转让人{{itemIndex+1}}</span>
          <span class="right-icon"></span>
          <span
            v-if="!checkApplicantFinished(item).result"
            class="require-tip"
          >请完善权利人{{itemIndex+1}}信息</span>
        </div>
      </div>
      <template v-if="orgType=='个人'">
        <h2>转让人家庭信息</h2>
        <div
          v-for="(item, familyIndex) in familyList"
          :key="item.familyId"
          class="bisiapply-edit-applicant-wrap"
        >
          <div
            v-for="(item, familyMemberIndex) in item.familyMemberList"
            :key="familyMemberIndex"
            class="familymember"
          >
            <div class="name">{{item.name}}</div>
            <div class="cardno">{{item.cardNo}}</div>
            <div>{{cardTypeDesc(item.cardType) || '--'}}</div>
            <div class="tag">家庭成员{{familyMemberIndex+1}}</div>
            <div
              class="del-btn"
              v-if="canEdit() && item.isApplicant==0 "
              @click="delFamilyMember(familyIndex, familyMemberIndex)"
            >删除</div>
          </div>
          <div>请补充所有转让人中的家庭信息。（家庭成员指配偶及未成年子女）</div>
          <Button class="add-btn" v-if="canEdit() && (!item.familyMemberList || item.familyMemberList.length<15)" @click="addFamilyMember(familyIndex)">添加家庭成员</Button>
        </div>
        <div
          v-if="applicantList.length>1 && transferbusiapplyForm.orderTradeInfoDTO ==
          UserRoleEnum.fromAlias('ROLE_ASSIGNOR').value"
        >
          <div
            class="indent"
            @click="beforeChangeS(applicantList,'isTaxesPayer','缴纳税费主体人员', isTaxesPayer)"
          >
            <Field
              input-align="right"
              label="缴纳税费主体人员"
              :value.sync="isTaxesPayer"
              placeholder="请选择"
              icon="arrow"
              disabled
            />
          </div>
        </div>
      </template>
      <Footer :toNextPage="finish" />
      <Popup v-model="show" position="bottom"></Popup>

      <SelectPage
        :show="select_show"
        :select="select_arr"
        v-on:pageChange="pageChange"
        v-on:hideSelect="hideSelect"
        :propsValue="propsValue"
        nextPage="three"
      />
      <AddApplicant
        v-if="showApplicant"
        :item="dialogApplicant"
        :done="doneApplicantDialog"
        :del="delApplicant"
        :title="dialogApplicantName"
        :hide="hideApplicantDialog"
        :editType="canEdit() ? 'edit' : 'detail'"
      />
      <AddFamilyMember
        v-if="showFamilyMemberDialog"
        :item="dialogFamilyMember"
        :hide="hideFamilyMemberDialog"
        :done="doneFamilyMemberDialog"
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
import AddApplicant from "./components/addApplicant";
import AddFamilyMember from "./components/addFamilyMember";
import { CellGroup, Field, Button, Popup, Toast, Icon } from "vant";
import { contractInfo } from "@/service/business";
import {
  ownershipTypeConst,
  holdingTypeConst,
  orgTypeConst,
  UserRoleEnum
} from "@/views/transferbusiapply/const";
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
      UserRoleEnum: UserRoleEnum,
      applicantList: [],
      familyList: [
        {
          familyMemberList: []
        }
      ],
      ownershipType: undefined,
      holdingType: undefined,
      isTaxesPayer: undefined,
      orgType: undefined,
      // 控制添加转让人的弹窗
      showApplicant: false,
      // 转让人弹窗的标题
      dialogApplicantName: undefined,
      // 转让人弹窗的数据
      dialogApplicant: undefined,

      // 控制添加家庭成员的弹窗
      showFamilyMemberDialog: false,
      // 家庭成员弹窗的数据
      dialogFamilyMember: undefined,
      value: "",
      show: false,
      cardType: [],
      orgTypeConst: orgTypeConst,
      ownershipTypeConst: ownershipTypeConst,
      holdingTypeConst: holdingTypeConst
    };
  },
  ...mapGetters(["dict"]),
  computed: {
    ...mapState("transferbusiapply", [
      "transferbusiapplyForm",
      "componentTitle"
    ])
  },
  methods: {
    finish() {
      let postData = {
        applicantList: this.applicantList,
        familyList: this.familyList,
        ownershipType: this.getKeyByName(
          ownershipTypeConst,
          this.ownershipType
        ),
        orgType: this.getKeyByName(orgTypeConst, this.orgType),
        holdingType: this.getKeyByName(holdingTypeConst, this.holdingType)
      };
      let isTaxesPayer =
        this.transferbusiapplyForm.orderTradeInfoDTO.taxesPayer ==
        UserRoleEnum.fromAlias("ROLE_ASSIGNOR").value
          ? 1
          : 0;
      if (postData.applicantList.length === 1) {
        postData.applicantList[0] = {
          ...postData.applicantList[0],
          isTaxesPayer: isTaxesPayer,
          orgType: postData.orgType,
          ownershipType: postData.ownershipType,
          holdingType: postData.holdingType
        };
      } else {
        for (const iterator of postData.applicantList) {
          iterator.ownershipType = postData.ownershipType;
          iterator.holdingType = postData.holdingType;
          iterator.orgType = postData.orgType;
          iterator.isTaxesPayer =
            iterator.name === this.isTaxesPayer ? isTaxesPayer : 0;
        }
      }

      let {applicantList:salerOwnerList} = this.transferbusiapplyForm.salerJoinOwner
      salerOwnerList = salerOwnerList || [];
      this.$store.commit("transferbusiapply/setForm", {
        salerInfo: { ...postData },
        salerJoinOwner: { 
          ...this.transferbusiapplyForm.salerJoinOwner,
          applicantList: [
            ...postData.applicantList,
            ...salerOwnerList.filter(item=>item.isApplicant==0)
          ]
        }
      });
      
      this.stage().then(this.goNext);
    },
    selectOwnerShip() {
      if (this.canEdit()) {
        let ownershipTypes = ownershipTypeConst;
        if (this.applicantList.length) {
          if (this.applicantList.length == 1) {
            ownershipTypes = [
              {
                key: 1,
                name: "单独所有"
              }
            ];
            this.ownershipType =
              this.ownershipType != 1 ? undefined : this.ownershipType;
          } else {
            ownershipTypes = [
              {
                key: 2,
                name: "共同所有"
              },
              {
                key: 3,
                name: "按份额共有"
              }
            ];
            this.ownershipType = [2, 3].includes(this.ownershipType)
              ? this.ownershipType
              : undefined;
          }
          this.changeS(
            ownershipTypes,
            "ownershipType",
            "共有方式",
            this.ownershipType
          );
        } else {
          Toast("请先填写转让人！");
        }
      }
    },
    showApplicantDialog(index) {
      this.dialogApplicant = { index, ...this.applicantList[index] };
      this.showApplicant = true;
      this.dialogApplicantName = this.canEdit() ? '编辑转让人' : '查看转让人';
    },
    hideApplicantDialog() {
      this.showApplicant = false;
    },
    doneApplicantDialog(value) {
      this.showApplicant = false;
      if (value.index == undefined) {
        this.applicantList.push({
          ...newApplicantDTO(),
          ...value
        });
        this.doneFamilyMemberDialog({
          ...value,
          familyIndex: 0
        });
      } else {
        this.applicantList[value.index] = {
          ...newApplicantDTO(),
          ...value
        };
        this.updateFamilyMember({
          ...value,
          familyIndex: 0
        });
      }
    },
    hideFamilyMemberDialog() {
      this.showFamilyMemberDialog = false;
    },
    doneFamilyMemberDialog(value) {
      if (this.getKeyByName(orgTypeConst, this.orgType) != 2) {
        this.showFamilyMemberDialog = false;
        if (!this.familyList[value.familyIndex].familyMemberList) {
          this.familyList[value.familyIndex].familyMemberList = [];
        }
        this.familyList[value.familyIndex].familyMemberList.push(
          newFamilyMemberDTO(value)
        );
        this.familyList = [...this.familyList];
      }
    },
    addFamilyMember(familyIndex) {
      this.dialogFamilyMember = newFamilyMemberDTO({ familyIndex });
      this.showFamilyMemberDialog = true;
    },
    delFamilyMember(familyIndex, familyMemberIndex) {
      this.familyList[familyIndex].familyMemberList.splice(
        familyMemberIndex,
        1
      );
      this.familyList = [...this.familyList];
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
    addsalerInfo() {
      this.applicantList.push({
        cardType: "",
        cardNo: "",
        mobile: "",
        proxyList: []
      });
    },
    delsalerInfo(index) {
      this.applicantList.splice(index, 1);
    }
  },
  watch: {},
  mounted() {
    let salerInfo = {
      ...newApplicantInfoDTO(),
      ...this.transferbusiapplyForm.salerInfo
    };
    this.applicantList = salerInfo.applicantList ? salerInfo.applicantList : [];
    this.familyList = salerInfo.familyList ? salerInfo.familyList : [];
    let orgType =
      this.applicantList[0] && this.applicantList[0].orgType
        ? this.applicantList[0].orgType
        : 1; // 默认个人
    this.orgType = this.getNameByKey(orgTypeConst, orgType);

    let firstApplicantList = this.applicantList[0] || {};
    this.ownershipType = this.getNameByKey(
      ownershipTypeConst,
      firstApplicantList.ownershipType ||
        (this.applicantList.length > 1 ? 2 : 1)
    );
    this.holdingType = this.getNameByKey(
      holdingTypeConst,
      firstApplicantList.holdingType || 1
    );
    let payer = this.applicantList.find(item => item.isTaxesPayer == 1) || {};
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
    AddApplicant,
    AddFamilyMember,
    Footer
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-salerInfo {
  padding: 0 16px 151px 16px;
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
    .require-tip {
      font-size: 14px;
      color: #fe3824;
      float: right;
      line-height: 55px;
      margin-right: 18px;
    }
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
<template>
  <div>
    <NavBar :navTitle="componentTitle" :goBack="goBack" />
    <div class="bisiapply-edit-buyerInfo">
      <h2>申请人信息</h2>
      <div class="bisiapply-edit-applicant-wrap">
        <div @click="beforeChangeOrgType( orgTypeConst, 'orgType', '不动产权利类型',orgType )">
          <Field
            input-align="right"
            :value.sync="orgType"
            label="不动产权利类型"
            placeholder="请选择"
            icon="arrow"
            disabled
          />
        </div>
        <div v-for="(item, itemIndex) in applicantList" :key="'item'+itemIndex">
          <div @click="showApplicantDialog(itemIndex)" class="applicant">
            <span class="name">{{item.name}}</span>
            <span class="tag">权利人{{itemIndex+1}}</span>
            <span class="right-icon"></span>
          </div>
        </div>
      </div>

      <Button v-if="editable  && applicantList.length<5" class="add-btn" @click="addapplicant">添加权利人</Button>
      <template v-if="orgType=='企业'">
        <div class="bisiapply-edit-applicant-wrap mt25">
          <div>
            <div @click="selectOwnerShip">
              <Field
                input-align="right"
                :value="ownershipType"
                label="共有方式"
                placeholder="请选择"
                icon="arrow"
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
                  <Field
                    input-align="right"
                    v-model="holdItem.rightProportion"
                    :label="holdItem.name"
                    sufix="%"
                  >
                    <div
                      slot="right-icon"
                      size="small"
                      type="primary"
                      :style="{ 'color': '#5d6471'}"
                    >%</div>
                  </Field>
                </div>
              </div>
            </div>
            <div @click="beforeChangeS( holdingTypeConst, 'holdingType', '持证方式',holdingType )">
              <Field
                input-align="right"
                :value.sync="holdingType"
                label="持证方式"
                placeholder="请选择"
                icon="arrow"
                disabled
              />
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <h2>申请人家庭信息</h2>
        <div class="bisiapply-edit-applicant-wrap">
          <div>
            <div @click="selectOwnerShip">
              <Field
                input-align="right"
                :value="ownershipType"
                label="共有方式"
                placeholder="请选择"
                icon="arrow"
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
                  <Field
                    input-align="right"
                    v-model="holdItem.rightProportion"
                    :label="holdItem.name"
                    sufix="%"
                  >
                    <div
                      slot="right-icon"
                      size="small"
                      type="primary"
                      :style="{ 'color': '#5d6471'}"
                    >%</div>
                  </Field>
                </div>
              </div>
            </div>
            <div @click="beforeChangeS( holdingTypeConst, 'holdingType', '持证方式',holdingType )">
              <Field
                input-align="right"
                :value.sync="holdingType"
                label="持证方式"
                placeholder="请选择"
                icon="arrow"
                disabled
              />
            </div>
            <div v-if="applicantList.length>1">
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
          </div>
          <div class="familymember">请补充所有申请人中的家庭信息（家庭成员指配偶及未成年子女）</div>
          <div v-for="(item, familyIndex) in familyList" :key="item.familyId">
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
                v-if="editable && item.isApplicant==0"
                class="del-btn"
                @click="delFamilyMember(familyIndex, familyMemberIndex)"
              >删除</div>
            </div>
            <Button v-if="editable && (!item.familyMemberList || item.familyMemberList.length<15)" class="add-btn" @click="addFamilyMember(familyIndex)">添加家庭成员</Button>
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
        :hide="hideApplicantDialog"
        :title="dialogApplicantName"
        :editType="editAddApplicantType"
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
import { CellGroup, Field, Button, Popup, Toast, Icon, Dialog } from "vant";
import { contractInfo, getMaterialList } from "@/service/business";
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
      applicantList: [],
      familyList: [
        {
          familyMemberList: []
        }
      ],
      holdingType: 1,
      ownershipType: 1,
      isTaxesPayer: undefined,
      orgType: undefined,
      originOrgType: undefined,
      // 控制添加权利人的弹窗
      showApplicant: false,
      // 控制添加权利人的类型，字段参考AddApplicant组件
      editAddApplicantType: undefined,
      // 权利人弹窗的标题
      dialogApplicantName: undefined,
      // 权利人弹窗的数据
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
      holdingTypeConst: holdingTypeConst,
      editable: false
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
    // select 上包装一层，当前页不可以编辑则不能选择
    beforeChangeOrgType() {
      let args = arguments;
      if (this.canEdit()) {
        if (this.applicantList.length) {
          Dialog.confirm({
            title: "提示",
            message: "更改不动产权利类型将会清空现有权利人，是否继续？"
          }).then(() => {
            this.changeS(...args);
            this.applicantList.forEach((item, index)=>{
              this.delAllpplicant({...item, index})
            })
          });
        } else {
          this.changeS(...args);
        }
      }
    },
    changeRightProportion(val) {
      this.$emit("input", val);
    },
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
          UserRoleEnum.fromAlias("ROLE_APPLICANT").value ||
        this.transferbusiapplyForm.orderTradeInfoDTO.taxesPayer ==
          UserRoleEnum.fromAlias("ROLE_ASSIGNEE").value
          ? 1
          : 0;
      if (postData.orgType != this.originOrgType ) {
        getMaterialList({
          registerType: this.transferbusiapplyForm.registerType,
          buyerOrSaler: this.transferbusiapplyForm.loginUserType || 2,
          applicantOrgType: postData.orgType
        }).then(({ data }) => {
          this.setMaterialTypeList(data || []);
        });
      }
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
          iterator.holdingType = postData.holdingType;
          iterator.ownershipType = postData.ownershipType;
          iterator.orgType = postData.orgType;

          iterator.isTaxesPayer =
            iterator.name === this.isTaxesPayer ? isTaxesPayer : 0;
        }
      }
      this.idCardValid(postData, res => {
        if (!res.result) {
          Toast(res.msg);
          return false;
        }

        let {applicantList:buyerOwnerList} = this.transferbusiapplyForm.buyerJoinOwner
        buyerOwnerList = buyerOwnerList || [];
        this.$store.commit("transferbusiapply/setForm", {
          buyerInfo: { ...postData },
          buyerJoinOwner: { 
            ...this.transferbusiapplyForm.buyerJoinOwner,
            applicantList: [
              ...postData.applicantList,
              ...buyerOwnerList.filter(item=>item.isApplicant==0)
            ]
          }
        });

        this.stage().then(this.goNext);
      });
    },
    selectOwnerShip() {
      if (!this.canEdit()) return;
      if (this.applicantList.length) {
        this.changeS(
          this.ownershipTypes,
          "ownershipType",
          "共有方式",
          this.ownershipType
        );
      } else {
        Toast("请先填写权利人！");
      }
    },
    addapplicant() {
      this.dialogApplicant = newApplicantDTO({
        type: 2, // 代表权利人
        orgType: this.getKeyByName(orgTypeConst, this.orgType)
      });
      this.dialogApplicantName = "添加权利人";
      this.editAddApplicantType = "add";
      this.showApplicant = true;
    },
    showApplicantDialog(index) {
      this.dialogApplicant = { index, ...this.applicantList[index] };
      this.showApplicant = true;
      this.editAddApplicantType = this.canEdit() ? (this.dialogApplicant.isStarter == 1 ? 'edit' : "del") : 'detail';
      this.dialogApplicantName = this.canEdit() ? (this.dialogApplicant.isStarter == 1 ? '编辑权利人' : "查看权利人") : '查看权利人';
    },
    hideApplicantDialog() {
      this.showApplicant = false;
    },
    doneApplicantDialog(value) {
      this.showApplicant = false;
      
      this.applicantList.push({
        ...newApplicantDTO(),
        ...value
      });
      this.doneFamilyMemberDialog({
        ...value,
        familyIndex: 0
      });
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
    addbuyerInfo() {
      this.applicantList.push({
        cardType: "",
        cardNo: "",
        mobile: "",
        proxyList: []
      });
    },
    delbuyerInfo(index) {
      this.applicantList.splice(index, 1);
    }
  },
  watch: {
    applicantList(val) {
      this.ownershipTypes = ownershipTypeConst;
      if (val.length) {
        if (val.length == 1) {
          this.ownershipTypes = [
            {
              key: 1,
              name: "单独所有"
            }
          ];
          this.ownershipType = "单独所有";
        } else {
          this.ownershipTypes = [
            {
              key: 2,
              name: "共同所有"
            },
            {
              key: 3,
              name: "按份额共有"
            }
          ];
          this.ownershipType == 3 ? "按份额共有" : "共同所有";
          this.ownershipType = ["按份额共有", "共同所有"].includes(
            this.ownershipType
          )
            ? this.ownershipType
            : "共同所有";
        }
      } else {
        this.ownershipType = undefined;
      }
    }
  },
  mounted() {
    let buyerInfo = {
      ...newApplicantInfoDTO(),
      ...this.transferbusiapplyForm.buyerInfo
    };
    this.applicantList = buyerInfo.applicantList ? buyerInfo.applicantList : [];
    this.familyList = buyerInfo.familyList ? buyerInfo.familyList : [{}];
    let orgType =
      this.applicantList[0] && this.applicantList[0].orgType
        ? this.applicantList[0].orgType
        : 1; // 默认个人
        this.originOrgType = orgType;
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
    this.editable =
      this.canEdit() &&
      UserRoleEnum.fromAlias("ROLE_ASSIGNOR").value !==
        this.transferbusiapplyForm.userRole; // 申请人不可编辑
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
.bisiapply-edit-applicant-wrap {
  background: #ffffff;
  font-size: 14px;
  color: #999999;
  &.mt25 {
    margin-top: 25px;
  }
}
.bisiapply-edit-buyerInfo {
  padding: 0 0 151px 0;
  .van-field__label {
    width: 100px;
  }
  h2 {
    font-weight: bold;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    padding: 16px;
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
    margin: 32px auto 0 auto;
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
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.06);
    border-radius: 2px;
    font-size: 14px;
    color: #999999;
    letter-spacing: 0;
    padding: 20px 16px 36px 16px;
    position: relative;

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
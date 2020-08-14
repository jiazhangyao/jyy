<template>
  <div>
    <div class="bisiapply-edit-family">
      <div
        class="bisiapply-edit-family-infowrap"
      >请勾选权利人组建家庭，如权利人中除自身外无家庭成员，则勾选权利人即可；如权利人有除填写外的其他家庭成员，请点击新增家庭成员进行补充并勾选；如权利人中有多个家庭，请点击新增家庭，再对应其家庭成员进行勾选。（家庭成员指配偶及未成年子女）;</div>
      <div
        v-for="(family, familyIndex) in items"
        :key="'family'+familyIndex"
        class="bisiapply-edit-family-family"
      >
        <div class="title">
          <Icon name="delete" color="#333" v-if="items.length>1" @click="delFamily(familyIndex)" />
          家庭{{familyIndex+1}}
          <Button type="info" @click="chooseMember(familyIndex)">选择成员</Button>
        </div>
        <div
          :name="familyMemberFlag"
          v-for="(member, memberIndex) in family.familyMemberList"
          :key="'member'+memberIndex"
        >
          <Field
            clearable
            :label="member.name"
            left-icon="del"
            right-icon="arrow"
            placeholder="请补充信息"
            @click-left-icon="delMember(familyIndex, memberIndex)"
            input-align="right"
            disabled
            :value="member.cardNo"
          />
        </div>
      </div>
      <Button class="border-btn" @click="addFamily">添加家庭</Button>

      <Popup v-model="popupShow" position="bottom">
        <div class="popup-action">
          <span @click="closeMember">取消</span>
          <span @click="ensureChooseMember" class="ensure">确定</span>
        </div>
        <Button class="border-btn" @click="addMember">新增成员</Button>
        <RadioGroup v-model="radio">
          <CellGroup>
            <div v-for="(member, memberIndex) in applicants" :key="'member'+memberIndex">
              <Cell
                :title="member.name"
                :label="getNameByKey(cardType, member.cardType)+': '+member.cardNo"
                clickable
                v-if="!member.selected && member.name"
                @click="choosedMemberIndex = memberIndex"
              >
                <Radio checked-color="#07c160" :name="memberIndex" />
              </Cell>
            </div>
          </CellGroup>
        </RadioGroup>
      </Popup>

      <SelectPage
        :show="select_show"
        :select="select_arr"
        v-on:pageChange="pageChange"
        v-on:hideSelect="hideSelect"
        :propsValue="propsValue"
        nextPage="three"
      />
      <addMember
        position="bottom"
        :show="memberShow"
        :closeMember="closeMemberPopup"
        :done="doneMember"
        v-bind="$attrs"
      ></addMember>
    </div>
  </div>
</template>

<script>
import addMember from "./addMember.vue";
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import NavBar from "@/components/navBar.vue";
import {
  CellGroup,
  Field,
  Button,
  Popup,
  Toast,
  Icon,
  RadioGroup,
  Radio,
  Cell
} from "vant";
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
import { contractInfo } from "@/service/business";
import { mapGetters } from "vuex";
export default {
  mixins: [selectMix],
  data() {
    return {
      value: "",
      memberShow: false,
      popupShow: false,
      curFamily: [],
      radio: "",
      choosedMemberIndex: "",
      selectedFamilyIndex: "",
      familyMemberFlag: Math.random()
    };
  },
  ...mapGetters(["dict"]),
  props: {
    applicantList: {},
    familyList: {},
    changeComponent: {},
    updateForm: {}
  },
  computed: {
    cardType() {
      return this.$store.getters.dict["cardType"];
    },
    items() {
      if (this.familyList.length) {
        return this.familyList;
      } else {
        return [{}];
      }
    },
    applicants() {
      return this.applicantList;
    }
  },
  methods: {
    // 点击选择成员的按钮
    chooseMember(index) {
      // 展示popup
      this.popupShow = true;
      // 存选中的家庭的index
      this.selectedFamilyIndex = index;
    },
    // 关闭选择成员的弹出框
    closeMemberPopup() {
      this.memberShow = false;
    },
    // 关闭选择成员的弹出框
    closeMember() {
      // 取消选中的radio按钮
      this.radio = "";
      this.popupShow = false;
      // 取消选中的家庭的index
      // this.selectedFamilyIndex = "";
      // 取消选中的成员的index
      this.choosedMemberIndex = "";
    },
    // 新增成员的确认按钮
    doneMember({ mobile, cardNo, cardType, name, isApplicant }) {
      let curFamilyMemberList = this.items[this.selectedFamilyIndex]
        .familyMemberList;

      if (cardNo && cardType && name) {
        let existMember = curFamilyMemberList.find(
          item => item.cardNo == cardNo && item.cardType == cardType
        );
        if (existMember) {
          Toast("该成员已存在,请重新填写");
        } else {
          // 当前家庭的成员列表增加
          if (!curFamilyMemberList) {
            curFamilyMemberList = [];
          }
          curFamilyMemberList.push({
            mobile,
            cardNo,
            cardType,
            name,
            isApplicant
          });
          // 隐藏新增成员的弹出框
          this.memberShow = false;
        }
      } else {
        Toast("请填写成员信息");
      }
    },
    // 选择成员的确认按钮
    ensureChooseMember() {
      // 有选中的成员再操作
      if (this.choosedMemberIndex > -1) {
        // 当前家庭的成员列表增加
        let { selected, ...rest } = this.applicants[this.choosedMemberIndex];
        if (!this.items[this.selectedFamilyIndex].familyMemberList) {
          this.items[this.selectedFamilyIndex].familyMemberList = [];
        }
        this.items[this.selectedFamilyIndex].familyMemberList.push({
          ...rest,
          isApplicant: 1
        });
        // 待选项设置为已经选择
        this.applicants[this.choosedMemberIndex].selected = true;
      }
      this.closeMember();
    },
    pageChange(select) {
      if (this.disabled) {
        return false;
      }
      if (select) {
        this[this.select_key] = select;
      }

      this.hideSelect();
    },
    // 点击新增成员
    addMember() {
      this.memberShow = true;
      this.closeMember();
    },
    // 删除家庭中成员
    delMember(familyIndex, memberIndex) {
      // 当前选中的家庭中的成员
      let member = this.items[familyIndex].familyMemberList[memberIndex];
      // 删除家庭中的成员
      this.items[familyIndex].familyMemberList.splice(memberIndex, 1);
      this.familyMemberFlag = Math.random();
      // 备选成员的selected值还原成可选
      for (const item of this.applicants) {
        if (
          member.name == item.name &&
          member.cardNo == item.cardNo &&
          member.cardType == item.cardType
        ) {
          delete item.selected;
        }
      }
    },
    addFamily() {
      this.items.push({
        cardType: "",
        cardNo: "",
        mobile: "",
        familyMemberList: []
      });
    },
    delFamily(index) {
      this.items.splice(index, 1);
    },
    getFamilyMemberByIndex() {
      let { familyMemberList } = this.items[this.selectedFamilyIndex];
      familyMemberList = familyMemberList || [];
      return familyMemberList;
    }
  },
  watch: {
    familyList(familyList) {
      for (const family of familyList) {
        if (family.familyMemberList) {
          for (const member of family.familyMemberList) {
            if (member.isApplicant) {
              for (let index = 0; index < this.applicantList.length; index++) {
                const applicant = this.applicantList[index];
                if (
                  member.name == applicant.name &&
                  member.cardNo == applicant.cardNo &&
                  member.cardType == applicant.cardType
                ) {
                  this.applicantList[index] = {
                    ...this.applicantList[index],
                    selected: true
                  };
                }
              }
            }
          }
        }
      }
    }
  },
  mounted() {},
  created() {},
  components: {
    RadioGroup,
    Cell,
    Radio,
    CellGroup,
    Field,
    Button,
    Popup,
    Toast,
    Input,
    Icon,
    FullButton,
    addMember,
    SelectPage
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-family {
  &-infowrap {
    background: rgba(203, 210, 222, 0.2);
    width: 100%;
    padding: 6px 16px;
    color: #5d6471;
  }
  &-family {
    font-size: 15px;
    margin-left: 16px;
    .title {
      padding: 20px 0;
      border-bottom: 1Px solid #cbd2de;
      font-size: 15px;
      color:#5d6471;
      i {
        vertical-align: sub;
      }
      button {
        position: absolute;
        right: 0;
        margin-right: 16px;
        padding: 8px;
        line-height: 14px;
        height: auto;
      }
    }
  }
  .popup-action {
    font-size: 16px;
    padding: 13px 16px;
    border: 1Px solid #cbd2de;
    .ensure {
      color: #0061ff;
      float: right;
    }
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
  .van-cell__label {
    white-space: nowrap;
  }
}
</style>
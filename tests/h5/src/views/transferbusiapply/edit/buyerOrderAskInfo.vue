<template>
  <div>
    <NavBar :navTitle="componentTitle" :goBack="goBack" />
    <ul>
      <li>
        <div class="question">1.申请事项是否为申请人真实意思？</div>
        <div class="answer">
          <template v-if="canEdit()">
            <button :class="isReal==1 ? '' : 'not'">是</button>
            <button @click="onItemClick('isReal',0)" :class="isReal==0 ? '' : 'not'">否</button>
          </template>
          <template v-else>{{isReal==1?"是":"否"}}</template>
        </div>
      </li>
      <li>
        <div class="question">2.申请登记的不动产有无共有人？</div>
        <div class="answer">
          <template v-if="canEdit()">
            <button :class="haveJoinOwner==1 ? '' : 'not'">是</button>
            <button :class="haveJoinOwner==0 ? '' : 'not'">否</button>
          </template>
          <template v-else>{{haveJoinOwner==1?"是":"否"}}</template>
        </div>
        <div
          class="owner-box"
          v-if="haveJoinOwner==1 && userRole == UserRoleEnum.getValueFromAlias('ROLE_ASSIGNEE')"
        >
          <div v-for="(item, index) in applicantList" :key="item.name" class="applicant">
            <div>
              <div class="name">{{item.name || '--'}}</div>
              <div>{{item.mobile || '--'}}</div>
              <div class="cardno">{{item.cardNo || '--'}}</div>
              <div>{{cardTypeDesc(item.cardType) || '--'}}</div>
              <div class="tag">共有人{{index+1}}</div>
              <div
                class="del-btn"
                v-if="canEditApplicant && item.isApplicant==0"
                @click="delApplicant(index)"
              >删除</div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="question">3.是否保证所提交的申请登记材料、申请信息真实、合法、有效，如有不实，愿承担一切法律责任，与登记机构无关？</div>
        <div class="answer">
          <template v-if="canEdit()">
            <button :class="isLaw==1 ? '' : 'not'">是</button>
            <button @click="onItemClick('isLaw',0)" :class="isLaw==0 ? '' : 'not'">否</button>
          </template>
          <template v-else>{{isLaw==1?"是":"否"}}</template>
        </div>
      </li>
    </ul>
    <Footer :toNextPage="finish" />

    <AddJinowner
      v-if="showApplicant"
      :item="dialogApplicant"
      :done="doneApplicantDialog"
      :title="dialogApplicantName"
      :hide="hideApplicantDialog"
    />
  </div>
</template>
<script>
import { Button, Dialog } from "vant";
import { mapState, mapActions, mapGetters } from "vuex";
import businessMix from "@/mixins/business.js";
import selectMix from "@/mixins/selectPage.js";
import Footer from "./components/footer.vue";
import AddJinowner from "./components/addJinowner";
import {
  newApplicantDTO,
  newApplicantInfoDTO,
  newFamilyMemberDTO
} from "./dao.js";
import { UserRoleEnum } from "../const.js";
export default {
  mixins: [selectMix, businessMix],
  data() {
    return {
      applicantList: [],
      isReal: 1, // 1 是, 0 否
      haveJoinOwner: 1, // 1 是, 0 否
      isLaw: 1, // 1 是, 0 否
      // 控制添加共有人的弹窗
      showApplicant: false,
      // 共有人弹窗的标题
      dialogApplicantName: undefined,
      // 共有人弹窗的数据
      dialogApplicant: undefined,
      userRole: undefined,
      UserRoleEnum: UserRoleEnum
    };
  },
  computed: {
    ...mapGetters(["dict"]),
    ...mapState("transferbusiapply", [
      "transferbusiapplyForm",
      "componentTitle"
    ]),
    canEditApplicant() {
      return this.canEdit() && this.transferbusiapplyForm.registerType != 5020;
    }
  },
  methods: {
    onItemClick(param, value) {
      Dialog.confirm({
        title: "提示",
        message: "请再次确认是否选择“否”，如果选择“否”后，该业务将终止办理！"
      }).then(() => {
        this.endTransOrder();
      });
    },
    finish() {
      let postData = {
        buyerJoinOwner: { applicantList: this.applicantList },
        buyerOrderAskInfo: {
          isReal: this.isReal,
          haveJoinOwner: this.haveJoinOwner,
          isLaw: this.isLaw
        }
      };
      this.$store.commit("transferbusiapply/setForm", {
        ...postData
      });
      this.stage().then(this.goNext);
    },
    addapplicant() {
      this.dialogApplicant = newApplicantDTO({
        type: 12, //权利共有人
        isApplicant: 0
      });
      this.dialogApplicantName = "添加共有人";
      this.showApplicant = true;
    },
    hideApplicantDialog() {
      this.showApplicant = false;
    },
    doneApplicantDialog(value) {
      this.showApplicant = false;
      this.applicantList.push({
        ...newApplicantDTO(),
        ...value,
        isApplicant: 0
      });
    },
    delApplicant(index) {
      event.stopPropagation()
      this.showApplicant = false;
      this.applicantList.splice(index, 1);
    }
  },
  mounted() {
    const {
      buyerJoinOwner = { applicantList: [] },
      buyerJoinOwner: { applicantList = [] }
    } = this.transferbusiapplyForm;
    this.applicantList = applicantList || [];
    this.haveJoinOwner = (this.applicantList.length > 1 && this.applicantList[0].orgType != 2) ? 1 : 0;
    this.$store.dispatch("transferbusiapply/getUserRole").then(userRole => {
      this.userRole = userRole;
    });
  },
  components: {
    Button,
    AddJinowner,
    Footer
  }
};
</script>
<style lang="less" scoped>
ul {
  padding-bottom: 122px;
  li {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    padding: 16px;
    background: #fff;
    border-bottom: 1px solid #dfdfdf;
    .question {
      max-width: 225px;
    }
    .answer {
      position: absolute;
      top: 10px;
      right: 16px;
    }
    .owner-box {
      margin-top: 24px;
    }
  }

  button {
    background: #309de5;
    border-radius: 2px;
    width: 52px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    margin-left: 5px;
  }
  .not {
    background: #ffffff;
    border: 1px solid #309de5;
    border-radius: 2px;
    font-size: 14px;
    color: #309de5;
    letter-spacing: 0;
    text-align: center;
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
    width: auto;
  }
  .applicant {
    background: #ffffff;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.06);
    border-radius: 2px;
    font-size: 14px;
    color: #999999;
    letter-spacing: 0;
    padding: 20px 16px;
    position: relative;
    margin-bottom: 16px;
    margin-top: 10px;

    .name {
      font-weight: bold;
      font-size: 18px;
      color: #333333;
      letter-spacing: 0;
      margin-bottom: 4px;
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
}
</style>
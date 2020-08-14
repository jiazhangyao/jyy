<template>
  <div class="add-proxy">
    <NavBar :navTitle="title" :goBack="hide" />
    <div class="wrap">
      <div @click="beforeChangeS( orgTypeConst, 'orgTypeName', '不动产权利类型',orgTypeName )">
        <Field
          input-align="right"
          v-model="orgTypeName"
          label="不动产权利类型"
          placeholder="请选择"
          icon="arrow"
          disabled
        />
      </div>
      <!-- 企业 -->
      <div v-if="item.orgType=='2'">
        <Field
          :disabled="nameDisabled"
          v-model="name"
          label="名称"
          placeholder="请输入"
          input-align="right"
        />
        <div @click="beforeChangeS(cardTypes,'cardTypeName','企业/单位证件类型', cardTypeName)">
          <Field
            input-align="right"
            :value="cardTypeName"
            label="企业/单位证件类型"
            placeholder="请选择"
            icon="arrow"
            disabled
          />
        </div>
        <Field
          :disabled="itemDisabled"
          v-model="cardNo"
          label="证件号码"
          placeholder="请输入"
          input-align="right"
        />
        <Field
          :disabled="itemDisabled"
          v-model="corporationName"
          label="法人/负责人证件姓名"
          placeholder="请输入"
          input-align="right"
        />
        <div
          @click="beforeChangeS(companyLegalPersonCardType,'corporationCardTypeName','法人/负责人证件类型', corporationCardTypeName)"
        >
          <Field
            input-align="right"
            :value="corporationCardTypeName"
            label="法人/负责人证件类型"
            placeholder="请选择"
            icon="arrow"
            disabled
          />
        </div>
        <Field
          v-model="corporationCardNo"
          label="法人/负责人证件号码"
          placeholder="请输入"
          input-align="right"
          :disabled="itemDisabled"
        />
        <template v-if="!itemDisabled">
          <Field
            v-model="mobile"
            type="number"
            label="手机号码"
            placeholder="请输入"
            input-align="right"
            class="code-wrapper"
          >
            <Button
              class="btn-code"
              slot="button"
              @click="getSMSCode"
              :disabled="countDown!==COUNTDOWN"
            >{{ btnText }}</Button>
          </Field>
          <Field label="手机验证码" v-model="smsCode" placeholder="请输入短信验证码" input-align="right"></Field>
        </template>
        <template v-else>
          <Field
            v-model="mobile"
            type="number"
            label="手机号码"
            placeholder="请输入"
            input-align="right"
            class="code-wrapper"
            disabled
          ></Field>
        </template>
      </div>
      <!-- 个人 -->
      <div v-else>
        <Field
          :disabled="nameDisabled"
          v-model="name"
          label="姓名"
          placeholder="请输入"
          input-align="right"
        />
        <template v-if="!itemDisabled">
          <Field
            v-model="mobile"
            type="number"
            label="手机号码"
            placeholder="请输入"
            input-align="right"
            class="code-wrapper"
          >
            <Button
              class="btn-code"
              slot="button"
              @click="getSMSCode"
              :disabled="countDown!==COUNTDOWN"
            >{{ btnText }}</Button>
          </Field>
          <Field label="手机验证码" v-model="smsCode" placeholder="请输入短信验证码" input-align="right"></Field>
        </template>
        <template v-else>
          <Field
            v-model="mobile"
            type="number"
            label="手机号码"
            placeholder="请输入"
            input-align="right"
            class="code-wrapper"
            :disabled="itemDisabled"
          ></Field>
        </template>
      </div>
      <div class="fix-bottom" @click="finish" >
        <FullButton name="完成" cls="select-bottom" />
      </div>
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
import FullButton from "@/components/fullButton.vue";
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import { Field, Button, Toast, Dialog } from "vant";
import { mapGetters, mapState } from "vuex";
import { verifyPhone } from "@/mixins/commonValid.js";
import { vaildMsgCode, sendSmsCode } from "@/service/mortgageBusiness";
import businessMix from "@/mixins/mortgageBusiness.js";
import { orgTypeConst } from "@/views/mortgage/busiapply/const";
export default {
  mixins: [selectMix, businessMix],
  props: {
    /**
     * 编辑类型  add：新增，edit：编辑，del：仅可删除
     *
     * editType 字段现有逻辑解释
     * 当前角色类型 | 操作角色 | 可以操作的editType|desc
     * 当前角色类型 | 转让人 | 受让人 |desc
     * ---- | ---| --- | ---
     * 申请人| - | add，del | 添加受让人 add，查看已有受让人 del，
     * 转让人| edit | - | 转让人编辑产调转让人信息，不可以增删。添加受让人不是该页面
     * 受让人| - | add，del |  添加受让人 add，查看已有受让人 del，
     */
    editType: {
      default: "add"
    },
    item: {},
    hide: {},
    done: {},
    del: {},
    title: {}
  },
  data() {
    return {
      editableForEdit: false, // 编辑props下是否也已经开启编辑的状态
      COUNTDOWN: 60,
      mobile: "",
      cardNo: "",
      name: "",
      cardType: 1,
      cardTypeName: "",
      orgTypeName: "",
      smsCode: "",
      countDown: 60,
      btnText: "获取验证码",
      corporationName: "",
      corporationCardTypeName: "",
      corporationCardNo: "",
      orgTypeConst: orgTypeConst,
    };
  },
  components: {
    FullButton,
    SelectPage,
    Field,
    Button
  },
  computed: {
    ...mapGetters(["dict"]),
    ...mapState("mortgageBusiapply", ["transferbusiapplyForm"]),

    cardTypes() {
      if (this.item.orgType == "2") {
        return this.$store.getters.dict["companyCardType"];
      } else {
        return this.$store.getters.dict["personCardType"];
      }
    },
    companyLegalPersonCardType() {
      return this.$store.getters.dict["companyLegalPersonCardType"];
    },
    nameDisabled() {
      return this.itemDisabled || this.editType == "edit";
    },
    itemDisabled() {
      if (this.canEdit()) {
        if (this.editType == "del") {
          return true;
        } else if (this.editType == "edit") {
          return !this.editableForEdit;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  },
  methods: {
    // select 上包装一层，当前页不可以编辑则不能选择
    beforeChangeS() {
      if (!this.itemDisabled) {
        this.changeS(...arguments);
      }
    },
    doDone(applicant){
      Dialog.confirm({
        title: "提示",
        message: "受让人必须是产权人之一，信息一旦确认，无法更改！"
      }).then(() => {
        this.done(applicant);
      });
    },
    finish() {
      let applicant = {
        ...this.item,
        mobile: this.mobile,
        cardNo: this.cardNo,
        name: this.name,
        cardType: this.cardType,
        cardTypeDesc: this.cardTypeName,
        orgType: this.orgType,
        orgTypeDesc: this.orgTypeName,
        smsCode: this.smsCode,
        corporationName: this.corporationName,
        corporationCardType: this.corporationCardType,
        corporationCardNo: this.corporationCardNo,
        isApplicant: 1
      }; 
      if (!applicant.smsCode) {
        Toast("校验码不能为空");
        return false;
      }
      
      vaildMsgCode(applicant).then(msgRes => {
        if (msgRes.success) {
          if (this.cardType == 1) {
            // 身份证
            this.idCardValidateRes(applicant).then(res => {
              if (res.success) {
                this.doDone({...applicant, credooIdentity: 1});
              } else {
                Toast("身份证实名认证未通过");
                return false;
              }
            });
          } else {
            this.doDone(applicant);
          }
        } else {
          Toast(msgRes.msg);
          return false;
        }
      });
    },
    getSMSCode() {
      let mobileValid = verifyPhone(this.mobile);
      if (mobileValid != true) {
        Toast(mobileValid);
        return false;
      }
      if (this.countDown !== this.COUNTDOWN) return false;

      sendSmsCode({
        location: this.transferbusiapplyForm.location || "",
        mobile: this.mobile,
        name: this.name,
        registerType: this.transferbusiapplyForm.registerType
      });

      let countDownTimer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
          this.btnText = `${this.countDown}s重新获取`;
        } else {
          this.countDown = this.COUNTDOWN;
          this.btnText = "重新获取";
          clearInterval(countDownTimer);
        }
      }, 1000);
    }
  },
  watch: {
    orgTypeName(v){
      this.item.orgType = this.orgType = this.getKeyByName(this.orgTypeConst, v);
    },
    cardTypeName(curVal) {
      if (curVal) {
        this.cardType = this.arrGet(this.cardTypes, curVal, "key");
      } else {
        this.cardType = "";
      }
    },
    corporationCardTypeName(curVal) {
      if (curVal) {
        this.corporationCardType = this.arrGet(this.companyLegalPersonCardType, curVal, "key");
      } else {
        this.corporationCardType = "";
      }
    }
  },
  mounted() {
    this.cardType = this.item.cardType;
    this.orgType = this.item.orgType;
    this.cardTypeName = this.getNameByKey(this.cardTypes, this.item.cardType);
    this.orgTypeName = this.getNameByKey(this.orgTypeConst, this.item.orgType);
    this.mobile = this.item.mobile;
    this.cardNo = this.item.cardNo;
    this.name = this.item.name;
    this.corporationName = this.item.corporationName;
    this.corporationCardTypeName =  this.getNameByKey(this.companyLegalPersonCardType, this.item.corporationCardType);
    this.corporationCardNo = this.item.corporationCardNo;
  }
};
</script>

<style lang="less" scoped>
.add-proxy .nav {
  z-index: 9999;
}
.wrap {
  min-height: calc(100vh - 44px);
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 2;
  width: 100%;
  background: #fff !important;
  opacity: 1;

  .select-item {
    display: flex;
  }
}
</style>
<style lang="less">
.add-proxy .fix-bottom {
  width: 100%;
  height: 48px;
  position: fixed;
  bottom: 40px;
  display: block;
  .button {
    width: 343px;
    margin: 0 16px;
    background: #309de5;
  }
}
</style>
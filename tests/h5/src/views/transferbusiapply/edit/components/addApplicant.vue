<template>
  <div class="add-proxy">
    <NavBar :navTitle="title" :goBack="hide" />
    <div class="wrap">
      <Field
        disabled
        :value="getNameByKey(orgTypeConst, item.orgType)"
        label="不动产权利类型"
        input-align="right"
      />
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
          label="权利人姓名"
          placeholder="请输入"
          input-align="right"
        />
        <div @click="beforeChangeS(cardTypes,'cardTypeName','证件类型', cardTypeName)">
          <Field
            input-align="right"
            :value="cardTypeName"
            label="证件类型"
            placeholder="请选择"
            icon="arrow"
            :disabled="itemDisabled"
          />
        </div>
        <Field
          v-model="cardNo"
          label="证件号码"
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
            :disabled="itemDisabled"
          ></Field>
        </template>
      </div>
      <div class="fix-bottom" @click="finish" v-if="editType=='edit' && editableForEdit">
        <FullButton name="完成" cls="select-bottom" />
      </div>
      <div class="fix-bottom" @click="editableForEdit=true" v-else-if="editType=='edit'">
        <FullButton name="编辑" cls="select-bottom" />
      </div>
      <div class="fix-bottom" @click="del(item)" v-else-if="editType=='del'">
        <FullButton name="删除" cls="select-bottom" />
      </div>
      <div class="fix-bottom" @click="finish" v-else-if="editType=='add'">
        <FullButton name="完成" cls="select-bottom" />
      </div>
      <div class="fix-bottom" @click="hide" v-else>
        <FullButton name="返回" cls="select-bottom" />
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
import { Field, Button, Toast } from "vant";
import { mapGetters, mapState } from "vuex";
import { verifyPhone } from "@/mixins/commonValid.js";
import { vaildMsgCode, sendSmsCode } from "@/service/business";
import businessMix from "@/mixins/business.js";
import { orgTypeConst } from "@/views/transferbusiapply/const";
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
    ...mapState("transferbusiapply", ["transferbusiapplyForm"]),

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
    finish() {
      let applicant = {
        ...this.item,
        mobile: this.mobile,
        cardNo: this.cardNo,
        name: this.name,
        cardType: this.cardType,
        cardTypeDesc: this.cardTypeName,
        smsCode: this.smsCode,
        corporationName: this.corporationName,
        corporationCardType: this.corporationCardType,
        corporationCardNo: this.corporationCardNo,
        isApplicant: 1
      }; 
      let validResult = this.applicantValid(applicant);
      if (!validResult.result) {
        Toast(validResult.msg);
        return false;
      }
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
                this.done({...applicant, credooIdentity: 1});
              } else {
                Toast("身份证实名认证未通过");
                return false;
              }
            });
          } else {
            this.done(applicant);
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
    this.cardType = this.item.cardType; // 放在最后一行，出现不更新的情况 TODO
    this.cardTypeName = this.getNameByKey(this.cardTypes, this.item.cardType); // 放在最后一行，出现不更新的情况 TODO
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
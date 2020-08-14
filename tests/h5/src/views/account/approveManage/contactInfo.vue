<template>
  <div class="contact-info">
    <NavBar navTitle="联系方式" :goBack="goBack" />
    <div class="reject-reason" v-if="auditStatus === 4 && rejectReason">
      <p>驳回/终止原因</p>
      <p class="red">{{rejectReason}}</p>
    </div>
    <AutoForm class="form-content" v-model="approveContactInfo" :data="data" @save="saveContactInfo">
      <button class="prev-btn" slot="contactMail" @click="changeComponent('baseInfo')">上一页</button>
    </AutoForm>
  </div>
</template>
<script>
  import { CertificateType } from "./const";
  import AutoForm from "@/common/AutoForm/components/AutoForm";
  import { mapGetters, mapState } from "vuex";
  export default {
    data() {
      return {
        contactInfoData: {},
        data: [
          {
            type: 1, //输入框 , 必填
            key: "contactPerson", //key, 必填
            inputType: "text", //输入框类型, 可选
            label: "机构联系人", //label, 可选-
            value: "", //初始值, 可选
            required: false //是否必填, 可选
          },
          {
            type: 3, //输入框 , 必填
            key: "certificateType", //key, 必填
            label: "证件类型", //描述
            value: CertificateType.getTextFromValue(this.$store.getters.approveContactInfo.CertificateType || 1), //命中值
            show: false, //设为true可以让初始化时就显示
            required: false,
            data: [
              { text: "身份证", key: 1 },
              { text: "工作证", key: 2 }
            ],
            callback: (value, index, item) => {
            }
          },
          {
            type: 1, //输入框 , 必填
            key: "contactCard", //key, 必填
            inputType: "text", //输入框类型, 可选
            label: "证件号码", //label, 可选
            value: "", //初始值, 可选
            required: false //是否必填, 可选
          },
          {
            type: 1, //输入框 , 必填
            key: "contactMail", //key, 必填
            inputType: "text", //输入框类型, 可选
            label: "机构联系邮箱", //label, 可选
            value: "", //初始值, 可选
            required: false //是否必填, 可选
          },
          {
            type: 7, //一个按钮
            label: !this.$store.getters.approveEditAble || this.auditStatus === 1 ? '下一页' : '保存并下一页',
            readonly: false,
            class: "save-btn", //自定义样式,类
            hidden: false, //隐藏字段
            bgcolor: "#309de5",
            color: "#fff",
            callback: form => form
          }
        ]
      };
    },
    computed: {
      ...mapGetters(["approveContactInfo", "approveEditAble"])
    },
    props: ["changeComponent", "updateData", "auditStatus", "rejectReason"],
    methods: {
      goBack() {
        this.changeComponent('baseInfo');
      },
      saveContactInfo(data) {
        if (typeof data.certificateType === 'object') {
          data.certificateType = data.certificateType.key;
        }
        this.$store.commit("approve/setContactInfo", data);
        this.changeComponent('imgInfo')
      }
    },
    created() {
      // 不可编辑状态
      if (!this.approveEditAble || this.auditStatus === 1) {
        const data = this.data.map(item => ({
          ...item,
          disabled: true
        }));
        this.data = data;
      }
    },
    components: {
      AutoForm
    },
  }
</script>
<style lang="less">
  .contact-info {
    background-color: #f5f5f5;
    // padding: 16px;

    .form-content {
      background-color: #fff;
      padding: 16px;
    }

    .prev-btn {
      position: fixed;
      bottom: 84px;
      width: 343px;
      height: 48px;
      background-color: #fff;
      border: 1px solid #309de5;
      color: #309de5;
      font-size: 18px;
      border-radius: 4px;
    }

    /deep/.save-btn {
      position: fixed;
      bottom: 24px;
      width: 343px !important;
    }
  }
</style>
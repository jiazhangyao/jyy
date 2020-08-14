<template>
  <div class="base-info">
    <NavBar navTitle="基本信息" :goBack="goBack"/>
    <div class="reject-reason" v-if="auditStatus === 4 && rejectReason">
      <p>驳回/终止原因</p>
      <p class="red">{{rejectReason}}</p>
    </div>
    <AutoForm class="form-content" v-model="approveBaseInfo" :data="data" @save="saveBaseInfo"></AutoForm>
  </div>
</template>
<script>
  import { Type, CardType } from "./const";
  import AutoForm from "@/common/AutoForm/components/AutoForm";
  import { mapGetters, mapState } from "vuex";
  export default {
    data() {
      return {
        title: '基本信息',
        data: [
          {
            type: 1, //输入框 , 必填
            key: "name", //key, 必填
            inputType: "text", //输入框类型, 可选
            label: "机构名称", //label, 可选
            value: "", //初始值, 可选
            required: false //是否必填, 可选
          },
          {
            type: 3, //输入框 , 必填
            key: "type", //key, 必填
            label: "机构类型", //描述
            value: Type.getTextFromValue(this.$store.getters.approveBaseInfo.type || 1), //命中值
            show: false, //设为true可以让初始化时就显示
            required: false,
            data: [
              { text: "法院", key: 1 },
              { text: "金融机构", key: 2 },
              { text: "非金融机构", key: 3 }
            ],
            callback: (value, index, item) => {
            }
          },
          {
            type: 1, //输入框 , 必填
            key: "address", //key, 必填
            inputType: "text", //输入框类型, 可选
            label: "机构地址", //label, 可选
            value: "", //初始值, 可选
            required: false //是否必填, 可选
          },
          {
            type: 3, //输入框 , 必填
            key: "cardType", //key, 必填
            label: "企业/单位证件类型", //描述
            value: CardType.getTextFromValue(this.$store.getters.approveBaseInfo.cardType || 1), //命中值
            show: false, //设为true可以让初始化时就显示
            required: false,
            data: [
              { text: "统一社会信用代码", key: 1 },
              { text: "组织机构代码", key: 2 },
              { text: "其他", key: 3 }
            ],
            callback: (value, index, item) => {
            }
          },
          {
            type: 1, //输入框 , 必填
            key: "socialCredit", //key, 必填
            inputType: "text", //输入框类型, 可选
            label: "证件号码", //label, 可选
            value: "", //初始值, 可选
            required: false //是否必填, 可选
          },
          {
            type: 4, //输入框 , 必填
            key: "remark", //key, 必填
            inputType: "text", //输入框类型, 可选
            label: "公司介绍", //label, 可选
            value: "", //初始值, 可选
            required: false //是否必填, 可选
          },
          {
            type: 7, //一个按钮
            label: this.auditStatus === 1 || !this.$store.getters.approveEditAble ? '下一页' : '保存并下一页',
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
      ...mapGetters(["approveBaseInfo", "approveEditAble"]),
      getTypeValue() {
        this.data[2].data.forEach((item, index) => {
          if(item.key == this.approveBaseInfo.type) {
            return index
          }
        })
      }
    },
    props: ["changeComponent", "updateData", "auditStatus", "rejectReason"],
    methods: {
      goBack() {
        this.changeComponent('list');
      },
      getSelectValue(arr, value) {
        return 2
      },
      saveBaseInfo(data) {
        if (typeof data.type === 'object') {
          data.type = data.type.key;
        }
        if (typeof data.cardType === 'object') {
          data.cardType = data.cardType.key;
        }
        this.$store.commit("approve/setBaseInfo", data);
        this.changeComponent('contactInfo')
      }
    },
    mounted() {
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
  .base-info {
    background-color: #f5f5f5;
    // padding: 16px;

    .form-content {
      background-color: #fff;
      padding: 16px;
    }

    /deep/.save-btn {
      position: fixed;
      bottom: 24px;
      width: 343px !important;
    }
  }
</style>
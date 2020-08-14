<template>
  <div>
    <div class="approve-edit">
      <component
        :is="whichEdit"
        :changeComponent="changeComponent"
        :whichEdit="whichEdit"
        :baseInfo="baseInfo"
        :contactInfo="contactInfo"
        :imgInfo="imgInfo"
        :auditStatus="auditStatus"
        :rejectReason="rejectReason"
      ></component>
    </div>
  </div>
</template>

<script>
import { getCompanyDetail } from "@/service/user";
import list from "./list.vue";
import baseInfo from "./baseInfo.vue";
import contactInfo from "./contactInfo.vue";
import imgInfo from "./imgInfo.vue";
export default {
  data() {
    return {
      title: "", // 进入模块后的头部标题
      whichEdit: 'list',
      baseInfo: {},
      contactInfo: null,
      imgInfo: null,
      auditStatus: 1
    };
  },
  watch: {},
  methods: {
    changeComponent(item) {
      this.whichEdit = item
    }
  },
  computed: {
  },
  created() {
    const {companyId} = this.$store.state.account.userTotalInfo;
    if (!!companyId) {
      // 有company表示操作过认证步骤
      getCompanyDetail().then(res => {
        const {success, msg, data} = res;
        if (success) {
          this.auditStatus = data.auditStatus;
          const {
            rejectReason, // 驳回原因

            name,
            type,
            address, 
            cardType, 
            socialCredit, 
            remark,

            contactPerson,
            certificateType,
            contactCard,
            contactMail,

            materials

          } = data;
          // 基本信息 （机构名称，机构类型， 机构地址， 企业/单位证件类型， 证件号码， 公司介绍）
          this.baseInfo = {
            name,
            type,
            address,
            cardType,
            socialCredit,
            remark
          };
          this.$store.commit("approve/setBaseInfo", this.baseInfo);
          // 联系方式 (机构联系人, 证件类型, 证件号码, 机构联系邮箱)
          this.contactInfo = {
            contactPerson,
            certificateType,
            contactCard,
            contactMail
          };
          this.$store.commit("approve/setContactInfo", this.contactInfo);
          
          // 附件 （工作证 8， 执行公务证 9， 其他附件 99）
          this.imgInfo = materials;
          this.$store.commit("approve/setImgInfo", this.imgInfo);
          this.$store.commit("approve/setEditable", false);
          
          this.rejectReason = data.rejectReason;
          

        }else {
          Toast(msg);
        }
      })
    }else {
      // 未认证
      this.auditStatus = 3; //（自定义3 为 未认证状态）
      this.$store.commit("approve/setBaseInfo", {});
      this.$store.commit("approve/setContactInfo", {});
      this.$store.commit("approve/setImgInfo", []);
      this.rejectReason = null;
      this.$store.commit("approve/setEditable", true);
    }
  },
  mounted() {
  },
  components: {
    list,
    baseInfo,
    imgInfo,
    contactInfo
  }
};
</script>

<style lang="less" scoped>
  .approve-edit {
    text-align: left;
    .van-icon {
      color: #aab0b9 !important;
    }
    /deep/footer {
      position: fixed;
      bottom: 0;
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      border-top: 1px solid #cbd2de;
      button {
        min-width: 109px;
      }
    }
  }
  .danger {
    color: #ff2626;
  }
  /deep/.reject-reason {
      padding: 12px 16px;
      background-color: #fff;
      margin-bottom: 15px;

      p {
        font-size: 14px;
        color: #666;
        line-height: 20px;
      }

      .red {
        color: #fe3824;
        margin-top: 4px;
      }
    }
</style>
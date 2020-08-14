<template>
  <div class="approve-list">
    <NavBar navTitle="认证管理" />
    <div class="approve-status">
      <span>认证状态</span>
      <Tag round plain :type="auditStatus === 4 ? 'danger' : auditStatus === 2 ? 'success' : 'primary'">{{getStatus}}</Tag>
    </div>
    <div class="reject-reason" v-if="auditStatus === 4 && rejectReason">
      <p>驳回/终止原因</p>
      <p class="red">{{rejectReason}}</p>
    </div>
    <CellGroup>
      <Cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.name"
        is-link
        @click="changeComponent(item.url)"
      >
        <template v-if="auditStatus === 3 || approveEditAble">
          <Tag round type="danger" v-if="!componentFinished()[item.component]">未完成</Tag>
          <span v-else>可编辑</span>
        </template>
      </Cell>
    </CellGroup>
    <div class="btn-wrap" v-if="auditStatus !== 1">
      <div class="btn submit-btn" @click="submit" v-if="(approveEditAble || auditStatus === 3)">提交</div>
      <div class="btn submit-btn re-approve" @click="update" v-else-if="!approveEditAble && auditStatus !== 3 && !!isBManager">重新认证</div>
    </div>

  </div>
</template>
<script>
import { Toast, Dialog, Tag, CellGroup, Cell } from "vant";
import { addCompany, updateCompany } from "@/service/user";
import { AuditStatusEnum } from "./const";
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      list: [
        {name: '基本信息', url: 'baseInfo', component: 'baseInfo'},
        {name: '联系方式', url: 'contactInfo', component: 'contactInfo'},
        {name: '附件', url: 'imgInfo', component: 'imgInfo'}
      ],
      params: null,
      materialTypeList: [{
          id: 8,
          name: "工作证",
          minNum: 1,
          maxNum: 5,
          maxSize: 10,
          fileType: "jpg,png,docx,xlsx,pdf",
          remark: "",
          required: true
        },
        {
          id: 9,
          name: "执行公务证",
          minNum: 1,
          maxNum: 5,
          maxSize: 10,
          fileType: "jpg,png,docx,xlsx,pdf",
          remark: "",
          required: true
        },
        {
          id: 99,
          name: "其他",
          minNum: 1,
          maxNum: 5,
          maxSize: 10,
          fileType: "jpg,png,docx,xlsx,pdf",
          remark: "",
          required: false
        }]
    }
  },
  computed: {
    ...mapGetters(["approveBaseInfo", "approveContactInfo", "approveImgInfo", "approveEditAble"]),
    getStatus() {
      return AuditStatusEnum.getTextFromValue(this.auditStatus)
    },
    status() {
      if (this.auditStatus === 1) { // 认证中不可不编辑
        return false;
      }
      return true;
    },
  },
  created() {
    const {isBManager} = this.$store.state.account.userTotalInfo; //是不是管理员
    this.isBManager = isBManager;
  },
  watch: {
    baseInfo(data, oldBaseInfo) {
      this.baseInfo = data || {};
    },
    contacInfo(data, oldData){
      this.contacInfo = data || {}
    },
    imgInfo(data, oldData){
      this.imgInfo = data || {}
    }
  },
  mounted() {
    this.params = {
      ...this.approveBaseInfo,
      ...this.approveContactInfo,
      materials: this.approveImgInfo
    }
  },
  props: ["changeComponent", "baseInfo", "contacInfo", "imgInfo", "auditStatus", "rejectReason"],
  components: {
    CellGroup,
    Cell,
    Tag
  },
  methods: {
    changeUrl(url) {
      this.$router.push(url);
    },
    submit() {
      const {approveBaseInfo, approveContactInfo, approveImgInfo} = this.$store.getters; 
      const params = {
        ...approveBaseInfo,
        ...approveContactInfo,
        materials: approveImgInfo
      }
      let finished = true;
      for (const item of this.list) {
        if (!this.componentFinished()[item.component]) {
          Toast("请检查" + item.name + "的信息");
          finished = false;
          return false;
        }
      }

      if (finished) {
        this.finalCompany(params);
      }
    },
    finalCompany(params) {
      const companyFunc = this.auditStatus === 3 ? addCompany : updateCompany;
      companyFunc(params).then(res => {
        const {success, data, msg} = res;
        if(success) {
          Toast.success('提交成功');
          this.$router.push('/');
        }else {
          Toast.fail(msg);
        }
      }).catch(err => {
        console.log('返回失败', err)
        Toast.fail(msg);
      })
    },
    update() {
      this.$store.commit("approve/setEditable", true);
    },
    baseInfoValid(baseInfo = {}) {
      if (!baseInfo.name) {
        return {
          result: false,
          msg: '机构名称不能为空'
        };
      } else if (!baseInfo.address) {
        return {
          result: false,
          msg: '机构地址不能为空'
        };
      } else if (!baseInfo.socialCredit) {
        return {
          result: false,
          msg: '证件不能为空'
        };
      } else if (!baseInfo.remark) {
        return {
          result: false,
          msg: '公司介绍不能为空'
        };
      }
      return {
        result: true,
        msg: ''
      };

    },
    contactInfoValid(contactInfo = {}) {
      if (!contactInfo.contactPerson) {
        return {
          result: false,
          msg: '机构联系人不能为空'
        };
      } else if (!contactInfo.contactCard) {
        return {
          result: false,
          msg: '证件号码不能为空'
        };
      } else if (!contactInfo.contactMail) {
        return {
          result: false,
          msg: '机构联系邮箱不能为空'
        };
      }
      return {
        result: true,
        msg: ''
      };
    },
    imgInfoValid(materialList = []) {
      if (materialList.length) {
        for (let item of this.materialTypeList) {
          if (item.required && !this.getMaterials(this.approveImgInfo, item.id).length) {
            return { result: false, msg: `${item.name}不能为空` };
          }
        }
        return { result: true };
      } else {
        return { result: false, msg: `材料列表不能为空` };
      }
    },
    getMaterials(materialList, type) {
      for (let material of materialList) {
        if (material.type == type) {
          return material.files;
        }
      }
      return [];
    },
    componentFinished() {
      const res = {
        baseInfo: this.baseInfoValid(this.approveBaseInfo).result,
        contactInfo: this.contactInfoValid(this.approveContactInfo).result,
        imgInfo: this.imgInfoValid(this.approveImgInfo).result
      }
      return res;
    }
  } 
}
</script>
<style lang="less">
  .approve-list {
    height: calc(100vh - 44px);
    background-color: #f5f5f5;
    padding: 16px;

    /deep/.van-tag--danger {
      // background-color: #f5e9e8;
    }

    .approve-status {
      margin-bottom: 16px;
      font-size: 14px;
      color: #666;

      span {
        display: inline-block;
        margin-right: 6px;
      }
    }

    .reject-reason {
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

    .btn-wrap {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 24px;
      padding: 0 16px;

      .btn {
        height: 48px;
        line-height: 48px;
        text-align: center;
        background-color: #309de5;
        color: #fff;
        border-radius: 4px;
        font-size: 18px;
      }

      .re-approve {
        background-color: #fff;
        color: #309de5;
        border: 1px solid #309de5;
      }
    }
  }
</style>
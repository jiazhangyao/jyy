<template>
  <div>
    <NavBar navTitle="我的证照" />
    <div class="info-card">
      <div class="table">
        <header>{{info.certificateTypeName}}</header>
        <div class="main">
          <div>
            <label>证明编号</label>
            <span>{{info.certificateNum}}</span>
          </div>
          <div>
            <label>颁证机构</label>
            <span>{{info.certificateIssuingAuthorityName}}</span>
          </div>
          <div>
            <label>持证主体</label>
            <span>{{certificateHolderName}}</span>
          </div>
          <div>
            <label>主体编号</label>
            <span>{{certificateHolderCode}}</span>
          </div>
          <!-- // 不动产登记证明 A00001 -->
          <!-- // 不动产权证书 B00001 -->
          <div v-if="info.certificateTypeCode=='A00001'">
            <label>登记日期</label>
            <span>{{info.bizDetail.date}}</span>
          </div>
          <div v-if="info.certificateTypeCode=='B00001'">
            <label>使用期限</label>
            <span>{{info.bizDetail.usePeriod}}</span>
          </div>
        </div>
      </div>
      <div class="list">
        <router-link :to="toDetail()">
          <li>
            证照详情
            <i class="right-icon"></i>
          </li>
        </router-link>
        <div @click="scopeShow=true">
          <li>
            使用范围
            <i class="right-icon"></i>
          </li>
        </div>
        <div @click="openFile(files,'证照文件')">
          <li>
            证照文件
            <i class="right-icon"></i>
          </li>
        </div>
      </div>
    </div>
    <Scope :show="scopeShow" :scope="scope" v-on:goBack="hideLayer" />
    <Files :show="fileShow" :files="files" v-on:goBack="hideLayer" />
  </div>
</template>
<script>
import certificateMix from "@/mixins/eCertificate.js";
import { IdCheck } from "@/service/common";
import { AppointList } from "@/service/common";
import Scope from "./components/scope";
import Files from "./components/files";
import {
  getCertificateDetail,
  getCertificateFile
} from "@/service/eCertificate";
export default {
  mixins: [certificateMix],
  data() {
    return {
      info: {},
      certificateHolderCode: "",
      certificateHolderName: "",
      scope: [],
      files: [],
      fileShow: false,
      fileTitle: "",
      scopeShow: false
    };
  },
  watch: {
    info(curVal = {}) {
      this.scope = [
        {
          name: "可使用机构",
          value: curVal.useGov
        },
        {
          name: "可使用城市",
          value: curVal.useCity
        }
      ];
    }
  },
  components: { Files, Scope },
  methods: {
    toDetail() {
      return {
        name: "certificateDetail",
        query: { ...this.$route.query }
      };
    },
    openFile(files, title) {
      getCertificateFile({
        authCode: this.authCode,
        certificateNumber: this.$route.query.id
      }).then(({ success, data }) => {
        this.fileShow = true;
        this.files = data.fileInfoList;
        this.fileTitle = title;
      });
    },
    // 关闭所有 遮罩层
    hideLayer() {
      this.fileShow = false;
      this.scopeShow = false;
    },
    init() {
      getCertificateDetail({
        authCode: this.authCode,
        certificateNumber: this.$route.query.id
      }).then(({ success, data }) => {
        this.info = data || {};
        this.certificateHolderCode = this.$store.getters.normal_baseinfo.accountInfo.identity;
        this.certificateHolderName = this.$store.getters.normal_baseinfo.accountInfo.fullName;
      });
    }
  },
  computed: {},
  mounted() {}
};
</script>
<style scoped lang="less">
@border: 1Px solid #cbd2de;
.info-card {
  padding: 17px 0 0 16px;
  .table {
    border: @border;
    border-radius: 4px;
    line-height: 36px;
    font-size: 14px;
    color: #5d6471;
    letter-spacing: 0;
    margin-right: 16px;
    header {
      font-size: 16px;
      color: #0f213e;
      text-align: center;
      background: rgba(203, 210, 222, 0.2);
    }
    .main {
      text-align: left;
      >div {
        display: table;
        padding-left: 8px;
        border-top: @border;
      }
      label{
        display: table-cell;
        min-width: 95px;
        border-right: @border;
      }
      span {
        display: table-cell;

        padding-left: 15px;
        width: 100%;
      }
    }
  }
  .list {
    margin-top: 40px;
    text-align: left;
    li {
      height: 56px;
      padding: 20px 0;
      font-size: 15px;
      color: #5d6471;
      border-bottom: @border;
      line-height: 15px;
      position: relative;
      .right-icon {
        width: 10px;
        height: 10px;
        display: inline-block;
        border-top: @border;
        border-right: @border;
        transform: rotate(45deg);
        position: absolute;
        top: 22px;
        right: 18px;
      }
    }
  }
}
</style>

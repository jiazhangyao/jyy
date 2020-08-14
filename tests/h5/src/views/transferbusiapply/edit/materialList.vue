<template>
  <div>
    <NavBar :navTitle="componentTitle" :goBack="goBack" />
    <div class="bisiapply-edit-material">
      <div v-for="(item, index) in materialTypeList" :key="index">
        <ImgUploader
          :label="item.name"
          :files="getMaterialsByType(materialList,item.id)"
          :onFileChange="bindFileChange(item.id)"
          :disabled="!canEdit()"
          :required="item.required"
        />
      </div>
      <div v-if="showFiles" class="img-uploader">
        <label>相关文件</label>
        <div class="pdf-box">
          <div class="pdf-content">
            <span class="file-name" v-if="transferbusiapplyForm.registerType == 5020 ">不动产所有权登记申请信息表</span>
            <span class="file-name" v-if=" transferbusiapplyForm.registerType != 5020">不动产所有权转移登记申请信息表</span>
          </div>
          <div class="pdf-download" v-if="transferbusiapplyForm.applicationSignStatus == 1">
            <span @click="handleDownloadFile(86, transferbusiapplyForm.id)">查看</span>
          </div>
          <div class="pdf-sign" v-if="transferbusiapplyForm.applicationSignStatus == 0">签署中</div>
        </div>
        <div class="pdf-box" v-if="transferbusiapplyForm.registerType == 5030 ">
          <div class="pdf-content">
            <span class="file-name">鹤岗市不动产买卖合同</span>
          </div>
          <div class="pdf-download" v-if="transferbusiapplyForm.contractSignStatus == 1">
            <span @click="handleDownloadFile(87, transferbusiapplyForm.id)">查看</span>
          </div>
          <div class="pdf-sign" v-if="transferbusiapplyForm.contractSignStatus == 0">签署中</div>
        </div>
      </div>
      <Footer :toNextPage="finish" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import businessMix from "@/mixins/business.js";
import NavBar from "@/components/navBar.vue";
import { CellGroup, Field, Button, Popup, Toast, Icon } from "vant";
import ImgUploader from "@/components/imgUploader.vue";
import { getMaterialList } from "@/service/business";
import Footer from "./components/footer.vue";
export default {
  mixins: [businessMix],
  data() {
    return {
      fileList: [],
      materialList: []
    };
  },
  computed: {
    ...mapState("transferbusiapply", [
      "transferbusiapplyForm",
      "componentTitle",
      "materialTypeList"
    ]),
    showFiles(){
      return ([ 30, 62, 35, 40, 52, 53, 54, 55 ].includes(this.transferbusiapplyForm.status) || (this.transferbusiapplyForm.status === 25 && ([this.transferbusiapplyForm.contractSignStatus, this.transferbusiapplyForm.applicationSignStatus].includes(1)))) && this.transferbusiapplyForm.isOfflineOrder != 1 
    }
  },
  methods: {
    // 合同、申请表下载
    // GET /web/api/order/down/{materialType}/{orderId}
    // materialType 材料类型(86-申请表；87-合同)
    handleDownloadFile(type, id){
      const url = `${window.location.protocol}//${
        window.location.host
      }/web/api/order/down/${type}/${id}`;
      console.log(url);
      
      window.location.href = url;
    },
    handleDownloadFile1 (type, id) {
      const url = `${window.location.protocol}//${
        window.location.host
      }/web/api/order/down/${type}/${id}`;
      this.$router.push({ name: 'pdf', query: { url: Base64.encode(url) } })
    },
    bindFileChange(typeId) {
      return files => {
        let hasType = false;
        this.materialList = this.materialList || [];
        for (const item of this.materialList) {
          if (item.materialType == typeId) {
            item.fileList = files;
            hasType = true;
          }
        }
        // 当不存在该类型时，需要将此类型放入数据中
        if (!hasType) {
          this.materialList.push({ materialType: typeId, fileList: files });
        }
      };
    },
    finish() {
      this.$store.commit("transferbusiapply/setForm", {
        materialList: [...this.materialList]
      });
      this.stage().then(this.goNext);
    }
  },
  watch: {},
  mounted() {
    this.materialList = this.transferbusiapplyForm.materialList || [];
  },
  created() {},
  components: {
    Icon,
    CellGroup,
    Field,
    Button,
    Popup,
    Toast,
    Button,
    ImgUploader,
    Footer
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-material {
  padding-bottom: 158px;
  position: relative;
  background: #fff;
  .img-uploader label {
    margin-bottom: 15px;
  }
  .pdf-box{
    position: relative;
    background: #F5F7FE;
    border-radius: 2px;
    border-radius: 2px;
    width: 343px;
    height: 82px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    padding: 12px 16px;
    margin-bottom: 8px;
    .pdf-download {
      position: absolute;
      border: 1px solid #309DE5;
      border-radius: 2px;
      border-radius: 2px;
      padding: 5px 12px;
      bottom: 12px;
      right: 16px;
      font-size: 14px;
      color: #309DE5;
      letter-spacing: 0;
      text-align: center;
    }
    .pdf-sign {
      margin-top: 11px;
      font-size: 14px;
      color: #90E051;
    }
  }
  & > div {
    margin-left: 16px;
  }
  /deep/.van-uploader__wrapper {
    margin: auto;
  }
}
</style>
<template>
  <div>
    <NavBar :navTitle="title" />

    <div class="certificate-detail">
      <Title name="业务信息" />
      <div>
        <!-- // 不动产登记证明 A00001 -->
        <div v-if="info.certificateTypeCode== 'A00001'">
          <Input
            label="证书编号"
            :labelWidth="110"
            :value="info.certificateNum"
            disabled
            placeholder="-"
          />
          <Input
            :labelWidth="140"
            label="颁证机构"
            :value="info.certificateIssuingAuthorityName"
            disabled
            placeholder="-"
          />
          <Input
            :labelWidth="140"
            label="登记日期"
            :value="info.bizDetail.date"
            disabled
            placeholder="-"
          />
          <Input
            :labelWidth="140"
            label="证明权利或事项"
            :value="info.bizDetail.proveItem"
            disabled
            placeholder="-"
          />
          <Input
            :labelWidth="140"
            label="权利人（申请人）"
            :value="info.bizDetail.applicant"
            disabled
            placeholder="-"
          />
          <Input
            :labelWidth="140"
            label="义务人"
            :value="info.bizDetail.obligorName"
            disabled
            placeholder="-"
          />
          <Input
            :labelWidth="140"
            label="坐落"
            :value="info.bizDetail.address"
            disabled
            placeholder="-"
          />
          <Input
            :labelWidth="140"
            label="不动产单元号"
            :value="info.bizDetail.orderNumber"
            disabled
            placeholder="-"
          />
          <Title name="其他" />
          <div v-if="info.bizDetail.registerType!==5">
            <Input
              :labelWidth="110"
              label="证书编号"
              :value="info.certificateNum"
              disabled
              placeholder="-"
            />
            <Input
              :labelWidth="140"
              label="颁证机构"
              :value="info.certificateIssuingAuthorityName"
              disabled
              placeholder="-"
            />
            <Input
              :labelWidth="140"
              label="不动产权证书号"
              :value="info.bizDetail.realStateCertificateNo"
              disabled
              placeholder="-"
            />
            <Input
              :labelWidth="140"
              label="抵押方式"
              :value="info.bizDetail.mortagaWay"
              disabled
              placeholder="-"
            />
            <Input
              :labelWidth="140"
              label="最高额债权额"
              :value="info.bizDetail.maxClaimValue"
              disabled
              placeholder="-"
              sufix="万元"
            />
            <Input
              :labelWidth="140"
              label="债权开始日期"
              :value="info.bizDetail.claimStartDate"
              disabled
              placeholder="-"
            />
            <Input
              :labelWidth="140"
              label="债权结束日期"
              :value="info.bizDetail.claimEndDate"
              disabled
              placeholder="-"
            />
          </div>
        </div>
        <!-- // 不动产权证书 B00001 -->
        <div v-if="info.certificateTypeCode== 'B00001'">
          <Input
            :labelWidth="140"
            label="证书编号"
            :value="info.certificateNum"
            disabled
            placeholder="-"
          />
          <Input
            :labelWidth="140"
            label="颁证机构"
            :value="info.certificateIssuingAuthorityName"
            disabled
            placeholder="-"
          />
          <Input :labelWidth="140" label="不动产权证书号" :value="propertyNoStr" disabled placeholder="-" />
          <Input
            :labelWidth="140"
            label="权利人"
            :value="info.bizDetail.applicant"
            disabled
            placeholder="-"
          />
          <Input
            :labelWidth="140"
            label="共有情况"
            :value="info.bizDetail.commonOwnership"
            disabled
            placeholder="-"
          />
          <Input
            :labelWidth="140"
            label="坐落"
            :value="info.bizDetail.address"
            disabled
            placeholder="-"
          />
          <Input
            :labelWidth="140"
            label="不动产单元号"
            :value="info.bizDetail.orderNumber"
            disabled
            placeholder="-"
          />
          <Input
            :labelWidth="140"
            label="权利类型"
            :value="info.bizDetail.rightType"
            disabled
            placeholder="-"
          />
          <Input
            :labelWidth="140"
            label="权利性质"
            :value="info.bizDetail.rightProperty"
            disabled
            placeholder="-"
          />
          <Input :labelWidth="140" label="用途" :value="info.bizDetail.use" disabled placeholder="-" />
          <Input
            :labelWidth="140"
            label="面积"
            :value="info.bizDetail.area"
            disabled
            placeholder="-"
            sufix="㎡"
          />
          <Input
            :labelWidth="140"
            label="使用期限"
            :value="info.bizDetail.usePeriod"
            disabled
            placeholder="-"
          />
          <Title name="其他" />
          <div>
            <Input
              :labelWidth="140"
              label="分摊土地使用权面积"
              :value="info.bizDetail.sharedUseArea"
              disabled
              placeholder="-"
              sufix="㎡"
            />
            <Input
              :labelWidth="140"
              label="房屋结构"
              :value="info.bizDetail.houseStructure"
              disabled
              placeholder="-"
            />
            <Input
              :labelWidth="140"
              label="套内建筑面积"
              :value="info.bizDetail.houseBuildingArea"
              disabled
              placeholder="-"
              sufix="㎡"
            />
            <Input
              :labelWidth="140"
              label="分摊建筑面积"
              :value="info.bizDetail.shardBuildingArea"
              disabled
              placeholder="-"
              sufix="㎡"
            />
            <Input
              :labelWidth="140"
              label="房屋总层数"
              :value="info.bizDetail.houseTotalLayer"
              disabled
              placeholder="-"
              sufix="层"
            />
            <Input
              :labelWidth="140"
              label="所在楼层"
              :value="info.bizDetail.houseLayer"
              disabled
              placeholder="-"
              sufix="层"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import certificateMix from "@/mixins/eCertificate.js";
import Title from "@/components/formTitle.vue";
import Input from "@/components/input.vue";
import { getCertificateDetail } from "@/service/eCertificate";
export default {
  mixins: [certificateMix],
  data() {
    return {
      info: { bizDetail: {} },
      title: "证照详情" //类型
    };
  },
  components: {
    Title,
    Input
  },
  computed: {
    propertyNoStr() {
      // console.log("❤concatPropertyNo", json)
      let detailInfo = this.info.detailInfo || "[{}]";
      let json = JSON.parse(detailInfo);
      let obj = json[2];

      if (obj) {
        let { sectionElements } = obj;

        let province = "";
        let year = "";
        let city = "";
        let code = "";
        sectionElements.map((item, index) => {
          switch (index) {
            case 0:
              province = item.labelValue;
              break;
            case 1:
              city = item.labelValue;
              break;
            case 2:
              year = item.labelValue;
              break;
            case 3:
              code = item.labelValue;
              break;
          }
        });

        return `${province}（${year}）${city}不动产权第${code}号`;
      }
    }
  },
  mounted() {},
  created() {},
  methods: {
    init() {
      getCertificateDetail({
        authCode: this.authCode,
        certificateNumber: this.$route.query.id
      }).then(({ success, data }) => {
        this.info = { ...this.info, ...data };
      });
    }
  }
};
</script>

<style lang="less" scoped>
.certificate-detail {
  min-height: calc(100vh - 44px);
  margin-bottom: 40px;
}
</style>
<style lang="less" >
.certificate-detail {
  .van-field--disabled .van-field__control {
    color: #0F213E;
  }
}
</style>
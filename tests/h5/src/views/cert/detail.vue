<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="cert-detail">
      <div class="cert-detail-title">收件人信息</div>
      <div class="cert-detail-name">
        {{baseinfo.accountInfo.fullName}}
        <span class="fr">{{baseinfo.accountInfo.phone}}</span>
      </div>
      <div class="cert-detail-addr">上海市浦东新区陆家嘴环路717号</div>
    </div>
    <div v-if="logisticsState==2">
      <Logistics :LogisticsData="mailMockDataFirstStep" :currentState="logisticsState"/>
    </div>
    <div v-if="logisticsState==3">
      <Logistics :LogisticsData="mailMockDataSecondStep" :currentState="logisticsState"/>
    </div>
    <div v-if="logisticsState==4">
      <Logistics :LogisticsData="mailMockDataThirdStep" :currentState="logisticsState"/>
    </div>
  </div>
</template>

<script>
import Logistics from "./components/logistics";
export default {
  data() {
    return {
      title: "出证物流查询",
      mailMockDataFirstStep: [
        {
          logisticsState: 4,
          logisticsStateDsc: "已收件",
          logisticsStateLeftDsc: "收",
          address: "[收货地址] 上海市闵行区虹梅路211号东兴家园12号901",
          date: "",
          time: ""
        },
        {
          logisticsState: 2,
          logisticsStateDsc: "已揽件",
          logisticsStateLeftDsc: "揽",
          address: "上海市闵行区虹梅路211号淘米公司服务部进行揽件扫描",
          date: "11-13",
          time: "12:00"
        }
      ],
      mailMockDataSecondStep: [
        {
          logisticsState: 4,
          logisticsStateDsc: "已收件",
          logisticsStateLeftDsc: "收",
          address: "[收货地址] 上海市普陀区长寿路260号",
          date: "",
          time: ""
        },
        {
          logisticsState: 3,
          logisticsStateDsc: "邮寄中",
          logisticsStateLeftDsc: "运",
          address: "已离开上海闵行区分拨中心：发往上海市普陀区",
          date: "11-14",
          time: "18:00"
        },
        {
          logisticsState: 2,
          logisticsStateDsc: "已揽件",
          logisticsStateLeftDsc: "揽",
          address: "上海市闵行区淘米公司服务部进行揽件扫描",
          date: "11-13",
          time: "12:00"
        }
      ],
      mailMockDataThirdStep: [
        {
          logisticsState: 4,
          logisticsStateDsc: "已收件",
          logisticsStateLeftDsc: "收",
          address: "[收货地址] 上海市浦东新区陆家嘴环路717号",
          date: "11-13",
          time: "09:00"
        },
        {
          logisticsState: 3,
          logisticsStateDsc: "邮寄中",
          logisticsStateLeftDsc: "运",
          address: "已离开上海徐汇区分拨中心：发往上海市浦东新区",
          date: "11-12",
          time: "18:00"
        },
        {
          logisticsState: 2,
          logisticsStateDsc: "已揽件",
          logisticsStateLeftDsc: "揽",
          address: "上海市徐汇区万体公司服务部进行揽件扫描",
          date: "11-11",
          time: "12:00"
        }
      ]
    };
  },
  components: {
    Logistics
  },
  mounted() {
    console.log(this.$route.query);
  },
  computed: {
    baseinfo() {
      return this.$store.getters.normal_baseinfo;
    },
    logisticsState() {
      return this.$route.query.logisticsState;
    }
  }
};
</script>

<style lang="less" scoped>
.cert-detail {
  text-align: left;
  padding: 24px;
  width: 100%;
  height: 140px;
  color: #fff;
  background: url("../../assets/home/背景@2x.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  &-title {
    font-size: 12px;
  }
  &-name {
    font-size: 17px;
    margin-top: 16px;
    font-weight: bold;
  }
  &-addr {
    font-size: 14px;
    margin-top: 8px;
  }
}
</style>



<template>
  <div class="transfer-home" v-cloak>
    <NavBar :navTitle="title" />
    <van-skeleton title :row="6" :loading="shows">
      <div v-if="show">
        <CellCard :list="oneData" v-show="isTaxesPayer === 1" :adjustList="listData" :orderStatus="orderStatus" :isTaxesPayer="isTaxesPayer" :pretaxStatus="pretaxStatus"
          :conData='tranStateText' :applicationSignStatus="applicationSignStatus" :contractSignStatus="contractSignStatus" 
          :buyerOrSeller='buyerOrSeller' :exApplicationSignStatus='exApplicationSignStatus' :exContractSignStatus='exContractSignStatus'
          :paytaxStatus='paytaxStatus' :taxesPayerSignInfo='taxesPayerSignInfo' v-if="isTaxesPayer" />
        <CellCard :list="listData" :adjustList="listData" :orderStatus="orderStatus" :isTaxesPayer="isTaxesPayer" :pretaxStatus="pretaxStatus"
          :conData='tranState' :applicationSignStatus="applicationSignStatus" :contractSignStatus="contractSignStatus"
          :buyerOrSeller='buyerOrSeller' :exApplicationSignStatus='exApplicationSignStatus' :exContractSignStatus='exContractSignStatus'
          :paytaxStatus='paytaxStatus' :taxesPayerSignInfo='taxesPayerSignInfo' :registerType='registerType' pre="true" />
      </div>
    </van-skeleton>
  </div>
</template>

<script>
  import CellCard from "@/components/cellCard.vue";
  import Vue from 'vue'
  import { transferState, transferStateText } from "./const.js";
  import { mapState } from 'vuex';
  import { Skeleton, Dialog } from 'vant';
  import { Ticket, BaseInfo, BusinessBaseInfo } from "../../service/common";
  import { toBase64 } from "../../utils/utils.js";

  export default {
    data() {
      return {
        title: "转移登记",
        listData: [],
        oneData: [],
        adjust: false,
        status: 0,
        tranState: transferState,
        tranStateText: transferStateText,
        shows: true
      };
    },
    components: {
      CellCard,
      vanSkeleton: Skeleton
    },
    computed: {
      ...mapState({
        show: state => state.transfer.show,
        //订单状态
        orderStatus: state => state.transfer.orderStatus,
        //纳税主体人
        isTaxesPayer: state => state.transfer.isTaxesPayer,
        //预核税确认状态
        pretaxStatus: state => state.transfer.pretaxStatus,
        //申请书签署状态
        applicationSignStatus: state => state.transfer.applicationSignStatus,
        //合同签署状态
        contractSignStatus: state => state.transfer.contractSignStatus,
        //发起人性质(1 卖方 2 买方)
        buyerOrSeller: state => state.transfer.buyerOrSeller,
        exApplicationSignStatus: state => state.transfer.exApplicationSignStatus,
        exContractSignStatus: state => state.transfer.exContractSignStatus,
        paytaxStatus: state => state.transfer.paytaxStatus,
        taxesPayerSignInfo: state => state.transfer.taxesPayerSignInfo,
        registerType: state => state.transfer.registerType
      })
    },
    mounted() {
      // console.log('this.$store.getters.transferParams', this.$store.getters.transferParams)
      const transferToken = this.$store.getters.transferParams;
      this.$store.dispatch('transfer/confirmInfo', transferToken);
      const { state: { transfer: { arrs, arrlis } } } = this.$store
      this.listData = arrlis;
      this.oneData = arrs;
      this.shows = false;
    }
  };
</script>

<style lang="less" scoped>
  .transfer-home {
    padding: 16px;
    background-color: #f5f5f5;
    height: 94vh;
  }

  [v-cloak] {
    display: none;
  }
</style>
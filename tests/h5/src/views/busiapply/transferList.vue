<!--
 * @Description: 
 * @Autor: jixuelian
 * @Date: 2019-06-19 14:58:08
 -->
<template>
  <div>
    <NavBar :navTitle="title" />
    <div class="bizapply-wrap">
      <div class="bizapply-exchange">请选择列表中的某一项，进行转换登记</div>
      <ListCard
        :list="list"
        :pageLoading="pageLoading"
        :finished="finished"
        :finishedText="finishedText"
        :onLoad="onLoad"
        :onItemClick="onItemClick"
      >
        <template v-slot:header="item">
          <div>
            工单编号：{{item.orderNo}}
            <i
              class="state-icon"
              v-bind:style="busiState[item.status] && busiState[item.status].style"
            >{{item.statusDsc}}</i>
          </div>
        </template>
        <template v-slot:content="item">
          <div class="bottom16">登记类别：{{item.registerTypeDsc}}</div>
          <div>不动产坐落：{{item.address}}</div>
        </template>
      </ListCard>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import ListCard from "@/components/listCard.vue";
import ListCardMix from "@/mixins/listCard.js";
import { listForTransfer } from "@/service/business";
import { businessState } from "./const";
export default {
  mixins: [ListCardMix],
  data() {
    return {
      title: "登记申请",
      finishedText: "",
      busiState: businessState
    };
  },
  watch: {},
  methods: {
    getData() {
      listForTransfer({
        registerType: this.$route.query.type,
        ...this.pageData
      }).then(res => {
        this.handleInitRes(res);
      });
    },
    onItemClick(item) {
      this.$router.replace({
        name: "busiApplyEdit",
        query: { id: item.id, ...this.$route.query }
      });
    }
  },
  computed: {},
  mounted() {},
  created() {},
  components: {
    ListCard,
    Toast
  }
};
</script>
<style scoped lang="less">
.bizapply-wrap {
  padding-bottom: 75px;
  .bottom16 {
    padding-bottom: 16px;
  }
  .state-icon {
    height: 25px;
    line-height: 25px;
    min-width: 60px;
    border-radius: 12px;
    font-size: 12px;
    text-align: center;
    float: right;
    padding: 0 4px;
    transform: scale(0.83);
    transform-origin: top;
  }
  .bizapply-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .bizapply-exchange {
    padding-left: 16px;
    text-align: left;
    line-height: 36px;
    font-size: 12px;
    color: #5d6471;
    background: rgba(203, 210, 222, 0.2);
  }
}
</style>
<style lang="less">
.wrap {
  .half-bottom-border:before {
    content: "";
    position: absolute;
    right: 16px;
    top: 50%;
    margin-top: -8px;
    width: 8px;
    height: 8px;
    display: inline-block;
    border-top: 1Px solid #aab0b9;
    border-right: 1Px solid #aab0b9;
    transform: rotate(45deg);
  }
}
</style>


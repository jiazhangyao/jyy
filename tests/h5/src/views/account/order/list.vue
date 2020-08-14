<template>
  <div class="order-list">
    <NavBar navTitle="我的工单" />
    <div class="search-btn">
      <button :class="{active: !isDone}" @click="filter('doing')">进行中</button>
      <button :class="{active: isDone}" @click="filter('done')">已完成</button>
    </div>
    <div class="list-wrap" v-if="list.length > 0">
      <List
        v-model="loading"
        class="water-list"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="card-list">
          <div
            v-for="item in list"
            :key="item.id"
            class="card-item"
            @click="toOrderDetail(item.registerType, item.id, item)"
          >
            <div class="tit">
              <b class="title">{{item.registerTypeDesc}}</b>
              <span class="tag">{{item.statusDesc}}</span>
            </div>
            <div class="card-content">
              <label>不动产坐落</label>
              <span class="value">{{item.address}}</span>
            </div>
            <div class="card-content">
              <label>证明号</label>
              {{item.warrantNumbers}}
            </div>
            <div class="card-bottom">
              <div class="cb-content">
                <label>工单编号</label>
                {{item.orderNo}}
              </div>
              <div class="cb-content">
                <label>提交时间</label>
                {{item.submitTime}}
              </div>
            </div>
            <DetailBtn :data="item" :registerType="item.registerType" />
          </div>
        </div>
      </List>
    </div>
    <Empty v-else />
  </div>
</template>
<script>
import { Toast, List, Dialog } from "vant";
import DetailBtn from "../components/detailBtn.vue";
import { orderList } from "@/service/order";
import Empty from "@/components/empty.vue";
export default {
  data() {
    return {
      list: [],
      finished: false,
      loading: false,
      pageNo: 1,
      pageSize: 10,
      statusList: [],
      tag: ""
    };
  },
  computed: {
    isDone() {
      return this.tag == "done";
    }
  },
  components: {
    List,
    Empty,
    DetailBtn
  },
  created() {
    const tag = this.$route.params.tag;
    this.tag = tag;
    if (this.tag == "done") {
      this.statusList = [25, 31, 35, 40, 62];
    } else {
      this.statusList = [5, 10, 15, 20, 30, 50, 51, 52, 53, 54, 55, 56];
    }
  },
  mounted() {
    this.getListData(1);
  },
  methods: {
    toOrderDetail(registerType, id, item) {
      if (
        registerType === 5010 ||
        registerType === 5020 ||
        registerType === 5030
      ) {
        // 转移登记详情
        this.$router.push(`/transfer/busiapply/edit?id=${id}&edit=0`);
      }
      if (item.registerPrimaryType === 40) {
        // 查封登记详情
        // this.$router.push({name: 'sealUpLink', params: {id}})
        this.$router.push(`/sealUp/sealUpLink?id=${id}&edit=0`);
      }
    },
    filter(tag) {
      this.loading = false;
      this.finished = false;
      this.tag = tag;
      if (this.tag == "done") {
        this.statusList = [25, 31, 35, 40, 62];
      } else {
        this.statusList = [5, 10, 15, 20, 30, 50, 51, 52, 53, 54, 55, 56];
      }
      this.list = [];
      this.getListData(1);
    },
    getListData(pageNo) {
      const params = {
        pageNo: pageNo,
        pageSize: 10
      };
      orderList(params, this.statusList).then(res => {
        const {
          success,
          data: { list },
          msg
        } = res;
        if (success) {
          this.list.push(...list);
          if (list.length < 10) {
            this.finished = true;
            this.loading = false;
          } else {
            this.loading = false;
            this.finished = false;
            this.pageNo = pageNo + 1;
          }
        } else {
          Toast(msg);
        }
      });
    },
    onLoad() {
      setTimeout(() => {
        this.getListData(this.pageNo);
      }, 500);
    }
  }
};
</script>
<style lang="less">
  .order-list {
    position: relative;
    padding: 16px;
    padding-bottom: 0;
    background-color: #f5f5f5;
    min-height: calc(100vh - 48px);

    .search-btn {
      position: fixed;
      top: 42px;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 16px;
      display: flex;
      background-color: #f5f5f5;
      z-index: 2;

      button {
        display: inline-block;
        width: 50%;
        height: 44px;
        font-size: 16px;
        color: #333;
      }

      .active {
        background-color: #309de5;
        color: #fff;
      }
    }

    .card-list {
      padding-top: 66px;

      .card-item {
        padding: 20px 16px 12px;
        background-color: #fff;
        margin-bottom: 16px;
      }

      .tit,
      .card-content {
        display: flex;
        text-align: initial;
        margin-bottom: 8px;
        font-size: 14px;
        color: #333;
      }

      .tit {
        position: relative;
        display: block;
        margin-bottom: 20px;
      }

      .title {
        display: block;
        font-size: 18px;
        line-height: 25px;
        color: #333;
        margin-bottom: 8px;
      }

      .tag {
        display: block;
        display: inline-block;
        border-radius: 100px;
        color: #fff;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        background-image: linear-gradient(90deg, #52bafe 18%, #46caeb 100%);
      }

      label {
        display: inline-block;
        width: 30%;
      }

      .value {
        display: inline-block;
        width: 70%;
      }

      .card-bottom {
        border-top: 1px dashed #dfdfdf;
        padding-top: 11px;
      }

      .cb-content {
        margin-bottom: 4px;
        line-height: 17px;
        font-size: 12px;
        color: rgba(51, 51, 51, 0.5);
        text-align: initial;

        label {
          width: 20%;
        }
      }

      .edit-btn {
        display: block;
        width: 100%;
        height: 48px;
        border-radius: 2px;
        background-color: #f5f7fe;
        color: #309de5;
        font-size: 16px;
        margin-top: 10px;
        font-weight: bold;
      }
    }
  }
</style>
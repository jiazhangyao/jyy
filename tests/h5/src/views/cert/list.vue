<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="water">
      <List
        v-if="data.length>0"
        class="water-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="water-item" v-for="item in data" :key="item.gd" @click="toDetail(item)">
          <div class="water-header">
            <div style="color:#0F213E">
              快递单号：{{item.trackingNumber || '-'}}
              <span
                class="fr water-item-tag"
                :class="item.logisticsStateDsc=='已签收'?'sign':item.logisticsStateDsc=='已揽件'?'start':'doing'"
              >{{item.logisticsStateDsc}}</span>
            </div>
          </div>
          <div class="water-item-word">登记类型：{{item.registerTypeDsc}}</div>
          <div class="water-item-word">工单编号：{{item.orderNo}}</div>
        </div>
      </List>
      <Empty v-else/>
    </div>
  </div>
</template>

<script>
import Empty from "@/components/empty.vue";
import { GetMail } from "@/service/common";
import { List, Toast } from "vant";

export default {
  data() {
    return {
      title: "出证物流查询",
      finished: true,
      loading: false,
      pageData: {
        pageNo: 1,
        pageSize: 10
      },
      data: [
        // {
        //     gd:'1231231231',
        //     status:0,
        //     bd:'二手房买卖登记',
        //     type:'zf8900088'
        // },
        // {
        //     gd:'123123123144',
        //     status:1,
        //     bd:'二手房买卖登记',
        //     type:'sd7890989'
        // },
      ]
    };
  },
  components: {
    Empty,
    List
  },

  methods: {
    onLoad() {
      this.getData();
    },
    getData() {
      GetMail(this.pageData).then(res => {
        if (res.success) {
          this.data = res.data.list;
          if (res.data.list.length < this.pageData.length) {
            this.finished = true;
          }
          this.pageData.pageNo++;
        }
      });
    },
    toDetail(data) {
      this.$router.push({ path: "/cert/detail", query: data });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.water {
  &-item {
    text-align: left;
    width: 343px;
    margin: 0 auto;
    font-size: 14px;
    color: #0f213e;
    margin-top: 16px;
    border-radius: 4px;
    border: 1Px solid #cbd2de;

    &-word {
      padding-left: 13px;
      margin-top: 16px;
    }

    padding-bottom: 20px;

    &-tag {
      padding: 2px 9px;
      border-radius: 12px;
      font-size: 10px;

      &.doing {
        background: #e8f4e3;
        color: #52c41a;
      }

      &.start {
        background: #f9f0e3;
        color: #f56a22;
      }

      &.sign {
        background: #e2e4ea;
        color: #666;
      }
    }
  }

  &-header {
    font-size: 12px;
    background: rgba(203, 210, 222, 0.2);
    padding: 12px;
  }

  &-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>

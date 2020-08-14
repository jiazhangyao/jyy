<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="water">
      <List
        v-if="list.length>0"
        class="water-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <router-link :to="'/water/detail/'+item.id" v-for="item in list" :key="item.gd">
          <div class="water-item">
            <div class="water-header">
              <div>
                工单编号:
                <span class="sheetNo">{{item.orderNo}}</span>
                <span
                  class="fr water-item-tag"
                  :class="item.transferStatus=='已过户'?'done':(item.transferStatus=='待审核'?'doing':'reject')"
                >{{item.transferStatus}}</span>
              </div>
            </div>
            <div class="water-item-word">不动产权证号：{{item.warrantNumber}}</div>
            <div class="water-item-word">过户类型：{{item.transferType}}</div>
          </div>
        </router-link>
      </List>
      <Empty v-else/>
      <div class="water-footer">
        <router-link to="/water/pre">
          <FullButton :name="btn_name"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import FullButton from "@/components/fullButton.vue";
import Empty from "@/components/empty.vue";
import { getList } from "@/service/water";
import { List, Toast } from "vant";

export default {
  data() {
    return {
      btn_name: "新增过户申请",
      title: "水电气过户",
      finished: false,
      loading: false,
      pageData: {
        pageNo: 1,
        pageSize: 10
      },
      list: []
    };
  },
  components: {
    FullButton,
    List,
    Empty
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getList(this.pageData).then(res => {
        console.log("res", res);
        if (res.success) {
          if (res.data.length < this.pageData.pageSize) {
            this.finished = true;
          }
          this.list = res.data.list;
          this.pageData.pageNo++;
          if (res.data.list.length < this.pageData.pageSize) {
            this.finished = true;
          }
        } else {
          Toast(res.msg || "请求错误");
          this.finished = true;
        }
      });
    },
    onLoad() {
      this.getData();
    }
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
      &.done {
        background: #e8f4e3;
        color: #52c41a;
      }
      &.reject {
        background: #f9e3e9;
        color: #f5222d;
      }
      &.doing {
        background: #f9f0e3;
        color: #f56a22;
      }
    }
  }

  &-header {
    font-size: 12px;
    background: rgba(203, 210, 222, 0.2);
    padding: 12px;
    .sheetNo {
      margin-left: 12px;
    }
  }

  &-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
<template>
  <div>
    <NavBar :navTitle="title" />
    <div class="water">
      <vant-list
        v-if="list.length>0"
        class="water-list"
        v-model="listLoading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <router-link :to="'/net/detail?id='+item.id" v-for="(item, index) in list" :key="index">
          <div class="water-item">
            <div class="water-header">
              <div>
                工单编号:
                <span class="sheetNo">{{item.orderNo}}</span>
                <span v-if="item.flag==2" class="fr water-item-tag reject">已取消</span>
                <span v-if="item.flag==1" class="fr water-item-tag done">已成功</span>
              </div>
            </div>
            <div class="water-item-word">预约日期：{{item.reserveDate}}</div>
            <div class="water-item-word">预约网点：{{item.branchName}}</div>
          </div>
        </router-link>
      </vant-list>
      <Empty v-if="list.length==0" />

      <div class="water-footer">
        <router-link to="/net/pre">
          <FullButton :name="btn_name" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import FullButton from "@/components/fullButton.vue";
import Empty from "@/components/empty.vue";
import { AppointList } from "@/service/common";
import { List } from "vant";
export default {
  data() {
    return {
      btn_name: "新增预约",
      title: "网点预约",
      finished: false,
      listLoading: false,
      pageData: {
        pageSize: 1,
        pageNo: 1
      },
      list: []
    };
  },
  components: {
    FullButton,
    "vant-list": List,
    Empty
  },
  methods: {
    getAppointList() {
      AppointList(this.pageData).then(res => {
        // console.log("getAppointList", res);
        this.listLoading = false;
        if (res.success) {
          if (res.data.list.length < this.pageData.pageSize) {
            this.finished = true;
          } else {
            this.list.push(...res.data.list);
            this.pageData.pageNo++;
          }
        } else {
          this.finished = true;
        }
      });
    },
    onLoad() {
      // console.log("getAppointList Loading");
      this.getAppointList();
    }
  },
  created() {
    this.getAppointList();
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
      &.doing {
        background: #f9e3e9;
        color: #f5222d;
      }
      &.reject {
        background: #e2e4ea;
        color: #666;
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
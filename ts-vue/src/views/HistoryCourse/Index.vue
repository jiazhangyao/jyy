<template>
  <Layout>
    <breadcrumb :list="breadcrumbList"></breadcrumb>
    <div class="list">
      <div class="manage-search">
        <div class="search">
          <span>
            <label>课时名称：</label>
            <a-input placeholder="请输入" v-model="coursename" class="int" />
          </span>
          <span>
            <label>直播日期：</label>
            <a-date-picker
              placeholder="选择日期"
              @change="onChange"
              class="btn-date"
              :disabledDate="disabledDate"
              v-model="timevalue"
            />
          </span>
          <a-button type="primary" class="search-btn" @click="search">搜索</a-button>
          <a-button class="res-btn" @click="reset">重置</a-button>
        </div>
      </div>
      <div class="courselist">
        <HistoryCourseItem
          v-for="endCourseList in endcourseList"
          :key="endCourseList.id"
          :endCourseList="endCourseList"
        ></HistoryCourseItem>
      </div>
      <!-- :total="total" -->
      <div class="pagination">
        <a-pagination
          :pageSizeOptions="pageSizeOptions"
          showSizeChanger
          :total="this.paginationConf.total"
          :pageSize="pageSize"
          @change="onPageChange"
          @showSizeChange="onShowSizeChange"
        >
          <template slot="buildOptionText" slot-scope="props">
            <span v-if="props.value!==total">{{props.value}}条/页</span>
          </template>
        </a-pagination>
      </div>
    </div>
  </Layout>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Pagination, Modal } from "ant-design-vue";
import { getHistoryCourseList } from "@/server/HistoryCourse/index.ts";
import Layout from "@/components/Layout/Base/Index.vue";
import status from "@/base/Status/Index.vue";
import Breadcrumb from "@/components/Layout/Base/BreadcrumbCustomize.vue";
import HistoryCourseItem from "./HistoryCourseItem.vue";
import moment from "moment";
@Component({
  components: {
    status,
    Breadcrumb,
    Layout,
    HistoryCourseItem
  }
})
export default class HistoryCourse extends Vue {
  private timevalue: any = 0;
  private name: string = "";
  private coursename: any = "";
  private livedate: number = 0;
  private presenttime: any = "";
  private endcourseList: any[] = []; // 历史课程列表
  private pageSizeOptions: any[] = ["10", "20"];
  private current: number = 1; // 当前页数
  private total: number = 50;
  private datetimestamp: number = 0;

  private breadcrumbList: any[] = [
    {
      name: "course",
      path: "/course",
      title: "首页"
    },
    {
      title: "已结束课程"
    }
  ];

  private pageSize: number = 20; // 分页数量
  // 分页配置
  private paginationConf: any = {
    current: 1,
    total: 0,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 条记录`,
    defaultPageSize: this.pageSize,
    pageSizeOptions: ["10", "20"]
  };

  private selectedRowKeys: any[] = [];

  private mounted(): void {
    console.log("当前的时间是" + moment().format("YYYY-MM-DD"));
    this.historyCourseList();
    /// this.datetimestamp = Math.round(new Date().getTime() / 1000); //当前时间戳
  }
  private onShowSizeChange(current: number, pageSize: number) {
    this.pageSize = pageSize;
    this.historyCourseList();
  }
  private search(): void {
    this.paginationConf.current = 1;

    if (this.coursename === "") {
      this.coursename = "";
    }

    if (this.livedate < Math.round(new Date().getTime() / 1000)) {
      if (this.livedate !== 0) {
        var datetimer = moment(this.livedate * 1000).format("YYYY/MM/DD");
        this.livedate = Date.parse(datetimer) / 1000; //时间戳
      }
      // this.livedate= Date.parse(moment().format("YYYY-MM-DD"));
      // var stringtime=moment().format("YYYY/MM/DD");
      this.historyCourseList();
    } else {
    }
  }

  // 禁用当前及以后的时间
  private disabledDate(current: any): any {
    return current && current > moment().endOf("day");
  }

  // 重置
  private reset(): void {
    this.paginationConf.current = 1;
    this.coursename = "";
    this.timevalue = null;
    this.livedate = 0;
    this.historyCourseList();
  }

  // 日期变化
  private onChange(value: number, dateString: string): void {
    this.livedate = Math.round(value / 1000);
    this.presenttime = dateString;
    console.log("Selected Time: ", Math.round(value / 1000));
    console.log("Formatted Selected Time: ", dateString);
  }

  // 页码变化的时候
  private onPageChange(pageNumber: number): void {
    this.paginationConf.current = pageNumber;
    this.historyCourseList();
    console.log("Page的number的变化是 " + pageNumber);
  }

  // 获取历史课程列表
  private historyCourseList(): void {
    getHistoryCourseList(
      this.paginationConf.current,
      this.pageSize,
      this.$store.state.userInfo.id,
      this.coursename,
      this.livedate
    )
      .then(res => {
        this.endcourseList = res.data.retval.planVideoInfos;
        this.paginationConf.total = res.data.retval.planVideoInfos;
        this.paginationConf.total = res.data.retval.total;
      })
      .catch(err => {
        this.$message.error(err.data.errmsg);
      });
  }

  private onSelectChange(selectedRowKeys: any[]): void {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
  }

  // private handlePageChange(pagination: Pagination): void {
  //   this.paginationConf.current = pagination.current as number;
  //   if (this.pageSize !== pagination.pageSize) {
  //     this.paginationConf.current = 1;
  //     this.pageSize = pagination.pageSize as number;
  //   }
  //   document.body.scrollTop = document.documentElement.scrollTop = 0;
  // }

  private rowKey(record: any): string {
    return `${record.id}&${record.username}`;
  }

  private handleSelectKeyChange(selectedRowKeys: Array<string | number>): any {
    this.selectedRowKeys = selectedRowKeys as string[];
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";
.list {
  margin: 12px auto 20px;
  width: $page-width;
  height: auto;
  border: 1px solid rgba(232, 232, 232, 1);
  border-radius: 4px;
  background: #fff;
}
.manage-search {
  margin-left: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
  .search {
    padding-top: 8px;

    label {
      font-size: 14px;
    }
    .search-btn {
      background: linear-gradient(
        90deg,
        rgba(29, 180, 254, 1) 0%,
        rgba(2, 140, 255, 1) 100%
      );
      border-radius: 4px;
      border: none;
    }
    .int {
      width: 400px;
      margin-right: 20px;
    }
    .btn-date {
      width: 200px;
      margin-right: 20px;
    }
    .res-btn {
      margin-left: 8px;
    }
  }
  .courselist {
    margin: 20px auto 0 auto;
  }
  .btn-list {
    margin-top: 24px;
  }
  .list {
    margin-top: 16px;
    .status {
      margin: 0 auto;
    }
  }
}
.pagination {
  display: block;
  width: 1180px;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-right: 25px;
}
</style>


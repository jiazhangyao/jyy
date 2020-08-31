<template>
  <div class='barrage'>
    <div class="barrage-count">
      <div class="panel panel-1">
        <div class="name">直播时长</div>
        <div class="val">1<em>时</em>12<em>分</em></div>
      </div>
      <div class="panel panel-2">
        <div class="left">
          <div class="name">人均观看时长</div>
          <div class="val">1<em>时</em>2<em>分</em></div>
        </div>
        <div class="right ">
          <div class='m m1'>PC：<em>1时45分</em></div>
          <div class="m m2">移动：<em>1时20分</em></div>
        </div>
      </div>
      <div class="panel panel-3">
        <div class="left">
          <div class="name">观看人数</div>
          <div class="val">520<em>人</em></div>
        </div>
        <div class="right ">
          <div class='m m1'>PC：<em>1时45分</em></div>
          <div class="m m2">移动：<em>1时20分</em></div>
        </div>
      </div>
      <div class="panel panel-4">
        <div class="name">观看IP数</div>
        <div class="val">520</div>
      </div>
      <div class="panel panel-5">
        <div class="name">中途离场人次</div>
        <div class="val">520<em>人</em></div>
      </div>
    </div>
    <div class="barrage-tab">
      <div class="search">
        <span>
          <label>姓名：</label>
          <a-input placeholder="请输入" v-model="name"  class="int"/>
        </span>
        <span>
          <label>学员ID：</label>
          <a-input placeholder="请输入" v-model="name"  class="int-2"/>
        </span>
        <a-button type="primary" class="search-btn" @click='search'>搜索</a-button>
        <a-button class="res-btn" @click="reset">重置</a-button>
    </div>

    <a-table
        class="list"
        :columns="columns"
        :dataSource="data"
        :loading="!ready"
        :pagination="paginationConf"
        @change="handlePageChange"
      >
        <span slot="operate" class="operate" slot-scope="row">
          <a href="javascript:void(0)" @click="editUser(row.id)">解除禁言</a>
        </span>
      </a-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Pagination, Modal } from "ant-design-vue";
import { getLiveStatistics } from '@/server/Census/index.ts';
@Component({
  components: {

  }
})
export default class Barrage extends Vue {

  private channelId: number = 520186;

  private ready: boolean = false;

  private name: string = '';

  private status: string = 'SELECT';

  private data: any[] = [];

  // 单页数据量
  private pageSize: number = 20;
  // 分页配置
  private paginationConf: any = {
    total: 0,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 条记录`,
    // hideOnSinglePage: true,
    defaultPageSize: this.pageSize,
    pageSizeOptions: ["10", "20"],
    current: 1
  };

  private columns: any[] = [
    {
      title: "学员ID",
      dataIndex: "id"
      // width:100
    },
    {
      title: "学员姓名",
      dataIndex: "name"
    },
    {
      title: "开始时间",
      dataIndex: "startTime"
    },
    {
      title: "结束时间",
      dataIndex: "endTime"
    },
    {
      title: "离开次数",
      dataIndex: "count"
    },
    {
      title: "观看终端",
      align: 'center',
      dataIndex: "terminal"
      // width: 100
    },
    {
      title: "观看时长",
      align: 'center',
      dataIndex: "time"
      // width: 100
    }
  ];

  private mounted(): void {
    this.list();
  }

  private search(): void {

  }

  private reset(): void {

  }

  private onChange(date: any, dateString: any): any {
      console.log(date, dateString);
  }




  private onSelectChange(selectedRowKeys: any[]): void {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
  }

  private handlePageChange(pagination: Pagination): void {

    this.paginationConf.current = pagination.current as number;
    if (this.pageSize !== pagination.pageSize) {
      this.paginationConf.current = 1;
      this.pageSize = pagination.pageSize as number;
    }
    this.list();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  private list(): void {
    this.ready = true;
    //  this.data = [
    //   {
    //      id: 23,
    //     name: '张三',
    //     endTime: '2019-12-12: 10:22',
    //     startTime: '2019-12-12: 10:22',
    //     count:1,
    //     terminal: 'pc',
    //     time: '1时54分'
    //   },
    //   {
    //     id: 23,
    //     name: '张三',
    //     endTime: '2019-12-12: 10:22',
    //     startTime: '2019-12-12: 10:22',
    //     count:1,
    //     terminal: 'pc',
    //     time: '1时54分'
    //   }
    //  ]

    getLiveStatistics(this.channelId, this.paginationConf.current, this.pageSize ).then(res => {
      console.log(res);
    });

  }



}
</script>
<style lang="scss" scoped>
@import "../../../common/sass/function";
@import "../../../common/sass/variable";
.barrage {
  //background-color: #fff;
  .barrage-count{
    background-color: #fff;
    padding: 33px 0;
    @include clearfix();
    .panel{
      float: left;
      // padding: 0 35px;
      border-right: 1px solid #e9e9e9;
      box-sizing: border-box;
      padding-left: 35px;
      .name{
        color: #999;
        font-size: 14px;
      }
      .val{
        color: #000;
        font-size: 24px;
        padding-top: 10px;
        em{
          font-size: 16px;
          color: #999;
          font-style: normal;
        }
      }
      .left{
        float: left;
      }
      .right{
        float: left;
        margin-left: 30px;
        font-size: 14px;
        padding: 5px 12px;
        background-color: #FAFAFA;
        border-radius: 4px;
        .m{
          padding: 5px 0 5px 10px;
          position: relative;
          em{
            font-style: normal;
            color: #666;
          }
        }
        .m:after{
          content: ' ';
          position: absolute;
          left: 0;
          top: 10px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
        }
        .m1:after{
          background-color: #FDA300;
        }
        .m2:after{
          background-color: #0CCE8F;
        }
      }
    }
    .panel-1{
      width: 180px;
    }
    .panel-2{
      width: 320px;
    }
    .panel-3{
      width: 320px;
    }
    .panel-4{
      width: 180px;
    }
    .panel-5{
      width: 180px;
      border: none;
    }
  }
  .barrage-tab{
    background-color: #fff;
    padding: 30px;
    margin-top: 12px;
    .search{
      padding-top: 8px;
      padding-bottom: 24px;
      label{
        font-size: 14px;
      }
      .search-btn{
        background:linear-gradient(90deg,rgba(29,180,254,1) 0%,rgba(2,140,255,1) 100%);
        border-radius:4px;
        border: none;
      }
      .int{
        width: 240px;
        margin-right: 20px;
      }
      .int-2{
        width: 80px;
        margin-right: 20px;
      }
      .int-3{
        width: 300px;
        margin-right: 20px;
      }
      .int-4{
        width: 140px;
        margin-right: 20px;
      }
      .int-5{
        width: 146px;
        margin-right: 20px;
      }
      .res-btn{
        margin-left: 8px;
      }
    }
    .btn-list{
      margin-top: 24px;
    }
    .list{
      margin-top: 16px;
      .status{
        margin: 0 auto;
      }
    }
  }
}
</style>

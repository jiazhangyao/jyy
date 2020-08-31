<template>
  <div class='manage-barrage'>
    <div class="search">
      <div>
        <span>
          <label>姓名：</label>
          <a-input placeholder="请输入" v-model="name"  class="int"/>
        </span>
        <span>
          <label>学员ID：</label>
          <a-input placeholder="请输入" v-model="name"  class="int-2"/>
        </span>
        <span>
          <label>弹幕内容：</label>
          <a-input placeholder="请输入" v-model="name"  class="int-3"/>
        </span>
        <a-button type="primary" class="search-btn" @click='search'>搜索</a-button>
        <a-button class="res-btn" @click="reset">重置</a-button>
      </div>
      <!-- <div class="btn-list"> 
        <span>
          <label>发布时间：</label>
          <a-date-picker @change="onChange" class="int-5" />
        </span>
        
      </div> -->
    </div>
    <a-alert class="userAlert" type="info" showIcon>
      <div slot="message">
        已选择
        <font color="$link-color">2</font> 项
        <a class="deleteLink" href="javascript:void(0);">批量删除</a>
      </div>
    </a-alert>

    <a-table
        class="list"
        :rowSelection="rowSelection"
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="data"
        :loading="!ready"
        :pagination="paginationConf"
        @change="handlePageChange"
      >
        <span slot="operate" class="operate" slot-scope="row">
          <a href="javascript:void(0)" @click="editUser(row.id)">删除</a>
        </span>
      </a-table>

  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Pagination, Modal } from "ant-design-vue";
import status from '@/base/Status/Index.vue';
import { getScreenList } from '@/server/Manage/index.ts';

@Component({
  components: {
    status
  }
})
export default class Barrage extends Vue {

  private get rowSelection(): any {
    const selectedRowKeys: any = this.selectedRowKeys;
    return {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      columnWidth: 40,
      getCheckboxProps: (record: any) => ({
        props: {
          disabled: record.status === 'ELB'
        }
      })
    };
  }

  // 频道ID
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
      title: "弹幕内容",
      dataIndex: "barrage"
      // width: 360
    },
    {
      title: "操作",
      align: 'center',
      scopedSlots: { customRender: 'operate' }
      // width: 290
    }
  ];

  private selectedRowKeys: any[] = [];

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
    this.selectedRowKeys = selectedRowKeys;
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
    this.data = [
      {
        id: 12,
        name: '张三',
        barrage: '张老师讲课真棒，哔哔哔',
        time: '2019-12-12: 10:22'
      },
      {
        id: 23,
        name: '张三',
        barrage: '张老师讲课真棒，哔哔哔',
        time: '2019-12-12: 10:22'
      }
     ];
    // getScreenList(this.channelId, this.paginationConf.current, this.pageSize ).then(( res => {
    //   console.log(res);
    // })

    getScreenList(this.channelId, this.paginationConf.current, this.pageSize ).then(res => {
       console.log(res);
    });

  }

  private rowKey(record: any): string {
    return `${record.id}&${record.username}`;
  }

  private handleSelectKeyChange(selectedRowKeys: Array<string | number>): any {
    this.selectedRowKeys = selectedRowKeys as string[];
  }


}
</script>
<style lang="scss" scoped>
@import "../../../common/sass/function";
@import "../../../common/sass/variable";
.manage-barrage {
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
</style>

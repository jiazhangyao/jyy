<template>
  <div class="user">
      <div class="search">
        <span>
          <label>用户名：</label>
          <a-input placeholder="请输入" v-model="userName" class="int"/>
        </span>
        <span>
          <label>姓名：</label>
          <a-input placeholder="请输入" v-model="name"  class="int"/>
        </span>
        <span>
          <a-button type="primary" class="search-btn" @click='search'>搜索</a-button>
          <a-button class="res-btn" @click="reset">重置</a-button>
        </span>
      </div>
      <a-button type="primary" icon="plus" @click="addUser">添加用户</a-button>
      <a-alert class="userAlert" type="info" showIcon v-if="selectedRowKeys.length>0">
        <div slot="message">
          已选择
          <font color="$link-color">{{selectedRowKeys.length}}</font> 项
          <a class="deleteLink" href="javascript:void(0);" @click="handleDelAll">批量禁用</a>
        </div>
      </a-alert>
      <a-table
        class="userList"
        :rowSelection="rowSelection"
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="data"
        :loading="!ready"
        :pagination="paginationConf"
        @change="handlePageChange"
      >
        <span slot="groups" slot-scope="groups">
          <a-tooltip placement="topLeft">
            <a-tag
              v-for="(group,index) in groups"
              :key="group"
              v-if="index < 2"
            >
              {{group}}
            </a-tag>
            {{groups.length > 2 ? '...' : ''}}

            <template slot="title" v-if="groups.length > 2">
              <span v-for="(group,index) in groups"
                    :key="group"
                    style="font-size: 12px"
              >{{index?'、':''}}{{group}}</span>
            </template>

        </a-tooltip>

        </span>

        <span slot="role" slot-scope="role">
          {{role === 'SPEAKER'?'主讲老师':'辅导老师'}}
        </span>

        <status
          slot="status"
          slot-scope="status"
          :color="status === 'ELB'?'#FF462D':'#0CCE8F'"
          :backGroundColor="status === 'ELB'?'#FFECEA':'#E6FAF3'"
          :text="status === 'CLK' ?'启用': '禁用'"
          :width="52"
        >
        </status>
        <span slot="operate" class="operate" slot-scope="row">
          <a href="javascript:void(0)" @click="editUser(row.id)">编辑</a>
          <a href="javascript:void(0)" @click="setPassworld(row)">重置密码</a>
          <a href="javascript:void(0)" @click="handleDel(row)">{{row.status === 'CLK'?'禁用': '启用'}}</a>
        </span>
      </a-table>
      <a-modal
        title="重置密码"
        :keyboard="false"
        :closable="false"
        v-model="passwordModel.visible"
        @ok="passwordHandleOk"
        width="432px"
        class="password-pop">
        <div class="item">
          <div class="label">姓　　名：</div>
          <a-input
            placeholder="姓名"
            type='text'
            class="int"
            @change="passwordInputChange"
            v-model="passwordModel.name"
            readOnly
          />
        </div>
        <div class="item">
          <div class="label">新密码：</div>
          <a-input
            placeholder="密码至少6位，不支持中文符号"
            type='text'
            class="int"
            @change="passwordInputChange"
            v-model="passwordModel.text"/>
        </div>
        <div class="password-err" v-if="passwordModel.err">密码至少6位，不支持中文符号</div>
      </a-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getUserList, changeStatus, resetPwd } from "@/server/setting/user";
import { Pagination, Modal } from "ant-design-vue";
import { password } from "@/common/js/regExp";
import status from '@/base/Status/Index.vue';

@Component({
  components: {
    status
  }
})
export default class UserList extends Vue {
  private ready: boolean = true;

  private data: any[] = [];

  //
  private passwordModel: any = {
    visible: false,
    id: 0,
    text: '',
    name: '',
    err: false,
    reg: password
  };

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

  private userName: string = '';
  private name: string = '';

  private searchUserName: string = '';
  private searchName: string = '';

  private columns: any[] = [
    {
      title: "用户名",
      dataIndex: "username"
      // width:100
    },
    {
      title: "姓名",
      dataIndex: "name"
    },
    {
      title: "角色",
      dataIndex: "role",
      scopedSlots: { customRender: 'role' }
      // width: 100
    },
    {
      title: "用户组",
      dataIndex: "groups",
      scopedSlots: { customRender: 'groups' }
      // width: 360
    },
    {
      title: "状态",
      align: 'center',
      dataIndex: "status",
      scopedSlots: { customRender: 'status' }
      // width: 100
    },
    {
      title: "修改时间",
      align: 'center',
      dataIndex: "updateTime"
      // width: 220
    },
    {
      title: "操作",
      align: 'center',
      scopedSlots: { customRender: 'operate' }
      // width: 290
    }
  ];

  private selectedRowKeys: any[] = [];

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
    this.userList();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  private mounted(): void {
    this.userList();
  }

  private search(): void {
    this.paginationConf.current = 1;
    // if (!this.userName && !this.name) return;

    this.searchUserName = this.userName;
    this.searchName = this.name;

    this.userList();
  }

  private reset(): void {
    this.paginationConf.current = 1;
    this.userName = '';
    this.name = '';

    this.searchUserName = this.userName;
    this.searchName = this.name;

    this.userList();
  }

  private userList(): void {
    this.ready = false;
    getUserList(this.paginationConf.current, this.pageSize, this.searchUserName, this.searchName).then(res => {
      this.data = res.data.retval.users;
      this.paginationConf.total = res.data.retval.total;
      if (res.data.retval.total <= this.paginationConf.pageSize) {
        this.paginationConf.itemRender = (
          current: any,
          type: any,
          originalElement: any
        ): any => {
          if (type === "prev") {
            return "";
          } else if (type === "next") {
            return "";
          }
          return originalElement;
        };
      }
      this.ready = true;
    }).catch(err => {
      this.$message.error(err.data.errmsg);
    });
  }

  private rowKey(record: any): string {
    return `${record.id}&${record.username}`;
  }

  private handleSelectKeyChange(selectedRowKeys: Array<string | number>): any {
    this.selectedRowKeys = selectedRowKeys as string[];
  }

  private editUser(id: number): void {
    this.$router.push({
      path: '/setting/useredit',
      query: { id: (id as number).toString() }
    });
  }

  private addUser(): void {
    this.$router.push({
      path: '/setting/useradd'
    });
  }

  private getSelectUserNames(): string[] {
    return this.selectedRowKeys.map(e => {
      return e.split("&")[1];
    });
  }

  private getSelectUserIds(): number[] {
    return this.selectedRowKeys.map(e => {
      return parseInt(e.split("&")[0]);
    });
  }


  private handleDel(row: any): void {
    const h: any = this.$createElement;
    Modal.confirm({
      title: `${row.status === 'CLK' ? '禁用' : '启用'}确定`,
      icon: "none",
      keyboard: false,
      content: h("div", {}, [
        h("p", `确认要${row.status === 'CLK' ? '禁用' : '启用'}${row.username}用户吗？${row.status === 'CLK' ? '禁用后用户将无法登陆系统。' : '启用后用户将正常登陆系统。'}`)
      ]),
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        const sta: string = (row.status === 'CLK' ? 'ELB' : 'CLK');
        this.setChangeStatus([row.id as number], sta);
      }
    });
  }

  private setChangeStatus(id: number[], sta: string): void {
    changeStatus(id, sta).then(res => {
      this.userList();
      this.selectedRowKeys = [];
      this.$message.success("修改成功！");
    }).catch(err => {
      this.$message.error(err.data.errmsg);
    });
  }

  private handleDelAll(): void {
    let delAllModalVal: string = "";
    const names: string[] = this.getSelectUserNames();

    delAllModalVal = names.slice(0, 3).join('、');

    if (names.length > 3) {
      delAllModalVal += `…等${names.length}条记录`;
    }

    const h: any = this.$createElement;
    Modal.confirm({
      title: "批量禁用确定",
      icon: "none",
      keyboard: false,
      content: h("div", {}, [
        h("p", `确认要禁用用户${delAllModalVal}吗？禁用后用户将无法登陆系统。`)
      ]),
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        // console.log(this.getSelectUserIds());
        this.setChangeStatus(this.getSelectUserIds(), 'ELB');
      }
    });
  }

  private setPassworld(row: any): void {
    this.passwordModel.visible = true;
    this.passwordModel.id = row.id;
    this.passwordModel.err = false;
    this.passwordModel.text = '';
    this.passwordModel.name = row.name;
  }

  private passwordHandleOk(): any {
    if (!this.passwordModel.text.match(this.passwordModel.reg)) {
      this.passwordModel.err = true;
      return false;
    }
    this.passwordModel.visible = false;
    resetPwd(this.passwordModel.id, this.passwordModel.text).then(res => {
      this.$message.success("重置密码成功");
    }).catch(err => {
      this.$message.error(err.data.errmsg);
    });
  }

  private passwordInputChange(): void {
    if (this.passwordModel.text.match(this.passwordModel.reg)) {
      this.passwordModel.err = false;
    }
    if (!this.passwordModel.text) {
      this.passwordModel.err = true;
    }
  }

}
</script>
<style lang="scss" scoped>
  .user {
    width: 1002px;
    margin: 0px 0 30px 25px;
    /deep/ .ant-table-body tr td, .ant-table-body tr th{
      padding: 16px 12px;
    }
    /deep/.ant-table-thead > tr > th, .ant-table-tbody > tr > td{
      padding: 16px 12px;
    }
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
        width: 300px;
        margin-right: 20px;
      }
      .res-btn{
        margin-left: 8px;
      }
    }
    .userAlert{
      margin-top: 16px;
      .deleteLink{
        margin-left: 20px;
      }
    }
    .userList {
      margin-top: 16px;
      .ant-table-selection-column{
        width: 80px;
      }
      .operate{
        width: 168px;
        display: block;
        a{
          display: inline-block;
          white-space : nowrap;
          &:first-child{
            padding-left: 0;
          }
          padding-left: 18px;
          color: #0098FF;
          &:hover{
            opacity: 0.8;
          }
        }
      }
    }

  }
</style>
<style lang="scss">
  @import "../../../common/sass/function";
  @import "../../../common/sass/variable";
  .password-pop{
    .ant-modal-header{
      border-bottom: none;
      padding-bottom: 10px;
      padding-top: 32px;
    }
    .ant-modal-footer{
      border-top: none;
      padding-bottom: 24px;
    }
    .ant-modal-body{
      padding: 10px 24px;
      .password-err{
        padding-top: 2px;
        color: red;
      }
    }
    .item{
      @include clearfix;
      .label{
        float: left;
        line-height: 32px;
        width: 60px;
        text-align-last:justify;
        text-align:justify;
        text-justify:distribute-all-lines;
      }
      .int{
        float: left;
        width: 306px;
      }
      padding-bottom: 16px;
    }
  }
</style>

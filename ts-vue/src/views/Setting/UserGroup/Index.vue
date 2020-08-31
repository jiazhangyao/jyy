<template>
  <div class="userGroup">
    <a-button type="primary" icon="plus" @click="handleAdd">添加用户组</a-button>
    <a-alert class="userGroupAlert" type="info" showIcon v-if="selectedRowKeys.length>0">
      <div slot="message">
        已选择
        <font>{{selectedRowKeys.length}}</font> 项
        <a class="deleteLink" href="javascript:void(0);" @click="handleDelAll">批量删除</a>
      </div>
    </a-alert>
    <a-table
      class="userGroupList"
      :rowSelection="rowSelection"
      :rowKey="rowKey"
      :columns="columns"
      :dataSource="userGroupData"
      :pagination="paginationConf"
      :loading="!ready"
      @change="handlePageChange"
    >
      <div class="userGroupActionContainer" slot="action" slot-scope="row">
        <a href="javascript:void(0);" @click="handleEdit(row)">编辑</a>
        <a href="javascript:void(0);" @click="handleDel(row)">删除</a>
      </div>
      <template
        slot="num"
        slot-scope="row"
      >{{typeof row.num === 'number' && row.num > 0 ? row.num : 0}}</template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getUserGroupList, delUserGroup } from "@/server/setting/userGroup";
import { Pagination, Modal } from "ant-design-vue";
import { CreateElement } from "vue";

@Component
export default class UserGroup extends Vue {
  private ready: boolean = true;
  // 单页数据量
  private pageSize: number = 20;
  // 分页配置
  private paginationConf: PaginationConf = {
    showSizeChanger: true,
    total: 0,
    showTotal: (total: number) => `共 ${total} 条记录`,
    // hideOnSinglePage: true,
    defaultPageSize: this.pageSize,
    pageSizeOptions: ["10", "20"],
    current: 1
  };
  private columns: ColumnsConf[] = [
    {
      title: "用户组",
      dataIndex: "name",
      width: 200
    },
    {
      title: "用户数",
      scopedSlots: { customRender: "num" },
      width: 240
    },
    {
      title: "修改时间",
      dataIndex: "updatedAt",
      width: 247
    },
    {
      title: "操作",
      align: "center",
      scopedSlots: { customRender: "action" },
      width: 244
    }
  ];

  private userGroupData: UserGroupData[] = [];

  private selectedRowKeys: string[] = [];

  private get rowSelection(): object {
    const selectedRowKeys: string[] = this.selectedRowKeys;
    return {
      selectedRowKeys,
      onChange: this.handleSelectKeyChange,
      hideDefaultSelections: true
    };
  }

  private rowKey(record: UserGroupData): string {
    return `${record.id}&${record.name}`;
  }

  private handleSelectKeyChange(selectedRowKeys: Array<string | number>): any {
    this.selectedRowKeys = selectedRowKeys as string[];
  }

  private handlePageChange(pagination: Pagination): void {
    this.paginationConf.current = pagination.current as number;
    if (this.pageSize !== pagination.pageSize) {
      this.paginationConf.current = 1;
      this.pageSize = pagination.pageSize as number;
    }
    this.getUserGroupList();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  private mounted(): void {
    this.getUserGroupList();
  }

  private getUserGroupList(): void {
    this.ready = false;
    getUserGroupList(this.paginationConf.current, this.pageSize).then(res => {
      this.userGroupData = res.data.retval.groups;
      this.paginationConf.total = res.data.retval.total;
      if (res.data.retval.total <= this.pageSize) {
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
    });
  }

  private getSelectUserGroupIds(): number[] {
    return this.selectedRowKeys.map(e => {
      return parseInt(e.split("&")[0]);
    });
  }

  private getSelectUserGroupNames(): string[] {
    return this.selectedRowKeys.map(e => {
      return e.split("&")[1];
    });
  }

  private handleEdit(row: UserGroupData): void {
    this.$router.push({
      path: "/setting/userGroupEdit",
      query: { groupId: (row.id as number).toString() }
    });
  }

  private handleDel(row: UserGroupData): void {
    const h: CreateElement = this.$createElement;
    Modal.confirm({
      title: "删除确定",
      icon: "none",
      keyboard: false,
      content: h("div", {}, [
        h("p", `确认要删除用户组《${row.name}》吗？删除以后无法恢复。`)
      ]),
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        this.delUserGroups([row.id as number], `${row.id}&${row.name}`);
      }
    });
  }

  private handleDelAll(): void {
    let delAllModalVal: string = "";
    const names: string[] = this.getSelectUserGroupNames();

    for (let index: number = 0; index < 3; index++) {
      if (typeof names[index] === "string") {
        if (index !== 0) {
          delAllModalVal += "、";
        }
        delAllModalVal += `《${names[index]}》`;
      } else {
        break;
      }
    }

    if (names.length > 3) {
      delAllModalVal += `…等${names.length}条记录`;
    }

    const h: CreateElement = this.$createElement;
    Modal.confirm({
      title: "批量删除确定",
      icon: "none",
      keyboard: false,
      content: h("div", {}, [
        h("p", `确认要删除用户组${delAllModalVal}吗？删除以后无法恢复。`)
      ]),
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        this.delUserGroups(this.getSelectUserGroupIds());
      }
    });
  }

  private delUserGroups(groupIds: number[], delOneRowKey?: string): void {
    delUserGroup(groupIds)
      .then(res => {
        this.$message.success("删除成功");
        if (groupIds.length > 1) {
          this.paginationConf.current = 1;
        } else if (groupIds.length === 1 && this.userGroupData.length <= 1) {
          this.paginationConf.current--;
        }
        this.getUserGroupList();
        if (groupIds.length === 1) {
          this.selectedRowKeys.splice(
            this.selectedRowKeys.findIndex(e => e === delOneRowKey),
            1
          );
        } else {
          this.selectedRowKeys = [];
        }
      })
      .catch(err => {
        if (err.data.errcode === "100001") {
          this.$message.error(this.$messagevalue[100001]);
        } else {
          this.$message.error(err.data.errmsg);
        }
      });
  }

  private handleAdd(): void {
    this.$router.push({
      name: "userGroupAdd"
    });
  }
}
</script>
<style lang="scss" scoped>
.userGroup {
  width: 962px;
  margin: 0px 31px 30px 30px;
  .userGroupAlert {
    margin-top: 16px;
    .deleteLink {
      margin-left: 20px;
    }
  }
  .userGroupList {
    margin-top: 16px;
  }
  .userGroupActionContainer {
    a:first-of-type {
      margin-right: 20px;
    }
  }
}
</style>

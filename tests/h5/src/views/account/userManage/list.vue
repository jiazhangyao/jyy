<template>
  <div class="user-manage">
    <NavBar navTitle="用户管理" />
    <ul class="list" v-if="list && list.length > 0">
      <li class="list-item" v-for="item in list" :key="item.name">
        <div class="tag">{{item.userRolesName}}</div>
        <button class="stop-btn"
          v-if="item.canDelete"
          @click="option(item)"
          :class="item.status === 1 ? 'stop' : 'start'">
          {{item.status === 1 ? '停用' : '启用'}}
        </button>
        <button class="stop-btn delete-btn"
          v-if="item.canDelete"
          @click="deleteUser(item.id)">
          删除
        </button>
        <div class="name">{{item.name}}</div>
        <p>{{item.mobile}}</p>
        <div class="card-no">{{item.cardNo}}</div>
        <p class="no-margin">身份证号码</p>
      </li>
    </ul>
    <Empty v-if="list.length == 0" />
    <div class="btn-wrap">
      <button class="add-btn" @click="add">新增机构用户</button>
    </div>
   </div> 
</template>
<script>
  import { queryList, optUser, delUser } from "@/service/userManage";
  import { Toast, Dialog } from 'vant';
  import Empty from "@/components/empty.vue";
  export default {
    data() {
      return {
        list: []
      };
    },
    created() {
      this.getList();
    },
    components: {
      Empty
    },
    methods: {
      getList() {
        const params = {
          pageNo: 1,
          pageSize: 10
        }
        queryList(params).then(res => {
          const {success, msg, data: {list, total}} = res;
          if (success) {
            this.list = list;
          }else {
            Toast(msg);
          }
        }).catch(err => {
          Toast(err);
        });
      },
      option(item) {
        const {cardNo, mobile, name, roleId, status, id} = item;
        const tit = status === 1 ? '停用' : '启用';
        const params = {
          cardNo,
          mobile,
          name,
          status: status === 1 ? 2 : 1,
          id
        }
        Dialog.confirm({
          title: '提示',
          message: `确定要${tit}此账号`,
          confirmButtonColor: '#309de5'
        }).then(() => {
          optUser(params).then(res => {
            Toast('操作成功');
            this.getList();
          });
        });
      },
      add() {
        this.$router.push('add');
      },
      deleteUser(id) {
        Dialog.confirm({
          title: '提示',
          message: '确定要删除此账号',
          confirmButtonColor: '#309de5'
        }).then(() => {
          delUser(id).then(res => {
            Toast('操作成功');
            this.getList();
          });
        });
      }
    }
  }
</script>
<style lang="less" scoped>
  .user-manage {
    min-height: calc(100vh - 48px);
    background-color: #f5f5f5;
    padding: 16px;
    padding-bottom: 100px;

    .list-item {
      position:relative;
      background-color: #fff;
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.06);
      border-radius: 2px;
      margin-bottom: 16px;
      padding: 20px 16px;

      .stop-btn {
        position: absolute;
        right: 16px;
        bottom: 20px;
        width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 2px;
        border: 1px solid #fe3824;
        color: #fe3824;
        font-size: 14px;
        background-color: #fff;
      }

      .delete-btn {
        right: 100px;
        border-color: #999;
        color: #999;
      }

      .start {
        border-color: #309de5;
        color: #309de5;
      }

      .tag {
        position: absolute;
        right: 16px;
        top: 0;
        // width: 94px;
        padding: 0 6px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        background-image: linear-gradient(90deg, #52BAFE 18%, #46CAEB 100%);
        border-radius: 2px;
      }

      div {
        color: #333;
        margin-bottom: 4px;
      }

      .name {
        font-size: 18px;
        font-weight: bold;
      }

      .card-no {
        font-size: 14px;
      }

      p {
        color: #999;
        font-size: 14px;
        margin-bottom: 8px;
        line-height: 20px;
      }

      .no-margin {
        margin-bottom: 0;
      }
    }

    .btn-wrap {
      position: fixed;
      padding-bottom: 16px;
      padding-top: 16px;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #f5f5f5;
      text-align: center;

      .add-btn {
        width: 343px;
        background-color: #309de5;
        border-radius: 4px;
        font-size: 18px;
        color: #fff; 
        line-height: 48px;
      }

    }

  }
</style>

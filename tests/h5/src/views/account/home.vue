<template>
  <div class="personal-center">
    <NavBar navTitle="个人中心" />
    <article class="header">
      <div class="header-pic">
        <img src="@/assets/avatar.png">
        <div class="name">{{name}}</div>
      </div>
      <section class="header-thing">
        <div class="header-todo">
          <div class="number" @click="goTodo(todo, onlyId)">{{todo}}</div>
          <div><img src="@/assets/home/todo@2x.png">待办事项</div>
        </div>
        <div class="todo-remain">
          <div class="done" @click="goList('done')"><img src="@/assets/home/finish@2x.png">已完成 <span class="number">{{done}}</span></div>
          <div class="doing" @click="goList('doing')"><img src="@/assets/home/underway@2x.png">进行中 <span class="number">{{doing}}</span></div>
        </div>
      </section>
    </article>
    <div class="content">
      <ul class="card-list" v-if="list">
        <li v-for="item in list" :key="item.id" @click="toOrderDetail(item.registerType, item.id, item)">
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
        </li>
      </ul>
      <div class="settings">
        <van-cell is-link class="settings-item" v-for="item in settings" :key="item.name" :title="item.name" :to="item.url" v-if="item.show">
          <div slot="title">
            {{item.name}}
            <span class="red-icon" v-if="item.showRedDot"></span>
          </div>
        </van-cell>
      </div>
    </div>
  </div>
</template>
<script>
  import { messageStatusCount, listTodo, getCompanyDetail } from "@/service/user";
  import DetailBtn from "./components/detailBtn.vue";
  import { Toast } from 'vant';
  export default {
    data() {
      return {
        name: '王先生',
        todo: 0,
        done: 0,
        doing: 0,
        list: null,
        userType: 0,
        isShowOrgMangerMenu: 0,
        settings: [],
        auditStatus: null
      };
    },
    methods: {
      // 机构认证信息
      getCompanyInfo() {
        getCompanyDetail().then(res => {
          const {success, msg, data} = res;
          if (success) {
            this.auditStatus = data.auditStatus;
            // 初始菜单
            this.settings = [
              { name: "账户设置", update: false, url: "/account/setting", show: true},
              { name: "认证管理", update: true, url: "/account/approveManage/index", show: this.isShowOrgMangerMenu == 1, showRedDot: this.auditStatus == 4},
              { name: "用户管理", update: false, url: "/account/userManage/list", show: this.userType == 0},
              { name: "联系我们", update: false, url: "/account/contactUs", show: true}
            ]
          }else {
            Toast(msg);
          }
        })
      },
      // 待办
      getListTodo() {
        listTodo().then(res => {
          const {success, data, msg} = res;
          if (success) {
            if (data.length) {
              this.list = data.slice(0,1);
              this.todo = data.length;
              this.onlyId = data[0].id;
            }
          }else {
            Toast(msg);
          }
        })
      },
      // 已完成与进行中
      getThingsNo(type) {
        messageStatusCount(type).then(res => {
          const {success, data, msg} = res;
          if (success) {
            if (type === 0) {
              this.done = data;
            }
            else if (type === 1) {
              this.doing = data;
            }
          }
          else {
            Toast(msg);
          }
        }) 
      },
      toOrderDetail(registerType, id, item) {
        if (registerType === 5010 || registerType === 5020 || registerType === 5030) {
          // 转移登记详情
          this.$router.push(`/transfer/busiapply/edit?id=${id}&edit=0`);
        }
        if (item.registerPrimaryType === 40) {
          // 查封登记详情
          // this.$router.push({name: 'sealUpDetail', params: {id: id}})
          this.$router.push(`/sealUp/sealUpLink?id=${id}&edit=0`);
        }
      },
      goTodo(length, id) {
        if (length > 1) {
          // 跳列表页
          this.$router.push('order/todoList');
        }
        else if (length === 1){
          this.$router.push(`/transfer/busiapply/edit?id=${id}`);
        }
      },
      goList(tag) {
        this.$router.push(`order/list/${tag}`);
      }
    },
    mounted() {
      const {name, companyId, isBManager, sourceType, isShowOrgMangerMenu} = this.$store.state.account.userTotalInfo;
      this.name = name;
      this.companyId = companyId;
      this.isBManager = isBManager;
      this.userType = sourceType;
      this.isShowOrgMangerMenu = isShowOrgMangerMenu;
      if (companyId) {
        this.getCompanyInfo();
      } else {
        // 未认证
        this.settings = [
          { name: "账户设置", update: false, url: "/account/setting", show: true},
          { name: "认证管理", update: true, url: "/account/approveManage/index", show: this.isShowOrgMangerMenu == 1, showRedDot: false},
          { name: "用户管理", update: false, url: "/account/userManage/list", show: this.userType == 0 && !!this.isBManager},
          { name: "联系我们", update: false, url: "/account/contactUs", show: true}
        ]
      }
      this.getThingsNo(0);
      this.getThingsNo(1);
      this.getListTodo();
    },
    components: {
      DetailBtn
    }
  };
</script>
<style lang="less" scoped>
  .personal-center {
    text-align: center;
    background-color: #f5f5f5;
    height: calc(100vh - 44px);

    .header {
      padding-top: 26px;
      background-color: #fff;
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.06);

      .name {
        font-size: 16px;
        color: #333;
        line-height: 22px;
        margin-top: 8px;
        margin-bottom: 26px;
      }

      .header-thing {
        display: flex;
        width: 100%;
        background-color: #f5f7fe;
        padding: 14px 0;
        font-size: 14px;

        img {
          display: inline-block;
          width: 16px;
          height: 16px;
          position: relative;
          top: 3px;
        }
        
        .header-todo {
          width: 50%;

          .number {
            font-size: 24px;
            color: #309de5;
          }
        }

        .todo-remain {
          width: 50%;
          font-size: 14px;

          .done {
            padding-top: 2px;
            margin-bottom: 8px;
          }

          .number {
            color: #309de5;
          }
        }
      }
    }

    .content {
      padding: 16px;

      .card-list {
        background-color: #fff;
        padding: 20px 16px 12px;

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

    .settings {
      margin-top: 16px;
      background-color: #fff;
      text-align: initial;
      border-radius: 2px;

      &-item {
        border-bottom: 1px solid #f5f5f5;
        // line-height: 55px;
        font-size: 16px;
        color: #333;
        padding: 16px 16px;

        .red-icon {
          display: inline-block;
          width: 7px;
          height: 7px;
          background-color: #ec2e44;
          border-radius: 50%;
          margin-left: 4px;
        }
      }
    }
  }
</style>
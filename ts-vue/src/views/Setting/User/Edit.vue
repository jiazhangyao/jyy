<template>
  <div class="user-add">
    <div class="loading" v-if="loading">
      <a-spin size="large" class="spin"/>
    </div>
    <a-form :form="form" @submit="handleFormSubmit" v-if="!loading">
      <a-form-item
        label="用户名"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
        colon
        required
        has-feedback
      >
        <a-input placeholder="限英文字母、数字" class="int"
                 v-decorator="['userName',
          { initialValue: userName,rules: [{ required: true, message: '请输入用户名' },{ pattern: $data.regUserName, message: '限英文字母、数字' }] },
        ]"
        />
      </a-form-item>
      <a-form-item
        label="姓名"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
        colon
        required
        has-feedback
      >
        <a-input
          placeholder="限中文、不超过5个字"
          class="int"
          v-decorator="['name',{initialValue: name, rules: [{ required: true, message: '请输入用户名' },{ pattern: $data.regName, message: '限中文、不超过5个字' }] },
        ]"
        />
      </a-form-item>

      <a-form-item label="角色" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }" required>
        <a-select class="int" v-decorator="['role',{ initialValue: role, rules: [{ required: true, message: '请选择角色' }]}]">
          <my-icon slot="suffixIcon" type="icondown2" />
          <a-select-option v-for="item in rolesList" :value="item.id">{{item.name === 'SPEAKER'?'主讲老师':'辅导老师'}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="用户组" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <div class="label-group">
          <div class="group-panel" v-if="gz_groupsList.length">
            <span
              v-for="(item,index) in gz_groupsList"
              :data-id="item.id"
              :key="item.id"
              :class="{'active': item.check === true}" @click="groupSelect(item.id)">{{item.name}}
            </span>
          </div>
          <div class="group-panel" v-if="cz_groupsList.length">
            <span
              v-for="(item,index) in cz_groupsList"
              :data-id="item.id"
              :key="item.id"
              :class="{'active': item.check === true}" @click="groupSelect(item.id)">{{item.name}}
            </span>
          </div>
          <div class="group-panel" v-if="qt_groupsList.length">
            <span
              v-for="(item,index) in qt_groupsList"
              :data-id="item.id"
              :key="item.id"
              :class="{'active': item.check === true}" @click="groupSelect(item.id)">{{item.name}}
            </span>
          </div>
        </div>
        <a-input
          placeholder="请选择用户组"
          type="hidden"
          class="int"
          v-decorator="['group', { initialValue: groups.length ? JSON.stringify(groups):'',rules: [{ required: true, message: '请选择用户组' }]}]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-checkbox v-model="status">
          立即启用
        </a-checkbox>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-button type="primary" html-type="submit" :loading="submitLoading" class="submit-btn">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { getGroups, getRoles, editUser, getUserDetail } from "@/server/setting/user";
import { Form } from "ant-design-vue";
import { userName, name } from "@/common/js/regExp";
import { beforeRouteLeaveModal } from '@/common/js/modal';

@Component({
  beforeRouteLeave(to: any, from: any, next: any): void {
    if ((this as UserEdit).beforeRouteLeaveConfig.submit) {
      next();
      return;
    }

    if ((this as UserEdit).beforeRouteLeaveConfig.isEdit) {
      beforeRouteLeaveModal(() => {
        next();
      });
    } else {
      next();
    }
  }
})
export default class UserEdit extends Vue {

  // 退出判断有内容是否保存
  private beforeRouteLeaveConfig: any = {
    isEdit: false,
    submit: false // 是否通过提交离开页面
  };

  private form?: Form;
  private regUserName: RegExp = userName;
  private regName: RegExp = name;

  private loading: boolean = true;

  private userName: string = '';
  private name: string = '';

  private role: string = '';
  private groups: any[] = [];

  private submitLoading: boolean = false;

  private status: boolean = false;

  private rolesList: any[] = []; // 拉取接口数据
  private groupsList: any[] = []; // 拉取接口数据

  private cz_groupsList: any[] = [];
  private gz_groupsList: any[] = [];
  private qt_groupsList: any[] = [];

  private beforeCreate(): void {
    this.form = this.$form.createForm(this, {
      onFieldsChange: e => {
        this.beforeRouteLeaveConfig.isEdit = true;
      }
    });
  }

  private handleFormSubmit(e: any): void {
    e.preventDefault();
    // @ts-ignore
    this.form.validateFields((err, values) => {
      if (!err) {
        if (this.submitLoading) {
          return;
        }
        this.beforeRouteLeaveConfig.submit = true;
        this.submitLoading = true;
        const id: number = parseInt(this.$route.query.id as string);
        editUser(id, values.userName , values.name, values.role, values.group, this.status).then(res => {
          this.$message.success('修改成功！');
          this.$router.push({
            path: '/setting/userlist'
          });
        }).catch((error: any) => {
          this.submitLoading = false;
          if (error.data.errcode === "FS0010") {
            this.$message.error(this.$messagevalue.FS0010);
          } else {
            this.$message.error(error.data.errmsg);
          }
        });
      }
    });
  }

  private getGroupsList(): void {
    getGroups().then(res => {
      this.groupsList = res.data.retval;
      this.userDetail();
    }).catch(err => {
      this.$message.error(err.data.errmsg);
    });
  }

  private getRolesList(): void {
    getRoles().then(res => {
      this.rolesList = res.data.retval;
    }).catch(err => {
      this.$message.error(err.data.errmsg);
    });
  }

  // 添加已选
  private setGroupsListCheck(): void {
    // 添加已选
    const groups: any = [];
    this.groupsList.forEach((item: any) => {
      item.check = false;
      this.groups.forEach(id => {
        if (id === item.id) {
          console.log(id);
          item.check = true;
        }
      });
    });
  }
  // 选择
  private groupSelect(id: any): void {
    this.groupsList.forEach((item: any) => {
      if (item.id === id) {
        const index: number = this.groups.indexOf(id);
        if (index > -1) {
          this.groups.splice(index, 1);
        } else {
          this.groups.push(id);
        }
      }
    });
    this.beforeRouteLeaveConfig.isEdit = true;
    this.setGroupsListCheck();
    // @ts-ignore
    this.form.setFieldsValue({
      group: this.groups.length ? JSON.stringify(this.groups) : ''
    });
  }

  private mounted(): void {
    this.getGroupsList();
    this.getRolesList();
  }

  private userDetail(): void {
    const id: number = parseInt(this.$route.query.id as string);
    getUserDetail(id).then(res => {
      const user: any = res.data.retval;
      this.userName = user.username;
      this.name = user.name;
      this.role = user.roleId;
      this.status = user.status === 'CLK' ? true : false;
      user.groups.forEach((item: any) => {
        this.groups.push(item.id);
      });
      this.$nextTick(() => {
        this.setGroupsListCheck();
      });
      this.loading = false;
    }).catch(err => {
      this.loading = false;
      this.$message.error(err.data.errmsg);
    });
  }

  @Watch('groupsList')
  private setgroupslist(newList: any[]): void {
    const CZ_LIST: any[] = [];
    const GZ_LIST: any[] = [];
    const QT_LIST: any[] = [];

    newList.forEach((item: any) => {
      if (item.name.indexOf('初中') > -1) {
        CZ_LIST.push(item);
      } else if (item.name.indexOf('高中') > -1) {
        GZ_LIST.push(item);
      } else {
        QT_LIST.push(item);
      }
    });

    this.cz_groupsList = CZ_LIST;
    this.gz_groupsList = GZ_LIST;
    this.qt_groupsList = QT_LIST;
  }

}
</script>
<style lang="scss" scoped>
  .user-add{
    padding-top: 40px;
    .loading{
      text-align: center;
      line-height: 300px;
      .spin{
        margin-top: -40px;
      }
    }
    .int{
      width: 400px;
    }
    .label-group{
      padding-top: 5px;
      width: 590px;
      .group-panel{
        border-bottom: 1px #E8E8E8 dashed;
        line-height: 20px;
        margin-bottom: 14px;
        padding-bottom: 2px;
        &:last-child{
          border-bottom: none;
        }
      }
      span{
        display: inline-block;
        font-size: 14px;
        color: #666;
        height: 32px;
        line-height: 30px;
        padding: 0 16px;
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        margin-right: 8px;
        margin-bottom: 6px;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
      }
      span:hover {
        color: #0098FF;
        background-color: #E6F7FF;
        border: 1px solid #0098FF;
      }
      .active{
        color: #0098FF;
        background-color: #E6F7FF;
        border: 1px solid #0098FF;
        background-image: url('../../../assets/user/check.svg');
        background-position: right bottom;
        overflow: hidden;
        background-repeat: no-repeat;
      }
    }
    .submit-btn {
      width: 120px;
      margin-bottom: 80px;
    }
  }
</style>

<template>
  <div class="userGroupEdit">
    <div class="userGroupEditTitle font-20pt-title">编辑用户组</div>
    <a-divider class="divider" />
    <div class="userGroupForm">
      <a-form :form="form" @submit="handleFormSubmit">
        <a-form-item
          label="组名"
          colon
          :label-col="{span:3}"
          required
          :wrapperCol="{span:12}"
          has-feedback
        >
          <a-input
            placeholder="请输入用户组名称"
            v-decorator="[
          'name',
          { initialValue: groupDetail.name , rules: [{ required: true, message: '请输入用户组名称' },{ pattern: $data.reg, message: '只能输入中英文和数字' }] },
        ]"
          ></a-input>
        </a-form-item>
        <a-form-item label="说明" colon :label-col="{span:3}" :wrapperCol="{span:12}" has-feedback>
          <a-input
            placeholder="选填"
            v-decorator="[
          'remark',
          { initialValue: groupDetail.remark , rules: [{ pattern: $data.reg, message: '只能输入中英文和数字' }] },
        ]"
          ></a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 3, offset: 3 }">
          <a-button class="userGroupEditBtn" type="primary" @click="handleFormSubmit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  updateUserGroup,
  getUserGroupDetail
} from "@/server/setting/userGroup";
import { beforeRouteLeaveModal } from "@/common/js/modal";

@Component({
  beforeRouteLeave(to: any, from: any, next: any): void {
    const that: UserGroupEdit = this as UserGroupEdit;

    if (that.beforeRouteLeaveConfig.submit) {
      next();
      return;
    }

    if (that.beforeRouteLeaveConfig.isEdit) {
      beforeRouteLeaveModal(() => {
        next();
      });
    } else {
      next();
    }
  }
})
export default class UserGroupEdit extends Vue {
  // 退出判断有内容是否保存
  private beforeRouteLeaveConfig: any = {
    isEdit: false,
    submit: false // 是否通过提交离开页面
  };

  private groupId: number = 0;
  private groupDetail: UserGroupData = {
    name: "",
    remark: ""
  };
  private form?: any;
  private reg: RegExp = new RegExp(/^[\u4e00-\u9fa5a-zA-Z0-9]+$/);
  private name: string = "";
  private record: string = "";

  private beforeCreate(): void {
    this.form = this.$form.createForm(this, {
      onFieldsChange: () => {
        this.beforeRouteLeaveConfig.isEdit = true;
      }
    });
  }

  private mounted(): void {
    this.groupId = parseInt(this.$route.query.groupId as string);
    getUserGroupDetail(this.groupId)
      .then(res => {
        this.groupDetail = res.data.retval;
      })
      .catch(err => {
        this.$message.error(err.data.errmsg);
      });
  }

  private handleFormSubmit(): void {
    this.form.validateFields((errors: any) => {
      if (errors === null) {
        const formData: UserGroupData = this.form.getFieldsValue();
        this.beforeRouteLeaveConfig.submit = true;
        updateUserGroup(
          this.groupId,
          formData.name as string,
          formData.remark as string
        )
          .then(res => {
            this.$message.success("修改成功");
            this.$router.back();
          })
          .catch(err => {
            if (err.data.errcode === "FA002") {
              this.$message.error(this.$messagevalue.FA002);
            } else {
              this.$message.error(err.data.errmsg);
            }
          });
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.userGroupEdit {
  width: 100%;
  padding: 0 30px;
  .userGroupEditTitle {
    margin-top: 16px;
  }
  .userGroupForm {
    width: 840px;
    margin-top: 37px;
    .ant-btn-primary {
      width: 100%;
      margin-top: 36px;
    }
    .userGroupEditBtn {
      margin-bottom: 80px;
    }
  }
  .divider {
    margin: 16px 0;
  }
}
</style>

<template>
  <div class="userGroupAdd">
    <div class="userGroupAddTitle font-20pt-title">新建用户组</div>
    <a-divider class="divider" />
    <div class="userGroupForm">
      <a-form :form="form">
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
          { rules: [{ required: true, message: '请输入用户组名称' },{ pattern: $data.reg, message: '只能输入中英文和数字' }] },
        ]"
          ></a-input>
        </a-form-item>
        <a-form-item label="说明" colon :label-col="{span:3}" :wrapperCol="{span:12}" has-feedback>
          <a-input
            placeholder="选填"
            v-decorator="[
          'remark',
          { rules: [{ pattern: $data.reg, message: '只能输入中英文和数字' }] },
        ]"
          ></a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 3, offset: 3 }">
          <a-button class="userGroupAddBtn" type="primary" @click="handleFormSubmit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { addUserGroup } from "@/server/setting/userGroup";
import { beforeRouteLeaveModal } from "@/common/js/modal";

@Component({
  beforeRouteLeave(to: any, from: any, next: any): void {
    const that: UserGroupAdd = this as UserGroupAdd;

    if (that.beforeRouteLeaveConfig.submit) {
      next();
      return;
    }
    if (
      (typeof that.form.getFieldsValue().name === "string" &&
        that.form.getFieldsValue().name !== "") ||
      (typeof that.form.getFieldsValue().remark === "string" &&
        that.form.getFieldsValue().remark !== "")
    ) {
      beforeRouteLeaveModal(() => {
        next();
      });
    } else {
      next();
    }
  }
})
export default class UserGroupAdd extends Vue {
  // 退出判断有内容是否保存
  private beforeRouteLeaveConfig: any = {
    isEdit: false,
    submit: false // 是否通过提交离开页面
  };

  private form?: any;
  private reg: RegExp = new RegExp(/^[\u4e00-\u9fa5a-zA-Z0-9]+$/);
  private name: string = "";
  private record: string = "";

  private beforeCreate(): void {
    this.form = this.$form.createForm(this);
  }

  private handleFormSubmit(): void {
    this.form.validateFields((errors: any) => {
      if (errors === null) {
        const formData: UserGroupData = this.form.getFieldsValue();
        this.beforeRouteLeaveConfig.submit = true;
        addUserGroup(formData.name as string, formData.remark as string)
          .then(res => {
            this.$message.success("添加成功");
            this.$router.back();
          })
          .catch(err => {
            if (err.data.errcode === "FA001") {
              this.$message.error(this.$messagevalue.FA001);
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
.userGroupAdd {
  width: 100%;
  padding: 0 30px;
  .userGroupAddTitle {
    margin-top: 16px;
  }
  .userGroupForm {
    width: 840px;
    margin-top: 37px;
    .ant-btn-primary {
      width: 100%;
      margin-top: 36px;
    }
    .userGroupAddBtn{
      margin-bottom: 80px;
    }
  }
  .divider {
    margin: 16px 0;
  }
}
</style>

<template>
  <Layout>
    <div class="main">
      <div class="updatePassword">
        <div class="updatePasswordTitle font-20pt-title">修改密码</div>
        <a-divider class="divider" />
        <div class="updatePasswordForm">
          <a-form :form="form">
            <a-form-item
              label="原密码"
              colon
              :label-col="{span:4}"
              required
              :wrapperCol="{span:12}"
              has-feedback
            >
              <a-input
                placeholder="请输入原密码"
                type="password"
                v-decorator="[
            'oldPassword',
            { validateFirst: true, rules: [{ required: true, message: '请输入原密码' }, ...$data.passwordRules] },
          ]"
              ></a-input>
            </a-form-item>
            <a-form-item
              label="新密码"
              colon
              :label-col="{span:4}"
              required
              :wrapperCol="{span:12}"
              has-feedback
            >
              <a-input
                placeholder="至少6位，不支持中文符号"
                type="password"
                v-decorator="[
            'newPassword',
            { validateFirst: true, rules: [{ required: true, message: '请输入新密码' }, { validator: validatePassword }, ...$data.passwordRules] },
          ]"
              ></a-input>
            </a-form-item>
            <a-form-item
              label="确认密码"
              colon
              :label-col="{span:4}"
              required
              :wrapperCol="{span:12}"
              has-feedback
            >
              <a-input
                placeholder="再次输入密码"
                type="password"
                v-decorator="[
            'confirmPassword',
            { validateFirst: true, rules: [{ required: true, message: '请输入确认密码' }, { validator: comparePassword }, ...$data.passwordRules] },
          ]"
                @change="handleConfirmBlur"
              ></a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 3, offset: 4 }">
              <a-button type="primary" @click="handleFormSubmit">提交</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </Layout>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/components/Layout/Base/Index.vue";
import { ValidationRule } from "ant-design-vue/types/form/form";
import { updateUserPassword } from "@/server/userInfo";
import { Modal } from "ant-design-vue";
import VNode, { CreateElement } from "vue";
import { delCookie } from "@/common/js/unit/cookie";
import { password } from "@/common/js/regExp";

@Component({
  components: {
    Layout
  }
})
export default class UpdatePasswrod extends Vue {
  private form?: any;
  private oldPassword: string = "";
  private newPassWord: string = "";
  private confirmPassword: string = "";
  private confirmDirty: boolean = false;

  private passwordRules: ValidationRule[] = [
    {
      pattern: password,
      message: "密码至少6位，不支持中文符号"
    }
  ];

  private beforeCreate(): void {
    this.form = this.$form.createForm(this);
  }

  private comparePassword(
    rule: ValidationRule,
    value: FormDataEntryValue,
    callback: (val?: string) => any
  ): void {
    if (
      typeof value === "string" &&
      value !== this.form.getFieldValue("newPassword")
    ) {
      callback("两次输入的密码不一致!");
    } else {
      callback();
    }
  }

  private handleConfirmBlur(e: any): void {
    this.confirmDirty = this.confirmDirty || !!e.target.value;
  }

  private validatePassword(
    rule: ValidationRule,
    value: FormDataEntryValue,
    callback: (val?: string) => any
  ): void {
    if (value && this.confirmDirty) {
      this.form.validateFields(["confirm"], { force: true });
    }
    callback();
  }

  private handleFormSubmit(): void {
    this.form.validateFields((errors: any) => {
      if (errors === null) {
        const formData: { [key: string]: string } = this.form.getFieldsValue();
        updateUserPassword(
          formData.oldPassword as string,
          formData.newPassword as string
        )
          .then(res => {
            this.showPasswordSuccessModal();
          })
          .catch(err => {
            if (err.data.errcode === "FS20003") {
              this.showPasswordErrorModal(
                "密码错误",
                this.$messagevalue.FS20003
              );
            } else {
              this.$message.error("错误", err.data.errmsg);
            }
          });
      }
    });
  }

  private showPasswordSuccessModal(): void {
    Modal.success({
      title: "密码修改成功",
      icon: (h: any) => {
        return h("a-icon", {
          props: { type: "check-circle", theme: "filled" }
        });
      },
      keyboard: false,
      content: this.$createElement("div", { style: { marginLeft: "38px" } }, [
        this.$createElement("p", "恭喜！新密码修改成功，请重新登录系统。")
      ]),
      okText: "确定",
      onOk: () => {
        delCookie("token");
        this.$router.replace("/login");
      }
    });
  }

  private showPasswordErrorModal(title: string, message: string): void {
    Modal.error({
      title,
      icon: (h: any) => {
        return h("a-icon", {
          props: { type: "close-circle", theme: "filled" }
        });
      },
      keyboard: false,
      content: this.$createElement("div", { style: { marginLeft: "38px" } }, [
        this.$createElement("p", message)
      ]),
      okText: "确定"
    });
  }
}
</script>
<style lang="scss" scoped>
  @import "../common/sass/function";
  @import "../common/sass/variable";
.updatePassword {
  width: 100%;
  padding: 16px 30px 30px 30px;
  background-color: $background;
  margin-top: 16px;
  .updatePasswordTitle {
    // margin-top: 16px;
  }
  .updatePasswordForm {
    width: 840px;
    margin-top: 37px;
    .ant-btn-primary {
      width: 100%;
      margin-top: 36px;
    }
  }
  .divider {
    margin: 16px 0;
  }
}
</style>

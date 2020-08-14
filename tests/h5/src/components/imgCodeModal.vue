<template>
  <div>
    <van-dialog v-model="show" title="图形验证码" show-cancel-button :before-close="beforeClose">
      <div class="img-code-wrap">
        <van-field v-model="imgcode" placeholder="请输入图形验证码" :error-message="imgcodeError"/>
        <div class="img-code" @click="refreshImg">
          <img :src="imgcodeSrc" class="img-code-pic" alt>
          <p class="img-code-tips">看不清？换一张</p>
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import { Button, Toast, Field } from "vant";
import request from "../utils/request";
import { globalAgent } from "https";
export default {
  name: "imgCodeModal",
  components: {
    "van-button": Button,
    "van-field": Field
  },
  props: ["url", "codeUrl", "isShow", "params"],
  data() {
    return {
      imgcodeError: "",
      imgcodeSrc: "",
      imgcode: "",
      show: false
    };
  },
  watch: {
    isShow() {
      if (this.isShow) {
        this.imgcodeSrc = `${this.url}${Math.random()}`;
        this.imgcodeError = "";
      }
      this.show = this.isShow;
    }
  },
  methods: {
    beforeClose(action, done) {
      if (action === "cancel") {
        this.$emit("close");
        done(false);
      }
      if (action === "confirm") {
        if (this.imgcode == "") {
          this.imgcodeError = "图形验证码不能为空";
          done(false);
        } else {
          request(this.codeUrl, {
            method: "post",
            data: {
              ...this.params,
              imgAuthCode: this.imgcode
            }
          }).then(({ success, errorCode, msg, data }) => {
            if (success) {
              this.$emit("close", data);
            } else {
              this.imgcodeError = msg;
            }
          });
          done(false);
        }
      }
    },
    refreshImg() {
      this.imgcodeSrc = `${this.url}${Math.random()}`;
    }
  },
  mounted() {
    this.refreshImg();
  }
};
</script>
<style lang="less">
.img-code-wrap {
  display: flex;
  padding: 24px;
  justify-content: space-between;
  .van-field {
    width: 140px;
    padding: 0;
    border-bottom: none;
  }
  .van-field__control {
    border-bottom: 1px solid #cbd2de;
    padding-bottom: 8px;
  }
  .img-code {
    &-pic {
      display: block;
      width: 86px;
      height: 34px;
    }
    &-tips {
      margin-top: 8px;
      font-size: 12px;
      line-height: 12px;
      color: #aab0b9;
    }
  }
}
</style>



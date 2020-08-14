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
import axios from "axios";
import request from "../utils/request";
import { globalAgent } from "https";
const sourceType = process.env.VUE_APP_SOURCE_TYPE;
export default {
  name: "captchaModal",
  components: {
    "van-button": Button,
    "van-field": Field
  },
  props: ["codeSrc", "url", "isShow", "params"],
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
      this.show = this.isShow;
      if(this.isShow){
        this.imgcode = "";
        this.imgcodeError = "";
        this.refreshImg();
      }
    }
  },
  methods: {
    beforeClose(action, done) {
      if (action === "cancel") {
        this.$emit("cancel");
        done(false);
      }
      if (action === "confirm") {
        if (this.imgcode == "") {
          this.imgcodeError = "图形验证码不能为空";
          done(false);
        } else {
          request(this.url, {
            method: "post",
            data: {
              ...this.params,
              imgAuthCode: this.imgcode
            }
          }).then(({ success, errorCode, msg, data }) => {
            if (success) {
              this.$emit("succeed", data);
	          }else if([10021, 10023, 10038, 10040, 10041, 10018, 10029].indexOf(+errorCode) > -1){	
              this.imgcodeError = msg;
            } else {
              this.imgcodeError = "";
              Toast(msg);
              this.$emit("cancel");
            }
          });
          done(false);
        }
      }
    },
    refreshImg() {
      this.imgcodeSrc = `${this.codeSrc}${Math.random()}`;
    }
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



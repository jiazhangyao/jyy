<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="face_wrap">
      <Steps :at="2"/>
      <div class="wg"></div>
      <section class="regist-face">
        <div class="tip-img">
          <img :src="face" class="head-img">
        </div>
        <div class="tip-txt">
          <p class="txt1">为了核实您的身份信息</p>
          <p class="txt2">请取下眼镜，确保面部光线充足</p>
        </div>
        <div class="tip-proto">
          认证过程中将需要收集您的面部信息及实名信息用以开启人脸身份认证服务，点击“下一步”表示您同意以上内容并确认您已阅读
          <a @click="setUrl">《用户服务协议》</a>
        </div>
      </section>
      <div class="fixed-b">
        <div class="footer">
          <FullButton name="验证" cls="water-edit-footer-btn"/>
        </div>
        <input type="file" id="addFile" accept="image/*" capture="camera" :disabled="loading">
      </div>
    </div>
  </div>
</template>

<script>
  import face from "@/assets/face_identify.png";

  //import headerApi from '@/service/api/headerApi.js';
  // import getBaseInfo from '../../../assets/js/baseInfo.js'
  import lrz from "lrz/dist/lrz.all.bundle.js";
  import FullButton from "@/components/fullButton.vue";
  import Steps from "@/components/steps.vue";
  import {ProcessFace, ProcessQuery} from "@/service/common";
  import {Toast} from "vant";

  export default {
    name: "step2",
    components: {
      FullButton,
      Steps
    },
    data() {
      return {
        face: face,
        imgUrl: null,
        title: "实人认证",
        baseinfo: {},
        query: null,
        loading: false,
        // upLoadingImgUrl:'http://upload.pinganfang.com/upload/secret.html', //上传图片的地址
        qrcodeConfig: {}, //扫描二维码进入
        conFig: {
          //从注册进入
        },
        qrCode(file) {
          let self = this;
          let config = {
            data: {
              device: {
                model: "abc123",
                plat: "3",
                version: "abc123"
              },
              file: {
                data: file.data,
                type: file.type
              },
              qrCode: file.query
            }
          };
        },
        infoCode(file) {
          console.log("file", file);

          const config = {
            data: file.data,
            personId: this.params.certNo,
            personName: this.params.name,
            type: file.type
          };
          console.log(config, config);
          ProcessFace(config).then(res => {
            if (res.success) {
              this.$router.push("/progress/res");
            } else {
              Toast(res.msg || "实人认证失败");
            }
          });
        },
        setFileData(file) {
          let self = this;
          let config = {};
          if (file.origin.name.split(".").length > 1) {
            config.type = file.origin.name.split(".")[
            file.origin.name.split(".").length - 1
              ];
          } else {
            config.type = file.origin.name.split(".")[1];
          }

          config.data = file.base64.replace(/data:image\/jpeg;base64,/i, "");
          if (self.query) {
            config.query = self.query;
          } else {
            config.identity = self.baseinfo.identity;
            config.name = self.baseinfo.name;
          }
          return config;
        },
        notLrz() {
          let u = navigator.userAgent;
          let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
          function isWeiXin() {
            //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
            let ua = u.toLowerCase();
            //通过正则表达式匹配ua中是否含有MicroMessenger字符串
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
              return true;
            } else {
              return false;
            }
          }

          if (isAndroid && isWeiXin()) {
            return true;
          } else {
            return false;
          }
        },
        timeClock: null
      };
    },
    methods: {
      setUrl() {
        this.$router.push("/progress/agree");
      }
    },
    mounted() {
      let self = this;
      // getBaseInfo.getBaseInfo().then(function(res){           //获取用户的信息
      //     self.baseinfo = res;
      // });
      document
        .querySelector("input[type=file]")
        .addEventListener("change", function () {
          clearInterval(self.timeClock);
          if (!this.files[0]) {
            return false;
          }
          self.loading = true;
          if (self.notLrz()) {
            let reg = "data:" + this.files[0].type + ";base64,";
            let name = this.files[0].name;
            if (typeof FileReader == "undefined") {
              self.$toast("当前浏览器不支持人脸识别，请移步!");
            } else {
              var reader = new FileReader();
              reader.readAsDataURL(this.files[0]);
              reader.onload = function (e) {
                self.timeClock = setInterval(function () {
                  // self.$toast("请求超时");
                  self.loading = false;
                  clearInterval(self.timeClock);
                }, 30000);
                let rst = {
                  origin: {
                    name: name
                  },
                  base64: this.result.replace(reg, "")
                };
                if (self.query) {
                  self.qrCode(self.setFileData(rst));
                } else {
                  self.infoCode(self.setFileData(rst));
                }
              };
            }
          } else {
            lrz(this.files[0]).then(function (rst) {
              // alert(rst+'转base64');
              self.timeClock = setInterval(function () {
                // self.$toast("请求超时");
                self.loading = false;
                clearInterval(self.timeClock);
              }, 30000);
              if (self.query) {
                self.qrCode(self.setFileData(rst));
              } else {
                self.infoCode(self.setFileData(rst));
              }
            });
          }
        });
    },

    computed: {
      params() {
        return JSON.parse(sessionStorage.getItem("progressParams"));
      }
    },
    props: {}
  };
</script>

<style lang="less">
  .el-upload {
    width: 100%;
  }
</style>
<style scoped lang="less">
  @gov-blue: #309de5;
  .fixed-b {
    position: fixed;
    bottom: 0;
    width: 100%;

    img {
      z-index: 100;
    }
  }

  .wg {
    height: 12px;
    background: #f8f8f8;
  }

  .face_wrap {
    background: #fff;
    padding-bottom: 48px;
    min-height: 577px;
    box-sizing: border-box;
  }

  .regist-face {
    .tip-img {
      width: 245px;
      margin: 0 auto;
      padding-top: 25px;

      img {
        width: 100%;
      }
    }

    .tip-txt {
      padding-top: 32px;
      text-align: center;

      .txt1 {
        font-size: 16px;
        color: #9b9b9b;
        line-height: 22px;
      }

      .txt2 {
        font-size: 18px;
        color: #333;
        line-height: 22px;
        padding-top: 8px;
      }
    }

    .tip-proto {
      font-size: 13px;
      color: #999;
      line-height: 18px;
      padding: 24px 0;
      width: 327px;
      margin: 0 auto;

      a {
        color: @gov-blue;
      }
    }
  }

  .fileupload {
    color: #fff;
    display: block;
  }

  .hide {
    display: none;
  }

  #addFile {
    display: block;
    height: 48px;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    opacity: 0;
  }

  .input-camera {
    width: 100%;
    height: 48px;
    color: #fff;
    top: 0;
    left: 0;
    z-index: 2;
    background: #60a7f9;
    font-family: PingFangSC-Semibold;
    font-weight: bold;
    font-size: 16px;
  }
</style>
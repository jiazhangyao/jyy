/*
* Created by Alex Zhang on 2019/3/19
*/
<template>
  <div class="home">
    <NavBar :showBack="showBack" :navTitle="title" :goBack="goBack" />
    <div class="content">
      <div class="wrapper">
        <div class="avatar">
          <img src="../../assets/shirenrenzheng@2x.png" alt="1" />
        </div>
        <p class="warn">请核实您的身份信息</p>
        <p class="tips">请取下眼镜，确保面部光线充足</p>
        <p class="des">
          认证过程中将需要收集您的面部信息及实名信息用以开启人脸身份认证服务，点击“开始认证”表示您同意以上内容并确认您已阅读
          <span
            class="user-agreement"
            @click="toAgreement"
          >《用户服务协议》</span>
        </p>
      </div>
    </div>
    <div class="footer">
      <input type="file" accept="image/*" capture="camera" id="upload" @change="upload" ref="file" />
      <label for="upload" ref="uploadBtn">开始认证</label>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import lrz from "lrz";
import MobileDetect from "mobile-detect";
import { getCertificateAuthCode } from "@/service/eCertificate";
export default {
  name: "home",
  data() {
    return {
      title: "电子证照"
    };
  },
  computed: {
    showBack() {
      return this.$route.query.from === "h5";
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    goBack() {
      history.go(-2);
    },
    toAgreement() {
      this.$router.push({
        name: "agreement"
      });
    },
    upload(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length === 0) return;
      Toast.loading({
        mask: true,
        message: "处理中..."
      });
      // 处理并压缩文件
      lrz(files[0], {
        quality: 0.5
      })
        .then(res => {
          const device = this.getDevice();
          let certificateHolderCode =
            this.$route.query.certificateHolderCode ||
            this.$store.getters.normal_baseinfo.accountInfo.identity;
          let certificateHolderName =
            this.$route.query.certificateHolderName ||
            this.$store.getters.normal_baseinfo.accountInfo.fullName;
          let postData = {
            certificateHolderCode: certificateHolderCode,
            certificateHolderName: certificateHolderName,
            personPath: res.base64.split(",")[1],
            type: res.origin.type.split("/")[1],
            ...device
          };

          if (this.$route.query.certificateHolderId) {
            postData.userId = this.$route.query.certificateHolderId;
          }
          getCertificateAuthCode(postData)
            .then(({ success, msg, data }) => {
              if (success) {
                if (this.$route.query.returnUrl) {
                  this.$router.replace(this.$route.query.returnUrl);
                } else {
                  this.$router.replace({
                    name: "certificationSuccess",
                    param: { type: 2 }
                  });
                }
              } else {
                Toast(msg);
              }
              e.target.value = "";
            })
            .catch(err => {
              console.log(err);
              e.target.value = "";
            });
        })
        .catch(err => {
          Toast.clear();
          console.log(err);
          e.target.value = "";
        });
    },
    getDevice() {
      const md = new MobileDetect(window.navigator.userAgent);
      const data = {};
      data.model = md.mobile();
      if (md.is("iPhone")) {
        data.plat = "2";
      } else {
        data.plat = "1";
      }
      data.version = md.version("Version") || "1.0.1";
      return data;
    }
  },
  components: {
    Toast
  }
};
</script>

<style scoped lang="less">
.home {
  width: 100%;
  height: calc(100vh - 44px);
  display: flex;
  flex-direction: column;
  .content {
    width: 100%;
    display: flex;
    flex: 1;
    justify-content: center;

    .wrapper {
      width: 327px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;

      .avatar {
        width: 100%;
        height: 240px;
        display: flex;
        justify-content: center;
        align-content: center;

        img {
          width: 240px;
          height: 240px;
        }
      }

      .warn {
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #5d6471;
        letter-spacing: 0;
        line-height: 16px;
        margin-top: 30px;
      }

      .tips {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #0f213e;
        text-align: center;
        line-height: 18px;
        margin-top: 16px;
        font-weight: bold;
      }

      .des {
        text-align: left;
        word-wrap: break-word;
        word-break: break-all;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #5d6471;
        letter-spacing: 0;
        line-height: 21px;
        margin-top: 24px;

        .user-agreement {
          color: #0061ff;
        }
      }
    }
  }

  .footer {
    input {
      display: none;
    }
    
    label {
      width: 100%;
      display: inline-block;
    }
    &.disable {
      background: #abcaf9;
      user-select: none;
      pointer-events: none;
    }

    text-align: center;
    width: 100%;
    height: 48px;
    background: #0061ff;
    color: #ffffff;
    font-size: 16px;
    line-height: 45px;
  }
}
</style>

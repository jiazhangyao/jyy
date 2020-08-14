<template>
  <div>
    <NavBar :navTitle="title" :showBack="showBack" />
    <div class="container">
      <div class="info-bar">
        <notice-bar text="申诉原因：实人认证失败" mode="reason" />
      </div>
      <div class="content">
        <p class="des">拍摄您的二代身份证原件，请确保图片清晰完整</p>
        <img-upload
          :content="'身份证正面'"
          type="1"
          @uploaded="fontUploaded"
          :img="front"
          :uploadUrl="uploadUrl"
        ></img-upload>
        <img-upload
          :content="'身份证反面'"
          type="2"
          @uploaded="backUploaded"
          :img="backed"
          :uploadUrl="uploadUrl"
        ></img-upload>
        <img-upload
          :content="'手持身份证'"
          type="3"
          @uploaded="handUploaded"
          :img="hand"
          :uploadUrl="uploadUrl"
        ></img-upload>
        <p class="agreement">
          账号申诉过程中将需要手机您的个人照片及实名信息用以审核您的身份信息，点击“提交”表示您同意以上内容并确认您已阅读
          <span
            class="user-agreement"
            @click="toAgreement"
          >《用户服务协议》</span>
        </p>
      </div>
      <div class="footer" @click="submit" :class="{disable:isDisable}">提交</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import { Toast } from "vant";
import NoticeBar from "../../components/noticeBar";
import ImgUpload from "./components/imgUpload";
import { GetRequest } from "../../utils/utils";
import { GetFileHost } from "../../service/common";

export default {
  name: "complaintList",
  data() {
    return {
      title: "实人申诉",
      frontPic: {},
      backPic: {},
      handPic: {},
      front: "",
      backed: "",
      hand: ""
    };
  },
  computed: {
    ...mapGetters(["accountId", "user", "taskId", "from", "fileHost"]),
    isDisable() {
      return !this.frontPic.key || !this.backPic.key || !this.handPic.key;
    },
    pics() {
      return this.user.appealPics || [];
    },
    showBack() {
      return this.from === "h5";
    },
    uploadUrl() {
      return this.fileHost || "";
    }
  },
  created() {},
  mounted() {
    this.getFileHost().then(res => {
      const { id, type, sourceType } = this.$route.params;
      const query = this.$route.query;
      if (type == 1) {
        const pic = this.user.appealPics;
        if (pic && pic.length !== 0) {
          const prefix = this.fileHost + "/";
          this.front = `${prefix}${pic[0].key}.${pic[0].ext}`;
          this.frontPic = pic[0];
          this.backed = `${prefix}${pic[1].key}.${pic[1].ext}`;
          this.backPic = pic[1];
          this.hand = `${prefix}${pic[2].key}.${pic[2].ext}`;
          this.handPic = pic[2];
        }
      } else {
        this.workFlowInfo({ mobile: id, type: sourceType })
          .then(res => {
            if (!res.has_task) {
              //没有任务去认证成功页
              this.$router.replace({
                name: "certificationSuccess",
                param: { type },
                query
              });
            } else if (res.page_action.indexOf("complaintList") > -1) {
              //跳转去申诉页
              this.$router.replace({
                name: "complaintList",
                params: { id, type, sourceType }
              });
            }
          })
          .catch(err => {
            this.$router.replace({ name: "404" });
          });
      }
    });
  },
  beforeDestroy() {},
  watch: {},
  methods: {
    ...mapActions([
      "faceIdentifyAppeal",
      "getUserInfo",
      "workFlowInfo",
      "workflowFaceIdentifyAppeal",
      "workflowFaceIdentifyAppealSubmit",
      "getFileHost"
    ]),
    back() {
      this.$router.go(-1);
    },
    toAgreement() {
      this.$router.push({
        name: "agreement"
      });
    },
    fontUploaded(data) {
      const fileInfo = {
        key: data.key,
        ext: data.ext
      };
      const key = fileInfo.key;
      const ext = fileInfo.ext;
      this.frontPic = {
        ext,
        key
      };
    },
    backUploaded(data) {
      const fileInfo = {
        key: data.key,
        ext: data.ext
      };
      const key = fileInfo.key;
      const ext = fileInfo.ext;
      this.backPic = {
        ext,
        key
      };
    },
    handUploaded(data) {
      const fileInfo = {
        key: data.key,
        ext: data.ext
      };
      const key = fileInfo.key;
      const ext = fileInfo.ext;
      this.handPic = {
        ext,
        key
      };
    },
    submit() {
      if (this.isDisable) {
        return;
      }
      const pics = [];
      if (this.frontPic.key) {
        pics.push(this.frontPic);
      }
      if (this.backPic.key) {
        pics.push(this.backPic);
      }
      if (this.handPic.key) {
        pics.push(this.handPic);
      }
      if (pics.length !== 3) {
        Toast("请将材料上传完整");
      }
      Toast.loading({
        mask: true,
        message: "提交中..."
      });
      const { type } = this.$route.params;
      if (type == 1) {
        this.faceIdentifyAppeal({
          accountId: this.accountId,
          note: "实人认证失败",
          pics
        })
          .then(res => {
            Toast.clear();
            this.$router.replace({ name: "submitSuccess", param: { type } });
          })
          .catch(err => {
            err ? Toast(err) : Toast.clear();
          });
      } else {
        const bizData = {
          accountId: this.accountId,
          note: "实人认证失败",
          pics
        };
        const taskId = this.taskId;
        this.workflowFaceIdentifyAppeal({ bizData, previous: false, taskId })
          .then(res => {
            Toast.clear();
            this.$router.replace({ name: "submitSuccess", param: { type } });
          })
          .catch(err => {
            Toast.clear();
          });
      }
    }
  },
  components: {
    NoticeBar,
    ImgUpload
  }
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  // height: calc(100vh - 50px);  //样式影响
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  box-sizing: border-box;

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-content: center;
    align-items: center;
    padding-bottom: 36px;

    .des {
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #666666;
      text-align: center;
      margin-top: 24px;
      margin-bottom: 4px;
    }

    .agreement {
      text-align: left;
      word-wrap: break-word;
      word-break: break-all;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #5d6471;
      letter-spacing: 0;
      line-height: 21px;
      width: 327px;
      margin: 24px auto 20px auto;

      .user-agreement {
        color: #0061ff;
      }
    }
  }

  .footer {
    width: 100%;
    height: 48px;
    line-height: 48px;
    background: #0061ff;
    text-align: center;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0;
    cursor: pointer;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;

    &.disable {
      background: #abcaf9;
      // user-select: none;
      // pointer-events: none;  // 该属性让元素虚化，点击这个会点击到用户协议
    }
  }
}
</style>
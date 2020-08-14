<template>
  <div class="home">
    <NavBar :showBack="showBack" navTitle="人脸实人认证" />
    <div class="notice-bar" v-if="appealStatus===3">
      <notice-bar text="账号申诉待审核，请耐心等待" mode="tips" />
    </div>
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
    <div class="footer" :class="{disable:auditStatus===3}" v-show="faceCount">
      <input type="file" accept="image/*" capture="camera" id="upload" @change="upload" ref="file" />
      <label for="upload" ref="uploadBtn">开始认证</label>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import { Toast, Dialog } from "vant";
import NoticeBar from "../../components/noticeBar";
import lrz from "lrz";
import MobileDetect from "mobile-detect";
import { uploadFile } from "../../service/common";

export default {
  name: "certification",
  data() {
    return {
      errCounts: 0,
      auditStatus: 0,
      faceCount: true
    };
  },
  computed: {
    ...mapState("certification", ["callback"]),
    ...mapGetters(["accountId", "user", "taskId", "from"]),
    appealStatus() {
      return this.user.appealStatus;
    },
    maxCounts() {
      return this.user.faceValidateMaxCount || 3;
    },
    showBack() {
      return this.from === "h5";
    }
  },
  created() {},
  mounted() {
    const { type, sourceType } = this.$route.params;
    const { id } = this.$route.params;
    const query = this.$route.query;
    const { from } = this.$route.query;
    this.setFrom(from);
    if (type == 2) {
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
            // this.$router.replace({
            //   name: "complaintList",
            //   params: { id, type, sourceType }
            // });
          } else {
            // this.$router.replace({name: 'certificationSuccess'})
          }
        })
        .catch(err => {
          this.$router.replace({ name: "404" });
        });
    } else {
      //this.getUserInfo({ accountId: id });
    }
  },
  watch: {},
  methods: {
    ...mapActions([
      "getUserInfo",
      "workFlowInfo",
      "faceIdentify",
      "workflowFaceIdentify",
      "workflowFaceIdentifyAppeal",
      "faceVerificationOfEstateProperty",
      "faceVerificationOfEstatePropertyBody"
    ]),
    ...mapMutations({
      setFrom: "SET_SOURCE_FROM"
    }),
    toAgreement() {
      this.$router.push({
        name: "agreement"
      });
    },
    handleFaceIdentify(postData) {
      const { type, id, sourceType } = this.$route.params;
      const query = this.$route.query;
      this.faceIdentify({ ...postData })
        .then(res => {
          Toast.clear();
          if (res) {
            const { validateSuccess, faceErrorCount } = res;
            if (validateSuccess) {
              this.$router.replace({
                name: "certificationSuccess",
                param: { type },
                query
              });
            } else {
              if (faceErrorCount > 5) {
                Toast(
                  "对不起，人脸识别失败次数已超过5次，请前往不动产中心进行办理!"
                );
                this.faceCount = false;
                return;
              } else {
                Toast(`人脸识别失败，您还有${5 - faceErrorCount}次机会!`);
              }
            }
          }
        })
        .catch(err => {
          Toast.clear();
          Toast("系统错误，请重新拍摄！");
        });
    },

    PC_FaceIdentify(postData) {
      const { type, id, sourceType } = this.$route.params;
      const query = this.$route.query;
      this.faceIdentify({ ...postData })
        .then(res => {
          Toast.clear();
          if (res.validateSuccess) {
            this.$router.replace({
              name: "certificationSuccess",
              param: { type },
              query
            });
          } else {
            //TODO：errCounts后台接口好后从res取
            ++this.errCounts;
            if (this.errCounts > this.maxCounts) {
              Toast(
                "对不起，人脸识别失败次数已超过5次，请前往不动产中心进行办理！"
              );
            } else {
              Toast(
                `人脸识别失败，您还有${this.maxCounts - this.errCounts}次机会！`
              );
            }
          }
        })
        .catch(err => {
          Toast.clear();
          Toast("系统错误，请重新拍摄！");
        });
    },

    workflowFaceValidate(bizData) {
      const taskId = this.taskId;
      // if (!taskId) {
      //   Toast("参数错误，请扫码重试！");
      //   return;
      // }
      this.workflowFaceIdentify({ bizData, previous: false, taskId })
        .then(res => {
          Toast.clear();
          if (res) {
            if (!res.has_task) {
              //没有任务去认证成功页
              const { type } = this.$route.params;
              const query = this.$route.query;
              this.$router.replace({
                name: "certificationSuccess",
                param: { type },
                query
              });
            } else if (res.page_action.indexOf("complaintList") > -1) {
              //跳转去申诉页
              // const { id, type, sourceType } = this.$route.params;
              // this.$router.replace({
              //   name: "complaintList",
              //   params: { id, type, sourceType }
              // });
            } else {
              Toast("人脸识别未通过，请重新拍摄！");
            }
          }
        })
        .catch(err => {
          Toast.clear();
          Toast("系统错误，请重新拍摄！");
        });
    },
    estateFaceValidate(data) {
      this.faceVerificationOfEstatePropertyBody(data)
        .then(res => {
          this.faceVerificationOfEstateProperty(data)
            .then(res => {
              Toast.clear();
              if (res) {
                const { paramList, h5, isWrites } = this.$route.params;
                if (res.verificationFail) {
                  Toast(res.verificationFail);
                  if (res.verificationStatus == 2) {
                    if (this.$store.state.certification.callback) {
                      this.$store.state.certification.callback();
                    } else if (h5) {
                      if (paramList === "apply") {
                        this.$router.push({
                          name: "transferSign",
                          params: { names: 1 }
                        });
                      } else {
                        if (isWrites) {
                          this.$router.push({
                            name: "transferSign",
                            params: { names: 2 }
                          });
                        } else {
                          this.$store.dispatch("applyinfo/contractSubmitData");
                        }
                      }
                    } else {
                      const { type } = this.$route.params;
                      const query = this.$route.query;
                      this.$router.replace({
                        name: "certificationSuccess",
                        param: { type },
                        query
                      });
                    }
                  }
                } else {
                  Toast("识别不成功，请重新拍摄！");
                }
              } else {
                Toast("系统错误，请重新拍摄！");
              }
            })
            .catch(err => {
              console.log("err", err);
              Toast.clear();
              Toast("系统错误，请重新拍摄！");
            });
        })
        .catch(err => {
          console.log("err", err);
          Toast.clear();
          Toast("系统错误，请重新拍摄！");
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
          const { type, sourceType } = this.$route.params;
          const { paramList, h5 } = this.$route.params;
          const { name, identity: queryIdentity } = this.$route.query;
          const { registerUser } = this.$route.query;
          const fileInfo = {
            ext: res.origin.type.split("/")[1],
            key: res.base64.split(",")[1]
          };
          this.$refs.file.value = "";
          //此处上传接口- -
          const device = this.getDevice();
          const accountId = this.accountId;
          const ext = fileInfo.ext;
          const identity = queryIdentity || this.user.identity;
          const key = fileInfo.key;
          let postData = {
            accountId,
            device,
            ext,
            identity,
            key,
            sourceType,
            name
          };
          const {
            userId,
            cardNo,
            sourceTypeNum,
            fullName
          } = this.$store.getters.userFaceInfo;
          const h5PostData = {
            data: key,
            personId: cardNo,
            personName: fullName,
            type: ext
          };
          // let postDatas = {
          //   accountId: 33,
          //   device,
          //   ext,
          //   identity: '36242819880801771X',
          //   key,
          //   sourceType: 1,
          //   name: '何清海'
          // };
          if (typeof registerUser !== "undefined" && registerUser == 100) {
            const { accountId, identity, sourceType, name } = this.$route.query;
            const registerData = {
              accountId,
              device,
              ext,
              identity,
              key,
              sourceType,
              name
            };
            this.handleFaceIdentify(registerData);
            return;
          }
          if (this.from) {
            if (this.from == "h5") {
              this.handleFaceIdentify(postData);
            }
          }
          if (type == 1) {
            this.handleFaceIdentify(postData);
          } else if (type == 3) {
            this.estateFaceValidate({
              data: postData.key,
              personId: postData.identity,
              personName: postData.name,
              type: postData.ext
            });
          } else if (type == 4) {
            this.PC_FaceIdentify(postData);
          } else {
            if (h5) {
              this.estateFaceValidate(h5PostData);
            } else {
              delete postData.accountId; //accountId非必传
              this.workflowFaceValidate(postData);
            }
          }
        })
        .catch(err => {
          Toast.clear();
        });
    }
  },

  components: {
    NoticeBar,
    Toast,
    Dialog
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

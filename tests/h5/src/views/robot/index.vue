<template>
  <div class="robot-page">
    <NavBar navTitle />
    <img class="robot-head" src="@/assets/robot/head.png" />

    <section class="dialog-box">
      <p :class="obj.type" v-for="(obj, objIndex) in msgArr">
        <span v-if="obj.type !== 'forecast' && obj.type !== 'order'" v-html="obj.msg"></span>

        <span v-else-if="obj.type === 'forecast'" class="forecast-box">
          <span class="forecast-title">您可能关心这些问题</span>
          <span
            class="forecast-item"
            v-for="(item, itemIndex) in obj.list"
            @click="autoAsk(item)"
          >{{item}}</span>
        </span>

        <span v-else class="order-box">
          <span class="order-title">您想查询哪个订单？</span>
          <!--水电气工单-->
          <span
            class="order-item"
            v-if="obj.listType === 'water'"
            v-for="(item, index) in obj.list"
            @click="clickOrder(obj.listType, item.id)"
          >
            <span class="order-header">
              <span class="order-id">工单编号：{{item.orderNo}}</span>
              <span
                class="order-status"
                :class="item.transferStatus ==='已过户' ? 'done' : item.transferStatus ==='待审核' ? 'wait' : 'reject'"
              >{{item.transferStatus}}</span>
            </span>
            <span class="order-line">登记类型：{{item.transferType}}</span>
            <span class="order-line">不动产坐落：{{item.location}}</span>
          </span>

          <!--邮寄物流工单-->
          <span
            class="order-item"
            v-if="obj.listType === 'mail'"
            v-for="(item, index) in obj.list"
            @click="clickOrder(obj.listType, item)"
          >
            <span class="order-header">
              <span class="order-id">物流单号：{{item.trackingNumber || "--"}}</span>
              <span
                class="order-status"
                :class="item.logisticsStateDsc ==='邮寄中' ? 'done' : item.logisticsStateDsc ==='已揽件' ? 'wait' : 'reject'"
              >{{item.logisticsStateDsc}}</span>
            </span>
            <span class="order-line">登记类型：{{item.registerTypeDsc}}</span>
            <span class="order-line">工单编号：{{item.orderNo}}</span>
          </span>
        </span>
      </p>
    </section>

    <footer>
      <input placeholder="请输入您的问题" v-model="inputQuestion" />
      <button @click="sendQuestion">发送</button>
    </footer>
  </div>
</template>

<style lang="less" scoped>
  .robot-page {
    height: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;

    .robot-head {
      display: block;
      width: 2.2rem;
      margin: -1rem auto 0 auto;
      position: relative;
      z-index: 1001;
    }

    footer {
      position: fixed;
      bottom: 0;
      background-color: #fff;
      line-height: 48px;
      text-align: left;
      vertical-align: middle;
      font-size: 14px;
      box-shadow: 0 0 2px 0 #eee;

      input {
        width: 7rem;
        margin: 0 16px;
        padding: 0 8px;
        line-height: 32px;
        border: 1Px solid #eee;
        border-radius: 4px;
      }

      button {
        width: 62px;
        line-height: 32px;
        border-radius: 4px;
        background-color: #0066fe;
        color: #fff;
      }
    }

    .dialog-box {
      position: relative;
      flex: 1;
      -webkit-flex: 1;
      -webkit-box-flex: 1;
      padding: 24px;
      overflow: scroll;
      height: 86vh;

      p {
        max-width: 80%;
        padding: 8px 12px;
        line-height: 20px;
        font-size: 14px;
        margin-bottom: 24px;
        border-radius: 18px;
        text-align: left;
      }

      .ask {
        float: right;
        clear: both;
        background-color: #0066fe;
        color: #fff;
        border-bottom-right-radius: 0;
      }

      .forecast,
      .answer,
      .order {
        float: left;
        clear: both;
        background-color: #f1f1f1;
        border-bottom-left-radius: 0;
      }

      .forecast {
        .forecast-box {
          .forecast-title {
            font-weight: bold;
          }

          .forecast-item {
            display: block;
            color: #0066fe;
            border-bottom: 1Px solid #ddd;
            padding: 8px 0;

            &:last-child {
              border-bottom: none;
              padding-bottom: 0;
            }
          }
        }
      }

      .order {
        .order-box {
          .order-title {
            font-weight: bold;
          }

          .order-item {
            display: block;
            margin-top: 12px;
            background-color: #fff;
            border-radius: 4px;
            padding: 8px 12px;
            font-size: 10px;

            &:last-child {
              margin-bottom: 4px;
            }

            .order-header {
              display: block;
              overflow: hidden;
              padding: 0 12px 8px;
              margin: 0 -12px 8px;
              border-bottom: 1Px solid #f1f1f1;

              .order-status {
                float: right;
                padding: 0 4px;
                border-radius: 4px;
              }

              .done {
                background: #e8f4e3;
                color: #52c41a;
              }

              .reject {
                background: #f9e3e9;
                color: #f5222d;
              }

              .wait {
                background: #f9f0e3;
                color: #f56a22;
              }
            }

            .order-line {
              display: block;
            }
          }
        }
      }
    }
  }
</style>

<script>
import Input from "@/components/input.vue";
import { sendMsg, queryMailList, queryWaterList } from "@/service/robot";
import { List, Toast } from "vant";

export default {
  data() {
    return {
      title: " ",
      inputQuestion: "",
      robotApiUrl: "",
      startDialogFlag: false,
      showForecastFlag: true,
      timerForClose: undefined,
      msgArr: [
        // {type: "answer", msg: `欢迎使用智能客服 <a href='https://www.baidu.com'>百度一下</a>`},
        // {
        //   type: "forecast", list: [
        //     "你服不服气",
        //     "对你好无语啊",
        //     "对你无话可说"
        //   ]
        // },
        // {type: "ask", msg: "如何使用房地产交易平台"},
        // {type: "answer", msg: "这样这样这样这样这样这样这样这样这样这样这样这样使用"},
        // {type: "ask", msg: "如何使用房地产交易平台如何使用房地产交易平台"},
        // {type: "answer", msg: "再见"}
      ]
    };
  },
  components: {
    Input,
    List
  },
  mounted() {
    // console.log("❤后端api", this.$store.getters.dict["robotApiUrl"])
    // 有字典接口延时，导致获取不到数据的情况
    this.$store.dispatch("dict", {}).then(res => {
      this.robotApiUrl = this.$store.getters.dict["robotApiUrl"];
      this.getData();
    });

    window.robotJumpUrl = url => {
      // console.log("❤robotJumpUrl url", url)
      // console.log("❤robotJumpUrl isLogin", this.isLogin)

      if (url === "login" || this.isLogin) {
        this.$router.push(url);
      } else {
        this.$router.push("login");
      }
    };
  },
  beforeDestroy() {
    clearTimeout(this.timerForClose);
    window.robotJumpUrl = null;
  },
  watch: {
    // inputQuestion(newVal){
    //   console.log("❤newVal", newVal)
    // }
    dict() {
      this.robotApiUrl = this.$store.getters.dict["robotApiUrl"];
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.normal_baseinfo.userId;
    }
  },
  methods: {
    clickOrder(listType, data) {
      // console.log("❤点击订单", data)
      if (listType === "water") {
        this.$router.push(`water/detail/${data}`);
      } else {
        let info = "";
        Object.keys(data).map(key => {
          info += `${key}=${data[key]}&`;
        });
        // console.log("❤info", info)

        this.$router.push(`cert/detail?${info}`);
      }
    },

    sendQuestion() {
      // console.log("❤发送问题", this.inputQuestion)
      if (this.inputQuestion) {
        this.msgArr.push({ type: "ask", msg: this.inputQuestion });

        if (this.startDialogFlag) {
          this.queryApi("paulstart");
          setTimeout(() => {
            this.queryApi(this.inputQuestion);
            this.inputQuestion = "";
          }, 1000);
        } else {
          this.queryApi(this.inputQuestion);
          this.inputQuestion = "";
        }

        this.startDialogFlag = false;
        this.autoEnd();
        this.scrollToBottom();
      }
    },

    autoAsk(msg) {
      // console.log("❤点击预设问题", msg)
      this.msgArr.push({ type: "ask", msg });

      if (this.startDialogFlag) {
        this.queryApi("paulstart");
        setTimeout(() => {
          this.queryApi(msg);
        }, 1000);
      } else {
        this.queryApi(msg);
      }
      this.startDialogFlag = false;
      this.autoEnd();
      this.scrollToBottom();
    },

    autoEnd() {
      /** 1分钟内无动作自动结束会话，回复再见 */
      clearTimeout(this.timerForClose);
      this.timerForClose = setTimeout(() => {
        this.queryApi("paulend");
        clearTimeout(this.timerForClose);
        this.startDialogFlag = true;
      }, 60000);
    },

    scrollToBottom() {
      let dom = document.querySelector(".dialog-box");
      dom.scrollTop = dom.scrollHeight;
      setTimeout(() => {
        dom.scrollTop = dom.scrollHeight;
      }, 600);
    },

    handelListRes(res, listType) {
      let { success, data = {}, msg } = res;
      if (success) {
        if (data && data.list && data.list.length) {
          this.msgArr.push({
            type: "order",
            listType,
            list: data.list
          });
        } else {
          this.msgArr.push({
            type: "answer",
            msg:
              listType === "water"
                ? "当前账户下暂无水电气过户信息"
                : "当前账户下暂无物流信息"
          });
        }
      } else {
        Toast(msg || "请求错误");
      }
    },

    handleApiError(error) {
      console.log("❤业务接口报错", error.message);
      if (error.message === "Request failed with status code 401") {
        this.msgArr.push({
          type: "answer",
          msg: `当前仅支持登录用户查询，请先 <a style="color: #0066fe" onclick="robotJumpUrl('login')">登录</a>`
        });
      }
    },

    queryApi(str) {
      // console.log("❤queryApi", str)
      sendMsg({ apiUrl: this.robotApiUrl, str }).then(
        res => {
          // console.log("❤跨域成功", res)
          const { success, data, msg } = res;
          if (success) {
            let { answerType, answers, max_freq_querys, sceneId } = data;

            /** 根据sceneId判断5项业务功能 */
            if (sceneId >= 106 && sceneId <= 110) {
              switch (sceneId) {
                case "106":
                  // console.log("❤登记申请进度查询-跳转至业务进度查询页");
                  this.msgArr.push({
                    type: "answer",
                    msg: `您可以通过不动产交易登记平台的登记申请进度查询功能进行查询，<a style="color: #0066fe" onclick="robotJumpUrl('progress')">点击查询</a>`
                  });
                  break;
                case "107":
                  // console.log("❤物流进度查询-调用物流信息列表接口");
                  queryMailList().then(res => {
                    this.handelListRes(res, "mail");
                  }, this.handleApiError);
                  break;
                case "108":
                  // console.log("❤水电气过户进度查询-调用水电气过户列表接口");
                  queryWaterList().then(res => {
                    this.handelListRes(res, "water");
                  }, this.handleApiError);
                  break;
                case "109":
                  // console.log("❤不动产信息查询-跳转至业务进度查询页");
                  this.msgArr.push({
                    type: "answer",
                    msg: `您可以通过不动产交易登记平台的不动产信息查询功能进行查询，<a style="color: #0066fe" onclick="robotJumpUrl('query/query')">点击查询</a>`
                  });
                  break;
                case "110":
                  // console.log("❤网点预约-跳转至网点预约页");
                  this.msgArr.push({
                    type: "answer",
                    msg: `您可以通过不动产交易登记平台的网点预约功能进行查询，<a style="color: #0066fe" onclick="robotJumpUrl('net/list')">点击查询</a>`
                  });
                  break;
              }
            } else if (
              answerType === "0" ||
              answerType === "2" ||
              answerType === "3"
            ) {
              // 直接显示接口返回的文本
              this.msgArr.push({
                type: "answer",
                msg: answers
              });
            } else if (answerType === "1") {
              // 歧义澄清，拆分3条预测文本
              let tempArr = answers.split("[exp]");
              // console.log("❤tempArr", tempArr)
              this.msgArr.push({
                type: "forecast",
                list: tempArr
              });
            } else if (answerType === "4") {
              // 开始问候语 + 高频问题预测
              this.msgArr.push({
                type: "answer",
                msg: answers
              });

              if (this.showForecastFlag) {
                let tempArr = max_freq_querys.split("[EXP]");
                // console.log("❤tempArr", tempArr)
                this.msgArr.push({
                  type: "forecast",
                  list: tempArr
                });
                this.showForecastFlag = false;
              }
            }

            this.scrollToBottom();
          } else {
            Toast(msg || "请求错误");
          }
        },
        error => {
          console.log("❤跨域错误", error);
        }
      );
    },

    getData() {
      this.queryApi("paulstart");
      this.autoEnd();
    }
  }
};
</script>

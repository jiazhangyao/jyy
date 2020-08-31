<template>
  <div id="messageInput">
    <template v-if="teacherAnswerInfo.user!== undefined">
      <div class="teacherAnswerQuestionInfo" v-show="mode === 'T_ANSWER'">
        <span
          class="teacherAnswerQuestionInfoDetail"
          v-if="typeof teacherAnswerInfo.content === 'string'"
        >{{teacherAnswerInfo.user.nick + '：'}} <span v-html="teacherAnswerInfo.content"></span>
        </span>
        <span class="teacherAnswerQuestionInfoDetail" v-else>回复：{{teacherAnswerInfo.user.nick}}</span>
        <span class="iconfont cancel" @click="handleCancelAnswer">&#xe664;</span>
      </div>
    </template>
    <div class="speakInputContainer">
      <div class="inputToolBar">
        <ExpressPanel @selectExpress="handleSelectExpress">
          <span class="expressBtn iconfont">&#xe601;</span>
        </ExpressPanel>
      </div>
      <div class="inputArea">
        <a-input
          class="inputTextArea"
          type="textarea"
          v-model="inputContent"
          :maxlength="mode === 'SPEAK' ? barrageInputMaxLength : answerInputMaxLength"
          placeholder="请输入文字"
          @keyup.enter="handleSendMessage"
        ></a-input>
      </div>
      <div class="inputAreaBottom">
        <!-- TODO: String.length 统计字数不可靠 -->
        <div
          class="messageLengthTips"
        >{{inputContent.length}}/{{mode === 'T_ANSWER'? answerInputMaxLength : barrageInputMaxLength }}</div>
        <button
          class="messageSubmitBtn"
          :class="{'disabled':inputContent.length <= 0}"
          @click="handleSendMessage"
        >发&nbsp;送</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import ExpressPanel from "@/base/ExpressPanel/ExpressPanel.vue";
import {
  BARRAGE_MAX_INPUT_LENGTH,
  ANSWER_MAX_INPUT_LENGTH
} from "@/config/liveConfig";

@Component({
  components: {
    ExpressPanel
  }
})
export default class MessageInput extends Vue {
  // 老师所要回答的目标提问信息
  @Prop({ default: {} }) public teacherAnswerInfo!: any;

  private mode: "SPEAK" | "T_ANSWER" = "SPEAK";

  private inputContent: string = "";

  private barrageInputMaxLength: typeof BARRAGE_MAX_INPUT_LENGTH = BARRAGE_MAX_INPUT_LENGTH;

  private answerInputMaxLength: typeof ANSWER_MAX_INPUT_LENGTH = ANSWER_MAX_INPUT_LENGTH;

  @Watch("teacherAnswerInfo")
  private handleTeacherAnswerInfoChange(): void {
    this.mode = "T_ANSWER";
  }

  private handleCancelAnswer(): void {
    this.mode = "SPEAK";
  }

  private handleSelectExpress(e: string): void {
    if (
      this.inputContent.length + e.length <=
      (this.mode === "SPEAK"
        ? BARRAGE_MAX_INPUT_LENGTH
        : ANSWER_MAX_INPUT_LENGTH)
    ) {
      this.inputContent += e;
    } else {
      this.$message.error("超出规定字数啦");
    }
  }

  private handleSendMessage(): void {
    if (this.inputContent.length > 0) {
      if (this.mode === "SPEAK") {
        this.emitMessage();
      }

      if (this.mode === "T_ANSWER") {
        this.sendAnswer();
      }
    }
  }

  @Emit("sendMessage")
  private emitMessage(): string | void {
    if (this.inputContent.length < BARRAGE_MAX_INPUT_LENGTH) {
      const value: string = this.inputContent;
      this.inputContent = "";
      return value;
    } else {
      this.$message.error("超出规定字数啦");
    }
  }

  @Emit("sendAnswer")
  private sendAnswer(): any {
    if (this.inputContent.length < ANSWER_MAX_INPUT_LENGTH) {
      const value: string = this.inputContent;
      this.inputContent = "";
      return {
        s_userId: this.teacherAnswerInfo.user.userId,
        content: value
      };
    } else {
      this.$message.error("超出规定字数啦");
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";

#messageInput {
  position: relative;
  z-index: 2;

  .teacherAnswerQuestionInfo {
    $height: 32px;
    position: absolute;
    top: -$height;
    left: 0;
    width: 100%;
    height: $height;
    background-color: #f5f5f5;
    font-size: 12px;
    color: #999999;
    line-height: 32px;
    padding: 0 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .teacherAnswerQuestionInfoDetail {
      width: 276px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      /deep/.express_img{
        width: 16px;
        height: 16px;
        vertical-align: text-bottom;
      }
    }
    .cancel {
      margin-left: 8px;
      font-size: 20px;
      transform: scale(0.5);
      cursor: pointer;
    }
  }

  .speakInputContainer {
    width: 100%;
    height: 181px;
    border-top: 1px solid #e8e8e8;
    padding: 16px;
    .inputToolBar {
      width: 100%;
      margin-bottom: 16px;
      .expressBtn {
        color: $font-secondary-color;
        font-size: 24px;
      }
    }
    .inputArea {
      .inputTextArea {
        resize: none;
        border: 0;
        padding: 0;
        box-shadow: none;
        font-size: 14px;
        line-height: 20px;
        color: #212121;
        width: 100%;
        height: 60px;

        &::-webkit-input-placeholder {
          color: #bdbdbd;
        }
        &::-moz-input-placeholder {
          color: #bdbdbd;
        }
        &::-ms-input-placeholder {
          color: #bdbdbd;
        }

        &::-webkit-scrollbar {
          width: 6px;
          // background-color: rgba(0, 0, 0, 0.05);
        }

        &::-webkit-scrollbar-thumb {
          background-color: #dddddd;
          border-radius: 4px;
        }
      }
    }
    .inputAreaBottom {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 14px;
      
      .messageLengthTips {
        margin-right: 8px;
        font-size: 12px;
        color: $font-secondary-color;
        line-height: 16px;
      }
      .messageSubmitBtn {
        width: 65px;
        height: 32px;
        font-size: 14px;
        line-height: 32px;
        text-align: center;
        color: #fff;
        background: linear-gradient(
          90deg,
          rgba(29, 180, 254, 1) 0%,
          rgba(2, 140, 255, 1) 100%
        );
        border-radius: 16px;
        cursor: pointer;
        

        &.disabled {
          background: #dddddd;
        }
      }
    }
  }
}
</style>

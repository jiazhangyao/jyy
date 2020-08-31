<template>
  <div id="studentQuestion">
    <div class="studentQuestionTips">提示：提问内容仅提问者和老师可见</div>
    <div id="studentQuestionContainer">
      <div
        v-for="(speak,index) in studentQuestionList"
        :key="speak.id"
        class="speakChunk"
        :class="{'student':speak.event === 'S_QUESTION'||speak.EVENT === 'S_QUESTION' }"
      >
        <!-- 普通消息 -->
        <template v-if="speak.msgType === undefined || speak.msgType===null || speak.msgType===''">
          <!-- 发言用户信息 -->
          <div class="speakChunkLeft">
            <!-- 头像 -->
            <div class="userImg" @click.stop="handleSelectQuestion(index)">
              <img :src="speak.user.pic" :alt="speak.user.nick" />
            </div>
          </div>
          <div class="speakChunkRight">
            <div class="speakChunkRightTop">
              <!-- 用户昵称 -->
              <div class="userNick" @click.stop="handleSelectQuestion(index)">{{speak.user.nick}}</div>
              <!-- 用户身份 -->
              <div
                v-if="chatRoomGlobalUserType(speak.user.userType) !== ''"
                class="userTypeFlag"
              >{{chatRoomGlobalUserType(speak.user.userType)}}</div>
              <div class="speakTime">{{speak.time | speakTime}}</div>
            </div>
            <div class="speakChunkRightBottom">
              <span
                class="speakContent"
                :class="{'isTeacher':speak.user.userType === 'teacher' || speak.user.userType === 'assistant'}"
                @click.stop="handleSelectQuestion(index)"
              >
                <span
                  v-if="typeof speak.studentContent !== 'string'"
                  class="targetName"
                >{{showAnswerStudentName(speak)}}</span>
                <div
                  v-if="typeof speak.studentContent === 'string'"
                  class="targetDetail"
                >{{getStudentName(speak) + '：' +speak.studentContent}}</div>
                <span class="contentDetail" v-html="speak.content"></span>
              </span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { CHATROOM_USER_TYPE_MAP } from "@/config/polyv";
import {
  ANSWER_STUDENT_NAME_PLACEHOLDER,
  BARRAGE_MAX_INPUT_LENGTH
} from "@/config/liveConfig";
import ExpressPanel from "@/base/ExpressPanel/ExpressPanel.vue";
import Dayjs from "dayjs";

@Component({
  components: {
    ExpressPanel
  },
  filters: {
    speakTime: (timestamp: string | number | undefined): string => {
      if (timestamp === undefined) {
        return Dayjs(new Date().getTime()).format("HH:mm");
      } else {
        return Dayjs(Number(timestamp)).format("HH:mm");
      }
    }
  }
})
export default class StudentQuestion extends Vue {
  @Prop({ default: [] }) public studentQuestionList!: any[];

  private inputContent: string = "";

  private inputMaxLength: typeof BARRAGE_MAX_INPUT_LENGTH = BARRAGE_MAX_INPUT_LENGTH;

  public chatRoomGlobalUserType(userType: string): string {
    return typeof CHATROOM_USER_TYPE_MAP[userType] === "string"
      ? CHATROOM_USER_TYPE_MAP[userType]
      : "";
  }

  public getStudentName(speakInfo: any): string {
    if (
      typeof speakInfo.studentName === "string" &&
      speakInfo.studentName !== ""
    ) {
      return speakInfo.studentName;
    } else {
      return ANSWER_STUDENT_NAME_PLACEHOLDER;
    }
  }

  public showAnswerStudentName(speakInfo: any): string {
    if (
      (speakInfo.event === "T_ANSWER" || speakInfo.EVENT === "T_ANSWER") &&
      typeof speakInfo.s_userId === "string" &&
      speakInfo.s_userId !== ""
    ) {
      if (
        typeof speakInfo.studentName === "string" &&
        speakInfo.studentName !== ""
      ) {
        return "回复" + speakInfo.studentName + "：";
      } else {
        return "回复" + ANSWER_STUDENT_NAME_PLACEHOLDER + "：";
      }
    } else {
      return "";
    }
  }

  @Watch("studentQuestionList")
  public scrollToBottom(): void {
    const chatRoomElement: HTMLElement = document.getElementById(
      "studentQuestionContainer"
    ) as HTMLElement;
    chatRoomElement.scrollTop = chatRoomElement.scrollHeight;
  }

  @Emit("selectQuestion")
  private handleSelectQuestion(index: number): any {
    return this.studentQuestionList[index];
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";

#studentQuestion {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;

  .studentQuestionTips {
    width: 100%;
    padding: 16px 16px 0 16px;
    text-align: center;
    color: #bdbdbd;
    font-size: 12px;
    line-height: 16px;
  }

  #studentQuestionContainer {
    width: 100%;
    height: 555px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;
    margin-top: 24px;
    user-select: text;

    &::-webkit-scrollbar {
      width: 6px;
      background-color: #fff;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ddd;
      border-radius: 4px;
    }

    .speakChunk {
      margin-bottom: 24px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 16px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: nowrap;

      &.student {
        .speakChunkLeft {
          .userImg {
            cursor: pointer;
          }
        }
        .speakChunkRight {
          .speakChunkRightTop {
            .userNick {
              cursor: pointer;
            }
          }
          .speakChunkRightBottom {
            .speakContent {
              cursor: pointer;
            }
          }
        }
      }

      .speakChunkLeft {
        .userImg {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid #f0f2f5;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .speakChunkRight {
        width: 256px;
        margin-left: 8px;
        margin-bottom: 8px;

        .speakChunkRightTop {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          height: 18px;
          margin-bottom: 8px;

          .userNick {
            font-size: 12px;
            color: $font-secondary-color;
            line-height: 18px;
            margin-right: 4px;
          }
          .userTypeFlag {
            min-width: 28px;
            height: 18px;
            line-height: 16px;
            box-sizing: border-box;
            border-radius: 4px;
            border: 1px solid #a3d3ff;
            margin-right: 8px;
            font-size: 12px;
            font-weight: 400;
            text-align: center;
            padding: 0 4px;
            color: #1890ff;
          }
          .speakTime {
            font-size: 12px;
            color: $font-secondary-color;
            line-height: 18px;
          }
        }
        .speakChunkRightBottom {
          width: 100%;

          .speakContent {
            display: inline-block;
            max-width: 100%;
            padding: 8px;
            background: #f5f5f5;
            border-radius: 0 6px 6px 6px;
            color: #212121;
            line-height: 20px;
            font-size: 14px;
            white-space: pre-wrap;
            word-break: break-all;
            /deep/.express_img {
              width: 20px;
              height: 20px;
              vertical-align: text-bottom;
            }

            &.isTeacher {
              background: #1890ff;
              color: #fff;
            }
            .targetName {
              float: left;
            }
            .targetDetail {
              padding-bottom: 8px;
              margin-bottom: 8px;
              border-bottom: 1px solid #46a6ff;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #a2d2ff;
              font-size: 12px;
              line-height: 16px;
            }

            @include clearfix();
          }
        }
      }

      @include clearfix();
    }
  }
}
</style>

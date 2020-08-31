<template>
  <div id="studentQuestion">
    <div class="speakContainer" v-for="(speak,index) in studentQuestionList" :key="speak.id">
      <!-- 提问时间 -->
      <span class="speakTime">{{speak.time | speakTime}}</span>
      <!-- 回复提问内容 -->
      <span
        class="targetQuestion"
        v-if="typeof speak.studentContent === 'string'"
      >{{getStudentName(speak) + '：' +speak.studentContent}}</span>
      <!-- 发言用户信息 -->
      <div
        class="speakChunk"
        :class="{'student':speak.event === 'S_QUESTION'||speak.EVENT === 'S_QUESTION' }"
        @click.stop="handleSelectQuestion(index)"
      >
        <span class="speakUser">
          <!-- 头像 -->
          <div class="userImg">
            <img :src="speak.user.pic" :alt="speak.user.nick" />
          </div>
          <!-- 用户身份 -->
          <div
            v-if="chatRoomGlobalUserType(speak.user.userType) !== ''"
            class="userTypeFlag"
          >{{chatRoomGlobalUserType(speak.user.userType)}}</div>
          <!-- 用户昵称 -->
          <div
            class="userNick"
            :class="{'special':chatRoomGlobalUserType(speak.user.userType) !== ''}"
          >{{speak.user.nick}}{{showAnswerStudentName(speak)}}：</div>
        </span>
        <span class="speakContent" v-html="speak.content"></span>
      </div>
    </div>
    <div class="studentQuestionPlaceholder"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { CHATROOM_USER_TYPE_MAP } from "@/config/polyv";
import { ANSWER_STUDENT_NAME_PLACEHOLDER } from "@/config/liveConfig";
import Dayjs from "dayjs";

@Component({
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
        return "回复" + speakInfo.studentName;
      } else {
        return "回复" + ANSWER_STUDENT_NAME_PLACEHOLDER;
      }
    } else {
      return "";
    }
  }

  @Watch("studentQuestionList")
  public scrollToBottom(): void {
    const chatRoomElement: HTMLElement = document.getElementById(
      "studentQuestion"
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
  // position: absolute;
  // top: 0;
  // left: 0;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow-x: hidden;
  overflow-y: auto;
  // padding-bottom: 0.62rem;
  user-select: text;
  flex-grow: 1;

  .studentQuestionPlaceholder {
    width: 100%;
    height: 0.62rem;
    border: 0;
    padding: 0;
    margin: 0;
  }

  &::-webkit-scrollbar {
    width: 0.16rem;
    background-color: rgba(0, 0, 0, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background-color: $brand;
    border-radius: 0.1rem;
  }

  .speakContainer {
    width: 9.68rem;
    margin-top: 0.62rem;
    margin-left: 0.54rem;
    overflow: hidden;

    .speakTime {
      display: block;
      width: 50%;
      height: 0.56rem;
      font-size: 0.36rem;
      line-height: 0.56rem;
      font-weight: 400;
      color: $font-secondary-color;
    }

    .targetQuestion {
      display: block;
      width: 100%;
      height: 0.96rem;
      background: rgba(248, 248, 248, 1);
      border-radius: 0.12rem;
      font-size: 0.48rem;
      color: $font-body-color;
      line-height: 0.96rem;
      box-sizing: border-box;
      padding: 0 0.4rem;
      margin-top: 0.16rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .speakChunk {
      display: block;
      width: 9.68rem;
      line-height: 0.78rem;
      color: $brand;
      font-size: 0.54rem;
      font-weight: 400;
      margin-top: 0.24rem;
      white-space: pre-wrap;
      word-break: break-all;

      &.student {
        cursor: pointer;
      }

      .speakUser {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        float: left;
        height: 0.78rem;
        .userImg {
          display: block;
          width: 0.68rem;
          height: 0.68rem;
          margin-left: 0.02rem;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 0.2rem;
          border: 0.02rem solid rgba(240, 242, 245, 1);

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .userTypeFlag {
          min-width: 1.04rem;
          height: 0.56rem;
          line-height: 0.56rem;
          box-sizing: border-box;
          padding: 0 0.16rem;
          border-radius: 0.3rem;
          background: linear-gradient(
            90deg,
            rgba(2, 140, 255, 1) 0%,
            rgba(29, 180, 254, 1) 100%
          );
          margin-right: 0.16rem;
          font-size: 0.36rem;
          font-weight: 400;
          text-align: center;
          color: #fff;
        }
        .userNick {
          font-size: 0.54rem;
          color: $font-secondary-color;
          line-height: 0.78rem;
          &.special {
            color: $brand;
          }
        }
      }
      .speakContent {
        color: $font-title-color;
        /deep/.express_img {
          width: 0.78rem;
          height: 0.78rem;
          vertical-align: text-bottom;
        }
      }
      @include clearfix();
    }
  }
}
</style>

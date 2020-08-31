<template>
  <div id="chatRoom">
    <div class="speakChunk" v-for="speak in speakList" :key="speak.id">
      <!-- 普通消息 -->
      <template v-if="speak.msgType === undefined || speak.msgType===null || speak.msgType===''">
        <!-- 发言用户信息 -->
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
          <div class="userNick">{{speak.user.nick}}：</div>
        </span>
        <span class="speakContent" v-html="speak.content"></span>
      </template>
      <!-- 礼物消息 -->
      <div class="gift" v-if="speak.msgType==='reward'">
        <!-- 发言用户信息 -->
        <span class="speakUser">
          <!-- 头像 -->
          <div class="userImg">
            <img :src="speak.user.pic" :alt="speak.user.nick" />
          </div>
          <!-- 用户昵称 -->
          <div class="userNick">{{speak.user.nick}}：</div>
        </span>
        <span class="speakContent">送给老师{{speak.content.goodNum}}个{{speak.content.rewardContent}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { CHATROOM_USER_TYPE_MAP } from "@/config/polyv";

@Component
export default class ChatRoom extends Vue {
  @Prop({ default: [] }) public speakList!: SpeakInfo[];

  public chatRoomGlobalUserType(userType: string): string {
    return typeof CHATROOM_USER_TYPE_MAP[userType] === "string"
      ? CHATROOM_USER_TYPE_MAP[userType]
      : "";
  }

  public scrollToBottom(): void {
    const chatRoomElement: HTMLElement = document.getElementById(
      "chatRoom"
    ) as HTMLElement;
    chatRoomElement.scrollTop = chatRoomElement.scrollHeight;
  }

  @Watch("speakList")
  private handleNewSpeak(): void {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";

#chatRoom {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  padding-bottom: 0.66rem;
  user-select: text;

  &::-webkit-scrollbar {
    width: 0.16rem;
    background-color: rgba(0, 0, 0, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background-color: $brand;
    border-radius: 0.1rem;
  }

  .speakChunk {
    width: 9.64rem;
    margin-left: 0.54rem;
    line-height: 0.78rem;
    color: $brand;
    font-size: 0.54rem;
    font-weight: 400;
    margin-top: 0.66rem;
    white-space: pre-wrap;
    word-break: break-all;

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
        border-radius: 0.12rem;
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
    // 礼物样式
    .gift {
      margin-left: -0.16rem;
      margin-top: 0.64rem;
      height: 1.12rem;
      border-radius: 0.56rem;
      background:rgba(255,70,45,.1);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 0.18rem;
      .speakContent{
        color: #FF462D;
      }
    }

    @include clearfix();
  }
}
</style>

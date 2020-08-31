<template>
  <div id="chatRoom">
    <div id="chatRoomContainer">
      <div class="speakChunk" v-for="speak in speakList" :key="speak.id">
        <!-- 普通消息 -->
        <template v-if="speak.msgType === undefined || speak.msgType===null || speak.msgType===''">
          <!-- 发言用户信息 -->
          <div class="speakChunkLeft">
            <!-- 头像 -->
            <div class="userImg">
              <img :src="speak.user.pic" :alt="speak.user.nick" />
            </div>
          </div>
          <div class="speakChunkRight">
            <div class="speakChunkRightTop">
              <!-- 用户昵称 -->
              <div
                class="userNick"
              >{{speak.user.userId === myUserId || speak.EVENT === 'SELF_SPEAK' || speak.event === 'SELF_SPEAK' ? '我' : speak.user.nick}}</div>
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
                :class="{'itsme':speak.user.userId === myUserId || speak.EVENT === 'SELF_SPEAK' || speak.event === 'SELF_SPEAK'}"
                v-html="speak.content"
                @click="handleContentClick($event,speak)"
              ></span>
            </div>
          </div>
        </template>
        <!-- 礼物消息 -->
        <div class="gift" v-if="speak.msgType==='reward'">
          <!-- 头像 -->
          <div class="userImg">
            <img :src="speak.user.pic" :alt="speak.user.nick" />
          </div>
          <!-- 用户昵称 -->
          <div class="userNick">{{speak.user.nick}}</div>
          <span class="speakContent">送给老师{{speak.content.goodNum}}个{{speak.content.rewardContent}}</span>
        </div>
      </div>
      <div class="banBarrageContainer" :style="{'top':banBarrageTop+'px'}" v-show="banBarrageShow">
        <span class="banActionBtn" @click="handleBanBarrage('del')">屏蔽本条弹幕</span>
        <span class="banActionBtn" @click="handleBanBarrage('delAndBan')">屏蔽并禁言</span>
        <span class="banBarrageExit iconfont" @click="handleCancelBanBarrage">&#xe664;</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { CHATROOM_USER_TYPE_MAP } from "@/config/polyv";
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
export default class ChatRoom extends Vue {
  @Prop({ default: [] }) public speakList!: SpeakInfo[];

  private myUserId: string = this.$store.state.userInfo.id + "_";

  private banBarrageTop: number = 0;

  private banBarrageShow: boolean = false;

  private selectedBarrage: SpeakInfo | {} = {};

  public chatRoomGlobalUserType(userType: string): string {
    return typeof CHATROOM_USER_TYPE_MAP[userType] === "string"
      ? CHATROOM_USER_TYPE_MAP[userType]
      : "";
  }

  public scrollToBottom(): void {
    const chatRoomElement: HTMLElement = document.getElementById(
      "chatRoomContainer"
    ) as HTMLElement;
    chatRoomElement.scrollTop = chatRoomElement.scrollHeight;
  }

  private mounted(): void {
    if (
      typeof this.$route.query.subjectId === "string" ||
      typeof this.$route.query.subjectId === "number"
    ) {
      this.myUserId =
        this.$store.state.userInfo.id + "_" + this.$route.query.subjectId;
    }
  }

  @Watch("speakList")
  private handleNewSpeak(): void {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  }

  private handleContentClick(e: any, barrageInfo: SpeakInfo): void {
    // this.banBarrageTop =
    //   e.target.offsetTop -
    //   (document.getElementById("chatRoomContainer") as HTMLElement).scrollTop + e.target.clientHeight;
    if (
      barrageInfo.user.userType !== "teacher" &&
      barrageInfo.user.userType !== "assistant"
    ) {
      this.banBarrageTop = e.target.offsetTop + e.target.clientHeight;
      this.banBarrageShow = true;
      this.selectedBarrage = barrageInfo;
    }
  }

  private handleCancelBanBarrage(): void {
    this.selectedBarrage = {};
    this.banBarrageShow = false;
  }

  private handleBanBarrage(mode: "del" | "delAndBan"): void {
    if (
      mode === "delAndBan" &&
      (this.selectedBarrage as SpeakInfo).user !== undefined
    ) {
      this.handleBannedUser((this.selectedBarrage as SpeakInfo).user.userId);
    }
    this.handleDelBarrage((this.selectedBarrage as SpeakInfo).id);
    this.selectedBarrage = {};
    this.banBarrageShow = false;
  }

  @Emit("delBarrage")
  private handleDelBarrage(id: string): string {
    return id;
  }

  @Emit("bannedUser")
  private handleBannedUser(userId: string): {} {
    return {
      type: "ban",
      userId
    };
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
  overflow: hidden;
  background-color: #fff;

  #chatRoomContainer {
    position: relative;
    width: 100%;
    height: 611px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;
    // padding-bottom: 24px;
    padding-bottom: 48px;
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
      margin-top: 24px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 16px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: nowrap;

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
            cursor: pointer;
            /deep/.express_img {
              width: 20px;
              height: 20px;
              vertical-align: text-bottom;
            }

            &.itsme {
              background: #1890ff;
              color: #fff;
            }
          }
        }
      }
      // 礼物样式
      .gift {
        margin: 0 auto;
        width: 250px;
        height: 46px;
        line-height: 46px;
        border-radius: 24px;
        background: rgba(255, 70, 45, 0.1);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-weight: 500;

        .userImg {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-left: 10px;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .userNick {
          margin-left: 4px;
          margin-right: 4px;
        }
        .speakContent {
          color: #ff462d;
        }
      }

      @include clearfix();
    }

    .banBarrageContainer {
      position: absolute;
      left: 54px;
      width: 256px;
      height: 44px;
      z-index: 2;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
      padding: 8px 11px 8px 8px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .banActionBtn {
        width: 96px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        font-size: 12px;
        margin-right: 8px;
        border-radius: 14px;
        color: #ff462d;
        background-color: #ffecea;
        cursor: pointer;
      }

      .banBarrageExit {
        display: inline-block;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 20px;
        transform: scale(0.5);
        color: #666666;
        cursor: pointer;
        margin-left: 16px;
      }
    }
  }
}
</style>

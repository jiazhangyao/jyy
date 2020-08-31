<template>
  <div id="onlineUser" @scroll="handleUserInfoScroll">
    <template v-for="user in onlineUserList">
      <div class="userInfo" :key="user.userid" v-if="user.userType!=='teacher'">
        <div class="left">
          <!-- 头像 -->
          <div class="userImg">
            <img :src="user.pic" :alt="user.nick" />
          </div>
          <!-- 禁言标志 -->
          <img v-if="user.banned" class="isbanned" src="@/assets/TeacherLive/banned.png" alt="禁言中" />
        </div>
        <div class="right">
          <!-- 角色标志 -->
          <div
            v-if="chatRoomGlobalUserType(user.userType) !== ''"
            class="userTypeFlag"
          >{{chatRoomGlobalUserType(user.userType)}}</div>
          <!-- 昵称 -->
          <div class="userNickName">{{user.nick}}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { CHATROOM_USER_TYPE_MAP } from "@/config/polyv";

@Component
export default class OnlineUser extends Vue {
  @Prop({ default: [] }) public onlineUserList!: OnlineUserInfo[];

  // 在线学员单页数量
  @Prop({ default: 40 }) public onlineUserListPageCount!: number;
  // 在线学员当前页码
  @Prop({ default: 1 }) public onlineUserListPageNumber!: number;

  @Prop({ default: false }) protected scrollLoadingFLag!: boolean; // 滚动加载标记

  public chatRoomGlobalUserType(userType: string): string {
    return typeof CHATROOM_USER_TYPE_MAP[userType] === "string"
      ? CHATROOM_USER_TYPE_MAP[userType]
      : "";
  }

  public scrollToTop(): void {
    const onlineUserElement: HTMLElement = document.getElementById(
      "onlineUser"
    ) as HTMLElement;
    onlineUserElement.scrollTop = 0;
  }

  // 滚动加载
  public handleUserInfoScroll(e: Event): void {
    const element: HTMLElement = e.target as HTMLElement;
    if (
      this.onlineUserList.length >=
        this.onlineUserListPageNumber * this.onlineUserListPageCount &&
      element.scrollHeight - 100 <= element.scrollTop + element.offsetHeight &&
      !this.scrollLoadingFLag
    ) {
      this.getOnlineUserList();
    }
  }

  @Emit("getOnlineUserList")
  private getOnlineUserList(): {
    onlineUserListPageNumber: number;
    onlineUserListPageCount: number;
  } {
    return {
      onlineUserListPageNumber: this.onlineUserListPageNumber + 1,
      onlineUserListPageCount: this.onlineUserListPageCount
    };
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";

#onlineUser {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  padding-bottom: 0.58rem;

  &::-webkit-scrollbar {
    width: 0.16rem;
    background-color: rgba(0, 0, 0, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background-color: $brand;
    border-radius: 0.1rem;
  }

  .userInfo {
    width: 4.32rem;
    height: 1.36rem;
    margin: 0.58rem 0.18rem 0 0.54rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .left {
      position: relative;
      width: 1.08rem;
      height: 1.08rem;
      .userImg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        border: 0.04rem solid #f0f2f5;

        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .isbanned {
        position: absolute;
        top: 0.74rem;
        left: 0.74rem;
        width: 0.32rem;
        height: 0.32rem;
        display: block;
      }
    }
    .right {
      width: 3.24rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left: 0.36rem;
      box-sizing: border-box;

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
        font-size: 0.36rem;
        font-weight: 400;
        text-align: center;
        color: #fff;
        margin-bottom: 0.1rem;
      }

      .userNickName {
        width: 100%;
        height: 0.72rem;
        line-height: 0.72rem;
        font-size: 0.48rem;
        color: $font-title-color;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // word-break: break-all;
      }
    }
  }
}
</style>

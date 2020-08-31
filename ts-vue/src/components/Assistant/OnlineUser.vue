<template>
  <div id="onlineUser">
    <div class="title">当前在线({{onlineUserList.length}})</div>
    <div class="onlineUserContainer">
      <div class="searchInput">
        <a-input
          type="text"
          placeholder="输入学员姓名"
          allowClear
          v-model="searchValue"
          @change="handleSearchInputChange"
          :disabled="!canSearch"
        />
        <span class="searchBtn iconfont" @click="handleSearchStudent">&#xe604;</span>
      </div>
      <div class="listTypeSwitch" v-show="!isSearch">
        <span
          class="listTypeSwitchChunk"
          :class="{'selected':switchType==='all'}"
          @click="handleSwitchListType('all')"
        >全&nbsp;&nbsp;部</span>
        <span
          class="listTypeSwitchChunk"
          :class="{'selected':switchType==='banned'}"
          @click="handleSwitchListType('banned')"
        >已禁言</span>
      </div>
      <div class="onlineUserList">
        <template v-for="user in onlineUserIsShowList">
          <div class="onlineUserChunk" :key="user.userid" v-if="user.userType!=='teacher'">
            <div class="left">
              <div
                class="userHead"
                :class="{'isStudent': user.userType!=='teacher' && user.userType!=='assistant'}"
                @click="handleAnswerStudent(user)"
              >
                <div class="userImg">
                  <img :src="user.pic" :alt="user.nick" />
                </div>
                <img
                  v-if="user.banned"
                  class="isbanned"
                  src="@/assets/TeacherLive/banned.png"
                  alt="禁言中"
                />
              </div>
              <div class="userName">{{user.nick}}</div>
              <div
                v-if="chatRoomGlobalUserType(user.userType) !== ''"
                class="userTypeFlag"
              >{{chatRoomGlobalUserType(user.userType)}}</div>
            </div>
            <div class="right">
              <!-- 禁言按钮 -->
              <template v-if="user.userType!=='teacher' && user.userType!=='assistant'">
                <div
                  class="banUserBtn banUser iconfont"
                  v-if="!user.banned"
                  @click="handleBannedUser('ban', user.userId)"
                >&#xe678;&nbsp;禁&nbsp;言</div>
                <div
                  class="banUserBtn freeUser"
                  v-if="user.banned"
                  @click="handleBannedUser('free', user.userId)"
                >解除禁言</div>
              </template>
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

@Component
export default class OnlineUser extends Vue {
  @Prop({ default: [] }) public onlineUserList!: OnlineUserInfo[];

  @Prop({ default: [] }) public bannedUserList!: string[];

  public searchValue: string = "";

  private onlineUserIsShowList: OnlineUserInfo[] = [];

  private relBannedUserList: OnlineUserInfo[] = [];

  private switchType: "all" | "banned" = "all";
  // 当前是否为显示搜索结果样式
  private isSearch: boolean = false;
  // 当前是否允许搜索并修改搜索栏的值
  private canSearch: boolean = true;

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

  @Emit("selectStudent")
  protected handleAnswerStudent(user: any): any {
    if (user.userType !== "teacher" && user.userType !== "assistant") {
      return {
        EVENT: "S_QUESTION",
        user,
        content: null
      };
    }
  }

  private mounted(): void {
    this.onlineUserIsShowList = this.onlineUserList;
  }

  // 搜索学员事件
  private handleSearchStudent(): void {
    if (
      this.canSearch &&
      typeof this.searchValue === "string" &&
      this.searchValue !== ""
    ) {
      this.canSearch = false;
      this.isSearch = true;
      this.onlineUserIsShowList = this.onlineUserList.filter(element => {
        return element.nick.includes(this.searchValue);
      });
      this.canSearch = true;
    }
  }

  private handleSearchInputChange(): void {
    if (typeof this.searchValue === "string" && this.searchValue === "") {
      this.isSearch = false;
      this.onlineUserIsShowList = this.onlineUserList;
    }
  }

  private handleSwitchListType(type: "all" | "banned"): void {
    if (this.canSearch) {
      this.switchType = type;
      if (type === "banned") {
        this.emitSearchBannedUserList();
        this.onlineUserIsShowList = this.relBannedUserList;
      } else {
        this.onlineUserIsShowList = this.onlineUserList;
        this.isSearch = false;
        this.canSearch = true;
      }
    }
  }

  @Watch("bannedUserList")
  private handleBannedUserListChange(): void {
    this.relBannedUserList = this.onlineUserList.filter(element => {
      return this.bannedUserList.indexOf(element.userId) !== -1;
    });
    if (this.switchType === "banned") {
      this.onlineUserIsShowList = this.relBannedUserList;
    }
  }

  @Emit("searchBannedUserList")
  private emitSearchBannedUserList(): void {
    return;
  }

  @Emit("bannedUser")
  private handleBannedUser(type: "ban" | "free", userId: string): {} {
    return {
      type,
      userId
    };
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";

#onlineUser {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .title {
    height: 55px;
    line-height: 55px;
    padding: 0 16px;
    font-size: 16px;
    color: $font-title-color;
    border-bottom: 1px solid $border-list-color;
  }

  .onlineUserContainer {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 16px;

    .searchInput {
      width: 232px;
      height: 32px;
      overflow: hidden;
      border-radius: 16px;
      background-color: #f5f5f5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 16px;

      /deep/.ant-input-affix-wrapper {
        width: 180px;
        height: 100%;
        .ant-input-suffix {
          right: 0px;
        }
      }

      /deep/.ant-input {
        background: none;
        border: none;
        width: 190px;
        height: 100%;
        padding: 0 20px 0 12px;
        line-height: 32px;
        outline: none;
        font-size: 14px;
        color: $font-title-color;
        box-shadow: none;

        &::-webkit-input-placeholder {
          color: #999;
        }
        &::-moz-input-placeholder {
          color: #999;
        }
        &::-ms-input-placeholder {
          color: #999;
        }
      }

      &:active,
      &:hover,
      &:focus-within {
        .searchBtn {
          width: 40px;
          text-align: center;
          background: linear-gradient(
            90deg,
            rgba(29, 180, 254, 1) 0%,
            rgba(2, 140, 255, 1) 100%
          );
          color: #fff;
        }
      }

      .searchBtn {
        width: 30px;
        height: 100%;
        line-height: 32px;
        border-radius: 16px 0 0 16px;
        color: #999;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
      }

      .searchBtnFocus {
        width: 40px;
        text-align: center;
        background: linear-gradient(
          90deg,
          rgba(29, 180, 254, 1) 0%,
          rgba(2, 140, 255, 1) 100%
        );
        color: #fff;
      }
    }

    .listTypeSwitch {
      width: 100%;
      height: 32px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 16px;
      padding: 0 16px;

      .listTypeSwitchChunk {
        width: 74px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 16px;
        background-color: #f5f5f5;
        color: #666;
        font-size: 14px;
        font-weight: 400;
        margin-right: 8px;
        cursor: pointer;

        &.selected {
          background-color: $brand-1;
          font-size: 14px;
          color: $font-link-color;
        }
      }
    }

    .onlineUserList {
      width: 100%;
      height: 672px;
      margin-top: 25px;
      padding-bottom: 18px;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 0 16px;

      &::-webkit-scrollbar {
        width: 6px;
        background-color: #fff;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #ddd;
        border-radius: 4px;
      }

      .onlineUserChunk {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 18px;

        .left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .userHead {
            position: relative;
            width: 30px;
            height: 30px;
            margin-right: 9px;

            &.isStudent {
              cursor: pointer;
            }

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
            .isbanned {
              position: absolute;
              right: -1px;
              bottom: -1px;
              width: 12px;
              height: 12px;
              display: block;
            }
          }
          .userName {
            max-width: 100px;
            font-size: 14px;
            color: $font-title-color;
            font-weight: 400;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .userTypeFlag {
            min-width: 36px;
            height: 20px;
            line-height: 20px;
            box-sizing: border-box;
            padding: 0 6px;
            border-radius: 4px;
            background: linear-gradient(
              90deg,
              rgba(29, 180, 254, 1) 0%,
              rgba(2, 140, 255, 1) 100%
            );
            font-size: 12px;
            font-weight: 400;
            text-align: center;
            color: #fff;
            margin-left: 4px;
          }
        }
        .right {
          .banUserBtn {
            width: 72px;
            height: 28px;
            text-align: center;
            border-radius: 14px;
            font-size: 12px;
            font-weight: 400;
            line-height: 28px;
            cursor: pointer;

            &.banUser {
              background-color: #ffecea;
              color: #ff462d;
              display: none;
            }

            &.freeUser {
              background-color: #f5f5f5;
              color: #666;
            }
          }
        }

        &:hover {
          .right {
            .banUserBtn {
              &.banUser {
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>

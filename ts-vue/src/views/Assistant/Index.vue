<template>
  <Layout>
    <div id="assistant" :style="{'height':containerHeight+'px'}">
      <!-- 加载中 -->
      <div class="loading" v-if="loading">
        <a-spin class="loading-spin" tip="正在初始化">
          <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        </a-spin>
      </div>
      <!-- 圣杯布局 -->
      <div class="assistantContainer">
        <!-- 中部 -->
        <div class="center column">
          <!-- 课程信息 -->
          <div class="subjectInfo">
            <div class="line1">{{planInfo.planName}}</div>
            <div class="line2">
              <div class="teacherImg">
                <img :src="planInfo.banner" alt="老师头像" />
              </div>
              <div class="teacherName">主讲老师：{{planInfo.speaker}}</div>
              <div class="line"></div>
              <div
                class="subjectTime"
              >{{planInfo.startTime|speakTime}}-{{planInfo.endTime|speakTime}}</div>
            </div>
          </div>
          <!-- 播放器 -->
          <div id="polyvLivePlayerContainer"></div>
        </div>
        <!-- 左部 -->
        <div class="left column">
          <div class="componentContainer">
            <!-- 在线学员 -->
            <OnlineUser
              ref="onlineUser"
              :onlineUserList="onlineUserList"
              :bannedUserList="bannedUserList"
              @searchBannedUserList="handleSearchBannedUserList"
              @bannedUser="handleBannedUser"
              @selectStudent="handleSelectQuestion"
            />
          </div>
        </div>
        <!-- 右部 -->
        <div class="right column">
          <div class="componentContainer">
            <!-- 顶部Tab栏 -->
            <div class="chatRoomTopBar">
              <div
                class="chatRoomTopBarLeft chatRoomTopBarTab"
                :class="{'selected':selectedTabName === 'barrage' }"
                @click="handleSwitchTabbar('barrage')"
              >弹幕</div>
              <div
                class="chatRoomTopBarRight chatRoomTopBarTab"
                :class="{'selected':selectedTabName === 'studentQuestion' }"
                @click="handleSwitchTabbar('studentQuestion')"
              >
                提问
                <div class="redpoint" v-show="hasNewQuestion"></div>
              </div>
            </div>
            <div class="chatRoomComponentConatiner">
              <!-- 弹幕组件 -->
              <ChatRoom
                ref="chatRoom"
                :style="{'z-index':selectedTabName === 'barrage' ?'1':'-1'}"
                :speakList="speakList"
                @bannedUser="handleBannedUser"
                @delBarrage="handleDelBarrage"
              />
              <!-- 提问组件 -->
              <StudentQuestion
                ref="studentQuestion"
                :studentQuestionList="studentQuestionList"
                @selectQuestion="handleSelectQuestion"
                :style="{'z-index':selectedTabName === 'studentQuestion' ?'1':'-1'}"
              />
            </div>
            <!-- 消息输入框组件 -->
            <MessageInput
              :teacherAnswerInfo="teacherAnswerInfo"
              @sendMessage="handleSendMessage"
              @sendAnswer="handleSendAnswer"
            />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
<script lang="ts">
import { Component, Vue, Prop, Mixins, Watch } from "vue-property-decorator";
import Layout from "@/components/Layout/Assistant/Index.vue";
import AssistantMixins from "./AssistantMixins";
import ChatRoom from "@/components/Assistant/ChatRoom.vue";
import OnlineUser from "@/components/Assistant/OnlineUser.vue";
import StudentQuestion from "@/components/Assistant/StudentQuestion.vue";
import MessageInput from "@/components/Assistant/MessgeInput.vue";
import Dayjs from "dayjs";

@Component({
  filters: {
    speakTime: (timestamp: string | number | undefined): string => {
      return Dayjs(Number(timestamp) * 1000).format("HH:mm");
    }
  },
  components: {
    Layout,
    OnlineUser,
    StudentQuestion,
    ChatRoom,
    MessageInput
  }
})
export default class Assistant extends Mixins(AssistantMixins) {
  protected containerHeight: number = 969;

  protected hasNewQuestion: boolean = false;

  protected selectedTabName: string = "barrage";

  protected mounted(): void {
    this.containerHeight =
      window.innerHeight -
      document.getElementsByClassName("top")[0].clientHeight;
  }

  protected handleSwitchTabbar(e: string): void {
    this.selectedTabName = e;
    if (e === "studentQuestion") {
      this.hasNewQuestion = false;
    }
  }

  // 监听新提问区消息记录
  @Watch("studentQuestionList")
  protected handleStudentQuestionListChange(): void {
    if (this.selectedTabName === "barrage") {
      this.hasNewQuestion = true;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>

<template>
  <div id="teacherLive">
    <!-- 加载中 -->
    <div class="loading" v-if="loading">
      <a-spin class="loading-spin" tip="正在初始化">
        <a-icon slot="indicator" type="loading" style="font-size: 1rem" spin />
      </a-spin>
    </div>
    <!-- 顶栏 -->
    <TopBar
      :interactionMenuOpenState="interactionMenuOpenState"
      :onlineUserCount="onlineUserList.length"
      :selectedTab="selectedTabName"
      @switchTab="handleSwitchTab"
      @interactionMenuOpenStateChange="handleInteractionMenuOpenStateChange"
    />
    <!-- 容器 -->
    <div
      class="teacherLiveContainer"
      :style="{'height':containerHeight + 'px','transform':interactionMenuOpenState?'translateX(0)':'','transition':interactionMenuClicked?'transform .2s ease-in-out':''}"
    >
      <!-- 互动菜单 -->
      <ul class="interactionMenu">
        <li class="interactionMenuChunk" @click="handleTestClick">
          <img class="interactionMenuChunkImg" src="../../assets/TeacherLive/subject.png" alt="题目" />
          <span class="interactionMenuChunkValue">题目</span>
        </li>
        <li class="interactionMenuChunk" @click="handleRedPacketClick">
          <img
            class="interactionMenuChunkImg"
            src="../../assets/TeacherLive/redPackets.png"
            alt="红包"
          />
          <span class="interactionMenuChunkValue">红包</span>
        </li>
        <li class="interactionMenuChunk" @click="handleRankClick">
          <img class="interactionMenuChunkImg" src="../../assets/TeacherLive/ranking.png" alt="排行" />
          <span class="interactionMenuChunkValue">排行</span>
        </li>
      </ul>
      <!-- 主体 -->
      <div class="teacherLiveMain" @mousedown="handlePageClick">
        <div class="area area-top" :style="{'height':areaTopHeight + 'px'}">
          <!-- 弹幕(聊天内容)组件 -->
          <ChatRoom
            ref="chatRoom"
            :style="{'z-index':selectedTabName === 'barrage' ?'1':'-1'}"
            :speakList="speakList"
          />
          <!-- 在线学员组件 -->
          <OnlineUser
            ref="onlineUser"
            :onlineUserList="onlineUserList"
            :onlineUserListPageCount="onlineUserListPageCount"
            :onlineUserListPageNumber="onlineUserListPageNumber"
            :scrollLoadingFLag="scrollLoadingFLag"
            @getOnlineUserList="handleGetOnlineUserList"
            :style="{'z-index':selectedTabName === 'onlineUser' ?'1':'-1'}"
          />
        </div>
        <!-- 区域高度调节栏 -->
        <div class="sizeControlLine" @mousedown.prevent.stop="handleMouseDown">
          <span></span>
        </div>
        <div class="area area-bottom" :style="{'height':areaBottomHeight + 'px'}">
          <div
            id="area-bottom-container"
            :class="{'animation':!mouseDownFlag}"
            :style="{'height':!teacherAnswerShowStatus ? areaBottomHeight + teacherAnswerHeight +'px': areaBottomHeight+'px'}"
          >
            <!-- 提问区组件 -->
            <StudentQuestion
              ref="studentQuestion"
              :studentQuestionList="studentQuestionList"
              @selectQuestion="handleSelectQuestion"
            />
            <TeacherAnswer
              :teacherAnswerShowStatus="teacherAnswerShowStatus"
              :teacherAnswerInfo="teacherAnswerInfo"
              @sendAnswer="handleSendAnswer"
              @cancelAnswer="handlePageClick"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import TeacherLiveMixins from "./TeacherLiveMixins";
import AreaSizeControlMixins from "./areaSizeControlMixins";
import TopBar from "@/components/TeacherLive/TopBar.vue";
import ChatRoom from "@/components/TeacherLive/ChatRoom.vue";
import OnlineUser from "@/components/TeacherLive/OnlineUser.vue";
import StudentQuestion from "@/components/TeacherLive/StudentQuestion.vue";
import TeacherAnswer from "@/components/TeacherLive/TeacherAnswer.vue";

@Component({
  components: {
    TopBar,
    ChatRoom,
    OnlineUser,
    StudentQuestion,
    TeacherAnswer
  }
})
export default class TeacherLive extends Mixins(
  TeacherLiveMixins,
  AreaSizeControlMixins
) {
  private selectedTabName: string = "barrage"; // 当前所选面板，默认弹幕面板
  private interactionMenuOpenState: boolean = false; // 互动菜单打开状态

  private interactionMenuClicked: boolean = false; // 点击后才添加动画，否则初始化时会有页面抖动

  protected mounted(): void {
    this.$message.config({
      getContainer: () => document.getElementById("teacherLive") as HTMLElement
    });
  }

  protected destroyed(): void {
    this.$message.config({
      getContainer: () => document.body
    });
  }

  private handleSwitchTab(tabName: string): void {
    this.selectedTabName = tabName;
  }

  private handleInteractionMenuOpenStateChange(
    interactionMenuOpenState: boolean
  ): void {
    this.interactionMenuOpenState = interactionMenuOpenState;
    this.interactionMenuClicked = true;
  }

  private handleRedPacketClick(): void {
    this.$message.info("暂未开放");
  }

  private handleTestClick(): void {
    this.$message.info("暂未开放");
  }

  private handleRankClick(): void {
    this.$message.info("暂未开放");
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";

//重置MessageBox样式使其自适应

/deep/.ant-message-notice-content {
  border-radius: 0.04rem;
  padding: 0.15rem 0.26rem;
}

/deep/.anticon {
  font-size: 0.56rem;
  margin-right: 0.2rem;
}

/deep/.ant-message-custom-content {
  font-size: 0.56rem;
}
</style>

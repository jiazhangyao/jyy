<template>
  <div id="teacherLiveTopBar">
    <!-- 互动菜单按钮 -->
    <div
      class="interactionMenuBtn iconfont"
      @click="handleInteractionMenuBtnClick"
    >{{interactionMenuOpenState?'&#xe674;':'&#xe676;'}}</div>
    <div
      class="tabSwitchBtn barrage"
      :class="{'hover':selectedTab==='barrage'}"
      @click="handleSwitchTab('barrage')"
    >
      弹幕
      <div class="bottomLine" v-show="selectedTab==='barrage'"></div>
    </div>
    <div
      class="tabSwitchBtn onlineUser"
      :class="{'hover':selectedTab==='onlineUser'}"
      @click="handleSwitchTab('onlineUser')"
    >
      在线学员({{onlineUserCount}})
      <div class="bottomLine" v-show="selectedTab==='onlineUser'"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class TopBar extends Vue {
  @Prop({ default: 1 }) public onlineUserCount!: number;
  @Prop({ default: "barrage" }) public selectedTab!: string;
  @Prop({ default: false }) public interactionMenuOpenState!: boolean;

  @Emit("switchTab")
  private handleSwitchTab(tabName: string): string {
    return tabName;
  }

  @Emit("interactionMenuOpenStateChange")
  private handleInteractionMenuBtnClick(): boolean {
    return !this.interactionMenuOpenState;
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";

$height: 1.3rem;

#teacherLiveTopBar {
  width: 100%;
  height: $height;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  cursor: pointer;
  user-select: none!important;

  div {
    height: 100%;
  }

  .tabSwitchBtn {
    position: relative;
    flex-grow: 1;
    text-align: center;
    line-height: $height;
    font-size: 0.48rem;
    font-weight: 600;

    &.hover {
      color: $brand;
    }

    .bottomLine {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 1.84rem;
      height: 0;
      border-bottom: 0.06rem solid $brand;
    }
  }

  .interactionMenuBtn {
    width: 1.6rem;
    background-color: #f0f2f5;
    font-size: 0.48rem;
    line-height: $height;
    text-align: center;
    color: $font-title-color;
  }
}
</style>

<template>
  <div id="expressPanel">
    <div class="toolMenuBtn" @click.stop="handleshowMainPanel">
      <slot></slot>
    </div>
    <div class="expressMainPanel" v-show="mainPanelShow" @click.stop>
      <span
        v-for="(item,index) in expressList"
        :key="index"
        class="expressChunk"
        :style="{'background-image':'url('+polyvExporessAllPath+')','background-position':'-'+24*index+'px 0'}"
        @click="handleSelectExpress(item)"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import { EXPRESS_LIST, POLYV_EXPRESS_ALL_PATH } from "@/config/express";

@Component
export default class ExpressPanel extends Vue {
  private expressList: typeof EXPRESS_LIST = EXPRESS_LIST;

  private polyvExporessAllPath: typeof POLYV_EXPRESS_ALL_PATH = POLYV_EXPRESS_ALL_PATH;

  private mainPanelShow: boolean = false;

  private mounted(): void {}

  private handleshowMainPanel(): void {
    this.mainPanelShow = !this.mainPanelShow;
    if (this.mainPanelShow === true) {
      document.addEventListener('click', this.handleshowMainPanel);
    } else {
      document.removeEventListener('click', this.handleshowMainPanel);
    }
  }



  @Emit("selectExpress")
  private handleSelectExpress(expressString: string): string {
    return expressString;
  }
}
</script>
<style lang="scss" scoped>
#expressPanel {
  position: relative;
  display: block;
  width: 24px;
  height: 24px;

  $main_panel_width: 280px;
  $main_panel_height: 150px;

  .toolMenuBtn {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .expressMainPanel {
    position: absolute;
    left: 0;
    top: -10-$main_panel_height;
    width: $main_panel_width;
    height: $main_panel_height;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 4px;
    box-shadow: 0px 2px 8px 0px rgba(0, 21, 41, 0.12);

    .expressChunk {
      display: block;
      margin: 5px;
      width: 24px;
      height: 24px;
      box-sizing: content-box;
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
      border-radius: 4px;
      overflow: visible;

      &:hover {
        box-shadow: 1px 1px 1px 1px #ddd;
      }
    }

    &::-webkit-scrollbar {
      width: 6px;
      background-color: #fff;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ddd;
      border-radius: 4px;
    }
  }
}
</style>

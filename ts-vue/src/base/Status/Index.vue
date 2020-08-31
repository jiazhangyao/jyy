<template>
  <span
    slot="status"
    slot-scope="status"
    class="status-ico"
    :class="{'status-ico-small':size==='small'}"
    :style="style"
  >
    <span :style="{'backgroundColor':color}"></span>
    {{text}}
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Bottom extends Vue {
  @Prop({ default: "normal" }) private size!: "normal" | "small";
  @Prop({ default: "#0CCE8F" }) private color!: string;
  @Prop({ default: "#E6FAF3" }) private backGroundColor!: string;
  @Prop({ default: "启用" }) private text!: string;
  @Prop({ default: 62 }) private width!: number;

  get style(): any {
    return `color:${this.color};background-color: ${this.backGroundColor};width:${this.width}px;`;
  }
}
</script>

<style lang="scss" scoped>
.status-ico {
  display: flex;
  justify-content: center;
  align-items: center;
  word-wrap: break-word;
  text-align: right;
  position: relative;
  color: #0cce8f;
  background-color: #e6faf3;
  border-radius: 20px;
  font-size: 14px;
  box-sizing: border-box;
  height: 22px;
  font-weight: 500;
  padding: 0 8px 0 8px;

  span {
    display: block;
    border-radius: 50%;
    overflow: hidden;
    width: 4px;
    height: 4px;
    margin-right: 4px;
  }

  &.status-ico-small {
    font-size: 12px;
    text-align: center;
    padding: 0 10px 0 8px;
  }
}
</style>

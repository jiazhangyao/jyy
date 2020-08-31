<template>
  <div id="teacherAnswer" @click.stop @mousedown.stop>
    <div class="answerContentContainer">
      <span class="head">{{valueHead}}</span>
      <span id="teacherAnswerMain" contenteditable="true" @keydown.delete="handleTeacherDelValue"></span>
    </div>
    <button class="answerBtn" @click="handleSubmit">发送</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class TeacherAnswer extends Vue {
  @Prop({ default: false }) public teacherAnswerShowStatus!: boolean;
  @Prop({ default: {} }) public teacherAnswerInfo!: any;

  // 标记是否为回复指定学生
  private answerTargetStudent: boolean = true;
  // 输入框回复xx 文本
  private valueHead: string = "";

  @Watch("teacherAnswerInfo")
  private handleTeacherAnswerInfoChange(): void {
    this.valueHead = `回复${
      this.teacherAnswerInfo.user !== undefined &&
      typeof this.teacherAnswerInfo.user.nick === "string"
        ? this.teacherAnswerInfo.user.nick
        : ""
    }：`;
    this.answerTargetStudent = true;
  }

  @Emit("sendAnswer")
  private handleSubmit(): any {
    return {
      s_userId: this.answerTargetStudent ? this.teacherAnswerInfo.user.userId : null,
      content: (document.getElementById("teacherAnswerMain") as Element)
        .innerHTML
    };
  }

  private handleTeacherDelValue(e: Event): any {
    console.log(e);
    const value: string = (document.getElementById(
      "teacherAnswerMain"
    ) as HTMLElement).innerHTML;
    if (typeof value !== "string" || value === "") {
      this.answerTargetStudent = false;
      this.valueHead = '';
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";

#teacherAnswer {
  position: relative;
  width: 100%;
  background-color: #fff;
  z-index: 2;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0.32rem 0.56rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .answerContentContainer {
    width: 7.2rem;
    max-height: 3.46rem;
    min-height: 0.96rem;
    background: rgba(248, 248, 248, 1);
    border-radius: 0.12rem;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 0.54rem;
    line-height: 0.72rem;
    box-sizing: border-box;
    padding: 0.09rem 0.4rem;
    @include clearfix();

    .head {
      display: block;
      float: left;
      color: $font-secondary-color;
    }

    #teacherAnswerMain {
      display: block;
      white-space: pre-wrap;
      caret-color: $brand;

      &:focus {
        outline: none;
      }
    }

    &::-webkit-scrollbar {
      width: 0.16rem;
      background-color: rgba(0, 0, 0, 0.05);
    }

    &::-webkit-scrollbar-thumb {
      background-color: $brand;
      border-radius: 0.1rem;
    }
  }
  .answerBtn {
    width: 2rem;
    height: 0.96rem;
    background-color: $brand;
    border-radius: 0.04rem;
    font-size: 0.48rem;
    line-height: 0.96rem;
    text-align: center;
    color: #fff;
  }
}
</style>

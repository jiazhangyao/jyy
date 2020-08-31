<template>
  <div id="teacherAnswer" @click.stop @mousedown.stop>
    <template v-if="teacherAnswerInfo.user!== undefined">
      <div class="teacherAnswerQuestionInfo">
        <span
          class="teacherAnswerQuestionInfoDetail"
          v-if="typeof teacherAnswerInfo.content === 'string'"
        >
          {{teacherAnswerInfo.user.nick + '：'}}
          <span v-html="teacherAnswerInfo.content"></span>
        </span>
        <span class="teacherAnswerQuestionInfoDetail" v-else>回复：{{teacherAnswerInfo.user.nick}}</span>
        <span class="iconfont cancel" @click="handleCancelAnswer">&#xe664;</span>
      </div>
    </template>
    <div class="answerContentContainer">
      <a-input
        type="textarea"
        max-length="300"
        class="answerContentInput"
        v-model="answerContent"
        :autosize="{maxRows: 3}"
      ></a-input>
      <button class="answerBtn" @click="handleSubmit">发送</button>
    </div>
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
  // 回复文本
  private answerContent: string = "";

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
    const value: string = this.answerContent;
    this.answerContent = "";
    return {
      s_userId: this.answerTargetStudent
        ? this.teacherAnswerInfo.user.userId
        : null,
      content: value
    };
  }

  @Emit("cancelAnswer")
  private handleCancelAnswer(): boolean {
    return true;
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";

#teacherAnswer {
  position: relative;
  width: 100%;

  .teacherAnswerQuestionInfo {
    $height: 0.96rem;
    width: 100%;
    height: $height;
    background-color: #f5f5f5;
    font-size: 0.48rem;
    color: #999999;
    line-height: 0.96rem;
    padding: 0 0.56rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-top: 0.02rem solid $border-list-color;

    .teacherAnswerQuestionInfoDetail {
      width: 8.72rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      /deep/.express_img {
        width: 0.64rem;
        height: 0.64rem;
        vertical-align: text-bottom;
      }
    }
    .cancel {
      margin-left: 0.48rem;
      font-size: 0.48rem;
      cursor: pointer;
    }
  }
  .answerContentContainer {
    width: 100%;
    background-color: #fff;
    z-index: 2;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0.32rem 0.56rem;
    border-top: 0.02rem solid $border-list-color;

    .answerContentInput {
      width: 100%;
      max-height: 2.16rem;
      overflow-x: hidden;
      overflow-y: auto;
      resize: none;
      // background: rgba(248, 248, 248, 1);
      overflow: auto;
      word-break: break-all;
      font-size: 0.54rem;
      line-height: 0.75rem;
      margin-top: 0.05rem;
      box-sizing: border-box;
      border: 0;
      padding: 0;
      box-shadow: none;
      outline: none;
      @include clearfix();

      &::-webkit-scrollbar {
        width: 0.16rem;
        // background-color: rgba(0, 0, 0, 0.05);
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
      border-radius: 0.48rem;
      font-size: 0.48rem;
      line-height: 0.96rem;
      text-align: center;
      color: #fff;
      margin-top: 0.3rem;
      float: right;
    }
    @include clearfix();
  }
}
</style>

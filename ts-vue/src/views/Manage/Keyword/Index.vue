<template>
  <div class="manage-keyword">
    <div class="left font-14pt-title">敏感词：</div>
    <div class="right">
      <a-textarea
        class="keyword-textarea"
        :rows="9"
        v-model="keyWord"
        @change="handleKeyWordChange"
      />
      <div class="keyword-count font-12pt-body">共{{keyWordList.length}}个</div>
      <a-button type="primary" @click="handleSubmit">提交</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getKeyWords, saveKeyWords } from "@/server/Manage/index";

@Component
export default class Keyword extends Vue {
  // 频道ID
  private roomId: number = 0; // 520186
  // 分隔符
  private character: string = "，";
  // 敏感词
  private keyWord: string = "";
  // 敏感词数组
  private keyWordList: string[] = [];

  private mounted(): void {
    if (
      this.$route.query.roomId !== undefined &&
      this.$route.query.roomId !== ""
    ) {
      this.$route.query.roomId &&
        (this.roomId = Number(this.$route.query.roomId));

      getKeyWords(this.roomId).then(res => {
        // console.log(res);
        if (res.data.errcode === "0") {
          this.keyWordList = res.data.retval.sensitives;
          this.keyWord = res.data.retval.sensitives.join(this.character);
        } else {
          this.$message.error("查询敏感词失败");
        }
      });
    } else {
      this.$message.error("没有频道id!");
      return;
    }
  }

  private handleKeyWordChange(): void {
    this.keyWordList = this.keyWord.split(this.character);
    if (
      typeof this.keyWordList[this.keyWordList.length - 1] !== "string" ||
      this.keyWordList[this.keyWordList.length - 1] === ""
    ) {
      this.keyWordList.pop();
    }
    // console.log(this.keyWordList, this.keyWord);
  }

  private handleSubmit(e: Event): void {
    saveKeyWords(this.roomId, this.keyWordList).then(res => {
      if (res.data.errcode === "0") {
        this.$message.success("保存成功");
      }
    });
  }
}
</script>
<style lang="scss" scoped>
@import "../../../common/sass/function";
@import "../../../common/sass/variable";
.manage-keyword {
  width: 100%;
  margin-top: 8px;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  .left {
    width: 86px;
    padding-top: 5px;
    text-align: right;
  }
  .right {
    .keyword-textarea {
      width: 540px;
    }
    .keyword-count {
      margin-top: 12px;
      margin-bottom: 32px;
    }
  }
}
</style>

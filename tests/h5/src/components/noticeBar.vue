<template>
  <div
    class="notice-bar"
    :class="{reason:mode==='reason',tips:mode==='tips',warn:mode==='warn'}"
    v-if="visible"
  >
    <div class="des">
      <i v-if="mode==='warn'" class="icon iconfont icondelete_ic"></i>
      <i v-if="mode!=='warn'" class="icon iconfont iconiconfont_rlsb_not"></i>
      <span>{{text}}</span>
    </div>
    <div class="close" v-if="hasClose">
      <i class="icon iconfont iconicon_close" @click="closeNotice"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "noticeBar",
  props: {
    text: String,
    mode: {
      type: String,
      required: true,
      default: "tips"
    },
    hasClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: true
    };
  },
  methods: {
    closeNotice() {
      this.visible = false;
    }
  }
};
</script>

<style scoped lang="less">
.notice-bar {
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 32px;
  &.reason {
    .des {
      i {
        color: #0061ff;
      }
    }
    background: rgba(78, 96, 255, 0.06);
    border-top: 1px solid rgba(78, 96, 255, 0.5);
    border-bottom: 1px solid rgba(78, 96, 255, 0.5);
  }
  &.tips {
    background: rgba(255, 168, 0, 0.06);
    border-top: 1px solid rgba(255, 168, 0, 0.5);
    border-bottom: 1px solid rgba(255, 168, 0, 0.5);
  }
  &.warn {
    background: rgba(245, 34, 45, 0.06);
    border: 1px solid rgba(245, 34, 45, 0.5);
    .des {
      i {
        color: #ff3934;
      }
    }
  }
  .des {
    color: #0f213e;
    span {
      font-size: 12px;
    }
    i {
      font-size: 14px;
      color: #ffbf00;
    }
  }
  .close {
    i {
      font-size: 20px;
      color: #aab0b9;
    }
  }
}
</style>
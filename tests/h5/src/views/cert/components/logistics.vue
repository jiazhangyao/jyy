<template>
  <div>
    <div class="cert-detail-step pr">
      <div class="pr" v-for="(item,index) in LogisticsData" :key="index">
        <div class="cert-detail-step-title" v-if="item.logisticsState!=4">{{item.logisticsStateDsc}}</div>
        <div>{{item.address}}</div>
        <div class="time" v-if="item.logisticsState!=4">
          <div>{{item.time}}</div>
          <div>{{item.date}}</div>
        </div>
        <div
          class="tag"
          :class="item.logisticsState==currentState?'doing tag-' + index : 'tag-' + index"
        >{{item.logisticsStateLeftDsc}}</div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "logistics",
  props: {
    LogisticsData: {
      type: Array,
      required: true,
      default: []
    },
    currentState: {
      type: String,
      required: true,
      default: 2
    }
  },
  data() {
    return {
      title: "出证物流查询"
    };
  },
  mounted() {},
  computed: {}
};
</script>
<style lang="less" scoped>
.cert-detail-step {
  text-align: left;
  margin: 32px 25px;
  padding-left: 66px;
  color: #666;
  font-size: 12px;
  &-title {
    font-weight: bold;
    color: #333;
    margin-top: 32px;
    margin-bottom: 8px;
    &.gray {
      color: #666;
    }
  }
  .time {
    position: absolute;
    left: -66px;
    top: 14px;
  }
  .line {
    height: calc(100% - 16px);
    position: absolute;
    top: 8px;
    left: 46px;
    width: 1Px;
    background: #e1e1e1;
  }
  .tag {
    width: 18px;
    height: 18px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    font-size: 12px;
    background: #ccc;
    position: absolute;
    left: -28px;
    z-index: 2;

    &.doing {
      background: #0061ff;
    }
  }
  .tag-0 {
    top: 0;
  }
  .tag-1 {
    top: 20px;
  }
  .tag-2 {
    bottom: 0;
  }
}
</style>

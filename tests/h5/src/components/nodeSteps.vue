<template>
  <div class="node-steps-wrap">
    <div v-for="(item, index) in nodes" :key="'node'+index">
      <div
        v-if="index!=0"
        :class="[{done: getStatus(item)==2,ing:getStatus(item)==1,todo:getStatus(item)==0}]"
        class="node-steps-line"
      ></div>
      <div v-if="item.lineNodes">
        <div
          :class="[{done: item.lineNodes[0][0].status==2,ing:item.lineNodes[0][0].status==1,todo:item.lineNodes[0][0].status==0}]"
          class="node-steps-line align"
        ></div>
        <div class="sub-wrap">
          <div
            v-for="(itemNode,nodeIndex) in item.lineNodes"
            :key="'itemNode'+nodeIndex"
            :class="[{done: itemNode[0].status==2,ing:itemNode[0].status==1,todo:itemNode[0].status==0}]"
            class="node-steps-node sub"
          >{{itemNode[0].title}}</div>
        </div>
        <div
          :class="[{done: item.lineNodes[0][0].status==2,ing:item.lineNodes[0][0].status==1,todo:item.lineNodes[0][0].status==0}]"
          class="node-steps-line align"
        ></div>
      </div>
      <div
        v-else
        :class="[{done: item.status==2|| item.lineNodes&&item.lineNodes[0][0]==2,ing:item.status==1,todo:item.status==0}]"
        class="node-steps-node"
      >{{item.title}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nodeSteps",
  components: {},
  props: {
    nodes: {
      default: () => []
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    // 画线，有linenode就是双线乡下
    getStatus(item) {
      if ([0, 1, 2].indexOf(item.status) > -1) {
        return item.status;
      } else if (item.lineNodes[0]) {
        return item.lineNodes[0][0].status;
      } else {
        console.log("TODO print by jxl  check value", item);
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less">
.node-steps {
  &-wrap {
    width: 300px;
    margin: auto;
    .sub-wrap {
      display: flex;
      flex-flow: initial;
      justify-content: space-between;
    }
  }

  &-node {
    width: 100px;
    height: 30px;
    line-height: 30px;
    border-radius: 2px;
    font-size: 12px;
    text-align: center;
    margin: auto;
    &.done {
      background: #0061ff;
      color: #ffffff;
    }
    &.ing {
      border: 1Px solid #0061ff;
      color: #0061ff;
    }
    &.todo {
      opacity: 0.5;
      background: #cbd2de;
      color: #000000;
    }
    &.sub {
      margin: 20px 0;
      position: relative;
      &.done,
      &.ing {
        &::before,
        &::after {
          background: #0061ff;
        }
      }
      &.todo {
        &::before,
        &::after {
          background: #e5e8ee;
        }
      }
      &::before,
      &::after {
        content: "";
        width: 1Px;
        height: 20px;
        display: inline-block;
        position: absolute;
        left: 50%;
      }
      &::before {
        content: "";
        top: -21px;
      }
      &::after {
        content: "";
        bottom: -21px;
      }
    }
  }
  &-line {
    width: 1Px;
    height: 40px;
    margin: auto;
    &.done,
    &.ing {
      background: #0061ff;
    }
    &.todo {
      background: #e5e8ee;
    }
    &.align {
      width: 201px;
      height: 1Px;

      position: relative;
      left: 1Px;
    }
  }
}
</style>



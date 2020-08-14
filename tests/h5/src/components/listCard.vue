<!--
 * @Description: 列表页，方法在mixin的listCard文件中
 * @Autor: jixuelian
 * @Date: 2019-06-17 16:58:02
 -->
<template>
  <div>
    <List
      class="list-card"
      v-if="list.length>0"
      v-model="loading"
      :finished="finished"
      :finished-text="finishedText"
      @load="onLoad"
    >
      <div
        class="list-card-item"
        @click="onItemClick(item)"
        v-for="(item, index) in list"
        :key="index"
      >
        <header>
          <slot name="header" v-bind="item"></slot>
        </header>
        <main>
          <slot name="content" v-bind="item"></slot>
        </main>
        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>
    </List>
    <Empty v-if="list.length==0" />
  </div>
</template>

<script>
import Empty from "@/components/empty.vue";
import { List } from "vant";
export default {
  data() {
    return {
      loading: this.pageLoading
    };
  },
  props: {
    // 列表数据
    list: {
      type: Array,
      default: []
    },
    // 是否所有数据都获取到了
    finished: {
      type: Boolean,
      default: false
    },
    // 是否在请求加载中
    pageLoading: {
      type: Boolean,
      default: true
    },
    // 所有数据都获取到的提示文字
    finishedText: {
      type: String,
      default: "没有更多了"
    },
    // 请求加载的函数
    onLoad: {
      type: Function,
      default: () => {}
    },
    // 列表某项被点击的事件
    onItemClick: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    List,
    Empty
  },
  watch: {
    pageLoading(v) {
      this.loading = v;
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.list-card {
  &-item {
    text-align: left;
    width: 343px;
    margin: 0 auto;
    font-size: 14px;
    color: #0f213e;
    margin-top: 16px;
    border-radius: 4px;
    border: 1Px solid #cbd2de;
    padding-bottom: 20px;
    header {
      font-size: 12px;
      background: rgba(203, 210, 222, 0.2);
      padding: 12px;
    }
    main {
      padding-left: 13px;
      margin-top: 16px;
    }
  }
}
</style>
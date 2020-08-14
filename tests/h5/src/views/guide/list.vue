<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="guide">
      <div v-if="data.length>0">
        <List
          class="water-list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <router-link :to="'/guide/detail/'+item.id" v-for="item in data" :key="item.id">
            <div class="guide-item half-bottom-border pr">
              <div class="guide-header">
                <div class="guide-title">{{item.title}}</div>
                <div class="guide-content overText-2" v-html="removeHtml(item.content)"></div>
              </div>
              <div class="guide-img" v-if="getImgUrl(item.content)">
                <img :src="getImgUrl(item.content)">
              </div>
            </div>
          </router-link>
        </List>
      </div>

      <Empty v-else/>
    </div>
  </div>
</template>

<script>
//attation,这里没有分页
import FullButton from "@/components/fullButton.vue";
import Empty from "@/components/empty.vue";
import { getList } from "@/service/guide";
import { List, Toast } from "vant";
import { GetHtmlImageUrlList, htmlRemoverImage } from "../../utils/utils";
export default {
  name: "guide-list",

  data() {
    return {
      title: "业务办事指南",
      finished: true,
      loading: false,
      data: []
    };
  },
  computed: {},
  mounted() {
    getList().then(res => {
      if (res.success) {
        this.data = res.data.list;
      } else {
        Toast(res.msg || "请求失败");
      }
    });
  },
  components: {
    FullButton,
    List,
    Empty
  },
  methods: {
    onLoad() {
      console.log("loading");
    },
    getImgUrl(data) {
      console.log(GetHtmlImageUrlList(data));
      return GetHtmlImageUrlList(data) ? GetHtmlImageUrlList(data) : "";
    },
    removeHtml(data) {
      console.log(htmlRemoverImage(data));
      return htmlRemoverImage(data);
    }
  }
};
</script>

<style lang="less" scoped>
.guide {
  &-item {
    display: flex;
    text-align: left;
    padding: 16px;
    color: #333;
    justify-content: space-between;
  }
  &-title {
    font-size: 16px;
    font-weight: bold;
  }
  &-content {
    font-size: 12px;
    line-height: 24px;
    margin-top: 8px;
    overflow: hidden;
  }
  &-header {
    margin-right: 12px;
    flex: 1;
  }
  .overText-2 {
    height: 48px;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis; //文本溢出显示省略号
  }
  &-img {
    min-width: 106px;
    max-width: 106px;
    width: 106px;
    height: 78px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
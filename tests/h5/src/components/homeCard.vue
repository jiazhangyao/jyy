<template>
  <div class="home-card">
    <div class="title">{{name}}</div>
    <div class="home-card-content">
      <div @click="travel(item)" v-for="(item, index) in data" :key="index">
        <div>
          <img :src="item.logoUrl" />
        </div>
        <div>{{item.name || ''}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeCard",
  props: {
    name: {
      type: String,
      default: "标题"
    },
    data: {
      type: Array,
      default: () => [{}]
    }
  },
  methods: {
    travel(item) {
      if (item.judgeHref instanceof Function) {
        var res = item.judgeHref(item);
        if (res instanceof String) {
          this.$router.push(res);
        } else if (typeof res ==="boolean" && res) {
          this.$router.push(item.url);
        }
      } else if (typeof item.url === "string") {
        this.$router.push(item);
      } else {
        throw `HomeCard  ${item.name}的 url:String 和 judgeHref:Function 不可同时为空`;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  text-align: left;
  font-weight: bold;
  color: #0f213e;
  font-size: 16px;
}
.home-card {
  padding: 0 20px;
  margin-top: 15px;
}
.home-card-content {
  margin: 0 -4px;
  text-align: left;
  & > div {
    border-radius: 4px;
    width: 30%;
    padding: 12px 16px;
    display: inline-block;
    color: #333;
    font-size: 12px;
    text-align: center;
    margin: 16px 4px 0 4px;
    background: #f5f7fe;
    img {
      width: auto;
      height: 36px;
      margin-bottom: 10px;
    }
  }
}
</style>
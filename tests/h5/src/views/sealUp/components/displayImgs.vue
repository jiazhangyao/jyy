<template>
  <section class="display-imgs-wrap" :class="wrapClass">
    <div class="imgs-wrap">
      <h3 class="title">{{title}}</h3>
      <div v-for="(item, index) in imgsData" :key="index" class="img">
        <img :src="fileHost +'/'+item.key+'.'+item.ext" :alt="fileHost +'/'+item.key+'.'+item.ext" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fileHost: "/web/api/file"
    }
  },
  props: {
      imgsData: {
        type: Array
      },
      title: {
        type: String,
        default: '附件信息'
      }
  }
};
</script>
<style lang='less' scoped>
.display-imgs-wrap {
  padding: 16px;

  .imgs-wrap {
    background-color: #fff;
    padding: 16px;

    .title {
      font-size: 14px;
      color: #333;
      padding-bottom: 14px;
    }

    .img {
      display: inline-block;
      width: 147px;
      height: 110px;
      margin-right: 16px;
      margin-bottom: 16px;
      border-radius: 4px;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }

      &:nth-child(2n + 1) {
        margin-right: 0;
      }
    }
  }
}
</style>
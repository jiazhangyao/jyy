<template>
  <section class="display-app-wrap" :class="wrapClass">
    <ul>
      <li v-for="(item, index) in applicantList" :key="index" class="item">
        <div class="tag">{{tit}}{{index + 1}}</div>
        <div class="info">
          <p class="main">
            <span class="name">{{item.name}}</span>
            <span class="mobile">{{item.mobile}}</span>
          </p>
          <p class="other">
            <span class="card-type">{{item.cardTypeDesc}}号</span>
            <span class="card-np">{{item.cardNo}}</span>
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
      applicantList: {
          type: Array
      },
      tit: {
        type: String,
        default: '申请人'
      }
  }
};
</script>
<style lang='less' scoped>
.display-app-wrap {
  padding: 16px;
  padding-bottom: 0;
  
  .item {
    background-color: #fff;
    height: 97px;
    position: relative;
    border-radius: 2px;
    margin-bottom: 16px;
    box-sizing: border-box;
    padding: 20px 16px 24px;

    &:nth-last-child(1) {
      margin-bottom: 0;
    }

    .tag {
      position: absolute;
      right: 16px;
      top: 0;
      height: 30px;
      line-height: 30px;
      background-image: linear-gradient(90deg, #52BAFE 18%, #46CAEB 100%);
      border-radius: 0 0 2px 2px;
      color: #fff;
      padding: 0 20px;
      font-size: 14px;
    }

    p {
      font-size: 14px;
      &:nth-child(1) {
        margin-bottom: 8px;
      }
    }

    .name {
      font-size: 18px;
    }

    .mobile,
    .card-type {
      color: #999;
    }

    .name,
    .card-no {
      color: #333;
      font-weight: bold;
    }
  }
}
</style>
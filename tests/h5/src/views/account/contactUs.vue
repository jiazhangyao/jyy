<template>
  <div class="contact-us">
    <NavBar navTitle="联系我们" />
    <div class="content">
      <div class="top">
        <img src="@/assets/lxwm.png">
      </div>
      <div class="info">
        <p>地址：鹤岗市北红旗路人民办事中心</p>
        <p>邮编：154108</p>
        <p>咨询电话：0468-6101852</p>
        <p>网址：http://www.hgbdc.org.cn/</p>
      </div>
      <div class="bottom">
        <div>
          <span>点击右上角选择发送朋友或者分享朋友圈，即可分享本条消息。</span>
        </div>
        <img src="@/assets/lxwm.png">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      };
    }
  }
</script>
<style lang="less" scoped>
  .contact-us {
    padding: 16px;

    .top {
      text-align: center;

      img {
        width: 65%;
      }
    }
    
    .info {
      margin-top: 20px;
      color: #333;
      border-top: 1px solid #999;
      padding: 16px 0;
      font-size: 15px;

      p {
        line-height: 30px;
      }
    }

    .bottom {
      margin-top: 20px;
      border-top: 1px solid #999;
      padding: 16px 0;
      display: flex;

      img {
        display: block;
        width: 35%;
      }

      div {
        position: relative;
        width: 65%;
        font-size: 15px;

        span {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
</style>
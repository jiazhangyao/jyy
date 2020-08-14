<template>
  <div class="container">
    <div class="icon"><span class="iconfont iconresult_succeed"></span></div>
    <p class="result">{{result}}</p>
    <p class="tips">{{autoTime}}秒后{{autoText}}</p>
    <van-button type="info" class="btn" @click="jump">{{btnText}}</van-button>
  </div>
</template>
<script>
import { Button } from "vant";
import { setInterval, clearInterval } from 'timers';
export default {
  name: "commonSuccess",
  components: {
    [Button.name]: Button
  },
  props: ["result", "autoText", "btnText", "linkUrl"],
  data(){
    return {
      autoTime: 5,
      timer: ""
    }
  },
  mounted: function(){
    this.timer = setInterval(() => {
      if(this.autoTime > 1){
        this.autoTime --;
      }else{
        clearInterval(this.timer);
        this.autoTime = 5;
        this.$router.push(this.linkUrl)
      }
    }, 1000)
  },
  destroyed: function(){
    clearInterval(this.timer)
  },
  methods: {
    jump(){
      this.$router.push(this.linkUrl);
    }
  }
};
</script>
<style lang="less" scoped>
.container{
  padding: 0 32px;
  text-align: center;
  .icon{
    margin-top: 80px;
    .iconfont{
      font-size: 72px;
      color: #52C41A;
    }
  }
  .result{
    margin-top: 24px;
    font-size: 18px;
    font-weight: bold;
  }
  .tips{
    margin-top: 12px;
    font-size: 14px;
    color: #5D6471
  }
  .btn{
    width: 100%;
    margin-top: 40px;
    font-size: 16px;
  }
}
</style>

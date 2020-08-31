<template>
  <div class="movieitem">
    <div class="img-box">
      <img width="100%" :src="endCourseList.subjectBanner" alt />
    </div>
    <div class="info">
      <div class="info-left">
        <div class="title line-ellipsis">{{endCourseList.planName}}</div>
        <div class="detail">
          <div class="icon_teach">
            <img :src="endCourseList.banner" />
          </div>
          <div class="teach-info">
            <span class="teacher">主讲老师：{{endCourseList.speaker}}</span>
            <span class="settime">设置时间：{{endCourseList.setStartTime | parseDate}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
            <span
              class="setendtime"
            >{{endCourseList.setEndTime | parseDate1}}</span>
            <span class="realtime">实际时间：{{endCourseList.startTime | parseDate}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
            <span
              class="realtime"
            >{{endCourseList.endTime | parseDate1}}</span>
          </div>
        </div>
      </div>

      <div class="info-right">
        <div class="btn">
          <span>直播统计</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import moment from "moment";
@Component({
  components: {},
  filters: {
    parseDate: (time: number) => {
      return moment(new Date(time * 1000)).format("YYYY-MM-DD HH:mm");
    },
    parseDate1: (time: number) => {
      return moment(new Date(time * 1000)).format("HH:mm");
    }
  }
})
export default class Home extends Vue {
  @Prop({}) private endCourseList!: {};

  private mounted(): void {}
}
</script>

<style lang = "scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";

.movieitem {
  height: auto;
  padding-left: 25px;
  margin: 10px 30px;
  border: 1px solid rgba(232, 232, 232, 1);
  padding-top: 20px;
  padding-bottom: 20px;
  .img-box {
    width: 120px;
    height: 90px;
    margin-top: 12px;
    float: left;
    /* background-image: url("../../assets/course/normalcourse.png"); */
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .info {
    height: 114px;
    margin-right: 15px;
    padding: 12px 14px 12px 0;
    margin-left: 86px;
    position: relative;
    .info-left {
      padding-right: 15px;
      margin-left: 60px;
      margin-top: 2px;

      overflow: hidden;
      .title {
        max-height: 24px;
        margin-bottom: 11px;
        padding-bottom: 35px;
        overflow: hidden;
        font-size: 17px;
        color: #333;
        font-weight: 700;
        padding-right: 5px;
        flex-shrink: 1;
      }
      .actor {
        white-space: nowrap;
      }
      .detail {
        box-sizing: border-box;
        line-height: 1;
        clear: both;
        font-size: 13px;
        /* .count {
          font-size: 13px;
          color: #666;
          .sc {
            font-weight: 700;
            color: #faaf00;
            font-size: 15px;
          }
        } */
      }
    }
    .info-right {
      height: 100%;
      font-size: 12px;
      position: absolute;
      right: 100px;
      top: 12;
      bottom: 0;
      margin: auto;
      width: 47px;
      .btn {
        position: absolute;
        left: -15px;
        top: 40px;
        bottom: 0;
        right: 200px;
        width: 110px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        vertical-align: middle;
        box-sizing: border-box;
        background: rgba(0, 152, 255, 1);
        border-radius: 4px;
        color: #fff;
        white-space: nowrap;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
  .icon_teach {
    width: 50px;
    height: 50px;
    background-color: #fff;
    float: left;
    margin-bottom: 15px;
    margin-top: -10px;
    margin-left: -11px;
    box-sizing: border-box;
    img {
      display: block;
      border-radius: 50%;
      margin: 0 auto;
      width: 100%;
      height: 100%;
      transform: scale(0.5, 0.5);
    }
  }
  .teach-info{
    padding-top:8px;
  }
}
.teacher {
  padding-right: 15px;
}
.settime {
  border-left: 2px solid rgba(232, 232, 232, 1);
  padding-left: 15px;
}
.setendtime {
  padding-right: 25px;
}
</style>
<template>
  <div class="movieitem">
    <div class="img-box">
      <img width="100%" :src="courseData.subjectBanner" alt />
    </div>
    <div class="info">
      <div class="info-left">
        <div class="title line-ellipsis">{{courseData.planName}}</div>
        <div class="detail">
          <div class="icon_teach">
            <img :src="courseData.banner" />
          </div>
          <div class="teach-info">
            <span class="teacher">主讲老师：{{courseData.speaker}}</span>
            <span class="settime">{{courseData.stringStartTime}}</span>
            -
            <span class="realtime">{{courseData.stringEndTime}}</span>
          </div>
        </div>
      </div>

      <div class="info-right">
        <router-link
          :to=" {name:'manageKeyword',
          query:{courseTitle:courseData.planName,
                roomId:courseData.channelId,
                subjectId: courseData.subjectId,
                planId: courseData.planId },
         }"
        >
          <div class="btn-manage">
            <span>管理</span>
          </div>
        </router-link>
        <div class="btn-answer">
          <span>在线答题</span>
        </div>
        <div class="live-time">
          <div class="btn—nobegin" v-if="courseData.setStartTime-new Date().getTime()/1000>0">
            <span>未开始</span>
            <div class="timer" ref="timer">
              <img src="../../assets/course/timer.png" />
              <span class="font-timer">{{hours}}:{{minutes}}:{{seconds}}</span>
            </div>
          </div>
          <div
            class="btn—live"
            @click="toLivepage(courseData)"
            v-else-if="new Date().getTime()/1000-courseData.setStartTime>0"
          >
            <span>进入直播间</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import moment from "moment";
import { getTimeDiff } from "@/common/js/unit/unit";
import { login } from "../../server/login";
@Component({
  components: {},
  filters: {
    parseDate: (time: number) => {
      return moment(new Date(time * 1000)).format(" HH:mm");
    }
  }
})
export default class Home extends Vue {
  @Prop({ default: {} }) private courseData!: any;
  private starttime: number = 0;
  private endtime: number = 0;
  private hours: any = 0; // 小时
  private minutes: any = 30; // 分钟
  private seconds: any = 0; // 秒
  private h: number = 0; // 秒
  private _interval: any = "";
  private msec: number = 0; // 30分钟换算成1800秒
  private datetimestamp: number = 0; // 当前时间戳

  // 角色 SPEAKER 主讲老师; HELPER 辅导老师; OTHER 其他
  // planId课时ID，subjectId课程id,channelId频道号

  private toLivepage(row: any): void {
    if (this.$store.state.userInfo.role === "SPEAKER") {
      this.$router.push({
        path: "/teacherLive",
        query: {
          roomId: row.channelId,
          subjectId: row.subjectId,
          planId: row.planId
        }
      });
    } else {
      this.$router.push({
        path: "/assistant",
        query: {
          roomId: row.channelId,
          subjectId: row.subjectId,
          planId: row.planId
        }
      });
    }
  }

  private mounted(): void {
    this.datetimestamp = Math.round(new Date().getTime() / 1000); // 当前时间戳

    console.log("当前的时间是" + this.datetimestamp);

    if (this.courseData.setStartTime - this.datetimestamp > 0) {
      this.msec = this.courseData.setStartTime - this.datetimestamp;
      this.counttime();
    } else {
      // 直播已经开始了
    }
  }

  private gettime(setStartTime: number): string {
    const getTimetrap = getTimeDiff(this.datetimestamp - setStartTime, 1)
      ? getTimeDiff(this.datetimestamp - setStartTime, 1)
      : "0<em>秒</em>";
    return getTimetrap;
  }
  private counttime(): void {
    console.log("coursedata的时间是s");

    if (this.msec >= 0) {
      const hours = Math.floor(this.msec / 60 / 60);
      const minutes = Math.floor((this.msec / 60) % 60);
      const sec = Math.floor(this.msec % 60);
      this.hours = hours > 9 ? hours : "0" + hours;
      this.minutes = minutes > 9 ? minutes : "0" + minutes;
      this.seconds = sec > 9 ? sec : "0" + sec;
      const that = this;
      this._interval = setTimeout(() => {
        if (this.msec < 0) {
          clearTimeout(that._interval);
          // that.msec = 1800;
        }
        if (this.msec === 0) {
          (that.$refs.timer as HTMLElement).style.display = "none";
          (that.$refs.enterlive as HTMLElement).style.display = "block";
        }
        that.counttime();
        this.msec--;
      }, 1000);
    } else {
      clearTimeout(this._interval);
    }
  }
  private beforeDestroy(): void {
    clearInterval(this._interval);
  }
}
</script>

<style lang = "scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";

.movieitem {
  @include clearfix();
  height: 114px;
  padding-left: 25px;
  margin: 10px 15px;
  border: 1px solid rgba(232, 232, 232, 1);
  border-radius: 4px;
  .img-box {
    width: 120px;
    height: 90px;
    margin-top: 12px;
    float: left;
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
      margin-top: 0px;

      overflow: hidden;
      .title {
        max-height: 24px;
        margin-bottom: 27px;
        font-size: 15px;
        color: #333;
        font-weight: 700;
        padding-right: 5px;
        line-height: 29px;
        flex-shrink: 1;
      }
      .actor {
        white-space: nowrap;
      }
      .detail {
        box-sizing: border-box;
        clear: both;
        font-size: 13px;
        position: relative;
        height: 80px;
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
      .teach-info {
        margin-left: 30px;
        font-size: 14px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 30px;
      }
    }
    .info-right {
      height: 100%;
      font-size: 12px;
      position: absolute;
      right: 150px;
      top: 12;
      bottom: 0;
      margin: auto;
      width: auto;
      box-sizing: border-box;
      .btn-manage {
        margin-right: 15px;
        position: absolute;
        left: -220px;
        top: 36px;
        bottom: 0;
        right: 10;
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        vertical-align: middle;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(0, 152, 255, 1);
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(0, 152, 255, 1);
        white-space: nowrap;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
      }
      .btn-answer {
        position: absolute;
        left: -110px;
        top: 36px;
        bottom: 80px;
        right: -163px;
        width: 110px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        vertical-align: middle;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(0, 152, 255, 1);
        color: rgba(0, 152, 255, 1);
        white-space: nowrap;
        font-size: 16px;
        white-space: nowrap;
        font-size: 16px;
        cursor: pointer;
      }
      .btn—live {
        position: absolute;
        left: 24px;
        top: 36px;
        bottom: 0;
        right: 0;
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
        font-size: 14px;
        cursor: pointer;
      }
      .btn—nobegin {
        display: block;
        position: absolute;
        left: 24px;
        top: 36px;
        bottom: 0;
        right: 0;
        width: 110px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.04);
        border: 1px solid rgba(217, 217, 217, 1);
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.25);
        white-space: nowrap;
        font-size: 14px;
        cursor: pointer;
      }
      .btn—nobegin-timer {
        display: block;
        position: absolute;
        left: 24px;
        top: 36px;
        bottom: 0;
        right: 0;
        width: 110px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.25);
        white-space: nowrap;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
.teacher {
  padding-right: 15px;
}
.settime {
  border-left: 2px solid rgba(232, 232, 232, 1);
  padding-left: 15px;
}
.live-time {
  position: relative;

  .timer {
    position: absolute;
    right: 100px;
    top: 47px;
    left: 20px;
    width: 80px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 152, 255, 1);
    line-height: 20px;
    img {
      display: block;
      margin-left: -5px;
      width: 15px;
      height: 15px;
    }
    .font-timer {
      display: block;
      position: absolute;
      top: -2px;
      left: 14px;
      height: 20px;
      line-height: 20px;
      width: 50px;
    }
  }
}
</style>
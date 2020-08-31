<template>
  <Layout>
    <div class="census">
      <div class="container">
        <div class="course-date">
          <div
            tabindex="1"
            v-for="(date,index) in numdata"
            :key="index"
            @mouseenter="mouseEnter(index)"
            @mouseout="mouseOut(index)"
            class="date-item"
            :class="adjust === index ? 'date-item-prev': 'date-item-after'"
            @click="getcouseList(index,date.timestamp)"
          >
            <div v-if="date.stringDate.match(RegExp(/今天/))" class="square">
              <div class="triangle"></div>
            </div>
            <div class="dateweek">
              <span class="stringdate">{{date.stringDate.slice(0,-4)}}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                class="stringweek"
              >{{date.stringDate.slice(-4)}}</span>
            </div>
            <br />
            <div>
              <span class="course-num">{{date.total}}节课</span>
            </div>
          </div>
          <div class="finish-course">
            <router-link to="/historyCourse">
              <span class="endfont">已结束</span>
              <br />
              <span class="coursefont">课程</span>
              <img src="../../assets/course/right.png" alt />
            </router-link>
          </div>
        </div>

        <div class="moviebox">
          <div v-show="courseList.length===0">
            <img class="nodata" src="../../assets/course/nocourse.png" />
          </div>
          <CourseItem v-for="courseData in courseList" :key="courseData" :courseData="courseData"></CourseItem>
        </div>
      </div>
    </div>
  </Layout>
</template>
    
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Layout from "@/components/Layout/Base/Index.vue";
import CourseItem from "./CourseItem.vue";
import { getCourseList, getCourseTotal } from "@/server/Course/index.ts";
import moment from "moment";
@Component({
  components: {
    Layout,
    CourseItem
  }
})
export default class Home extends Vue {
  private courseDate: string = "";
  private data: any[] = [];
  private getDatelIst: any[] = [];
  private numdata: any[] = [];
  private courseList: any[] = [];
  private id: number = 0;
  private activeClass: number = 0;
  private datetimestamp: number = 0;
  private adjust: number = 0;

  private mounted(): void {
    this.list();
    this.id = this.$store.state.userInfo.id;
  }

  private mouseEnter(index: number): void {
    this.adjust = index;
  }

  private mouseOut(index: number) {
    this.adjust = index;
  }

  private list(): void {
    getCourseTotal(this.$store.state.userInfo.id)
      .then(res => {
        this.numdata = res.data.retval;
        this.datetimestamp = this.numdata[0].timestamp;
        this.getcouseList(0, this.datetimestamp);
      })
      .catch(err => {
        this.$message.error(err.data.errmsg);
      });
  }

  // 获取课程列表 :class="activeClass===0?active:''"
  private getcouseList(index: number, timestamp: number): void {
    this.activeClass = index;
    console.log("activeclass" + this.activeClass);
    console.log("index" + index);
    this.datetimestamp = timestamp;
    getCourseList(this.datetimestamp, this.$store.state.userInfo.id)
      .then(res => {
        this.courseList = res.data.retval.planVideoInfos;
      })
      .catch(err => {
        this.$message.error(err.data.errmsg);
      });
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";
.census {
  margin: 12px auto 0 auto;
  width: $page-width;
  height: 988px;
  border: 1px solid rgba(232, 232, 232, 1);
  border-radius: 4px;
  background: #fff;
  padding-left: 12px;
  padding-right: 12px;

  .container {
    border-radius: 4px;
  }

  .course-date {
    @include clearfix();
    margin-top: 30px;
    margin-bottom: 15px;
    height: 110px;
  }

  .date-item {
    width: 132px;
    height: 100px;
    float: left;
    margin-left: 10px;
    display: block;
    text-align: center;
    // background: rgb(248, 248, 248);
    // color: #fff;
    border-radius: 8px;
    outline: none;
    // &:focus {
    //   background: linear-gradient(
    //     90deg,
    //     rgba(29, 180, 254, 1) 0%,
    //     rgba(2, 140, 255, 1) 100%
    //   );
    //   color: rgba(255, 255, 255, 1);
    //   outline: none;
    //   .course-num {
    //     background: linear-gradient(
    //       90deg,
    //       rgba(29, 180, 254, 1) 0%,
    //       rgba(2, 140, 255, 1) 100%
    //     );
    //     color: rgba(255, 255, 255, 1);
    //   }
    // }

    .square {
      position: relative;
      left: 0;
      right: 0;
      right: 10;
      bottom: 3;
    }
    .triangle {
      position: absolute;
      width: 0;
      height: 0;
      border-top: 15px solid rgba(0, 152, 255, 1);
      border-right: 15px solid transparent;
    }
  }

  .date-item-prev {
    background: linear-gradient(
      90deg,
      rgba(29, 180, 254, 1) 0%,
      rgba(2, 140, 255, 1) 100%
    );
    color: rgba(255, 255, 255, 1);
    outline: none;
    .course-num {
      background: linear-gradient(
        90deg,
        rgba(29, 180, 254, 1) 0%,
        rgba(2, 140, 255, 1) 100%
      );
      color: rgba(255, 255, 255, 1);
    }
  }

  .date-item-after {
    background: rgba(248, 248, 248, 1);
    color: rgba(51, 51, 51, 1);
    outline: none;
  }

  .dateweek {
    display: block;
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    margin: auto;
    padding-top: 20px;
  }
  .course-num {
    width: 132px;
    height: 100px;
    float: left;
    text-align: center;
    display: block;
    box-sizing: border-box;
    width: 60px;
    height: 24px;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    margin: auto 35px;
    padding-top: 5px;
  }

  .finish-course {
    position: relative;
    width: 132px;
    height: 100px;
    float: left;
    margin-left: 15px;
    padding-top: 30px;
    display: block;
    text-align: center;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    border: 1px solid rgba(232, 232, 232, 1);
    .endfont {
      margin-top: 7px;
      margin-left: -12px;
      width: 48px;
      height: 48px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .coursefont {
      display: block;
      margin-top: 7px;
      margin-left: 36px;
      text-align: center;
      width: 48px;
      height: 48px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    img {
      position: absolute;
      display: block;
      top: 38px;
      bottom: 130px;
      left: 89px;
      right: 26px;
    }
  }
  .date {
    font-size: 14px;
    font-weight: 500;
  }

  .moviebox {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .nodata {
    display: block;
    margin: 145px auto;
  }
  .change {
    background: blue;
  }
}
</style>

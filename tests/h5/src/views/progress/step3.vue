<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="wrap">
      <div class="bg red"></div>
      <div class="res-wrap">
        <div class="res-top">
          <img src="@/assets/红色.png" v-if="status=='-fail'">
          <img src="@/assets/绿色.png" v-if="status=='-pass'">
          <img src="@/assets/蓝色.png" v-if="status=='-ing'">
          <div class="text" :class="'text'+status">{{data.statusText}}</div>
        </div>
        <div class="content">
          <div>
            <label>工单编号：</label>
            <span>{{data.orderNo}}</span>
          </div>
          <div>
            <label>登记类型：</label>
            <span>{{data.registerType}}</span>
          </div>
          <div>
            <label>权证号：</label>
            <span>{{data.warrantNumber || '-' }}</span>
          </div>
          <div>
            <label>姓名：</label>
            <span>{{data.name}}</span>
          </div>
          <div>
            <label>提交时间：</label>
            <span>{{data.submitTime}}</span>
          </div>
        </div>
        <div class="circle circle-left"></div>
        <div class="circle circle-right"></div>
      </div>
      <router-link to="/">
        <div class="btn">完成</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ProcessQuery } from "@/service/common";
import { Toast } from "vant";
export default {
  data() {
    return {
      data: {},
      title: "业务办理进度查询"
    };
  },
  computed: {
    status() {
      return this.data.statusText == "预审失败"
        ? "-fail"
        : this.data.statusText == "预审通过"
        ? "-pass"
        : "-ing";
    },
    params() {
      return JSON.parse(sessionStorage.getItem("progressParams"));
    }
  },
  created() {
    ProcessQuery(this.params).then(res => {
      if (res.success) {
        this.data = res.data;
      } else {
        Toast(res.msg);
      }
    });
  }
};
</script>

<style lang="less" scoped>
.bg {
  height: 180px;
  position: absolute;

  top: 0;

  width: 100%;
  &.bg-fail {
    background: linear-gradient(to right, #ff5f5d, #ff9d72);
  }
}
.wrap {
  height: calc(100ch - 44px);
  background: #f8f8f8;
  padding-top: 51px;
  position: relative;
}
.res {
  &-wrap {
    border-radius: 8px;
    background: #fff;
    margin: 0 16px;
    position: relative;
  }
}
.res-top {
  height: 155px;
  border-bottom: 2px dashed #e3e3e3;
  text-align: center;

  img {
    width: 68px;

    margin-top: 26px;
  }
  .text {
    margin-top: 16px;

    font-size: 16px;
    font-weight: bold;
    &.text-fail {
      color: #f35552;
    }
    &.text-pass {
      color: #3dc772;
    }
    &.text-ing {
      color: #58b6ff;
    }
  }
}
.content {
  padding-left: 69px;
  padding-top: 37.5px;
  text-align: left;
  padding-bottom: 38px;
  & > div {
    margin-bottom: 12px;
    position: relative;
    padding-left: 77px;
    label {
      width: 77px;
      position: absolute;
      left: 0;
    }
  }
}
.circle {
  width: 15px;
  height: 20px;
  border-radius: 50%;
  background: #f8f8f8;
  position: absolute;
}
.circle-left {
  top: 155px;
  transform: translate(-50%, -50%);
}
.circle-right {
  top: 155px;
  right: 0;
  transform: translate(50%, -50%);
}

.router-link-active{
  display: block;
  text-align: center;
}

.btn {
  font-size: 16px;
  color: #4a4a4a;
  display: inline-block;
  margin-top: 62px;
  padding: 13px 74px;
  border-radius: 100px;
  background: #fff;
}
</style>
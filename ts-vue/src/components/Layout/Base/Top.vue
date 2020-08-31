<template>
  <div class="top">
    <div class="top-container">
      <div class="logo" @click="logo"></div>
      <div class="subname">网校直播</div>
    
      <div class="user">
        <div class="info">
          <div class="head"><img :src="headerImg? headerImg: defaultHeaderImg"/></div>
          <div class="name">
            <a href="javascript:void(0)">
              你好！{{userInfo.name}}
              <span class="iconfont down">&#xe644;</span>
              <span class="iconfont up">&#xe643;</span>
            </a>
            <div class="sub-menu">
              <a class="panel" href="javascript:void(0)" @click="setPassworld">修改密码</a>
              <a class="panel" href="javascript:void(0)" @click="unLogin">退出登录</a>
            </div>
          </div>
        </div>
      </div>
      <div class="menu" :class="{'menu-move':menuMove}" @click="menu(true)" @mousemove="menu(false)">
        <div class="panel" v-if="systemMenuShow">
          <router-link to="/setting" class='setting'><span class="iconfont">&#xe64c;</span>系统设置</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import { getLocalStorage, delLocalStorage } from "@/common/js/localStorage";
import { mapGetters } from 'vuex';
import {decodeJWTsub} from '@/common/js/jwt';
import { getHeader } from '@/server/login/index';
@Component({
  computed: mapGetters(
    ['userInfo', 'admins', 'headerImg']
  ),
  components: {
  }
})

export default class Top extends Vue {

  private systemMenuShow: boolean = false;

  private defaultHeaderImg: NodeRequire = require('@/assets/default-header.png');

  private menuMove: boolean = false;

  private created(): void {
    this.$store.dispatch('admins');
    this.$store.dispatch('getHeaderImg');
  }

  private mounted(): void {
    const token: any = getLocalStorage('token', false);
    if (!token) {
      this.unLogin();
      return;
    }
  }

  private menu(status: boolean): void {
    this.menuMove = status;
  }

  @Watch('admins')
  private setAdmins(): void {
    this.setSystemMenuShow();
  }

  private setSystemMenuShow(): void {
    // @ts-ignore
    this.admins.forEach((name: string) => {
      console.log(name);
      // @ts-ignore
      if (name === this.userInfo.username) {
        this.systemMenuShow = true;
      }
    });
  }

  private unLogin(): void {
    this.$store.commit("setPaperEditDetailDataInit");
    delLocalStorage('token');
    this.$router.push({path: '/login'});
    this.$store.commit('headerImg', this.defaultHeaderImg);
  }

  private setPassworld(): void {
    this.$router.push({path: '/updatepassword'});
  }

  private logo(): void {
    this.$router.push({path: '/'});
  }

}
</script>


<style lang="scss" scoped>
  @import "../../../common/sass/function";
  @import "../../../common/sass/variable";
  .top{
    box-shadow:0px 1px 4px 0px rgba(0,21,41,0.12);
    height: 64px;
    background-color: #fff;
    position: relative;
    z-index: 2;
    .top-container{
      margin: 0 auto;
      width: $page-width;
      @include clearfix;
      background-color: #fff;
    }
    .logo{
      float: left;
      width: 124px;
      height: 64px;
      background-image: url('../../../assets/logo.png');
      background-repeat: no-repeat;
      background-size: 124px 36px;
      background-position: 0 12px;
      margin-right: 32px;
      cursor: pointer;
    }
    .subname{
      float: left;
      color: #0098FF;
      box-sizing: border-box;
      padding-top: 26px;
      font-size: 18px;
      position: relative;
      &::after{
        content: ' ';
        position: absolute;
        top: 27px;
        left: -16px;
        height: 16px;
        width: 1px;
        border-right: 1px solid #E8E8E8;
      }
    }
    .menu {
      float: right;
      margin-right: 80px;
      @include clearfix;
      .panel{
        float: left;
        position: relative;
        .iconfont{
          font-size: 12px;
          transform: scale(0.6, 0.6);
        }
        .up{
          display: none;
          margin-left: 12px;
        }
        .down{
          margin-left: 12px;
          font-size: 12px;
          display: inline-block;
        }
        &:hover {
          .up{
            display: inline-block;
          }
          .down{
            display: none;
          }
        }
        .sub-menu{
          width: 136px;
          background-color: #fff;
          position: absolute;
          z-index: 200;
          left: 0;
          top: 64px;
          display: none;
          border-radius:0px 0px 4px 4px;
          .sub-panel{
            display: block;
            text-align: left;
            color: #fff;
            font-size: 14px;
            padding-left: 24px;
            line-height: 40px;
            height: 40px;
            box-sizing: border-box;
            width: 136px;
            color: rgba(255,255,255,0.8);
            &:hover{
              background-color: #0098FF;
              color: #0098FF;
            }
          }
        }
        &:hover .sub-menu {
          display: block;
        }
        .router-link-active{
          color: #0098FF;
        }
        a{
          height: 64px;
          width: 136px;
          text-align: center;
          display: block;
          line-height: 64px;
          color: #333;
          font-size: 14px;
          text-decoration: none;
          &:hover{
            //background-color: #0098FF;
            color: #0098FF;
          }
        }
        .setting{
          .iconfont{
            font-size: 16px;
            margin-right: 5px;
            vertical-align:top;
            margin-top: -4px;
          }
        }
      }
    }
    .menu-move{
      .panel {
        &:hover .sub-menu {
          display: none;
        }
      }
    }
    .user{
      float: right;
      height: 64px;
      line-height: 64px;
      .head{
        width: 32px;
        height: 32px;
        background-color: #fff;
        border-radius: 50%;
        float: left;
        margin-top: 16px;
        box-sizing: border-box;
        padding: 2px 0 0 2px;
        img{
          display: block;
          padding: 0;
          margin: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
      }
      .name{
        float: left;
        color: #fff;
        font-size: 14px;
        padding-left: 10px;
        position: relative;
        a{
          color: #333;
        }
        .sub-menu{
          width: 156px;
          background-color: #fff;
          position: absolute;
          z-index: 200;
          right: 0;
          top: 64px;
          display: none;
          border-radius:0px 0px 4px 4px;
          border:1px solid #E8E8E8;
          .panel{
            display: block;
            color: #333;
            font-size: 14px;
            padding-left: 24px;
            line-height: 40px;
            height: 40px;
            // color: rgba(255,255,255,0.8);
            &:hover{
              background-color: #0098FF;
              color: #fff;
            }
          }
        }
        .iconfont{
          font-size: 12px;
          transform: scale(0.6, 0.6);
          display: inline-block;
          margin-left: 10px;
        }
        .up{
          display: none;
        }
        &:hover {
          .sub-menu{
            display: block;
          }
          .up{
            display: inline-block;
          }
          .down{
            display: none;
          }
        }
      }
    }
  }
</style>

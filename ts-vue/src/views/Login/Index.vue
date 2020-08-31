<template>
  <div class="login">
    <div class="top">
      <div class="top-container">
        <div class="logo"></div>
        <div class="text">欢迎使用教师端直播系统</div>
      </div>
    </div>
    <div class="login-wrapper">
      <a-form  @submit="handleSubmit" class="login-box">
        <div class="logo-img"><img src="@/assets/login/logo.png"/></div>
        <div class="logo-text">账号密码登录</div>
        <a-form-item>
          <a-input  type="text" v-model="userName" placeholder="请输入用户名" class="int" size="large">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model="password" type="password" placeholder="请输入密码" class="int" size="large" @keyup.enter.native="handleSubmit">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item class="login-btn">
          <a-button type="primary" @click="handleSubmit" :loading="loading" class="login-btn">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {login} from "@/server/login/index";
import {setLocalStorage, delLocalStorage} from "@/common/js/localStorage";
import {decodeJWTsub} from '@/common/js/jwt';

@Component({

})
export default class Login extends Vue {

  private userName: string = '';
  private password: string = '';
  private loading: boolean = false;

  private handleSubmit(): void {
    if (this.loading) {
      return;
    }
    if (!this.userName) {
      this.$message.error('请输入用户名');
      return;
    }
    if (!this.password) {
      this.$message.error('请输入密码');
      return;
    }
    this.loading = true;
    login(this.userName, this.password).then((rs: any) => {
      try {
        const jwt: any = decodeJWTsub(rs.data.retval);
        const userInfo: any = {
          username: jwt.username,
          name: jwt.name,
          id: jwt.id,
          authors: jwt.dataId,
          roleId: jwt.roleId ? jwt.roleId : 0,
          role: jwt.role ? jwt.role : 'OTHER'
        };
        console.log(jwt);
        delLocalStorage('deafultGroups');
        jwt.groups.forEach((item: any) => {
          if (item.defaultGroups === 'DEFAULT') {
            userInfo.defaultGroups = item;
            setLocalStorage('deafultGroups', item);
          }
        });
        this.$store.commit('userInfo', userInfo);
        setLocalStorage('token', rs.data.retval, false);
        setLocalStorage('name', jwt.username); // matomo 统计使用
        this.$router.push({path: '/course'});
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    }).catch((err: any) => {
      this.loading = false;
      this.$message.error(err.data.errmsg);
    });
  }

}
</script>

<style lang="scss" scoped>
  @import "../../common/sass/function";
  @import "../../common/sass/variable";
  .login {
    background-color:rgba(239,248,255,1);
    width: 100%;
    height: 100vh;
    position: relative;
    text-align: center;
    background-image: url('../../assets/login/bg.png');
    background-repeat: no-repeat;
    background-position: center 62px;
    // 小屏显示优化
    @media screen and (min-height: 100px) and (max-height: 800px){
      background-position: center center;
    }
    background-size: 1920px 750px;
    .int{
      width: 300px;
    }
    .login-btn{
      margin: 0 auto 60px auto;
      width:300px;
      height:40px;
      border: none;
      background:linear-gradient(90deg,rgba(29,180,254,1) 0%,rgba(2,140,255,1) 100%);
      box-shadow:0px 8px 16px -10px rgba(0,152,255,0.8);
      border-radius:4px;
    }
    .login-wrapper{
      @include clearfix();
      width: 1200px;
      background-repeat: no-repeat;
      background-position: -140px -55px;
      height: 520px;
      position: absolute;
      left:50%;
      top:180px;
      margin-left: -600px;

      // 小屏显示优化
      @media screen and (min-height: 100px) and (max-height: 800px){
        top: 50%;
        margin-top: -235px;
      }

    }
    .logo-img{
      text-align: center;
      padding-top: 36px;
      img{
        width: 158px;
        margin-left: -26px;
      }
    }
    .logo-text{
      text-align: center;
      padding-top: 8px;
      padding-bottom: 32px;
    }
    .login-box{
      float: right;
      padding: 20px;
      margin: 60px auto 0 auto;
      width: 100%;
      max-width: 380px;
      background:rgba(255,255,255,1);
      box-shadow:0px 4px 12px 0px rgba(0,152,255,0.15);
      border-radius:8px;
    }
    .login-tit{
      text-align: center;
      font-size: 28px;
    }
    .login-box {
      .title{
        padding-bottom: 25px;
      }
      background: #ffffff;
      border: none;
      .img{
        padding-bottom: 15px;
        text-align: center;
        img{
          width: 180px;
        }
      }
    }

    .login-box-msg {
      color: #000000;
      text-align: center;
    }

    .login-box .title {
      color: #666;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
    }

    .top {
      height: 64px;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #001529;
      z-index: 10;
      .top-container {
        margin: 0 auto;
        width: $page-width;
        @include clearfix;
        z-index: 10;
      }
      .logo {

        float: left;
        width: 124px;
        height: 64px;
        background-image: url('../../assets/logo.png');
        background-repeat: no-repeat;
        background-size: 124px 36px;
        background-position: 0 12px;
        margin-right: 16px;
        cursor: pointer;

      }
      .text{
        float: left;
        color: #fff;
        font-size: 14px;
        line-height: 64px;
        position: relative;
        padding-left: 16px;
        box-sizing: border-box;
        padding-top: 2px;
        &:after{
          content: ' ';
          position: absolute;
          left: 0;
          top: 28px;
          height: 12px;
          width: 1px;
          background-color: rgba(255,255,255,0.4);
        }
      }
    }
  }

</style>

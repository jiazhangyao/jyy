<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
     //this.$store.dispatch('login')
  },
  mounted() {
    this.$store.dispatch("dict", {});
  },
  updated() {},
  watch: {
    $route: {
      handler(cur) {    
        if (!cur.meta.withoutLogin) {
          this.$store.dispatch("login", {});
        }
      }
    },
    immediate: true
  }
};
</script>
<style lang="less">
.water-detail {
  .van-field__control:disabled {
    color: #0f213e !important;
  }
}
.progress {
  min-height: calc(100vh - 44px);
  background: rgba(203, 210, 222, 0.2);
}
.overText-2 {
  display: -webkit-box; //注意不支持IE浏览器
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  /* autoprefixer: off */ //这里有个坑
  -webkit-box-orient: vertical; //postcss会增加兼容性css头,也会处理一些老旧的属性
  /* autoprefixer: on */ //这样eslint会有报错
}
.contract {
  text-align: left;
  color: #aab0b9;
  padding: 12px 16px;
  a {
    color: #0061ff;
  }
}
.van-popup {
  overflow-y: inherit;
}
.van-picker {
  width: 100%;
}
.dis_bottom_action_one {
  padding: 20px;
  bottom: 0;
  background: #fff !important;
  opacity: 1;
}
#app .b-32 {
  bottom: 32px;
}
.half-bottom-border {
  &:after {
    content: "";
    width: calc(100% - 16px);
    height: 1px;
    background: #ddd;
    position: absolute;
    bottom: 0;
    left: 16px;
    transform: scaleY(0.5);
  }
}
.br-4 {
  border-radius: 4px;
}
.dis_bottom {
  position: fixed;
  z-index: 66;
  // padding:0 16px;
  border-radius: 4px;
  width: 100%;
  // bottom:0;
}
.tl {
  text-align: left;
}
.bgf {
  background: #fff;
}
.van-field__label--left {
  text-align: left;
  font-size: 15px;
  color: #5d6471;
}
.fr {
  float: right;
}
.fl {
  float: left;
}

.pr {
  position: relative;
}
.pa {
  position: absolute;
}
.tc {
  position: absolute;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  padding-top: 44px;
  width: 100%;
  height: 100%;
}
//处理v-html图片样式
.article-wrapper {
  .content {
    font-family: "Avenir", Helvetica, Arial, sans-serif !important;
    img {
      width: 320px !important;
      height: auto !important;
    }
    span {
      line-height: 24px !important;
      font-size: 14px !important;
    }
    p {
      font-family: "Avenir", Helvetica, Arial, sans-serif !important;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
    }
    span {
      font-family: "Avenir", Helvetica, Arial, sans-serif !important;
    }
  }
}
.img-vuer {
  background: #ffffff !important;
}
html,
body,
div,
span,
header,
footer,
nav,
section,
aside,
article,
ul,
dl,
dt,
dd,
li,
a,
p,
h1,
h2,
h3,
h4,
h5,
h6,
i,
b,
textarea,
button,
input,
select,
figure,
figcaption {
  padding: 0;
  margin: 0;
  list-style: none;
  font-style: normal;
  text-decoration: none;
  border: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  font-family: "PingFangSC-Regular", -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: none;
}

a:focus,
input:focus {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

button,
input,
textarea {
  -webkit-appearance: none;
  font-size: inherit;
}

*:focus {
  outline: none;
  resize: none;
}

input[type="button"],
input[type="text"],
input[type="submit"],
input[type="reset"] {
  -webkit-appearance: none;
  outline: none;
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -o-border-radius: 0;
}

input:required,
input:invalid {
  border: 0 none;
  outline: 0 none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  -ms-box-shadow: none;
  -o-box-shadow: none;
  box-shadow: none;
}

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.hide {
  display: none;
}

.c3 {
  color: #333;
}

.fb {
  font-weight: bold;
}

.br0 {
  border-radius: 0;
}

body {
  //强行覆盖组件库
  -webkit-overflow-scrolling: touch;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>

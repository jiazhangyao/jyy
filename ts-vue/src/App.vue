<template>
  <div id="app">
    <a-locale-provider :locale="zh_CN">
      <router-view />
    </a-locale-provider>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");
@Component({
  name: "app"
})
export default class App extends Vue {
  private zh_CN: typeof zh_CN = zh_CN;
}
</script>
<style lang="scss">
#app {
}
</style>

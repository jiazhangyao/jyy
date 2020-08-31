<template>
  <Layout>
    <breadcrumb :list="breadcrumbList"></breadcrumb>
    <div class="census">
      <div class="tabs">
        <tabs :lists='tabsList'></tabs>
      </div>
      <div class="container">
        <router-view />
      </div>
    </div>
  </Layout>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Layout from "@/components/Layout/Base/Index.vue";
import Breadcrumb from '@/components/Layout/Base/BreadcrumbCustomize.vue';
import Tabs from '@/base/Tabs/Index.vue';
@Component({
  components: {
    Layout,
    Breadcrumb,
    Tabs
  }
})
export default class Home extends Vue {

  private tabsList: any[] = [
    {name: '直播统计', path: '/census/live'},
    {name: '互动统计', path: '/census/interactive'}
  ];

  private breadcrumbList: any[] = [
    {
      name: 'index',
      path: '/index',
      title: '首页'
    },
    {
      name: 'index',
      path: '/index',
      title: '课程名次xxx'
    },
    {
      name: 'manage',
      path: '/manage',
      title: '统计'
    }
  ];
  private mounted(): void {

  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";
.census {
  //background-color: #fff;
  margin: 12px auto 0 auto;
  width: $page-width;
  // text-align: center;
  // line-height: 350px;
  //padding-top: 180px;
  //line-height: 2em;
  .container{
    border-radius: 4px;
    // padding: 32px 30px;
  }
  .tabs{
    background-color: #Fff;
  }
}
</style>

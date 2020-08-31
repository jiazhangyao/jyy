<template>
  <Layout>
    <breadcrumb :list="breadcrumbList"></breadcrumb>
    <div class="manage">
      <tabs :lists='tabsList'></tabs>
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
    // {name: '弹幕管理', path: '/manage/barrage'},
    // {name: '禁言用户', path: '/manage/forbidden'},
    {name: '敏感词设置', path: '/manage/keyword'}
  ];

  private breadcrumbList: any[] = [
    {
      name: 'home',
      path: '/',
      title: '首页'
    },
    {
      name: 'manage',
      path: '/manage',
      title: '管理'
    }
  ];
  private mounted(): void {
    this.setCourseInfo();
  }

  private setCourseInfo(): void {
    const title: any = this.$route.query.courseTitle;
    if (title) {
      const couseInfo: any = {
        title,
        name: 'course',
        path: '/course'
      };
      this.breadcrumbList.splice(1, 0, couseInfo);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";
.manage {
  background-color: #fff;
  margin: 12px auto 0 auto;
  width: $page-width;
  // text-align: center;
  // line-height: 350px;
  //padding-top: 180px;
  //line-height: 2em;
  .container{
    border-radius: 4px;
    padding: 32px 30px;
  }
}
</style>

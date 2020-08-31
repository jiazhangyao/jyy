<template>
  <Layout>
    <breadcrumb></breadcrumb>
    <div class="main">
      <div class="setting-detail" v-if="$route.meta.levels === 3">
        <router-view />
      </div>
      <div class="setting" v-if="$route.meta.levels !== 3">
        <div class="setting-menu">
          <div class="panel">
            <router-link to="/setting/userlist">
              <span class="iconfont">&#xe636;</span>
              用 户
            </router-link>
          </div>
          <div class="panel">
            <router-link to="/setting/usergrouplist">
              <span class="iconfont">&#xe635;</span>
              用户组
            </router-link>
          </div>
        </div>
        <div class="setting-container">
          <router-view />
        </div>
      </div>
    </div>
  </Layout>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Layout from "@/components/Layout/Base/Index.vue";
import Breadcrumb from '@/components/Layout/Base/Breadcrumb.vue';
@Component({
  components: {
    Layout,
    Breadcrumb
  }
})
export default class Setting extends Vue {
  private mounted(): void {
    // console.log("setting1");
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";
.setting {
  margin: 16px auto 0 auto;
  width: $page-width;
  background-color: $background;
  padding-top: 16px;
  @include clearfix();
  .setting-menu {
    width: 140px;
    float: left;
    .panel {
      a {
        padding-left: 24px;
        display: block;
        font-size: 14px;
        line-height: 48px;
        color: #333;
        text-decoration: none;
        .iconfont {
          font-size: 16px;
          padding-right: 8px;
        }
      }
      .router-link-active {
        color: #0098ff;
        background-color: #e6f7ff;
        border-right: 2px solid #0098ff;
      }
    }
  }
  .setting-container {
    float: left;
    border-left: 1px solid #e8e8e8;
    margin-left: -1px;
  }
}
.setting-detail{
  background-color: #fff;
  margin: 16px auto 0 auto;
  padding-top: 16px;
}
</style>

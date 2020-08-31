<template>
  <Layout>
    <div class="home">welcome！教师直播！</div>
  </Layout>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Layout from "@/components/Layout/Base/Index.vue";
@Component({
  components: {
    Layout
  }
})
export default class Home extends Vue {
  private mounted(): void {

  }
}
</script>
<style lang="scss" scoped>
@import "../../common/sass/function";
@import "../../common/sass/variable";
.home {
  background-color: #fff;
  margin: 16px auto 0 auto;
  width: $page-width;
  text-align: center;
  // line-height: 350px;
  padding-top: 180px;
  line-height: 2em;
  height: 400px;
}
</style>

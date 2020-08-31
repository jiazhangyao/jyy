<template>
  <div class="container">
    <top></top>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Top from '@/components/Layout/Assistant/Top.vue';
import Bottom from '@/components/Layout/Base/Bottom.vue';
@Component({
  components: {
    Top,
    Bottom
  }
})
export default class Layout extends Vue {
}
</script>


<style lang="scss" scoped>
  @import "../../../common/sass/function";
  @import "../../../common/sass/variable";
  .container{
    .main{
      // background-color: #fff;
      //width: $page-width;
      margin: 0 auto 0 auto;
      padding: 0;
      // padding: 16px 0;
      @include clearfix;
    }
  }
</style>

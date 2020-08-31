<template>
  <ul class="tabs">
    <li class=panel v-for="(item,index) in lists" :key='index'>
      <router-link :to='item.path'>{{item.name}}</router-link>
    </li>
  </ul>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class Tabs extends Vue {
  @Prop({
    type: Array,
    default(): any {
      return [];
    }
  })
  private lists: any;
}
</script>


<style lang="scss" scoped>
  @import "../../common/sass/function";
  @import "../../common/sass/variable";
  .tabs{
    @include clearfix();
    border-bottom: 1px solid #e8e8e8;
    li{
      float: left;
      margin: 0 26px;
      a{
        font-size: 16px;
        color: #666;
        //width: 50px;
        display: block; 
        padding: 16px 0;
        border-bottom: 2px solid #ffF;
      }
      .router-link-active{
        color: #0098FF;
        border-bottom: 2px solid #1890FF;
      }
    }
  }
</style>

<template>
  <div class="breadcrumb" v-if="list">
    <div class="breadcrumb-container">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item,index) in list" :key='index'>
          <a @click="goUrl(item.name ? item.name : item.path, item.name ? 1 : 2)" href="javascript:void(0)">{{item.title}}</a>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component({
  components: {

  }
})

export default class Breadcrumb extends Vue {
  @Prop({
    type: Array,
    default(): any {
      return [];
    }
  })
  private list: any;

  private goUrl(name: string, type: number): void {
    if (!name) return;
    if (type === 2) {
      this.$router.push({
        path: name
      });
    } else {
      this.$router.push({
        name
      });
    }
  }
}
</script>


<style lang="scss" scoped>
  @import "../../../common/sass/function";
  @import "../../../common/sass/variable";
  .breadcrumb{
    height: 54px;
    background-color: #FAFAFA;
    min-width: $page-width;

    span{
      &:last-child{
        a{
          color: #333;
        }
      }
    }
    .breadcrumb-container{
      padding-top: 16px;
      margin: 0 auto;
      width: $page-width;

      @include clearfix;
    }
  }
</style>

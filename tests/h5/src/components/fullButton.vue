<template>
  <div :class="'button  '+cls">{{name}}</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "确定"
    },
    cls: {
      type: String,
      default: ""
    },
    routeOpt: {
      type: String,
      required: false
    },
    names: {
      type: String,
      default: "1",
      required: false
    }
  }
};
</script>

<style lang="less" scoped>
.button {
  padding: 0;
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  text-align: center;
  border-radius: 4px;
  background: #0061ff;
  color: #fff;
  
  &.nobg{
    color: #D82323;
    background: #FFFFFF;
    border: 1px solid #C66F6F;
    a{color: #D82323;}
  }
  &.blue{
    background: #309DE5;
    a{color: #fff;}
  }
}
</style>
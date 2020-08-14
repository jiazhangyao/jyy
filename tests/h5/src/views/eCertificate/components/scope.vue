<template>
  <div v-if="show">
    <NavBar navTitle="使用范围" :goBack="goBack" />
    <div class="scope-wrap">
      <div class="padding">
        <div v-for="(item,index) in scope" :key="index">
          <Input :labelWidth="140" :label="item.name" :value="item.value" disabled placeholder="-" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/input.vue";
export default {
  props: {
    scope: {
      type: Array,
      default: []
    },
    show: {
      type: Boolean,
      default: false
    },
    scopeTitle: {
      type: String,
      default: "使用范围"
    }
  },

  data() {
    return {};
  },

  components: { Input },
  methods: {
    goBack() {
      this.$emit("goBack");
    }
  }
};
</script>

<style lang="less" scoped>
.scope-wrap {
  min-height: calc(100vh - 44px);
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 1;
  width: 100%;
  background: #fff;
  img {
    width: 100%;
    border: 1Px dashed #a1b3c7;
    border-radius: 5px;
  }
}
</style>
<style lang="less" >
.scope-wrap {
  .van-field--disabled .van-field__control {
    color: #0F213E;
  }
}
</style>
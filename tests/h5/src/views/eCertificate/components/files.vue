<template>
  <div v-if="show">
    <NavBar :navTitle="fileTitle" :goBack="goBack"/>
    {{files}}
    <div class="file-wrap">
      <div v-for="(item, index) in files" :key="index">
        <img
          v-for="(ele, curindex) in item.base64List"
          :key="'file'+curindex"
          :src="'data:image/jpeg;base64,'+ele"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      default: []
    },
    show: {
      ///nav的title
      type: Boolean,
      default: false
    },
    fileTitle: {
      type: String,
      default: "证照文件"
    }
  },

  data() {
    return {};
  },

  components: {},
  methods: {
    goBack() {
      this.$emit("goBack");
    }
  }
};
</script>

<style lang="less" scoped>
.file-wrap {
  min-height: calc(100vh - 44px);
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 1;
  width: 100%;
  background: #fff;
  padding: 24px 16px;
  img {
    width: 100%;
    border: 1Px dashed #a1b3c7;
    border-radius: 5px;
  }
}
</style>
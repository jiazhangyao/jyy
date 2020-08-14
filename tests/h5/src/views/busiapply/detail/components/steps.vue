<template>
  <div class="busiapply-detail-step-wrap">
    <NavBar navTitle="流程节点" :goBack="hideSteps"/>
    <NodeSteps :nodes="nodes"/>
  </div>
</template>
<script>
import NodeSteps from "@/components/nodeSteps";
export default {
  name: "busiapplySteps",
  components: {
    NodeSteps
  },
  props: ["nodes", "hideSteps"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>
<style lang="less">
.busiapply-detail-step-wrap {
  height: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 84px;
}
</style>

<template>
  <div id="batch-leading-in">
    <headers />
    <lists />
    <footers></footers>
  </div>
</template>

<script>
import Headers from './headers'
import Lists from "./lists";
import Footers from "./footer";

export default {
  components: {
    Headers,
    Lists,
    Footers,
  },
};
</script>

<style lang="stylus" scoped>
#batch-leading-in {
}
</style>
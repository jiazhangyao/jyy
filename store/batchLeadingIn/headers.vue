<template>
  <header class="batch-leading-in-header">
      <img :src="imgs" @click="goHome" />
      <p>批量加购</p>
  </header>
</template>

<script>
const imgs = require('../../../static/logo.png')
export default {
    data() {
        return {
            imgs
        }
    },
    methods: {
        goHome() {
            this.$router.push('/')
        }
    }
}
</script>

<style lang="stylus" scoped>
.batch-leading-in-header
    display flex
    align-items center
    img 
      width 200px
    p 
      margin-left 20px
      font-size 20px

</style>
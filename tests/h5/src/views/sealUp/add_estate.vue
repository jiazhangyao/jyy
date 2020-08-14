<template>
  <div class="seal-up-add-estate">
    <NavBar :navTitle="title" />
    <section>
      <lists :listData="addNavData"></lists>
    </section>
    <footer class="btns">
      <Button @save="up">上一步</Button>
      <Button @save="down">下一步</Button>
    </footer>
  </div>
</template>

<script>
import nav from "@/mixins/navBar.js";
import Lists from "./components/lists";
import Button from "./components/button";
import { mapState } from 'vuex';
export default {
  mixins: [nav],
  components: {
    Lists,
    Button,
  },
  computed: {
    ...mapState({
      addNavData: state => state.sealUp.addNavData,
      registerType: state => state.sealUp.registerType
    })
  },
  data() {
    return {
      title: "不动产信息",
      form: {},
    };
  },
  methods: {
    up() {
       if (this.registerType === 4050 || this.registerType === 4060) {
        this.$router.push('/sealUp/sealUpAddHistory')
      } else {
      }
    },
    down() {
      //产权信息
      const estateInfo = this.$store.state.sealUp.estateSealDTOObj
      const obj = {
        type: 'estateInfo',
        data: estateInfo,
        isDwon: true
      }
      this.$store.commit('sealUp/changeTotalSubmitData', obj)
      this.$router.push('/sealUp/sealUpAddSeal')
    },
  }
};
</script>

<style lang='less' scoped>
.seal-up-add-estate {
  height: 94vh;
  /deep/ .box {
    padding: 0 4px;
    color: red;
  }
  background: #eee;
  footer.btns {
    padding-bottom: 20px;
    text-align: center;
  }
  .imgs {
    padding: 0 20px;
  }
}
</style>
<template>
  <div class="seal-up-add-estate">
    <!-- <NavBar :navTitle="title" /> -->
    <section>
      <lists :listData="estateDetailInfo"></lists>
    </section>
    <!-- <footer class="btns">
      <Button @save="up">上一页</Button>
      <Button @save="down">下一页</Button>
    </footer> -->
    <Footer />
  </div>
</template>

<script>
import nav from "@/mixins/navBar.js";
import Lists from "./components/lists";
import Button from "./components/button";
import { mapState } from 'vuex';
import sealUpMix from "@/mixins/sealUp.js";
import Footer from "./components/footer.vue";

export default {
  mixins: [nav, sealUpMix],
  components: {
    Lists,
    Button,
    Footer
  },
  computed: {
    ...mapState({
      addNavData: state => state.sealUp.addNavData,
      registerType: state => state.sealUp.registerType,
      estateDetailInfo: state => state.sealUp.estateDetailInfo
    })
  },
  data() {
    return {
      title: "不动产信息",
      form: {},
      name: 'EstateDetail',
      prevUrl: '',
      nextUrl: ''
    };
  },
  mounted() {
    console.log('---------不动产信息-------', this.estateDetailInfo);
    this.items.forEach((item, index) => {
      if (item.component === this.name) {
        this.prevUrl = this.items[index - 1].path || '';
        this.nextUrl = this.items[index + 1].path || '';
      }
    });
  },
  methods: {
    up() {
      // this.$router.back();
      this.$router.push(this.prevUrl);
    },
    down() {
      // this.$router.push(`/sealUp/SealUpInfoDetail?detail=0`);
      this.$router.push(this.nextUrl);
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
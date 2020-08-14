<template>
  <div class="seal-up-info-detail">
    <!-- <NavBar :navTitle="title" /> -->
    <section>
      <lists :listData="sealUpInfo"></lists>
      <DisplayApply :applicantList="applyLists"></DisplayApply>
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
import DisplayApply from "./components/displayApply";
import Button from "./components/button";
import { mapState } from 'vuex';
import sealUpMix from "@/mixins/sealUp.js";
import Footer from "./components/footer.vue";
export default {
  mixins: [nav, sealUpMix],
  components: {
    Lists,
    Button,
    DisplayApply,
    Footer
  },
  computed: {
    ...mapState({
      sealUpInfo: state => state.sealUp.sealUpInfo,
      applyLists: state => state.sealUp.applyLists
    })
  },
  data() {
    return {
      title: "查封信息",
      form: {},
      name: 'DetailSeal',
      prevUrl: '',
      nextUrl: ''
    };
  },
  mounted() {
    this.items.forEach((item, index) => {
      if (item.component === this.name) {
        this.prevUrl = this.items[index - 1].path || '';
        this.nextUrl = this.items[index + 1].canEdit ? `${this.items[index + 1].path}?detail=1` : `${this.items[index + 1].path}?detail=0`;
      }
    });
    console.log('prevUrl=', this.prevUrl, this.items)
    console.log('nextUrl=', this.nextUrl)
    

  },
  methods: {
    up() {
      // this.$router.push(`/sealUp/sealUpEstateDetail?detail=0`)
      this.$router.push(this.prevUrl);
    },
    down() {
      // this.$router.push('/sealUp/sealUpAddFile?detail=0')
      this.$router.push(this.nextUrl);
    },
  }
};
</script>

<style lang='less' scoped>
.seal-up-info-detail {
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
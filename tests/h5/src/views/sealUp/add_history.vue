<template>
  <div class="seal-up-add">
    <NavBar :navTitle="title" />
    <section>
      <lists :listData="historySealUpDataShow"></lists>
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
      historySealUpDataShow: state => state.sealUp.historySealUpDataShow
    })
  },
  created() {
    const { keys } = this.$route.params
    this.keysIndex = keys
    if (this.keysIndex === 4060) {
      this.showData.splice(4, 1)
      this.showData.splice(0, 1)
      this.$set(this.showData, 0, {
          type: 5,
          key: "unlockRegisterTime",
          label: "注销时间",
          dateType: "date",
          value: "2022-05-05",
          hidden: false,
          required: false
      })
    }
  },
  data() {
    return {
      title: "历史查封信息",
      keysIndex: 0,
    };
  },
  methods: {
    up() {
    },
    down() {
      //历史信息
      let externalSealingInfo = this.$store.state.sealUp.historySealUpData
      const obj = {
        type: 'externalSealingInfo',
        data: externalSealingInfo,
        isDown: true
      }
      this.$store.commit('sealUp/changeTotalSubmitData', obj)
      this.$router.push('/sealUp/sealUpAddEstate')
    },
  }
};
</script>

<style lang='less' scoped>
.seal-up-add {
  /deep/ .box {
    padding: 0 4px;
    color: red;
  }
  background: #eee;
  section {
    margin-top: 10px;
  }
  .add-form {
    padding: 0 10px;
    background: #fff;
  }
  .add-apply-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    .add-apply {
      padding: 5px 16px;
      color: #309de5;
      background: transparent;
      border: 1px solid #309de5;
    }
  }

  footer.btns {
    padding-bottom: 20px;
    text-align: center;
  }
  .imgs {
    padding: 0 20px;
  }
}
</style>
<template>
  <div class="history-detail">
    <!-- 普通文本展示 -->
    <Lists :listData="listData"></Lists>
    <!-- 申请人展示 -->
    <DisplayApply :applicantList="applyInfo"></DisplayApply>
    <!-- 图片展示 -->
    <!-- <DisplayImgs :imgsData="materialList"></DisplayImgs> -->
    <section class="files-box">
      <h4>附件信息</h4>
      <p>如需查看附件，请登录PC端进行查看！</p>
    </section>
    <!-- <footer class="btns">
      <Button @save="down">下一页</Button>
    </footer>-->
    <Footer />
  </div>
</template>

<script>
import nav from "@/mixins/navBar.js";
import Lists from "./components/lists";
// import DisplayImgs from "./components/displayImgs";
import DisplayApply from "./components/displayApply";
import { mapState } from "vuex";
import Button from "./components/button";
import sealUpMix from "@/mixins/sealUp.js";
import Footer from "./components/footer.vue";

export default {
  mixins: [nav, sealUpMix],
  components: {
    Lists,
    // DisplayImgs,
    DisplayApply,
    Button,
    Footer
  },
  computed: {
    ...mapState({
      historyDetailData: state => state.sealUp.historyDetailData
    })
  },
  data() {
    return {
      title: "历史查封消息",
      form: {},
      listData: null,
      applyInfo: [],
      materialList: [],
      name: "DetailHistory"
    };
  },
  methods: {
    down() {
      this.$router.push(`/sealUp/SealUpEstateDetail?detail=0`);
    }
  },
  mounted() {
    const { historyDetailData } = this;
    console.log('历史信息historyDetailData----', historyDetailData);
    const {
      sealAgency,
      applyTime,
      sealType,
      startTime,
      endTime,
      civilBook,
      assistBook,
      remark,

      applyInfo,

      materialList
    } = historyDetailData;
    // 整合纯展示数据
    const listData = [
      ["查封机关", sealAgency],
      ["申请时间", applyTime],
      ["查封类型", sealType],
      ["查封起止时间", `${startTime}-${endTime}`],
      ["协助执行书", civilBook],
      ["民事执行书", assistBook],
      ["附记", remark]
    ];
    this.listData = listData;

    // 整合申请人数据
    this.applyInfo = applyInfo;

    // 整合附件数据
    let arr = [];
    if (materialList && materialList.length) {
      materialList.forEach(item => {
        if (item.fileList && item.fileList.length) {
          item.fileList.forEach(cur => {
            arr.push(cur);
          });
        }
      });
    }
    this.materialList = arr;
  }
};
</script>

<style lang='less' scoped>
  .history-detail {
    background-color: rgba(0,0,0,0.06);;
    min-height: calc(100vh - 44px);

    .files-box {
      margin: 16px;
      background: #ffffff;
      margin-top: 10px;
      border-radius: 4px;
      padding: 16px;

      h4 {
        font-size: 18px;
        margin-bottom: 10px;
      }
    }

    footer.btns {
      padding-bottom: 20px;
      text-align: center;
    }
  }
</style>
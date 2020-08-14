<template>
  <div>
    <div class="bisiapply-edit-layout">
      <div class="status" v-if="statusDesc">
        状态:
        <span :class="[20].indexOf(this.status) > -1 ? 'error' : ''">{{statusDesc}}</span>
      </div>
      <div class="reject-box" v-if="[20].indexOf(this.status) > -1 ">
        <p>驳回/终止原因：</p>
        <p class="error">
          <span>很抱歉，您提交的申请审核失败！驳回理由：{{remark}}，请修改信息后，重新提交申请。</span>
        </p>
      </div>
      <CellGroup>
        <Cell
          v-for="(item, index) in items"
          :key="index"
          :title="item.label"
          is-link
          @click="changeComponent(item)"
        >
          <template>
            <span class="read" v-if="!canEdit(item.component)">查看</span>
            <span class="unfinish" v-else-if="!componentFinished[item.component]">未完成</span>
            <span class="canedit" v-else>可编辑</span>
          </template>
        </Cell>
      </CellGroup>
      <Footer :whichEdit="whichEdit" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import sealUpMix from "@/mixins/sealUp.js";
import NavBar from "@/components/navBar.vue";
import { Button, CellGroup, Cell, Toast, Dialog, Field } from "vant";
import Footer from "./components/footer.vue";
export default {
  mixins: [selectMix, sealUpMix],
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState("sealUp", ["statusDesc", "status", "remark", "pageEditable"]),
    orderId() {
      return this.$route.query.id;
    }
  },
  created() {},
  methods: {},
  mounted() {},
  components: {
    CellGroup,
    Cell,
    SelectPage,
    Button,
    Field,
    Footer
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-layout {
  padding-bottom: 158px;
  text-align: left;
  .reject-box {
    background: #ffffff;
    border-radius: 2px 2px 0 0;
    padding: 16px;
    margin: 0 16px 16px 16px;
    font-size: 14px;
    color: #666666;
    .error {
      color: #fe3824;
      .reason {
        color: "#FF3934";
      }
    }
  }
  .status {
    padding: 15px;
    font-size: 14px;
    color: #666666;

    span {
      background: #f5f7fe;
      border: 1px solid #309de5;
      border-radius: 14.5px;
      font-size: 14px;
      color: #309de5;
      padding: 0 12px;
      margin-left: 12px;
      &.error {
        background: rgba(254, 56, 36, 0.06);
        border: 1px solid #fe3824;
        border-radius: 14.5px;
        font-size: 14px;
        color: #fe3824;
      }
    }
  }
  .van-cell-group {
    margin: 0 16px;
  }
  .van-icon {
    color: #aab0b9 !important;
  }

  .van-cell {
    padding: 15px 15px;
    font-size: 15px;
    color: #5d6471;
    line-height: 29px;
  }
  .van-cell::after {
    content: " ";
    position: absolute;
    pointer-events: none;
    box-sizing: border-box;
    left: 15px;
    right: 0;
    bottom: 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    border-bottom: 1px solid #cbd2de;
  }
  .van-hairline--top-bottom::after {
    border-width: 1px 0 0 0;
  }
  .canedit {
    font-size: 14px;
    color: #c9c8cd;
  }
  .unfinish {
    background-image: linear-gradient(
      45deg,
      rgba(255, 132, 71, 1) 0%,
      #ff4400 100%
    );
    border-radius: 14.5px;
    font-size: 14px;
    color: #ffffff;
    padding: 4px 12px;
  }
}
</style>
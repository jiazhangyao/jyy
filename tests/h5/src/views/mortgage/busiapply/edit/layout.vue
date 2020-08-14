<template>
  <div>
    <div class="bisiapply-edit-layout">
      <div class="status" v-if="transferbusiapplyForm.statusDesc">
        状态:
        <span
          :class="[20, 51, 55].indexOf(this.transferbusiapplyForm.status) > -1 ? 'error' : ''"
        >{{transferbusiapplyForm.statusDesc}}</span>
      </div>
      <div class="reject-box" v-if="[20, 51, 55].indexOf(this.transferbusiapplyForm.status) > -1 ">
        <p>驳回/终止原因：</p>
        <p class="error">
          <template v-if="transferbusiapplyForm.registerType != 5020">
            <span v-if="transferbusiapplyForm.orderRejectApplocant == 1" class="reason">转让人信息有误</span>
            <span
              v-if="transferbusiapplyForm.orderRejectApplocant == 1"
            >{{transferbusiapplyForm.orderRejectReson4Saler}}，请尽快修改！</span>
            <span v-if="transferbusiapplyForm.orderRejectApplocant == 2">
              <span class="reason">受让人信息有误</span>
            </span>
            <span
              v-if="transferbusiapplyForm.orderRejectApplocant == 2"
            >{{transferbusiapplyForm.orderRejectReson4Buyer}}，请尽快修改！</span>
            <span v-if="transferbusiapplyForm.orderRejectApplocant == 3">
              <span class="reason">转让人信息有误</span>
              {{transferbusiapplyForm.orderRejectReson4Saler}}；
              <span
                class="reason"
              >受让人信息有误</span>
              {{transferbusiapplyForm.orderRejectReson4Buyer}}，请尽快修改！
            </span>
          </template>
          <template v-if="transferbusiapplyForm.registerType == 5020">
            <span
              v-if="transferbusiapplyForm.orderRejectApplocant == 2"
            >{{transferbusiapplyForm.orderRejectReson4Buyer}}，请尽快修改！</span>
          </template>
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
import mortgageBusiness from "@/mixins/mortgageBusiness.js";
import NavBar from "@/components/navBar.vue";
import { Button, CellGroup, Cell, Toast, Dialog, Field } from "vant";
import {
  update,
  remove,
  submit,
  regionDots,
  configOffice
} from "@/service/mortgageBusiness";
import { tabsRelateToUserRole, UserRoleEnum } from "../const";
import Footer from "./components/footer.vue";
export default {
  mixins: [selectMix, mortgageBusiness],
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState("mortgageBusiapply", ["transferbusiapplyForm"]),
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
      border-radius: 100px;
      border-radius: 14.5px;
      font-size: 14px;
      color: #309de5;
      padding: 0 12px;
      margin-left: 12px;
      &.error {
        background: rgba(254, 56, 36, 0.06);
        border: 1px solid #fe3824;
        border-radius: 100px;
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
    border-radius: 100px;
    border-radius: 14.5px;
    font-size: 14px;
    color: #ffffff;
    padding: 4px 12px;
  }
}
</style>
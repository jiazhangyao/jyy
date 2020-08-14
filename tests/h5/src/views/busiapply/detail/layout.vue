<template>
  <div>
    <div class="bisiapply-edit-layout">
      <notice-bar v-if="notice.remark" :text="notice.remark" :mode="notice.mode" />
      <CellGroup>
        <Cell
          v-for="(item, index) in items"
          :key="index"
          :title="item.label"
          is-link
          @click="changeComponent(item)"
        >
          <span>查看</span>
        </Cell>
      </CellGroup>
      <footer class="btn-two" v-if="form.status==5||form.status==20">
        <Button type="danger" @click="removeBiz">删除</Button>
        <Button type="info" @click="editBiz">编辑</Button>
      </footer>
      <footer
        class="btn-two"
        v-else-if="(form.status==40||form.status==35)&&form.certificateNumber"
      >
        <Button type="default" @click="gotoCertificateCard(form.certificateNumber)">查看电子证照</Button>
        <Button type="info" @click="showSteps=true">查看流程节点</Button>
      </footer>
      <footer v-else>
        <Button cls="water-edit-footer-btn" type="info" @click="showSteps=true">查看流程节点</Button>
      </footer>
    </div>
    <Steps v-if="showSteps" :nodes="schemaData" :hideSteps="hideSteps" />
  </div>
</template>

<script>
import Steps from "./components/steps";
import NoticeBar from "@/components/noticeBar";
import businessMix from "@/mixins/business.js";
import NavBar from "@/components/navBar.vue";
import { Button, CellGroup, Cell, Toast, Dialog } from "vant";
import { mapGetters } from "vuex";
import { update, remove, submit, orderProcessSchema } from "@/service/business";
import { tabItems, tabsRelateToType } from "../const";
export default {
  mixins: [businessMix],
  data() {
    return {
      showSteps: false,
      schemaData: []
    };
  },
  props: ["changeComponent", "form"],
  watch: {},
  computed: {
    ...mapGetters(["dict"]),
    orderId() {
      return this.$route.query.id;
    },
    notice() {
      switch (this.form.remark) {
        case 10:
          return { remark: this.form.remark || "预审中", mode: "tips" };
          break;
        case 20:
          return this.form.remark ||
            `很抱歉，您提交的申请被驳回。驳回理由：${this.form.remark}`
            ? { remark: this.form.remark, mode: "reason" }
            : {};
          break;
        case 30:
          return {
            remark: this.form.remark || "恭喜您，复审通过",
            mode: "reason"
          };
          break;
        case 15:
          return {
            remark: this.form.remark || "恭喜您，预审通过",
            mode: "reason"
          };
          break;
        default:
          return {
            remark: this.form.remark,
            mode: ""
          };
          break;
      }
    },
    items() {
      let items = [];
      if (tabsRelateToType && this.form.registerType) {
        let { name, tabs } = tabsRelateToType[this.form.registerType];
        for (const item of tabs) {
          items.push({ ...tabItems[item], key: item });
        }
      }
      return items;
    }
  },
  mounted() {
    orderProcessSchema(this.$route.query.id).then(({ success, data, msg }) => {
      this.schemaData = data;
    });
  },
  components: {
    CellGroup,
    Cell,
    Button,
    NoticeBar,
    Steps
  },
  created() {},
  methods: {
    gotoCertificateCard(id) {
      this.$router.push({ name: "certificateCard", query: { id } });
    },
    removeBiz() {
      let $this = this;
      Dialog.confirm({
        title: "确认删除？"
      }).then(() => {
        remove({ orderId: this.orderId }).then(({ success, msg }) => {
          if (success) {
            $this.$router.back();
          } else {
            Toast(msg);
          }
        });
      });
    },
    editBiz() {
      this.$router.push({
        name: "busiApplyEdit",
        query: this.$route.query
      });
    },
    hideSteps() {
      this.showSteps = false;
    }
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-layout {
  text-align: left;
  .van-icon {
    color: #aab0b9 !important;
  }
  footer {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    button {
      width: 100%;
    }
    &.btn-two {
      padding: 8px;
      border-top: 1px solid #cbd2de;
      justify-content: space-around;
      button {
        width: 45%;
        span, a {
          width: 100%;
          height: 100%;
          display: inline-block;
        }
        a {
          color: #5d6471;
        }
      }
    }
  }
  .van-cell {
    padding: 16px 15px;
    font-size: 15px;
    color: #5D6471;
  }
  .van-cell::after {
    content: ' ';
    position: absolute;
    pointer-events: none;
    box-sizing: border-box;
    left: 15px;
    right: 0;
    bottom: 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    border-bottom: 1px solid #CBD2DE;;
  }
  .van-hairline--top-bottom::after {
    border-width: 1px 0 0 0;
  }
}
</style>
<template>
  <div>
    <div class="bisiapply-edit-layout">
      <CellGroup>
        <Cell
          v-for="(item, index) in items"
          :key="index"
          :title="item.label"
          is-link
          @click="changeComponent(item)"
        >
          <template>
            <span class="danger" v-if="!componentFinished[item.component]">未完成</span>
          </template>
        </Cell>
      </CellGroup>
      <footer>
        <Button type="default" @click="draftBiz">保存草稿</Button>
        <Button type="danger" v-if="orderId" @click="removeBiz">删除</Button>
        <router-link v-else :to="{ name: 'busiApplyList'}">
          <Button type="danger">取消</Button>
        </router-link>
        <Button type="info" @click="beforeCommitBiz">提交</Button>
      </footer>
    </div>
    <SelectPage
      :show="select_show"
      :select="select_arr"
      v-on:pageChange="commitBiz"
      v-on:hideSelect="hideSelect"
      :propsValue="propsValue"
    />
  </div>
</template>

<script>
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import businessMix from "@/mixins/business.js";
import NavBar from "@/components/navBar.vue";
import { Button, CellGroup, Cell, Toast, Dialog, Field } from "vant";
import {
  update,
  remove,
  submit,
  regionDots,
  configOffice
} from "@/service/business";
import { tabItems, tabsRelateToType } from "../const";
export default {
  mixins: [selectMix, businessMix],
  data() {
    return {
      regionList: []
    };
  },
  props: ["changeComponent", "form"],
  watch: {},
  computed: {
    orderId() {
      return this.$route.query.id;
    },
    items() {
      let registerType = this.$route.query.type || this.form.registerType;
      let items = [];
      if (tabsRelateToType && registerType) {
        let { name, tabs } = tabsRelateToType[registerType];
        for (const item of tabs) {
          items.push(tabItems[item]);
        }
      }
      return items;
    }
  },
  created() {},
  methods: {
    draftBiz() {
      update(this.getPostData()).then(({ success, msg }) => {
        if (success) {
          this.$router.push({ name: "busiApplyList" });
        } else {
          Toast(msg);
        }
      });
    },
    removeBiz() {
      Dialog.confirm({
        title: "确认删除？"
      }).then(() => {
        remove({ orderId: this.orderId }).then(({ success, msg }) => {
          if (success) {
            this.$router.push({ name: "busiApplyList" });
          } else {
            Toast(msg);
          }
        });
      });
    },
    beforeCommitBiz() {
      let finished = true;
      for (const item of this.items) {
        if (!this.componentFinished[item.component]) {
          Toast("请检查" + item.label + "的信息");
          finished = false;
          return false;
        }
      }

      if (finished) {
        this.changeS(this.regionList, "regionId", "网点选择");
      }
    },
    commitBiz(value, index, item) {
      this.select_show = false;

      submit(this.getPostData(item.id)).then(({ success, msg }) => {
        if (success) {
          this.$router.push({ name: "busiApplyList" });
        } else {
          Toast(msg || "请检查提交的信息");
        }
      });
    },
    getPostData(regionId) {
      let postData = {
        isPost: this.form.isPost,
        mainClaimAmount: this.form.mainClaimAmount,
        materialList: this.form.materialList,
        mortgageInfo: this.form.mortgageInfo,
        mortgageeInfo: this.form.mortgageeInfo,
        mortgagorInfo: this.form.mortgagorInfo,
        obligeeInfo: this.form.obligeeInfo,
        obligorInfo: this.form.obligorInfo,
        orderHouseList: this.form.orderHouseList,
        orderMail: this.form.orderMail,
        ownershipType: this.form.obligeeInfo.ownershipType,
        registerType: this.form.registerType,
        signInfo: this.form.signInfo,
        holdingType: this.form.obligeeInfo.holdingType
      };
      if (regionId) {
        postData.regionId = regionId + "";
      }
      if (this.$route.query.id && this.$route.query.type != 15) {
        postData.id = this.form.id;
      }
      // 没有看懂B、C端这部分的逻辑，先做精准处理，此处如果有mortgagorInfo，会报错：申请人不能重复，请确认
      if (this.$route.query.type == 15) {
        postData.mortgagorInfo = {};
      }
      for (const item of ["obligorInfo", "obligeeInfo", "mortgagorInfo"]) {
        this.form[item] = this.form[item] || {};
        // 处理成员部分
        this.form[item].applicantList = this.form[item].applicantList.map(
          (item, idx) => {
            return {
              ...item,
              faceIdentity: 0, // 人脸识别 1: 通过; 2:不通过  0:未验证
              /* 和liuwei 讨论，暂定设置为1传向后端，因为调用API时表示身份验证已经通过了！ --2018-5-18  // TODO... */
              credooIdentity: 1 // 身份验证 1: 通过; 2:不通过
            };
          }
        );
        // 处理家庭成员部分
        this.form[item].familyList = this.form[item].familyList.map(
          (item, idx) => {
            return {
              familyId: idx,
              familyMemberList: item.familyMemberList || []
            };
          }
        );
      }
      return postData;
    }
  },
  mounted() {
    configOffice().then(({ success, data }) => {
      regionDots().then(({ success, data }) => {
        if (success) {
          this.regionList = data;
        }
      });
    });
  },
  components: {
    CellGroup,
    Cell,
    SelectPage,
    Button,
    Field
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
    position: fixed;
    bottom: 0;
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    width: 100%;
    border-top: 1Px solid #cbd2de;
    button {
      min-width: 109px;
      margin-right: 8px;
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
.danger {
  color: #ff2626;
}
</style>
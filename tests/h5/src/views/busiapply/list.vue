<!--
 * @Description: 
 * @Autor: jixuelian
 * @Date: 2019-06-19 14:58:08
 -->
<template>
  <div>
    <NavBar :navTitle="title" />
    <div class="bizapply-wrap">
      <ListCard
        :list="list"
        :pageLoading="pageLoading"
        :finished="finished"
        :finishedText="finishedText"
        :onLoad="onLoad"
        :onItemClick="onItemClick"
      >
        <template v-slot:header="item">
          <div>
            工单编号：{{item.orderNo}}
            <i
              class="state-icon"
              v-bind:style="busiState[item.status] && busiState[item.status].style"
            >{{item.statusDesc}}</i>
          </div>
        </template>
        <template v-slot:content="item">
          <div class="bottom16">登记类别：{{item.registerTypeDesc}}</div>
          <div>不动产坐落：{{item.address}}</div>
        </template>
      </ListCard>

      <div class="bizapply-footer" @click="addNew">
        <FullButton name="新增业务登记" />
      </div>
      <SelectPage
        v-if="select_step.length !== 0"
        :show="select_step.length !== 0"
        :select="selectArr"
        :selectTitle="selectTitle"
        v-on:hideSelect="backSelect"
        :onSelect="onSelect"
        disabled
      />
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import FullButton from "@/components/fullButton.vue";
import SelectPage from "@/components/selectPage.vue";
import ListCard from "@/components/listCard.vue";
import ListCardMix from "@/mixins/listCard.js";
import { IdCheck } from "@/service/common";
import { list, registerConfig } from "@/service/business";
import { registerTypeStep, businessState } from "./const";
export default {
  mixins: [ListCardMix],
  data() {
    return {
      title: "登记申请",
      finishedText: "",
      busiState: businessState,
      select_step: [], // 新增业务选择的流程，放入的是数组的index
      selectArr: [],
      selectTitle: "",
      registerTypeStep: registerTypeStep
    };
  },
  watch: {
    select_step() {
      let cur = this.registerTypeStep;
      this.selectArr = [];
      this.selectTitle = "";
      for (const index of this.select_step) {
        this.selectArr = cur[index].types;
        this.selectTitle = cur[index].name;
        cur = cur[index].types;
      }
    }
  },
  methods: {
    getData() {
      list(this.pageData).then(res => {
        this.handleInitRes(res);
      });
    },
    onItemClick(item) {
      this.$router.push({
        name: "busiApplyDetail",
        query: { id: item.id, type: item.registerType }
      });
    },
    addNew() {
      this.select_step.push(0);
    },
    // 页面mounted时，给步骤变量加了types
    onSelect(value, index, item) {
      // 有types即有下一步，否则没有
      if (item.types) {
        this.select_step.push(index);
      }
      //转换登记操作不一样,根据步骤及登记字典找到转换登记
      else {
        let nextPageName =
          this.registerTypeStep[0].types[this.select_step[1]].key == "transfer"
            ? "busiApplyTransferList"
            : "busiApplyEdit";
        this.select_step = [];
        this.$router.push({
          name: nextPageName,
          query: {
            type: item.key
          }
        });
      }
    },
    /**
     * @author: jixuelian
     * @description: 新增业务流程的两层选择，处理返回上一层。
     * @param {type}
     * @return:
     */
    backSelect() {
      this.select_step.pop();
    },
    getCurSelect() {
      let selectArr = registerTypeStep;
      for (const index of this.select_step) {
        selectArr = selectArr[index];
      }
      return selectArr;
    }
  },
  computed: {},
  mounted() {
    // 获取新增登记类别，并与新增步骤字典数据结合。因为转换登记只有一个，要求不显示子集，此处
    registerConfig().then(res => {
      if (res.success) {
        for (const iterator of registerTypeStep[0].types) {
          // if (iterator.key !== "transfer") {
          iterator.types = res.data[iterator.key];
          // }
        }
      } else {
        Toast(res.msg);
      }
    });
  },
  created() {},
  components: {
    ListCard,
    FullButton,
    SelectPage,
    Toast
  }
};
</script>
<style scoped lang="less">
.bizapply-wrap {
  padding-bottom: 75px;
  .bottom16 {
    padding-bottom: 16px;
  }
  .state-icon {
    height: 25px;
    line-height: 25px;
    min-width: 60px;
    border-radius: 12px;
    font-size: 12px;
    text-align: center;
    float: right;
    padding: 0 4px;
    transform: scale(0.83);
    transform-origin: top;
  }
  .bizapply-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .bizapply-exchange {
    padding-left: 16px;
    text-align: left;
    line-height: 36px;
    font-size: 12px;
    color: #5d6471;
    background: rgba(203, 210, 222, 0.2);
  }
}
</style>


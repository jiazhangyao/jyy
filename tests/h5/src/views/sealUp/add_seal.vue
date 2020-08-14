<template>
  <div class="seal-up-adds">
    <!-- 添加申请人 -->
    <AddApplyForm v-if="showAddApply" :hide="hideAddApply"></AddApplyForm>
    <!-- 查封信息表单 -->
    <div v-else>
      <!-- 查封信息 -->
      <section>
        <lists :listData="maps"></lists>
      </section>
      <!-- 申请人信息 -->
      <h3 class="item-tit">申请人</h3>
      <section v-for="(item, i) in addApplyLists" :key="i" class="apply-info">
        <lists :listData="item.applyListsAdd" :listWrapCls="listWrapCls" :listWrapText="listWrapText">
          <template #listWrap="scope">
            <div :class="scope.cls.info">{{scope.text.info}}</div>
            <div :class="scope.cls.del" @click="delArr(i)">{{scope.text.del}}</div>
          </template>
        </lists>
      </section>
      <section class="add-apply-wrap">
        <button class="add-apply" @click="addApply">添加申请人</button>
      </section>
      <section class="add-form">
        <AutoForm v-model="form" :data="showData" class="box"></AutoForm>
      </section>

      <Footer :toNextPage="getFormData" />
    </div>
  </div>
</template>

<script>
import Footer from "./components/footer.vue";
import nav from "@/mixins/navBar.js";
import AutoForm from "@forms/AutoForm";
import Lists from "./components/lists";
import Button from "./components/button";
import { getSealUpType } from "../../service/sealUp";
import { mapState } from "vuex";
import { Toast } from "vant";
import AddApplyForm from "./addApply";

export default {
  mixins: [nav],
  components: {
    Lists,
    Button,
    AutoForm,
    Footer,
    AddApplyForm
  },
  async created() {
    const infos = this.$store.state.sealUp.changeSealInfosData;
    const { keys } = this.$route.params;
    this.keysIndex = keys;
    if (this.keysIndex === 4060) {
      this.showData.splice(4, 1);
      this.showData.splice(0, 1);
      this.$set(this.showData, 0, {
        type: 5,
        key: "unlockRegisterTime",
        label: "注销时间",
        dateType: "date",
        value: "2022-05-05",
        hidden: false,
        required: false
      });
    }
    for (let item of this.showData) {
      for (let j in infos) {
        if (item.key === j) {
          item.value = infos[j];
        }
      }
    }
    const types = await getSealUpType();
    const {
      data: { name }
    } = types;
    this.maps[0][1] = name;
    this.maps[1][1] = this.$store.state.sealUp.sealUpType;
    this.$set(this.maps, [0][1], this.$store.state.sealUp.sealUpType);

    this.form = this.sealInfo;
    console.log('表单数据------', this.form);
  },
  computed: {
    ...mapState({
      addApplyLists: state => state.sealUp.addApplyLists,
      historyDetailData: state => state.sealUp.historyDetailData, // 查封历史
      estateInfo: state => state.sealUp.estateInfo, //不动产信息
      materialLists: state => state.sealUp.materialLists, // 附件信息
      registerType: state => state.sealUp.registerType, 
      orderId: state => state.sealUp.orderId,
      sealInfo: state => state.sealUp.sealInfo, //查封信息
      // addNavData: state => state.sealUp.addNavData,
      // historySealUpDataShow: state => state.sealUp.historySealUpDataShow
    })
  },
  data() {
    return {
      title: "查封信息",
      showAddApply: false,
      form: {},
      keysIndex: 0,
      maps: [
        ["查封机关", "鹤岗市中级人民法院"],
        ["查封类型", "轮候查封"]
      ],
      listWrapCls: {
        listTitle: "listTitle",
        type: "type",
        info: "info",
        //  detail: "detail",
        del: "del"
      },
      listWrapText: {
        info: "申请人",
        //  detail: "查封详情",
        del: "删除"
      },
      currentDate: new Date(),
      showData: [
        {
          type: 5,
          key: "startTime",
          label: "查封开始时间",
          dateType: "date",
          value: "",
          hidden: false,
          required: false
        },
        {
          type: 5,
          key: "endTime",
          label: "查封结束时间",
          dateType: "date",
          value: "",
          hidden: false,
          required: false
        },
        {
          type: 1,
          key: "executionBook",
          inputType: "text",
          label: "协助执行书",
          value: "",
          required: false
        },
        {
          type: 1,
          key: "civilAmibitration",
          inputType: "text",
          label: "民事裁定书",
          value: "",
          required: false
        },
        {
          type: 4,
          key: "closeDownRange",
          value: "",
          readonly: false,
          placeholder: "查封范围",
          info: "申请理由不能为空啦",
          required: false,
          maxlength: 2000,
          minHeight: 60,
          maxHeight: 140,
          hidden: false
        },
        {
          type: 4,
          key: "remark",
          value: "",
          readonly: false,
          placeholder: "附记",
          info: "申请理由不能为空啦",
          required: false,
          maxlength: 2000,
          minHeight: 60,
          maxHeight: 140,
          hidden: false
        }
      ],
      //材料上传
      materialList: []
    };
  },
  methods: {
    getFormData() {
      // 组装暂存信息

      //查封信息
      let sealInfo = {
        closeDownOrg: this.maps[0][1],
        closeDownType: this.maps[1][1],
        ...this.form
      };
      this.$store.commit("sealUp/changeSealInfos", sealInfo);
      this.$store.commit("sealUp/changeSealUpInfo", sealInfo);

      //申请人信息
      let applicantList = [];
      for (let ele of this.addApplyLists) {
        const { applyListsAdd } = ele;
        applicantList.push({
          name: applyListsAdd[0][0],
          cardNo: applyListsAdd[0][1],
          cardType: 12,
          mobile: applyListsAdd[1][1]
        });
      }
      const externalSealingInfo = this.historyDetailData;
      const estateInfo = this.estateInfo;
      const sealApplicant = {applicantList};

      const totalData = {
        externalSealingInfo,
        estateInfo,
        sealApplicant,
        sealInfo,
        materialList: this.materialLists,
        registerType: this.registerType,
        orderId: this.orderId
      }
      this.$store.dispatch('sealUp/saveOrder', totalData)

    },
    hideAddApply() {
      this.showAddApply = false;
    },
    down() {
      //查封信息
      // let sealInfo = {
      //   closeDownOrg: this.maps[0][1],
      //   closeDownType: this.maps[1][1],
      //   ...this.form
      // };
      // this.$store.commit("sealUp/changeSealInfos", sealInfo);
      // //申请人信息
      // let applicantList = [];
      // for (let ele of this.addApplyLists) {
      //   const { applyListsAdd } = ele;
      //   applicantList.push({
      //     name: applyListsAdd[0][0],
      //     cardNo: applyListsAdd[0][1],
      //     cardType: 12,
      //     mobile: applyListsAdd[1][1]
      //   });
      // }
      // const sealApplicant = { applicantList };
      // let isDown = true;
      // if (applicantList.length === 2) {
      //   let num = 0;
      //   for (let i in sealInfo) {
      //     if (sealInfo[i]) {
      //       ++num;
      //     }
      //   }
      //   if (Object.keys(sealInfo).length === num) {
      //     isDown = true;
      //   }
      // } else {
      //   isDown = false;
      // }

      // const obj1 = {
      //   type: "sealApplicant",
      //   data: sealApplicant,
      //   isDown
      // };
      // const obj2 = {
      //   type: "sealInfo",
      //   data: sealInfo,
      //   isDown
      // };
      // this.$store.commit("sealUp/changeTotalSubmitData", obj1);
      // this.$store.commit("sealUp/changeTotalSubmitData", obj2);
      //this.$router.push('/sealUp/sealUpAddFile')
    },
    delArr(num) {
      this.$store.commit("sealUp/delAddApplyLists", num);
    },
    addApply() {
      if (this.addApplyLists.length >= 2) {
        return Toast("最多只能添加2个申请人！");
      } else {
        // this.$router.push("/sealUp/sealUpAddApply");
        this.showAddApply = true;
      }
    }
  }
};
</script>

<style lang='less' scoped>
.seal-up-adds {

  .btn {
    width: 100%;
    height: 30px;
    background-color: #309de5;
  }
  min-height: calc(100vh - 44px);
  padding-bottom: 160px;
  background: #f5f5f5;
  /deep/ .box {
    padding: 0 4px;
    color: red;
  }

  .item-tit {
    margin-top: 24px;
    text-indent: 16px;
    font-size: 16px;
    color: #333;
  }
  .apply-info {
    background-color: #fff;
    margin: 16px;
  }
  .add-form {
    padding: 0 10px;
    background: #fff;
  }
  .add-apply-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;

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
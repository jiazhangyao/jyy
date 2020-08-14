<template>
  <div class="seal-up-add">
    <NavBar :navTitle="title" :goBack="goBack" />
    <section v-if="curNav ==='layout'">
      <DetailNav></DetailNav>
    </section>
    <section v-if="curNav ==='history'">
      <lists :listData="historySealUpDataShow"></lists>
    </section>
    <div v-if="curNav ==='orderHouse'">
      <section>
        <lists :listData="addNavData"></lists>
      </section>
    </div>
    <div v-if="curNav ==='sealInfo'">
      <section>
        <lists :listData="maps"></lists>
      </section>
      <!-- <section>
      <lists :listData="maps" :listWrapCls="listWrapCls" :listWrapText="listWrapText">
        <template v-slot:listWrap="scope">
          <h4 :class="scope.cls.type">{{scope.text.type}}</h4>
          <div :class="scope.cls.info">{{scope.text.info}}</div>
          <div :class="scope.cls.del">{{scope.text.del}}</div>
        </template>
      </lists>
      </section>-->
      <section v-for="(item, i) in addApplyLists" :key="i">
        <lists
          :listData="item.applyListsAdd"
          :listWrapCls="listWrapCls"
          :listWrapText="listWrapText"
        >
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
    </div>
    <section class="imgs" v-if="curNav ==='material'">
      <div v-for="(item, index) in materials" :key="index">
        <ImgUploader :label="item.name" :onFileChange="bindFileChange(item.id)" />
      </div>
    </section>
    <FooterBtn :save="add" :curNav="curNav" />
  </div>
</template>

<script>
import NavBar from "@/components/navBar.vue";
import nav from "@/mixins/navBar.js";
import AutoForm from "@forms/AutoForm";
import Lists from "./components/lists";
import Button from "./components/button";
import { getSealUpType } from "../../service/sealUp";
import ImgUploader from "@/components/imgUploader.vue";
import { mapState, mapMutations } from "vuex";
import { materials } from "./consts/app";
import DetailNav from "./detailNav";
import FooterBtn from "./components/footerBtn";
export default {
  mixins: [nav],
  components: {
    Lists,
    Button,
    AutoForm,
    ImgUploader,
    DetailNav,
    NavBar,
    FooterBtn
  },
  async created() {
    if (this.registerType === 4060) {
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
    const types = await getSealUpType();
    const {
      data: { name }
    } = types;
    this.maps[0][1] = name;
    this.maps[1][1] = this.$store.state.sealUp.sealUpType;
    this.$set(this.maps, [0][1], this.$store.state.sealUp.sealUpType);
  },
  computed: {
    ...mapState({
      addApplyLists: state => state.sealUp.addApplyLists,
      addNavData: state => state.sealUp.addNavData,
      registerType: state => state.sealUp.registerType,
      curNav: state => state.sealUp.curNav,
      historySealUpDataShow: state => state.sealUp.historySealUpDataShow
    })
  },
  data() {
    return {
      title: "不动产信息查询(2/2)",
      form: {},
      materials,
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
          value: "2022-05-05",
          hidden: false,
          required: false
        },
        {
          type: 5,
          key: "endTime",
          label: "查封结束时间",
          dateType: "date",
          value: "2022-05-05",
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
    ...mapMutations("sealUp", ["changeCurNav"]),
    goBack() {
      console.log("TODO print by jxl", "goBack", this.curNav);

      this.curNav === "layout"
        ? this.$router.back()
        : this.changeCurNav("layout");
    },
    add() {
      //产权信息
      let estateInfo = this.$store.state.sealUp.estateSealDTOObj;
      //查封信息
      let sealInfo = {
        closeDownOrg: this.maps[0][1],
        closeDownType: this.maps[1][1],
        ...this.form
      };
      //申请人信息
      let applicantList = [];
      for (let ele of this.addApplyLists) {
        const { applyListsAdd } = ele
        applicantList.push({ name: applyListsAdd[0][0], mobile: applyListsAdd[1][1], cardType: 12, cardNo: applyListsAdd[0][1]})
      }
      const sealApplicant = { applicantList };
      //材料上传列表
      let materialList = this.materialList;
      //历史信息
      let externalSealingInfo = this.$store.state.sealUp.historySealUpData;
      //总传参
      let params = {};
      const paramsAdd = {
        registerType: this.registerType,
        estateInfo,
        sealInfo,
        sealApplicant,
        materialList
      };
      if (this.registerType === 4050 || this.registerType === 4060) {
        params = {
          ...paramsAdd,
          externalSealingInfo
        };
      } else {
        params = paramsAdd;
      }
      this.$store.dispatch("sealUp/addFormSubmit", params);
    },
    delArr(num) {
      this.$store.commit("sealUp/delAddApplyLists", num);
    },
    addApply() {
      this.$router.push("/sealUp/sealUpAddApply");
    },
    bindFileChange(typeId) {
      return files => {
        let hasType = false;
        this.materialList = this.materialList || [];
        for (const item of this.materialList) {
          if (item.materialType == typeId) {
            item.fileList = files;
            hasType = true;
          }
        }
        // 当不存在该类型时，需要将此类型放入数据中
        if (!hasType) {
          this.materialList.push({ materialType: typeId, fileList: files });
        }
      };
    }
  },
  destroyed() {
    console.log("TODO print by jxldestory");

    this.changeCurNav("layout");
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
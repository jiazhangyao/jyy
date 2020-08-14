<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-obligee">
      <AddApplicant :name="title" :applicantList="applicantList" />
      <AddFamily :applicantList="applicantList" :familyList="familyList" v-bind="$attrs" />
      <div class="pt50" v-if="hasownedWay">
        <Input :value.sync="ownershipType" label="共有方式" disabled placeholder="-" />
        <div v-if="ownershipType=='按份额共有'">
          <div
            class="indent"
            v-for="(holdItem, holdItemIndex) in applicantList"
            :key="'holdItem'+holdItemIndex"
          >
            <Input
              input-align="right"
              v-model="holdItem.rightProportion"
              :label="holdItem.name"
              sufix="%"
              disabled
              placeholder="-"
            />
          </div>
        </div>
        <Input :value.sync="holdingType" label="持证方式" disabled placeholder="-" />
        <div v-if="holdingType=='共同持证'">
          <Input input-align="right" label="持证人" :value="holders" disabled placeholder="-" />
        </div>
      </div>
      <footer @click="goNext">
        <FullButton name="下一项" cls="water-edit-footer-btn" />
      </footer>
    </div>
  </div>
</template>

<script>
import Input from "@/components/input.vue";
import NavBar from "@/components/navBar.vue";
import AddApplicant from "./components/addApplicant.vue";
import AddFamily from "./components/addFamily.vue";
import FullButton from "@/components/fullButton.vue";
import { mapGetters } from "vuex";
import { ownershipTypeConst, holdingTypeConst } from "../const";
import businessMix from "@/mixins/business.js";
export default {
  mixins: [businessMix],
  data() {
    return {
      value: "",
      show: false,
      applicantList: [],
      familyList: [],
      ownershipType: "",
      holdingType: "",
      ownershipTypeConst: ownershipTypeConst,
      holdingTypeConst: holdingTypeConst
    };
  },
  ...mapGetters(["dict"]),
  props: {
    title: {},
    changeComponent: {},
    updateForm: {},
    form: { default: { obligeeInfo: { applicantList: [] } } }
  },
  computed: {
    holders() {
      let holders = this.applicantList.filter(item => item.isHolder);
      return holders ? holders[0].name : "-";
    }
  },
  methods: {},
  watch: {},
  mounted() {
    let {
      applicantList,
      familyList,
      ownershipType,
      holdingType
    } = this.form.obligeeInfo;
    this.applicantList = applicantList.length ? applicantList : [{}];
    this.familyList = familyList ? familyList : [{}];

    let holding = this.holdingTypeConst.find(item => item.key == holdingType);
    let ownership = this.ownershipTypeConst.find(
      item => item.key == ownershipType
    );
    this.holdingType = holding ? holding.name : "";
    this.ownershipType = ownership ? ownership.name : "";
  },
  created() {},
  components: {
    Input,
    FullButton,
    AddApplicant,
    AddFamily
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-obligee {
  padding-bottom: 88px;
  .pt50 {
    padding-top: 50px;
  }
  footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    .button {
      display: block;
      line-height: 48px;
      margin: auto;
      text-align: center;
    }
  }
}
</style>
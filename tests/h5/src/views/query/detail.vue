<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="water-detail">
      <Title name="权属信息"/>
      <div>
        <Input label="产权证号" :value="form.ownershipNumber" :disabled="disabled"/>

        <Input label="共有情况" :value="form.commonOwner" :disabled="disabled"/>
        <Input label="权属取得方式" :value="form.way" :disabled="disabled"/>
      </div>
      <Title name="所有权人信息"/>
      <div>
        <Input label="所有权人" :value="form.ownership" :disabled="disabled"/>
        <Input label="证件类型" :value="form.certificateType" :disabled="disabled"/>
        <Input label="证件号码" :value="form.certificateNumber" :disabled="disabled"/>
      </div>
      <Title name="产权信息"/>
      <div>
        <Input label="建筑面积（㎡）" :value="form.architectureArea" :disabled="disabled"/>
        <Input label="楼层/总楼层" :value="floor" :disabled="disabled"/>
        <Input label="土地用途" :value="form.landUsage" :disabled="disabled"/>
        <Input label="土地使用年限" :value="form.landRightDeadline" :disabled="disabled"/>
        <Input label="房屋坐落" :value="form.location" :disabled="disabled"/>
        <Input label="房屋用途" :value="form.planUsage" :disabled="disabled"/>
        <Input label="竣工日期" :value="form.terminateDate" :disabled="disabled"/>
      </div>
      <Title name="抵押限制信息"/>
      <div>
        <Input label="是否有抵押" :value="form.isMortgage" :disabled="disabled"/>
        <Input label="是否有协议" :value="form.isFrozen" :disabled="disabled"/>
        <Input label="是否有查封" :value="form.isEalup" :disabled="disabled"/>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/formTitle.vue";
import { Toast } from "vant";
import Input from "@/components/input.vue";
import selectMix from "@/mixins/selectPage.js";
import SelectPage from "@/components/selectPage.vue";
import { GetQuery } from "@/service/common";

export default {
  mixins: [selectMix],
  data() {
    return {
      title: "不动产信息查询",
      type: "", //类型
      disabled: true,
      form: {
        ownershipNumber: "",
        commonOwner: "",
        way: "",
        ownership: "",
        certificateType: "",
        certificateNumber: "",

        architectureArea: "",
        totalFloor: "",
        landUsage: "",
        landRightDeadline: "",
        location: "",
        planUsage: "",
        terminateDate: "",

        isMortgage: "",
        isFrozen: "",
        isEalup: ""
      }
    };
  },
  computed: {
    floor() {
      return `${this.form.locateFloor || "-"}/${this.form.totalFloor || "-"}`;
    }
  },
  created() {
    this.form = this.$route.params;
  },
  components: {
    Title,
    Input,
    SelectPage,
    Toast
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.dis_bottom {
  bottom: 0;
  padding: 0 16px;
}

.water-detail {
  min-height: calc(100vh - 44px);
  // background:rgba(203,210,222,.20);
}

.bgf {
  padding: 16px 16px 32px;
  font-size: 13px;

  a {
    color: #0061ff;
  }
}

.action-btn {
  padding: 13px;
  border-radius: 2px;
  margin-bottom: 8px;
  font-size: 14px;

  &.action-btn-1 {
    position: relative;

    &:after {
      content: "";
      left: 0;
      top: 0;
      position: absolute;
      width: 200%;
      height: 200%;
      transform-origin: 0 0;
      transform: scale(0.5, 0.5);
      border: 1Px solid #5d6471;
    }

    color: #5d6471;
  }

  &.action-btn-2 {
    background: #0061ff;
    color: #fff;
  }
}
</style>
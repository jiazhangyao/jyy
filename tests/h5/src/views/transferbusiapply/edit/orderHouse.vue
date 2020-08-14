<template>
  <div>
    <NavBar :navTitle="componentTitle" :goBack="goBack" />
    <div class="bisiapply-edit-orderHouse">
      <div v-for="(item, index) in orderHouseLabels" :key="index">
        <van-field
          input-align="right"
          :disabled="item.disabled"
          :label="item.label"
          :value="item.value ? item.value() : orderHouse[item.key]"
          placeholder="-"
          :type="item.type || 'text'"
          autosize
           rows="1"
        >
          <div
            v-if="item.sufix"
            slot="right-icon"
            size="small"
            type="primary"
            :style="{ 'color': '#5d6471'}"
          >{{item.sufix}}</div>
        </van-field>
      </div>
    </div>

    <Footer :whichEdit="whichEdit" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import businessMix from "@/mixins/business.js";
import NavBar from "@/components/navBar.vue";
import { Button, Field } from "vant";
import Footer from "./components/footer.vue";
export default {
  mixins: [businessMix],
  data() {
    return {};
  },
  computed: {
    ...mapState("transferbusiapply", [
      "transferbusiapplyForm",
      "componentTitle"
    ]),
    ...mapState({
      orderHouse: function(state) {
        if (this.transferbusiapplyForm.registerType == 5010) {
          let orderLand = this.transferbusiapplyForm.orderLand || {};
          let landUsage = state.base.dict.landUsage.find(
            item => item.key == orderLand.tdyt
          );
          let PlanUse = state.base.dict.planUsage.find(
            item => item.key == orderLand.planUse
          );
          orderLand.usagedesc =
            (landUsage ? landUsage.name : "-") +
            "/" +
            (PlanUse ? PlanUse.name : "-");
          return orderLand;
        } else {
          let orderHouse = this.transferbusiapplyForm.orderHouse || {};
          let landUsage = state.base.dict.landUsage.find(
            item => item.key == orderHouse.landUsage
          );
          let PlanUse = state.base.dict.planUsage.find(
            item => item.key == orderHouse.planUse
          );
          orderHouse.usagedesc =
            (landUsage ? landUsage.name : "-") +
            "/" +
            (PlanUse ? PlanUse.name : "-");
          return orderHouse;
        }
      }
    }),
    orderHouseLabels() {
      let canEdit = !this.canEdit();
      console.log(this.orderHouse.rightHolder);
      
      switch (this.transferbusiapplyForm.registerType) {
        case 5010:
          return [
            {
              disabled: canEdit,
              key: "zddm",
              label: "不动产证号"
            },
            {
              disabled: canEdit,
              key: "tdzl",
              label: "坐落",
              type: "textarea"
            },
            {
              disabled: canEdit,
              key: "rightHolder",
              label: "权利人姓名/名称"
            },
            {
              disabled: canEdit,
              key: "usagedesc",
              label: "土地用途/房屋用途"
            },
            {
              disabled: canEdit,
              key: "jzzdmj",
              label: "宗地面积/建筑面积",
              sufix: "㎡"
            }
          ];

        default:
          return [
            {
              disabled: canEdit,
              key: "warrantNumber",
              label: "不动产证号",
              type: "textarea"
            },
            {
              disabled: canEdit,
              key: "location",
              label: "坐落",
              type: "textarea"
            },
            {
              disabled: canEdit,
              key: "propertyPerson",
              label: "权利人姓名/名称"
            },
            {
              disabled: canEdit,
              key: "usagedesc",
              label: "土地用途/房屋用途"
            },
            {
              disabled: canEdit,
              key: "space",
              label: "宗地面积/建筑面积",
              sufix: "㎡"
            }
          ];
      }
    }
  },
  watch: {},
  mounted() {},
  created() {},
  components: {
    Button,
    [Field.name]: Field,
    Footer
  }
};
</script>
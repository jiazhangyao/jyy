<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-orderHouse">
      <div v-for="(orderHouse, orderHouseIndex) in orderHouseList" :key="orderHouseIndex">
        <div class="title" v-if="form.registerType==11">
          产权{{orderHouseIndex+1}}
          <Icon name="delete" color="#333" @click="delOrderHouse(orderHouseIndex)" />
        </div>
        <div v-for="(item, index) in orderHouseLabels" :key="index">
          <div v-if="item.key=='fullAddress'">
            <AreaPopup
              label="房屋坐落"
              :address="orderHouse.address"
              :countyId="orderHouse.regionId"
              :onFinish="onFill(orderHouseIndex)"
              :required="item.required"
            />
          </div>
          <div v-else-if="item.key=='planUseDesc'">
            <planUse
              :planValue="orderHouse.planUse"
              :usages="planUse"
              :onFinish="onPlanUseFill(orderHouseIndex)"
            />
          </div>
          <div v-else-if="item.key=='isLost'">
            <div
              @click="changeS(lostDict, ('orderHouseList.' + orderHouseIndex + '.isLost'),item.label, orderHouse.isLost)"
            >
              <Input
                input-align="right"
                :value.sync="orderHouse.isLost"
                :label="item.label"
                placeholder="请选择"
                icon="arrow"
                :required="item.required"
                disabled
              />
            </div>
          </div>
          <div v-else-if="item.key=='landUsageDesc'">
            <div
              @click="changeS(landUsage,('orderHouseList.' + orderHouseIndex + '.landUsageDesc'),'土地用途', orderHouse.landUsageDesc)"
            >
              <Input
                input-align="right"
                :value.sync="orderHouse.landUsageDesc"
                label="土地用途"
                placeholder="请选择"
                icon="arrow"
                :required="item.required"
                disabled
              />
            </div>
          </div>
          <div v-else-if="item.key=='houseStructureDesc'">
            <div
              @click="changeS(houseStructure,('orderHouseList.' + orderHouseIndex + '.houseStructureDesc'),'房屋结构', orderHouse.houseStructureDesc)"
            >
              <Input
                input-align="right"
                :value.sync="orderHouse.houseStructureDesc"
                label="房屋结构"
                placeholder="请选择"
                icon="arrow"
                :required="item.required"
                disabled
              />
            </div>
          </div>
          <div v-else>
            <Input
              :label="item.label"
              :value.sync="orderHouse[item.key]"
              :required="item.required"
              :sufix="item.sufix"
            />
          </div>
        </div>
      </div>
      <Button v-if="form.registerType==11" class="border-btn" @click="addOrderHouse">添加产权</Button>
      <footer @click="finish(orderHouseList)">
        <FullButton name="完成" cls="water-edit-footer-btn" />
      </footer>
    </div>
    <!-- 两个select都选的情况下， -->
    <SelectPage
      :show="select_show"
      v-if="select_show"
      :select="select_arr"
      v-on:pageChange="pageChange"
      v-on:hideSelect="hideSelect"
      :propsValue="propsValue"
      nextPage="three"
    />
  </div>
</template>

<script>
import AreaPopup from "./components/areaPopup.vue";
import planUse from "./components/planUse.vue";
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import businessMix from "@/mixins/business.js";
import NavBar from "@/components/navBar.vue";
import { CellGroup, Field, Button, Toast, SwitchCell, Icon } from "vant";
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
import { orderHouseLabels } from "../const.js";

export default {
  mixins: [selectMix, businessMix],
  data() {
    return {
      lostDict: [{ id: 1, name: "是" }, { id: 0, name: "否" }],
      orderHouseLabels: orderHouseLabels[this.form.registerType],
      hasClose: false,
      show: false,
      orderHouseList: [],
      landUsage: [], //土地用途字典
      planUse: [], // 规划用途字典
      houseStructure: [] //房屋结构字典
    };
  },
  props: ["title", "changeComponent", "updateForm", "form"],
  computed: {},
  methods: {
    pageChange(select, index, item) {
      if (select) {
        let keys = this.select_key.split(".");
        this[keys[0]][keys[1]][keys[2]] = select;
      }
      this.hideSelect();
    },
    delOrderHouse(index) {
      if (index == 0) {
        this.orderHouseList = [{}];
      } else {
        this.orderHouseList.splice(index, 1);
      }
    },
    addOrderHouse() {
      this.orderHouseList.push({});
    },
    finish(orderHouseList) {
      for (const orderHouse of orderHouseList) {
        orderHouse.isLost = orderHouse.isLost == "是" ? 1 : 0;
        orderHouse.landUsageDesc &&
          (orderHouse.landUsage = this.arrGet(
            this.landUsage,
            orderHouse.landUsageDesc,
            "key"
          ));
        orderHouse.houseStructureDesc &&
          (orderHouse.houseStructure = this.arrGet(
            this.houseStructure,
            orderHouse.houseStructureDesc,
            "key"
          ));
      }
      let res = this.orderHouseValid(orderHouseList);
      if (res.result) {
        this.updateForm({ orderHouseList });
        this.goBack();
      } else {
        Toast(res.msg);
      }
    },
    onFill(index) {
      return (regionId, address, fullAddress) => {
        this.orderHouseList[index] = Object.assign(this.orderHouseList[index], {
          regionId,
          address,
          fullAddress
        });
      };
    },
    onPlanUseFill(index) {
      return (planUse, planUseDesc) => {
        this.orderHouseList[index] = Object.assign(this.orderHouseList[index], {
          planUse,
          planUseDesc
        });
      };
    }
  },
  watch: {},
  mounted() {
    this.orderHouseList =
      this.form.orderHouseList && this.form.orderHouseList.length
        ? this.form.orderHouseList
        : [{}];
    this.landUsage = this.$store.getters.dict["landUsage"];
    this.planUse = this.$store.getters.dict["planUse"];
    this.houseStructure = this.$store.getters.dict["houseStructure"];
    for (const orderHouse of this.orderHouseList) {
      orderHouse.isLost = orderHouse.isLost == 0 ? "否" : "是";
    }
  },
  created() {},
  components: {
    "van-cell-group": CellGroup,
    Field,
    Button,
    Toast,
    Input,
    FullButton,
    SelectPage,
    AreaPopup,
    planUse,
    Icon,
    "van-switch-cell": SwitchCell
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-orderHouse {
  padding-bottom: 120px;
  .title{
    font-size: 12px;
    color: #5D6471;
    line-height: 48px;
    border-bottom: 1px solid #cbd2de;
    padding: 0 16px;
    background: rgba(203, 210, 222, 0.2);
    .van-icon {
      line-height: 48px;
      float: right;
    }
  }
  .border-btn {
    display: block;
    background: #ffffff;
    border: 1Px solid #0061ff;
    border-radius: 2px;
    min-width: 160px;
    height: 36px;
    line-height: 36px;
    font-size: 15px;
    color: #0061ff;
    margin: 32px auto;
  }
  footer {
    position: absolute;
    bottom: 40px;
    width: 100%;
    .button {
      display: block;
      width: 343px;
      line-height: 48px;
      margin: auto;
      text-align: center;
    }
  }
}
</style>
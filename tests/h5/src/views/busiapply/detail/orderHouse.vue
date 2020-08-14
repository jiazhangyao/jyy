<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-orderHouse">
      <div v-for="(orderHouse , orderHouseIndex) in orderHouseList" :key="orderHouseIndex">
        <div v-for="(item, index) in orderHouseLabels" :key="index">
          <Input
            disabled
            :label="item.label"
            :value="getOrderHouseValue(orderHouse[item.key], item.key)"
            placeholder="-"
            :sufix="item.sufix"
          />
        </div>
      </div>
      <footer @click="goNext">
        <FullButton name="下一项" cls="water-edit-footer-btn" />
      </footer>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navBar.vue";
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
import businessMix from "@/mixins/business.js";
import { orderHouseLabels } from "../const.js";
export default {
  mixins: [businessMix],
  data() {
    return {
      orderHouseList: {},
      orderHouseLabels: orderHouseLabels[this.$route.query.type]
    };
  },
  props: ["title", "changeComponent", "form"],
  computed: {},
  methods: {
    getOrderHouseValue(value, key) {
      if (key == "isLost") {
        return value == 1 ? "是" : "否"; // 0-否 1-是
      } else {
        return value;
      }
    }
  },
  watch: {},
  mounted() {
    if (this.form) {
      this.orderHouseList =
        this.form.orderHouseList && this.form.orderHouseList.length
          ? this.form.orderHouseList
          : [{}];
    }
  },
  created() {},
  components: {
    Input,
    FullButton
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-orderHouse {
  padding-bottom: 120px;
  footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    .button {
      display: block;
      width: 100%;
      line-height: 48px;
      margin: auto;
      text-align: center;
    }
  }
}
</style>
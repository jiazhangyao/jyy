<template>
  <div>
    <div @click="showPopup">
      <Input :label="label" :value="val" required disabled placeholder="请补充" right-icon="arrow" />
    </div>
    <div class="area-wrap" v-if="show">
      <NavBar :navTitle="label" :goBack="hideArea" />
      <div @click="isPopShow=true">
        <Input label="选择区域" :value="fullOrigin" required disabled />
      </div>
      <Input label="详细地址" :value.sync="newAddress" required />
      <footer class="dis_bottom dis_bottom_action_one" @click="finish">
        <FullButton name="完成" cls="water-edit-footer-btn" />
      </footer>
      <Popup v-model="isPopShow" position="bottom">
        <div class="action">
          <span @click="isPopShow=false">取消</span>
          <span class="fr" @click="triggerChange">确定</span>
        </div>
        <van-row>
          <van-col span="8">
            <van-picker :columns="provinceArr" :default-index="0" @change="onProvinceChange" />
          </van-col>
          <van-col span="8">
            <van-picker :columns="cityArr" :default-index="0" @change="onCityChange" />
          </van-col>
          <van-col span="8">
            <van-picker
              :columns="countyArr"
              :default-index="countyIndex || 0"
              @change="onCountyChange"
            />
          </van-col>
        </van-row>
      </Popup>
    </div>
  </div>
</template>
<script>
import { Popup, Area, Toast, Picker, Row, Col } from "vant";
import Input from "@/components/input.vue";
import { regions } from "@/service/business";
import FullButton from "@/components/fullButton.vue";
export default {
  name: "areaPopup",
  components: {
    Input,
    Popup,
    Area,
    "van-picker": Picker,
    "van-col": Col,
    "van-row": Row,
    Toast,
    FullButton
  },
  props: ["label", "address", "countyId", "onFinish"],
  data() {
    return {
      fullOrigin: "",
      show: false,
      isPopShow: false,
      provinceArr: [],
      cityArr: [],
      countyArr: [],
      provinceOriArr: [],
      cityOriArr: [],
      countyOriArr: [],
      countyIndex: 0,
      cityIndex: 0,
      provinceIndex: 0,
      newAddress: this.address
    };
  },
  watch: {
    countyOriArr(curVal) {
      curVal.forEach((item, index) => {
        if (item.id == this.countyId) {
          this.countyIndex = index;
          this.onCountyChange(null, null, index);
          this.triggerChange();
        }
      });
    }
  },
  computed: {
    val() {
      return (this.fullOrigin || "") + (this.newAddress || "");
    }
  },
  methods: {
    getFullOrigin() {
      let province = this.provinceOriArr[this.provinceIndex] || {};
      let city = this.cityOriArr[this.cityIndex] || {};
      let county = this.countyOriArr[this.countyIndex] || {};
      return (province.name || "") + (city.name || "") + (county.name || "");
    },
    triggerChange() {
      this.fullOrigin = this.getFullOrigin();
      this.isPopShow = false;
    },
    hideArea() {
      this.show = false;
    },
    finish() {
      this.onFinish(
        this.countyOriArr[this.countyIndex].id,
        this.newAddress,
        this.val
      );
      this.hideArea();
    },
    onProvinceChange(picker, value, index) {
      this.provinceIndex = index;
    },
    onCityChange(picker, value, index) {
      this.cityIndex = index;
    },
    onCountyChange(picker, value, index) {
      this.countyIndex = index;
    },
    showPopup() {
      this.show = true;
    },
    getCountyByCity(pId) {
      this.countyArr = [];
      regions(pId).then(({ success, msg, data }) => {
        this.countyOriArr = data;
        data.forEach((ele, index) => this.countyArr.push(ele.name));
      });
    },
    getCityByProvince(pId) {
      this.cityArr = [];
      regions(pId).then(({ success, msg, data }) => {
        this.cityOriArr = data;
        this.getCountyByCity(data[0].id);
        data.forEach((ele, index) => this.cityArr.push(ele.name));
      });
    }
  },
  mounted() {
    regions(0).then(({ success, msg, data }) => {
      this.provinceOriArr = data;
      this.provinceArr = [];
      this.getCityByProvince(data[0].id);
      data.forEach((ele, index) => this.provinceArr.push(ele.name));
    });
  }
};
</script>
<style lang="less" scoped>
.area-wrap {
  min-height: calc(100vh - 44px);
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 10000;
  width: 100%;
  background: #fff;
  .select-item {
    display: flex;
  }
}
.van-popup .action {
  font-size: 16px;
  color: #0066fe;
  padding: 16px 25px 0 25px;
  .fr {
    float: right;
  }
}
</style>



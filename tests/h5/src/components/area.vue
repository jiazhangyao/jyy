<template>
  <div>
    <div @click="isPopShow=true">
      <Field label="选择区域" :value="address" disabled placeholder="请选择区域" />
    </div>
    <Popup v-model="isPopShow" position="bottom">
      <div class="action">
        <span @click="isPopShow=false">取消</span>
        <span class="fr" @click="triggerChange">确定</span>
      </div>
      <van-row>
        <van-col span="8">
          <van-picker
            :columns="provinceArr"
            :default-index="provinceIndex"
            @change="onProvinceChange"
          />
        </van-col>
        <van-col span="8">
          <van-picker :columns="cityArr" :default-index="cityIndex" @change="onCityChange" />
        </van-col>
        <van-col span="8">
          <van-picker :columns="countyArr" :default-index="countyIndex" @change="onCountyChange" />
        </van-col>
      </van-row>
    </Popup>
  </div>
</template>
<script>
import { Popup, Area, Toast, Picker, Row, Col, Field } from "vant";
import Input from "@/components/input.vue";
import { dictRegions } from "@/service/common";
import FullButton from "@/components/fullButton.vue";
export default {
  name: "areaPopup",
  components: {
    Field,
    Input,
    Popup,
    Area,
    "van-picker": Picker,
    "van-col": Col,
    "van-row": Row,
    Toast,
    FullButton
  },
  props: ["provinceId", "cityId", "countyId", "onFinish"],
  data() {
    return {
      // UI相关
      isPopShow: false,

      // 请求接口返回的数据
      provinceOriArr: [],
      cityOriArr: [],
      countyOriArr: [],
      // vant需要的数据
      provinceArr: [],
      cityArr: [],
      countyArr: [],
      // 当前选中的index
      provinceIndex: 0,
      cityIndex: 0,
      countyIndex: 0,
      address: ""
    };
  },
  watch: {
    provinceOriArr(curVal) {
      this.provinceArr = ["请选择"];
      curVal.forEach((ele, index) => this.provinceArr.push(ele.name));
    },
    cityOriArr(curVal) {
      this.cityArr = ["请选择"];
      curVal.forEach((ele, index) => this.cityArr.push(ele.name));
    },
    countyOriArr(curVal) {
      this.countyArr = ["请选择"];
      curVal.forEach((ele, index) => this.countyArr.push(ele.name));
    }
  },
  computed: {},
  methods: {
    triggerChange() {
      if (
        this.provinceIndex < 1 ||
        this.cityIndex < 1 ||
        this.countyIndex < 1
      ) {
        Toast("地址未选择完整，请继续选择");
      } else {
        this.isPopShow = false;
        let province = this.provinceOriArr[this.provinceIndex - 1] || {};
        let city = this.cityOriArr[this.cityIndex - 1] || {};
        let county = this.countyOriArr[this.countyIndex - 1] || {};
        this.address =
          (province.name || "") + (city.name || "") + (county.name || "");
        if (this.onFinish) {
          this.onFinish({ province, city, county });
        }
      }
    },
    onProvinceChange(picker, value, index) {
      this.provinceIndex = index;
      this.getCityByProvince(this.provinceOriArr[index - 1].id);
    },
    onCityChange(picker, value, index) {
      this.cityIndex = index;
      this.getCountyByCity(this.cityOriArr[index - 1].id);
    },
    onCountyChange(picker, value, index) {
      this.countyIndex = index;
    },
    async getCountyByCity(cId, id) {
      await dictRegions(cId, 2).then(({ success, msg, data }) => {
        this.countyIndex = id ? this.getIndexById(id, data.list) + 1 : 0;
        this.countyOriArr = data.list;
      });
    },
    async getCityByProvince(pId, id) {
      await dictRegions(pId, 1).then(({ success, msg, data }) => {
        this.countyOriArr = [];
        this.countyIndex = 0;
        this.cityIndex = id ? this.getIndexById(id, data.list) + 1 : 0;
        this.cityOriArr = data.list;
      });
    },
    async getProvince(id) {
      await dictRegions().then(({ success, msg, data }) => {
        this.cityOriArr = [];
        this.countyOriArr = [];
        this.cityIndex = 0;
        this.countyIndex = 0;
        this.provinceIndex = id ? this.getIndexById(id, data.list) + 1 : 0;
        this.provinceOriArr = data.list;
      });
    },
    getIndexById(id, arr) {
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].id == id) {
          return index;
        }
      }
    }
  },
  mounted() {
    this.getProvince(this.provinceId).then(() => {
      if (this.cityId && this.countyId) {
        this.getCityByProvince(this.provinceId, this.cityId).then(() => {
          this.getCountyByCity(this.cityId, this.countyId).then(() => {
            this.triggerChange();
          });
        });
      }
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



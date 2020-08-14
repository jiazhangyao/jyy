<template>
  <div>
    <div @click="isPopShow=true">
      <Input label="规划用途" :value="result" disabled placeholder="请选择" icon="arrow" />
    </div>
    <Popup v-model="isPopShow" position="bottom">
      <div class="action">
        <span @click="isPopShow=false">取消</span>
        <span class="fr" @click="triggerChange">确定</span>
      </div>
      <van-row>
        <van-col :span="spanSize" v-for="(item, index) of planUse" :key="index">
          <van-picker
            :columns="planUse[index]"
            :default-index="planUseIndex[index]"
            @change="onChange(...arguments,index)"
          />
        </van-col>
      </van-row>
    </Popup>
  </div>
</template>
<script>
import { Popup, Toast, Picker, Row, Col } from "vant";
import Input from "@/components/input.vue";
import { dictRegions } from "@/service/common";
import FullButton from "@/components/fullButton.vue";
export default {
  name: "planUsePopup",
  components: {
    Input,
    Popup,
    "van-picker": Picker,
    "van-col": Col,
    "van-row": Row,
    Toast,
    FullButton
  },
  props: ["planValue", "usages", "onFinish"],
  data() {
    return {
      // UI相关
      isPopShow: false,

      // 请求接口返回的数据
      // planUse:[
      //   [{第一列数据}, {第二列数据}, {第三列数据}]
      // ]
      planUse: [],
      planUseIndex: [0, 0, 0, 0, 0],
      lastIndex: 0,
      result: ""
    };
  },
  watch: {},
  computed: {
    spanSize() {
      let planUseLen = this.planUse.length;
      return planUseLen == 0 ? 24 : 24 / planUseLen;
    }
  },
  methods: {
    /**
     * @author: jixuelian
     * @description: 选择器被选择时触发，index的数值更新值。并检查是否需要更新planUse的值
     * @param {type}
     * @return:
     */
    onChange(picker, values, valueIndex, column) {
      this.planUseIndex[column] = valueIndex;
      for (let index = column + 1; index < this.planUseIndex.length; index++) {
        this.planUseIndex[index] = 0;
      }
      this.initPicker(this.planUseIndex);
    },
    /**
     * @author: jixuelian
     * @description: 检查当前的选择器是否有子数组，根据已有的index数据，遍历重新更改planUse
     * @param {type}
     * @return:
     */
    initPicker(indexArr) {
      this.planUse = [];

      let index = -1;
      let setArr = curArr => {
        if (curArr.length) {
          this.planUse.push(["请选择", ...curArr.map(item => item.label)]);
          index++;
          let curIndex = indexArr[index] - 1;
          if (curIndex > -1) {
            curArr[curIndex] &&
              curArr[curIndex].children &&
              setArr(curArr[curIndex].children);
          }
        }
      };
      setArr(this.usages);
    },
    /**
     * @author: jixuelian
     * @description: 确定选择项的时候触发，此处要获取当前已有的数据，如果选择没有完成，则会提示未完成，要求继续选择，否则关闭弹层回显数据
     * @param {type}
     * @return:
     */
    triggerChange() {
      let ids = [];
      let names = [];
      let planLength = this.planUse.length;
      // 判断是否完成，已经选择的index列表，小于可选择的列表，示意未完成
      if (this.planUseIndex.length < planLength) {
        Toast("请继续选择");
      } else {
        let curArr = this.usages;
        for (let index = 0; index < this.planUseIndex.length; index++) {
          let curItem = curArr[this.planUseIndex[index] - 1];
          ids.push(curItem.value);
          names.push(curItem.label);

          curArr = curItem.children;
          if (!curArr) {
            break;
          }
        }
        this.isPopShow = false;
        this.result = this.planUse[planLength - 1][
          this.planUseIndex[planLength - 1]
        ];
        if (this.onFinish) {
          this.onFinish(ids.join(","), names.join("/"));
        }
      }
    },

    getIndexById(id, arr) {
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].value == id) {
          return index;
        }
      }
    }
  },
  mounted() {
    this.planUse = [];
    this.planUseIndex = [];
    if (this.planValue) {
      // 根据ID拿数据
      // 如果有预制值，则根据值获取对应的index值
      let selectIds = this.planValue.split(",");
      let curArr = this.usages;
      for (let id of selectIds) {
        let defaultIndex = this.getIndexById(id, curArr);
        this.planUse.push(["请选择", ...curArr.map(item => item.label)]);
        this.planUseIndex.push(defaultIndex + 1);
        curArr = curArr[defaultIndex].children;
      }
      this.triggerChange();
    } else {
      // 拿第一个数据
      let indexArr = [0, 0, 0, 0, 0];
      if (this.$store.getters.dict["planUse"].length) {
        this.planUse.push([
          "请选择",
          ...this.$store.getters.dict["planUse"].map(item => item.label)
        ]);
      }
    }
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



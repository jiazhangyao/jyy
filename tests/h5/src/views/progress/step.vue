<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="progress">
      <SelectPage
        :show="select_show"
        :select="select_arr"
        v-on:pageChange="pageChange"
      v-on:hideSelect="hideSelect"
        :propsValue="select_key"
        nextPage="three"
      />
      <div>
        <Steps :at="1"/>
        <div class="progress-step">
          <div>
            <div @click="changeS(arr_1,'registerType','登记类型')">
              <Input
                label="登记类型"
                :value.sync="registerType"
                readonly
                icon="arrow"
                placeholder="请选择"
              />
            </div>
            <Input label="工单编号" :value.sync="orderNo"/>
            <div @click="changeS(arr_2,'role','选择角色')">
              <Input label="角色" :value.sync="role" readonly icon="arrow" placeholder="请选择"/>
            </div>
            <Input label="姓名" :value.sync="name"/>
            <div @click="changeS(arr_3,'certType','证件类型')">
              <Input label="证件类型" :value.sync="certType" readonly icon="arrow" placeholder="请选择"/>
            </div>
            <Input label="证件号码" :value.sync="certNo"/>
            <div class="footer" @click="travelNext">
              <FullButton name="下一步" cls="water-edit-footer-btn"/>
            </div>
          </div>
        </div>
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
import FullButton from "@/components/fullButton.vue";
import Steps from "@/components/steps.vue";
import { ProcessCheck } from "@/service/common";

export default {
  mixins: [selectMix],
  computed: {
    arr_1() {
      return this.$store.getters.dict["registerTypeAll"];
    },
    arr_2() {
      return this.$store.getters.dict["applicantType"];
    },
    arr_3() {
      return this.$store.getters.dict["cardType"];
    },
    title() {
      if (this.select_show) {
        return this.selectTitle;
      } else {
        return "业务进度查询（1/3)";
      }
    }
  },
  data() {
    return {
      orderNo: "", //SHS2018092800003
      certNo: "", //320682199101020002
      certType: "", //1
      name: "", //义务人2
      registerType: "", //10
      role: "" //2
    };
  },
  methods: {
    travelNext() {
      if (!this.registerType) {
        Toast("请选择登记类型");
        return false;
      }
      if (!this.orderNo) {
        Toast("请输入工单编号");
        return false;
      }
      if (!this.role) {
        Toast("请选择角色");
        return false;
      }
      if (!this.name) {
        Toast("请输入姓名");
        return false;
      }
      if (!this.certType) {
        Toast("请选择证件类型");
        return false;
      }
      if (!this.certNo) {
        Toast("请输入证件号码");
        return false;
      }

      const config = {
        orderNo: this.orderNo,
        certNo: this.certNo,
        certType: this.arrGet(this.arr_3, this.certType, "key"),
        name: this.name,
        registerType: this.arrGet(this.arr_1, this.registerType, "key"),
        role: this.arrGet(this.arr_2, this.role, "key")
      };

      // var fake = {
      //     orderNo: 'SHS2018092800003',
      // certNo:'320682199101020002',
      // certType:'1',
      // name:'义务人2',
      // registerType:'10',
      // role:'2',
      // }
      ProcessCheck(config).then(res => {
        if (res.success && res.data.isValidate) {
          this.$store.commit("SET_PARAM", config);
          sessionStorage.setItem("progressParams", JSON.stringify(config));
          this.$router.push("/progress/face");
        } else if (!res.data.isValidate) {
          Toast(res.data.validateDesc);
        }
      });
    }
  },
  components: {
    Steps,
    Title,
    Input,
    SelectPage,
    Toast,
    FullButton
  }
};
</script>

<style lang="less" scoped>
.progress-step {
  margin-top: 12px;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
<style lang="less">
.input_ .van-field__right-icon {
  padding-right: 5px;
}
</style>
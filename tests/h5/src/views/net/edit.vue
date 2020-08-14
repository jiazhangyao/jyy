<template>
  <div>
    <NavBar :navTitle="title" />
    <SelectPage
      :show="select_show"
      :select="select_arr"
      v-on:pageChange="pageChange"
      v-on:hideSelect="hideSelect"
      :propsValue="select_key"
      nextPage="three"
    />
    <div>
      <Input label="工单编号" :value.sync="form.orderNo" disabled />
      <Input label="登记类型" :value.sync="form.registerType_fake" disabled />
      <Input label="产权证号" :value.sync="form.warrantNumbers" disabled />
      <Input label="预约人姓名" :value.sync="baseinfo.fullName" />
      <Input label="预约人身份证号" :value.sync="baseinfo.identity" />
      <Input label="预约人手机号" :value.sync="baseinfo.phone" />
      <div @click="changeS(branch_arr,'reserveBranchId','受理网点')">
        <Input label="受理网点" :value.sync="form.name" readonly icon="arrow" placeholder="请选择" />
      </div>
      <div @click="show=true">
        <Input label="预约日期" :value.sync="form.reserveDate" readonly icon="arrow" placeholder="请选择" />
      </div>
      <div @click="changeData">
        <Input label="预约时间段" :value.sync="form.timePeriod" readonly icon="arrow" placeholder="请选择" />
      </div>
      <div class="water-edit-footer" @click="travelNext">
        <FullButton name="提交" cls="water-edit-footer-btn" />
      </div>
    </div>
    <Popup v-model="show" position="bottom">
      <DatetimePicker
        v-model="currentDate"
        :min-date="new Date()"
        type="date"
        class="date"
        @cancel="show=false"
        @confirm="confirm"
      />
    </Popup>
  </div>
</template>

<script>
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import NavBar from "@/components/navBar.vue";
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
import { AppointCheck, AppointStore, AppointAdd } from "@/service/common";
import { Toast, DatetimePicker, Popup } from "vant";
export default {
  mixins: [selectMix],

  data() {
    return {
      show: false,
      currentDate: new Date(),
      type: "",
      num_1: "", //工单编号
      num_2: "", //不动产权证
      data_arr: [],
      reserveBranchId: "",
      timePeriod: "",
      form: {
        orderNo: "",
        registerType_fake: "", //假的文字
        registerType: "",
        warrantNumbers: "--",
        userName: "",
        cardNo: "",
        mobile: "",
        reserveBranchId: "",
        reserveDate: "",
        timePeriod: ""
      },
      branch_arr: [],
      select_arr: []
    };
  },
  watch: {
    reserveBranchId(newV) {
      this.form.name = newV;
      const arr = this.branch_arr.find(item => {
        if (item.name == newV) {
          this.branch_arr.find(inner => {
            if (inner.id == item.id) {
              this.form.reserveBranchId = item.id;
              this.data_arr = inner.reserveTimePeriod;
            }
          });
        }
      });
    },
    timePeriod(n) {
      this.form.timePeriod = n;
    }
  },
  computed: {
    arr_1() {
      return this.$store.getters.dict["registerType"];
    },
    baseinfo() {
      return this.$store.getters.normal_baseinfo.accountInfo;
    },
    title() {
      if (this.select_show) {
        return this.selectTitle;
      } else {
        return "网点预约（2/2）";
      }
    }
  },
  components: {
    SelectPage,
    FullButton,
    Input,
    Toast,
    DatetimePicker,
    Popup,
    NavBar
  },
  created() {
    this.$store.dispatch("dict", {}).then(() => {
      AppointCheck(this.$route.query).then(res => {
        if (res.success) {
          this.form.userName = this.baseinfo.fullName;
          this.form.cardNo = this.baseinfo.identity;
          this.form.mobile = this.baseinfo.phone;

          this.form.orderNo = res.data.orderNo;
          this.form.warrantNumbers = res.data.warrantNumbers || "--";
          this.form.registerType_fake = this.arr_1.find(
            item => item.key == res.data.registerType
          ).name;
        } else {
          Toast(res.msg);
        }
      });

      AppointStore().then(res => {
        //获取机构
        if (res.success) {
          this.branch_arr = res.data.map(item => {
            return {
              id: item.id,
              name: item.branchName,
              reserveTimePeriod: item.reserveTimePeriod.map(item => {
                return { name: item };
              })
            };
          });
        } else {
          Toast(res.msg);
        }
      });
    });
  },
  methods: {
    confirm() {
      this.form.reserveDate = this.dateDeal(this.currentDate);
      this.show = false;
    },
    changeData() {
      if (!this.form.reserveBranchId) {
        Toast("请先选择受理网店");
        return false;
      }
      this.changeS(this.data_arr, "timePeriod", "预约时间段");
    },
    travelNext() {
      let tag = true;
      if (!this.form.registerType_fake) {
        this.$Message.error("请输入完整");
        return false;
      }
      this.form.registerType = this.arrGet(
        this.arr_1,
        this.form.registerType_fake,
        "key"
      );
      Object.keys(this.form).forEach(item => {
        console.log("now", this.form, this.form[item]);
        if (!this.form[item]) {
          if (item != "warrantNumbers") {
            tag = false;
          } else {
            if (["5", "7", "15"].indexOf(this.form.registerType) < 0) {
              tag = false;
            }
          }
        }
      });
      if (!tag) {
        Toast("请填写完整");
        return false;
      }

      AppointAdd(this.form).then(res => {
        if (res.success) {
          Toast("新增成功");
          setTimeout(() => {
            this.$router.replace({ name: "netList" });
          }, 1000);
        } else {
          Toast(res.msg);
        }
      });
    },
    dateDeal(val) {
      if (!val) return;
      if (!(val instanceof Date)) {
        val = new Date(val);
      }
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      return year + "-" + month + "-" + day;
    }
  }
};
</script>

<style lang="less" scoped>
.date {
  position: absolute;
  bottom: 0;
}
.water-edit-footer {
  padding: 16px;
}
.water-edit-footer-btn {
  border-radius: 4px;
}
.undo {
  opacity: 0.3;
}
</style>
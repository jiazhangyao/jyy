<template>
  <div>
    <NavBar :navTitle="title"/>
    <div class="water-detail">
      <div>
        <Input label="共单编号" :value="form.orderNo" disabled/>
        <Input label="登记类别" :value="form.registerType" :disabled="disabled"/>
        <Input label="房屋坐落" :value="form.address" :disabled="disabled"/>
        <Input label="权证号" :value="form.warrantNumber" :disabled="disabled"/>
        <Input label="预约人姓名" :value="form.userName" :disabled="disabled"/>
        <Input label="预约人身份证号" :value="form.cardNo" :disabled="disabled"/>
        <Input label="预约人手机号" :value="form.mobile" :disabled="disabled"/>
        <Input label="预约网点" :value="form.branchName" :disabled="disabled"/>
        <Input label="预约日期" :value="form.reserveDate" :disabled="disabled"/>
        <Input label="预约时间段" :value="form.timePeriod" :disabled="disabled"/>
      </div>
      <div class="water-footer" @click="reback" v-if="form.flag==1">
        <FullButton name="取消预约"/>
      </div>
    </div>
  </div>
</template>

<script>
import FullButton from "@/components/fullButton.vue";
import Title from "@/components/formTitle.vue";
import { Toast, Dialog } from "vant";
import Input from "@/components/input.vue";
import { AppointDetail, AppointDelete } from "@/service/common";
import selectMix from "@/mixins/selectPage.js";
import SelectPage from "@/components/selectPage.vue";
import { Row, Col } from "vant";
export default {
  mixins: [selectMix],
  data() {
    return {
      title: "网点预约",
      type: "", //类型
      disabled: true,
      form: {
        orderNo: "-",
        registerType: "-",
        address: "-",
        warrantNumber: "-",
        userName: "-",
        cardNo: "-",
        mobile: "-",
        branchName: "-",
        reserveDate: "-",
        timePeriod: "-"
      }
    };
  },
  components: {
    Title,
    Input,
    Row,
    Col,
    SelectPage,
    Toast,
    FullButton
  },
  computed: {
    registerTypeArr() {
      return this.$store.getters.dict["registerType"];
    }
  },
  created() {
    this.$store.dispatch("dict", {}).then(() => {
      AppointDetail(this.$route.query.id).then(res => {
        if (res.success) {
          this.form = res.data;
          this.form.registerType = this.registerTypeArr.find(item => {
            return item.key == res.data.registerType;
          }).name;
        }
      });
    });
  },
  methods: {
    reback() {
      const data = {
        id: this.$route.query.id
      };
      Dialog.confirm({
        title: "是否确定取消该预约"
      })
        .then(() => {
          AppointDelete(data).then(res => {
            if (res.success) {
              Toast("取消预约成功");
              setTimeout(() => {
                this.$router.back();
              }, 1000);
            } else {
              Toast(res.msg);
            }
          });
        })
        .catch(() => {});
    },
    edit() {
      this.disabled = false;
      Toast("开始编辑...");
    }
  }
};
</script>

<style lang="less" scoped>
.water-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.dis_bottom {
  bottom: 0;
  padding: 0 16px;
}

.water-detail {
  min-height: calc(100vh - 44px);
  padding-bottom: 60px;
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
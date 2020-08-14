<template>
  <div>
    <NavBar :navTitle="title"/>
    <div>
      <Input label="工单编号" :value.sync="num_1"/>

      <div class="dis_bottom dis_bottom_action_one dis_bottom" @click="done('one')">
        <FullButton name="查询" cls="b-32 br-4"/>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
import { AppointCheck } from "@/service/common";
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
      currentDate: new Date(),
      type: "",
      page: "three", //页码，one是第一步，three是第二步,two是选择过户类型
      type: "",
      title: "网点预约（1/2）",

      num_1: "", //工单编号
      num_2: "", //不动产权证
      data_arr: [],
      reserveBranchId: "",
      timePeriod: ""
    };
  },

  components: {
    FullButton,
    Input,
    Toast
  },

  methods: {
    done(str) {
      console.log(this.$data);
      if (!this.num_1) {
        Toast("请填写完整");
        return false;
      }
      const config = {
        orderNo: this.num_1
      };

      AppointCheck(config).then(res => {
        if (res.success) {
          this.$router.push({ name: "NetEdit", query: { ...config } });
        } else {
          Toast(res.msg);
        }
      });
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
<template>
  <div>
    <NavBar :navTitle="title"/>
    <div>
      <Input label="工单编号" :value.sync="num_1"/>
      <Input label="不动产权证号" :value.sync="num_2"/>
      <div class="dis_bottom dis_bottom_action_one dis_bottom" @click="done('one')">
        <FullButton :name="btn_name_1" cls="b-32 br-4"/>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/input.vue";
import { query, add } from "@/service/water";
import FullButton from "@/components/fullButton.vue";
import { Toast } from "vant";

export default {
  data() {
    return {
      type: "",
      page: "one", //页码，one是第一步，three是第二步,two是选择过户类型
      title: "水电气过户（1/2）",
      btn_name_1: "下一步",
      num_1: "", //工单编号
      num_2: "", //不动产权证
      num_5: "", //不动产权证
      num_7: "", //不动产权证
      num_8: "", //333
      num_9: "", //不动产权证
      num_10: "", //不动产权证
      num_11: ""
    };
  },
  components: {
    FullButton,
    Input,
    Toast
  },

  methods: {
    done(str) {
      if (!this.num_1 || !this.num_2) {
        Toast("请填写完整");
        return false;
      }
      const config = {
        orderNo: this.num_1,
        warrantNumber: this.num_2
      };

      query(config).then(res => {
        if (res.success) {
          // this.num_7 = res.data.location;
          // this.num_5 = res.data.obligeeName;

          // this.arr_2 = res.data.householderList;
          this.$router.push({
            name: "waterEdit",
            query: {
              ...config
            }
          });
        } else {
          Toast(res.msg);
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.water-edit-footer {
  padding: 16px;
}

.water-edit-footer-btn {
  border-radius: 4px;
}
</style>
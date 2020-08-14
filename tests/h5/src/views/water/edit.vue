<template>
  <div>
    <NavBar />

    <div>
      <Input label="工单编号" :value.sync="num_1" :readonly="true" />
      <Input label="不动产权证号" :value.sync="num_2" :readonly="true" />
      <Input label="权利人" :value.sync="num_5" :readonly="true" />

      <!-- <Input label="权利人身份证号" :value.sync="num_6" :readonly=true /> -->
      <Input label="房屋坐落" :value="num_7" :readonly="true" />
      <div @click="changeS(arr_1,'num_8','过户类型')">
        <Input label="过户类型" :value.sync="num_8" icon="arrow" placeholder="请选择" />
      </div>

      <Input label="账户" :value.sync="num_9" />
      <div @click="changeS(arr_2,'num_10','选择账户')">
        <Input label="新户主名字" :value.sync="num_10" icon="arrow" placeholder="请选择" />
      </div>
      <div @click="contract=true">
        <Input label="个人签名" :value.sync="num_11" readonly icon="arrow" placeholder="去签名" />
      </div>

      <div class="contract">
        注：个人签名用户生成
        <a @click="contract=true">《局民用电合同》</a>
      </div>
      <div class="water-edit-footer" @click="done('two')">
        <FullButton name="提交" cls="water-edit-footer-btn" />
      </div>
    </div>
    <van-dialog v-model="contract">
      <img src="@/assets/gasContract.jpg" style="width:100%" />
    </van-dialog>
    <SelectPage
      :show="select_show"
      :select="select_arr"
      v-on:pageChange="pageChange"
      v-on:hideSelect="hideSelect"
      :propsValue="select_key"
      nextPage="three"
    />
  </div>
</template>

<script>
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import NavBar from "@/components/navBar.vue";
import Input from "@/components/input.vue";
import { query, add } from "@/service/water";
import FullButton from "@/components/fullButton.vue";
import { Toast } from "vant";
export default {
  mixins: [selectMix],
  data() {
    return {
      contract: false,
      type: "",
      btn_name_1: "下一步",
      num_1: "", //工单编号
      num_2: "", //不动产权证
      num_5: "", //不动产权证
      num_7: "", //不动产权证
      num_8: "", //333
      num_9: "", //不动产权证
      num_10: "", //不动产权证
      num_11: "",
      num_12: "",
      arr_2: [{ name: "1" }, { name: "3" }]
    };
  },
  components: {
    SelectPage,
    FullButton,
    Input,
    Toast,
    NavBar
  },
  created() {
    query(this.$route.query).then(res => {
      if (res.success) {
        this.num_7 = res.data.location;
        this.num_5 = res.data.obligeeName;
        this.arr_2 = res.data.householderList;
        this.num_1 = this.$route.query.orderNo;
        this.num_2 = this.$route.query.warrantNumber;
        //  this.num_12 = res.data.obligeeCardNo;
      } else {
        Toast(res.msg);
        return false;
      }
    });
  },
  watch: {
    dict(n, o) {
      console.log("new", n);
    }
  },
  computed: {
    arr_1() {
      console.log("dict", this.$store.getters.dict);
      return this.$store.getters.dict["transferType"];
    },
    title() {
      if (this.select_show) {
        return this.selectTitle;
      } else {
        return "水电气过户（2/2）";
      }
    }
  },

  methods: {
    goSign() {
      console.log("go sign");
    },
    travelNext() {
      alert("go next");
    },
    done(str) {
      if (str === "one") {
        //第一步的下一步操作

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
            this.page = "three";
            this.num_7 = res.data.location;
            this.num_5 = res.data.obligeeName;

            this.arr_2 = res.data.householderList;
            this.$store.commit("SET_TITLE", this.title_two);
          } else {
            Toast(res.msg);
            return false;
          }
        });
      } else {
        //最后的提交数据

        console.log("donw two");
        const config = {
          account: this.num_9,
          applicantId: this.arrGet(this.arr_2, this.num_10, "id"), //新户主id
          location: this.num_7,
          newHouseholderName: this.num_10, //新户主名字
          obligeeName: this.num_5,
          orderNo: this.num_1,
          transferType: this.arrGet(this.arr_1, this.num_8, "key"), //转移类型
          warrantNumber: this.num_2
        };
        add(config).then(res => {
          if (res.success) {
            Toast("新增成功");
            setTimeout(() => {
              this.$router.replace({ name: "waterList" });
            }, 1000);
          } else {
            Toast(res.msg);
          }
        });
        console.log("key", config);
      }
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
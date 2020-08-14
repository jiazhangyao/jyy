<template>
  <div>
    <NavBar :navTitle="title" />
    <div>
      <SelectPage
        :show="select_show"
        :select="select_arr"
        v-on:pageChange="pageChange"
        v-on:hideSelect="hideSelect"
        :propsValue="select_key"
      />

      <div>
        <Input label="姓名" :value.sync="num_1" />

        <Input label="证件类型" :value.sync="type" icon="arrow" disabled />
        <Input label="证件号码" :value.sync="num_2" />
        <Input label="权证号" :value.sync="num_3" />
        <Input label="建筑面积" :value.sync="num_4" placeholder="请输入" :validateType="1" class="sufix" />
        <div class="water-edit-footer" @click="travelNext">
          <FullButton name="查询" cls="water-edit-footer-btn" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
import { GetQuery, IdCheck } from "@/service/common";
import { Toast } from "vant";
export default {
  mixins: [selectMix],
  data() {
    return {
      type: "身份证",
      select_key: "身份证",
      btn_name_1: "下一步",
      num_1: "", //工单编号
      num_2: "", //不动产权证
      num_3: "", //不动产权证
      num_4: "", //不动产权证
      arr_1: [
        {
          key: "1",
          name: "身份证"
        }
      ]
    };
  },
  computed: {
    title() {
      if (this.select_show) {
        return this.selectTitle;
      } else {
        return "不动产信息查询";
      }
    }
  },
  components: {
    SelectPage,
    FullButton,
    Input,
    Toast
  },
  methods: {
    travelNext() {
      if (
        !this.num_2 ||
        !this.type ||
        !this.num_1 ||
        !this.num_4 ||
        !this.num_3
      ) {
        Toast("请输入完整信息");
        return false;
      }
      IdCheck({
        personId: this.num_2,
        personName: this.num_1
      }).then(res => {
        if (!res.success) {
          Toast("实名认证失败");
          return false;
        } else {
          const data = {
            cardNo: this.num_2,
            cardType: this.arrGet(this.arr_1, this.type, "key"),
            name: this.num_1,
            space: this.num_4,
            warrantNumber: this.num_3
          };

          GetQuery(data).then(res => {
            if (res.success) {
              this.$router.push({
                name: "queryDetail",
                params: { ...res.data }
              });
              //this.form = res.data;
            } else {
              Toast(res.msg || res.fieldErrors[0].msg);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.water-edit-footer {
  padding: 16px;
  position: fixed;
  bottom: 40px;
  width: 100%;
}
.water-edit-footer-btn {
  border-radius: 4px;
}
</style>
<style lang="less">
.sufix .van-field__body::after {
  content: "㎡";
  color: #333;
}
</style>
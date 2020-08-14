<template>
  <div>
    <NavBar :navTitle="title" />
    <div class="water-detail">
      <notice-bar :text="desc" :mode="mode" />
      <Title name="产权信息" />
      <div>
        <Input label="不动产权证号" :value.sync="num_1" disabled />
        <Input label="权利人" :value.sync="num_2" disabled />
        <Input label="房屋坐落" :value.sync="num_3" disabled />
      </div>

      <Title name="账户信息" />
      <div>
        <div @click="changeS(arr_1,'type','过户类型')">
          <Input label="账户类型" :value.sync="type" :icon="disabled?'':'arrow'" :disabled="disabled" />
        </div>

        <Input label="账户" :value.sync="account" :disabled="disabled" />
        <div @click="changeS(arr_2,'name','选择账户')">
          <Input label="新户主名字" :value.sync="name" :icon="disabled?'':'arrow'" :disabled="disabled" />
        </div>
      </div>

      <Title name="合同信息" />
      <div class="bgf tl" @click="contract=true">
        <router-link to="path">《居民燃气合同》</router-link>
      </div>
      <van-dialog v-model="contract">
        <img src="@/assets/gasContract.jpg" style="width:100%" />
      </van-dialog>
      <div class="dis_bottom" v-if="state==0 || disabled==false">
        <Row gutter="10">
          <Col span="24">
            <div class="action-btn action-btn-2" @click="save">提交</div>
          </Col>
        </Row>
      </div>
      <div class="dis_bottom" v-if="state== 3 && disabled==true">
        <Row gutter="10">
          <Col span="12">
            <div class="action-btn action-btn-1" @click="edit">编辑</div>
          </Col>
          <Col span="12">
            <div class="action-btn action-btn-del" @click="del">删除</div>
          </Col>
        </Row>
      </div>
    </div>
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
import Title from "@/components/formTitle.vue";
import { Toast } from "vant";
import Input from "@/components/input.vue";
import { getDetail, edit, del } from "@/service/water";
import selectMix from "@/mixins/selectPage.js";
import SelectPage from "@/components/selectPage.vue";
import { Row, Col, Popup, Dialog } from "vant";
import NoticeBar from "../../components/noticeBar";
export default {
  mixins: [selectMix],
  data() {
    return {
      contract: false,
      type: "", //类型
      account: "",
      name: "",
      num_1: "",
      num_2: "",
      num_3: "",
      state: null,
      desc: "",
      disabled: true,
      select_arr: [
        {
          name: "燃气"
        },
        {
          name: "自来水"
        },
        {
          name: "用电"
        }
      ]
    };
  },
  components: {
    Title,
    Input,
    Row,
    Col,
    SelectPage,
    Toast,
    Popup,
    NoticeBar
  },
  computed: {
    arr_1() {
      return this.$store.getters.dict["transferType"];
    },
    // desc() {
    //   if (this.state == 3) {
    //     return "很抱歉，您提交的申请被驳回。驳回理由：" + this.reject;
    //   } else if (this.state == 2) {
    //     return "恭喜您，您提交的申请已经审批通过";
    //   } else if (this.state == 1) {
    //     return "审核中";
    //   }
    // },
    // 3被驳回,1待审核，2已过户
    mode() {
      if (this.state == 3) {
        return "warn";
      } else if (this.state == 2) {
        return "reason";
      } else if (this.state == 1) {
        return "tips";
      }
    },
    title() {
      if (this.select_show) {
        return this.selectTitle;
      } else {
        return "水电气过户";
      }
    }
  },
  mounted() {
    this.$store.dispatch("dict", {}).then(() => {
      getDetail(this.$route.params.id).then(res => {
        console.log("res", res);
        if (res.success) {
          this.type = this.arr_1.find(item => {
            return item.key == res.data.transferAccountInfo.transferType;
          }).name;
          this.name = res.data.transferAccountInfo.newHouseholderName;
          this.account = res.data.transferAccountInfo.account;
          this.num_1 = res.data.transferProperty.warrantNumber;
          this.num_2 = res.data.transferProperty.obligeeName;
          this.num_3 = res.data.transferProperty.location;
          this.arr_2 = res.data.householderList;
          this.desc = res.data.transferOrderInfo.transferStatusDesc; //3被驳回,1待审核，2已过户
          this.state = res.data.transferOrderInfo.transferStatus; //3被驳回,1待审核，2已过户
          this.reject = res.data.transferOrderInfo.rejectReason; //驳回原因
        } else {
          Toast(res.msg);
          setTimeout(() => {
            this.$router.push({ name: "waterList" });
          }, 1000);
        }
      });
    });
  },
  created() {},
  methods: {
    edit() {
      this.disabled = false;
      Toast("开始编辑...");
    },
    save() {
      const config = {
        id: this.$route.params.id,
        transferType: this.arrGet(this.arr_1, this.type, "key"),
        newHouseholderName: this.name,
        account: this.account,
        warrantNumber: this.num_1,
        obligeeName: this.num_2,
        location: this.num_3
      };

      edit(config).then(res => {
        if (res.success) {
          Toast("修改成功");
          setTimeout(() => {
            this.$router.push({ name: "waterList" });
          }, 1000);
        } else {
          Toast(res.msg);
        }
      });
    },
    del() {
      Dialog.confirm({
        title: "确认删除？"
      }).then(() => {
        del(this.$route.params.id).then(res => {
          if (res.success) {
            Toast("删除成功");
            this.$router.push({ name: "waterList" });
          }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.note {
  height: 32px;
  line-height: 32px;
  text-align: left;
  padding-left: 36px;
  font-size: 12px;
  color: #0f213e;
  margin-top: 2px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  img {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
  }

  &.state-1 {
    background: rgba(255, 168, 0, 0.06);
    border: 1Px solid rgba(255, 168, 0, 0.5);
  }

  &.state-2 {
    background: rgba(82, 196, 26, 0.06);
    border: 1Px solid rgba(82, 196, 26, 0.5);
  }

  &.state-3 {
    background: rgba(245, 34, 45, 0.06);
    border: 1Px solid rgba(245, 34, 45, 0.5);
  }
}

.dis_bottom {
  bottom: 0;
  padding: 8px 16px;
  text-align: center;
  z-index: 1;
  background: #fff;
  border-top: 1px solid #cbd2de;
}

.water-detail {
  min-height: calc(100vh - 44px);
  // background:rgba(203,210,222,.20);
  padding-bottom: 60px;
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
  &.action-btn-del {
    background: #f5222d;
    color: #fff;
  }
}
</style>
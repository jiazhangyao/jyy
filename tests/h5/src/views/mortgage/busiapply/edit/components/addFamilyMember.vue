<template>
  <div class="add-proxy">
    <NavBar navTitle="添加家庭信息" :goBack="hide" />
    <div class="wrap">
      <Field v-model="name" label="姓名" placeholder="请输入" input-align="right" />
      <Field v-model="cardNo" label="身份证号码" placeholder="请输入" input-align="right" />

      <div class="fix-bottom" @click="finish">
        <FullButton name="完成" cls="select-bottom" />
      </div>
    </div>
  </div>
</template>

<script>
import FullButton from "@/components/fullButton.vue";
import { Field, Button, Toast } from "vant";
import { mapGetters, mapState } from "vuex";
import { verifyPhone } from "@/mixins/commonValid.js";
import { vaildMsgCode, sendSmsCode } from "@/service/mortgageBusiness";
import mortgageBusiness from "@/mixins/mortgageBusiness.js";
export default {
  mixins: [mortgageBusiness],
  props: {
    item: {},
    hide: {},
    done: {},
  },
  data() {
    return {
      mobile: "",
      cardNo: "",
      name: "",
      cardType: 1,
      cardTypeName: ""
    };
  },
  components: {
    FullButton,
    Field,
    Button
  },
  computed: {
    ...mapState("mortgageBusiapply", ["transferbusiapplyForm"]),
  },
  methods: {
    finish() {
      let item = {
        cardNo: this.cardNo,
        name: this.name,
        familyIndex: this.item.familyIndex
      };
      if (!item.name) {
        Toast("姓名不能为空");
        return false;
      }
      if (!item.cardNo) {
        Toast("身份证号码不能为空");
        return false;
      }
      this.idCardValidateRes(item).then(res => {
        if (res.success) {
          this.done(item);
        } else {
          Toast("身份证实名认证未通过");
          return false;
        }
      });
    }
  },
  watch: {
  },
  mounted() {
    this.cardNo = this.item.cardNo;
    this.name = this.item.name;
  }
};
</script>

<style lang="less" scoped>
.add-proxy .nav {
  z-index: 9999;
}
.wrap {
  min-height: calc(100vh - 44px);
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 2;
  width: 100%;
  background: #fff !important;
  opacity: 1;

  .select-item {
    display: flex;
  }
}
</style>
<style lang="less">
.add-proxy .fix-bottom {
  width: 100%;
  height: 48px;
  position: fixed;
  bottom: 40px;
  left: 16px;
  .button {
    width: 343px;
    margin: auto;
  }
}
</style>
<template>
  <div v-if="show" class="add-proxy">
    <NavBar navTitle="添加代理人" :goBack="closeProxy" />
    <div class="wrap">
      <Field required v-model="name" label="代理人姓名" placeholder="请输入" input-align="right" />
      <div @click="changeS(cardTypes,'cardTypeName','证件类型', cardTypeName)">
        <Field
          input-align="right"
          :value="cardTypeName"
          label="证件类型"
          placeholder="请选择"
          icon="arrow"
          required
          disabled
        />
      </div>
      <Field required v-model="cardNo" label="证件号码" placeholder="请输入" input-align="right" />
      <Field v-model="mobile" type="number" label="手机号码" placeholder="请输入" input-align="right" />
      <div class="fix-bottom" @click="done({mobile,cardNo,cardType,name})">
        <FullButton name="完成" cls="select-bottom" @click="done({mobile,cardNo,cardType,name})" />
      </div>
    </div>
    <SelectPage
      :show="select_show"
      :select="select_arr"
      v-on:pageChange="pageChange"
      v-on:hideSelect="hideSelect"
      :propsValue="propsValue"
      nextPage="three"
    />
  </div>
</template>

<script>
import FullButton from "@/components/fullButton.vue";
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import { Field } from "vant";
import { mapGetters } from "vuex";
export default {
  mixins: [selectMix],
  props: {
    show: {},
    proxy: {},
    closeProxy: {},
    done: {}
  },
  data() {
    return {
      mobile: "",
      cardNo: "",
      name: "",
      cardType: "",
      cardTypeName: ""
    };
  },
  components: {
    FullButton,
    SelectPage,
    Field
  },
  computed: {
    ...mapGetters(["dict"]),
    cardTypes() {
      return this.$store.getters.dict["cardType"];
    }
  },
  methods: {},
  watch: {
    proxy(newV, oldV) {
      this.cardType = newV.cardType; // 放在最后一行，出现不更新的情况 TODO
      this.cardTypeName = this.getNameByKey(this.cardTypes, newV.cardType); // 放在最后一行，出现不更新的情况 TODO
      this.mobile = newV.mobile;
      this.cardNo = newV.cardNo;
      this.name = newV.name;
    },
    cardTypeName(curVal) {
      if (curVal) {
        this.cardType = this.arrGet(this.cardTypes, curVal, "key");
      } else {
        this.cardType = "";
      }
    }
  },
  mounted() {}
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
  .button {
    width: 343px;
    margin: auto;
  }
}
.add-proxy {
  .van-cell--required div.van-field__label span {
    position: relative;
  }
  .van-cell--required::before {
    content: none;
  }
  .van-cell--required div.van-field__label span::before {
    content: "*";
    position: absolute;
    right: -14px;
    font-size: 14px;
    color: #f44;
  }
}
</style>
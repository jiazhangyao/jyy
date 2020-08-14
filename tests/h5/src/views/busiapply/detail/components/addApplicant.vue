<template>
  <div>
    <div class="bisiapply-edit-applicant">
      <div
        v-for="(item, itemIndex) in applicantList"
        :key="'item'+itemIndex"
        class="bisiapply-edit-applicant-wrap"
      >
        <div class="title">{{name}}{{itemIndex+1}}</div>
        <div class="form">
          <Input
            input-align="right"
            :value="item.name"
            :label="name+'姓名'"
            placeholder="-"
            disabled
          />
          <Input
            input-align="right"
            :value="getCardTypeName(item.cardType)"
            label="证件类型"
            placeholder="-"
            disabled
          />
          <Input input-align="right" v-model="item.cardNo" label="证件号码" placeholder="-" disabled />
          <Input input-align="right" v-model="item.mobile" label="手机号码" placeholder="-" disabled />
          <div v-for="(proxyItem, proxyIndex) in item.proxyList" :key="'proxy'+proxyIndex">
            <div class="title">代理人{{proxyIndex+1}}</div>
            <addProxy :proxy="proxyItem"></addProxy>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navBar.vue";
import addProxy from "./addProxy.vue";
import { Field, Toast } from "vant";
import Input from "@/components/input.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      proxyShow: false,
      proxy: {},
      itemIndex: "",
      proxyIndex: ""
    };
  },
  ...mapGetters(["dict"]),
  props: ["name", "applicantList"],
  computed: {},
  watch: {
    select_key() {}
  },
  methods: {
    getCardTypeName(type) {
      let res = this.$store.getters.dict["cardType"].find(
        item => item.key == type
      );
      return res ? res.name : "-";
    }
  },
  mounted() {},
  created() {},
  components: {
    Field,
    Toast,
    Input,
    addProxy
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-applicant {
  &-wrap {
    background: rgba(203, 210, 222, 0.2);
    width: 343px;
    margin: 16px auto 0 auto;
    padding: 0px 12px 16px 12px;
    .title {
      position: relative;
      padding: 16px 0;
      i.van-icon {
        margin-right: 6px;
        font-size: 16px !important;
        vertical-align: text-bottom;
        position: absolute;
        right: 0;
      }
    }
    .form {
      width: 320px;
      margin: auto;
      .add-btn {
        color: #0061ff;
        line-height: 25px;
        font-size: 15px;
        text-align: center;
        i.van-icon {
          margin-right: 6px;
          padding-top: 25px;
          font-size: 25px !important;
          vertical-align: text-bottom;
          color: #0061ff !important;
        }
      }
    }
  }
  &-infowrap {
    background: rgba(203, 210, 222, 0.2);
    width: 100%;
    padding: 6px 16px;
    color: #5d6471;
  }
}
</style>
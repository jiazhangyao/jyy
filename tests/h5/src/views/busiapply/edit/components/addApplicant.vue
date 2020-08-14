<template>
  <div>
    <div class="bisiapply-edit-applicant">
      <div
        v-for="(item, itemIndex) in itemList"
        :key="'item'+itemIndex"
        class="bisiapply-edit-applicant-wrap"
      >
        <div class="title">
          {{name}}{{itemIndex+1}}
          <Icon
            name="delete"
            color="#333"
            v-if="itemList.length>1"
            @click="delapplicant(itemIndex)"
          />
        </div>
        <div class="form">
          <Field
            input-align="right"
            v-model="item.name"
            :label="name+'姓名'"
            placeholder="请输入"
            required
          />
          <div
            @click="onChangeS(cardTypes,itemIndex,'证件类型', getNameByKey(cardTypes, item.cardType))"
          >
            <Field
              input-align="right"
              :value="getNameByKey(cardTypes, item.cardType)"
              label="证件类型"
              placeholder="请选择"
              icon="arrow"
              required
              disabled
            />
          </div>
          <Field input-align="right" v-model="item.cardNo" label="证件号码" placeholder="请输入" required />
          <Field
            type="number"
            input-align="right"
            v-model="item.mobile"
            label="手机号码"
            placeholder="请输入"
          />

          <div :name="proxyIndex+forceupdate">
            <div v-for="(proxyItem, proxyIndex) in item.proxyList" :key="'proxy'+proxyIndex">
              <Field
                required
                clearable
                :label="'代理人'+(proxyIndex+1)"
                left-icon="del"
                right-icon="arrow"
                placeholder="请补充信息"
                @click-left-icon="delProxy(itemIndex, proxyIndex)"
                @click="showProxy(itemIndex, proxyIndex, proxyItem)"
                input-align="right"
                :value="proxyItem.name"
              />
            </div>
          </div>
          <div class="add-btn" @click="addProxy(itemIndex)">
            <Icon name="add" />
            <span>添加代理人</span>
          </div>
        </div>
      </div>
      <Button class="border-btn" @click="addapplicant">添加{{name}}</Button>
      <SelectPage
        v-if="select_show"
        :show="select_show"
        :select="select_arr"
        v-on:pageChange="pageChange"
        v-on:hideSelect="hideSelect"
        :propsValue="propsValue"
        nextPage="three"
      />
    </div>
    <addProxy
      position="bottom"
      :show="proxyShow"
      :proxy="proxy"
      :closeProxy="closeProxy"
      :done="doneProxy"
    ></addProxy>
  </div>
</template>

<script>
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import NavBar from "@/components/navBar.vue";
import addProxy from "./addProxy.vue";
import { CellGroup, Field, Button, Popup, Toast, Icon } from "vant";
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
import { contractInfo } from "@/service/business";
export default {
  mixins: [selectMix],
  data() {
    return {
      proxyShow: false,
      proxy: {},
      itemIndex: "",
      proxyIndex: "",
      forceupdate: Math.random()
    };
  },
  props: ["dict", "name", "applicantList", "onApplicantChange"],
  computed: {
    itemList() {
      if (this.applicantList.length) {
        return this.applicantList;
      } else {
        return [{}];
      }
    },

    cardTypes() {
      return this.$store.getters.dict["cardType"];
    }
  },
  watch: {
    select_key() {}
  },
  methods: {
    doneProxy(proxy) {
      this.itemList[this.itemIndex].proxyList[this.proxyIndex] = proxy;
      this.closeProxy();
    },
    closeProxy() {
      this.proxy = {};
      this.itemIndex = "";
      this.proxyIndex = "";
      this.proxyShow = false;
    },
    showProxy(itemIndex, proxyIndex, proxy) {
      this.itemIndex = itemIndex;
      this.proxyIndex = proxyIndex;
      this.proxy = proxy;
      this.proxyShow = true;
    },
    pageChange(select, index, item) {
      if (select) {
        let keys = this.select_key.split(".");
        this[keys[0]][keys[1]][keys[2]] = item.key;
      }
      this.hideSelect();
    },
    onChangeS(cardTypes, itemIndex, name, value) {
      this.changeS(
        cardTypes,
        "itemList." + itemIndex + ".cardType",
        name,
        value
      );
    },
    addProxy(index) {
      if (!this.itemList[index].proxyList) {
        this.itemList[index].proxyList = [];
      }
      this.itemList[index].proxyList.push({});
      this.forceupdate = Math.random();
    },
    delProxy(itemIndex, proxyIndex) {
      this.itemList[itemIndex].proxyList.splice(proxyIndex, 1);
      this.forceupdate = Math.random();
    },
    addapplicant() {
      this.itemList.push({
        name: "",
        cardType: "",
        cardNo: "",
        mobile: "",
        proxyList: []
      });
    },
    delapplicant(index) {
      this.itemList.splice(index, 1);
    }
  },
  mounted() {},
  created() {},
  components: {
    CellGroup,
    Field,
    Button,
    Popup,
    Toast,
    Input,
    Icon,
    FullButton,
    SelectPage,
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
    padding: 16px 12px;
    .title {
      position: relative;
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
      padding-top: 16px;
      .add-btn {
        color: #0061ff;
        line-height: 25px;
        font-size: 15px;
        text-align: center;
        i.van-icon {
          margin-right: 6px;
          padding-top: 23px;
          font-size: 20px !important;
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
  .border-btn {
    display: block;
    background: #ffffff;
    border: 1Px solid #0061ff;
    border-radius: 2px;
    min-width: 160px;
    height: 36px;
    line-height: 36px;
    font-size: 15px;
    color: #0061ff;
    margin: 32px auto;
  }
}
</style>

<style lang="less" >
.van-icon-del:before {
  content: "";
  width: 18px;
  height: 18px;
  border-radius: 20px;
  border: 2px solid #f5222d;
}
.van-icon-del:after {
  content: "";
  width: 10px;
  height: 2px;
  background: #f5222d;
  position: absolute;
  top: 10px;
  left: 6px;
}

.bisiapply-edit-applicant {
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
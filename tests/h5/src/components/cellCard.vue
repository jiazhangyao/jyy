<template>
  <div class="cellcard_wrap">
    <div v-for="(item,index) in list" :key="index" class="transfer-main">
      <div>
        <van-cell
          :title="item.name"
          :value="conData[item.state].value"
          is-link
          :class="conData[item.state].class"
          url=""
          to=""
          @click="sign ? signSee(index, imgs) : adjustRoute(orderStatus, isTaxesPayer, pretaxStatus, item.url, item.adjust, applicationSignStatus, contractSignStatus, taxesPayerSignInfo)"
        />
        <ul v-show="item.datas && item.datas.length" class="transfer-home-lists">
          <h4 v-if="item.type === 'apply' && item.datas.length > 1">{{applyText}}</h4>
          <h4 v-if="item.type === 'contract' && item.datas.length > 1">{{contractText}}</h4>
          <li v-for="(items, indexs) of item.datas" :key="indexs">
            <span>{{items.name}}</span>
            <VanIcon
              v-if="item.type==='apply'"
              name="success"
              :class="items.applicationSignStatus === 1 ? 'suc' : 'fail'"
            />
            <VanIcon v-else name="success" :class="items.contractSignStatus === 1 ? 'suc' : 'fail'" />
          </li>
        </ul>
      </div>
    </div>
    <!-- <div v-if="pre=='true'" @click="showUrls">
      <button v-show="nof" style="width: 100%; height: 40px;">{{payText}}</button>
    </div> -->
    <div v-if="pre=='true' && nof" class="transfer-main">
      <van-cell
          title="缴纳税费"
          is-link
          :value="payText"
          :class="payClass"
          @click="showUrls"
        />
    </div>
  </div>
</template>

<script>
import { Icon, Cell, Dialog } from "vant";
import { log } from "util";
export default {
  data() {
    return {
      nof: false,
      payText: "",
      payClass: "",
      applyText: "等待其他共有人签字中…",
      contractText: "等待其他共有人签字中…"
    };
  },
  props: {
    pre: {
      type: String
    },
    list: {
      type: Array,
      default: () => []
    },
    adjustList: {
      type: Array,
      default: () => []
    },
    orderStatus: {
      type: Number
    },
    isTaxesPayer: {
      type: Number
    },
    pretaxStatus: {
      type: Number
    },
    applicationSignStatus: {
      type: Number
    },
    contractSignStatus: {
      type: Number
    },
    conData: {
      type: Object,
      default: () => {}
    },
    sign: {
      type: Boolean
    },
    imgs: {
      type: Array,
      default: () => []
    },
    exApplicationSignStatus: {
      type: Number
    },
    exContractSignStatus: {
      type: Number
    },
    buyerOrSeller: {
      type: Number
    },
    paytaxStatus: {
      type: Number
    },
    taxesPayerSignInfo: {
      type: Object
    },
    registerType: {
      type: Number
    }
  },

  mounted() {
    if (this.pre && this.applicationSignStatus === 1) {
      this.applyText = "";
    }
    if (this.pre && this.contractSignStatus === 1) {
      this.contractText = "";
    }
    // if (this.pre && this.paytaxStatus === 1) {
    //   this.payText = "缴纳税费完成";
    // }
    if (this.pre && this.isTaxesPayer === 1) {
      if (this.pretaxStatus === 1 && this.applicationSignStatus === 1) {
        if ((this.registerType === 5030 && this.contractSignStatus === 1) ||((this.registerType === 5010 || this.registerType === 5020) && this.contractSignStatus === 0)){
          this.nof = true;
          if (this.paytaxStatus === 1) {
            this.payText = "已完成";
            this.payClass = "ywc";
          } else {
            this.payText = "待支付";
            this.payClass = "dcl";
          }
        }
      }
    }
  },
  computed: {
    
  },
  components: {
    VanIcon: Icon,
    VanCell: Cell
  },
  methods: {
    showUrls() {
      if (this.orderStatus === 25) {
        Dialog.alert({
          title: "提示",
          message: "本次交易已结束，如需了解详情请登录鹤岗市不动产集成服务平台，www.jcfwpt.hgbdc.org.cn/h5",
          confirmButtonText: "我知道了"
        });
      } else {
        if (
          (this.registerType === 5030 && this.exApplicationSignStatus === 1 && this.exContractSignStatus === 1 && this.applicationSignStatus === 1 && this.contractSignStatus === 1 && this.pretaxStatus === 1) ||
          (this.registerType === 5010 && this.applicationSignStatus === 1 && this.pretaxStatus === 1 && this.exApplicationSignStatus === 1) ||
          (this.registerType === 5020 && this.applicationSignStatus === 1 && this.pretaxStatus === 1)
        ) {
          this.$router.push({ name: "transferTaxes", params: { pay: true } });
        } else {
          if (this.buyerOrSeller === 1) {
            Dialog.alert({
              title: "缴纳失败",
              message: "买方申请书或合同未签署完成!",
              confirmButtonText: "我知道了!"
            });
          } else {
            Dialog.alert({
              title: "缴纳失败",
              message: "卖方申请书或合同未签署完成!",
              confirmButtonText: "我知道了!"
            });
          }
        }
      }
      
    },
    adjustRoute(
      orderStatus,
      isTaxesPayer,
      pretaxStatus,
      url,
      adjust,
      applicationSignStatus,
      contractSignStatus
    ) {
      if (orderStatus === 25) {
        Dialog.alert({
          title: "提示",
          message: "本次交易已结束，如需了解详情请登录鹤岗市不动产集成服务平台，www.jcfwpt.hgbdc.org.cn/h5",
          confirmButtonText: "我知道了"
        });
      } else {
        const {
          applicationSignStatus,
          contractSignStatus,
          preTaxSignStatus
        } = this.taxesPayerSignInfo;
        if (isTaxesPayer === 1) {
          if (preTaxSignStatus === 1) {
            this.$router.push(url);
          } else {
            if (adjust) {
              this.$router.push(url);
            } else {
              Dialog.alert({
                title: "提示",
                message: "纳税主体预核税未完成",
                confirmButtonText: "我知道了"
              });
            }
          }
        } else {
          if ((this.registerType === 5030 && applicationSignStatus === 1 && contractSignStatus === 1 && preTaxSignStatus === 1) || 
          ((this.registerType === 5010 || this.registerType === 5020) && applicationSignStatus === 1 && preTaxSignStatus === 1)
          ) {
            this.$router.push(url); 
          } else {
              Dialog.alert({
                  title: "提示",
                  message: "纳税主体未完成操作",
                  confirmButtonText: "我知道了"
              });
            }
          
        }
      }
    },
    signSee(index, imgs) {
      this.$emit("func", index, imgs);
    }
  }
};
</script>

<style lang="less">
.transfer-main {
  margin-bottom: 16px;
  .van-cell {
    padding: 16px;
    border-radius: 2px;

    &:not(:last-child)::after {
      left: 0;
      border-bottom: 1px solid #dfdfdf;
    }

    &.dcl .van-cell__value {
      background-image: linear-gradient(90deg, #52bafe 18%, #46caeb 100%);
    }

    &.ywc .van-cell__value {
      background-image: linear-gradient(45deg, #94e652 0%, #7fc448 100%);
    }

    .van-cell__title {
      flex: 3;
    }

    .van-cell__value {
      flex: none;
      width: 66px;
      height: 25px;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
    }

    .van-icon {
      color: #666 !important;
    }
  }

  .transfer-home-lists {
    padding: 14px 16px;
    background: #fff;
    width: 100%;
    overflow: hidden;

    li {
      float: left;
      width: 50%;
      margin-top: 8px;

      .van-icon.van-icon-success {
        vertical-align: -4px;
        color: #309de5 !important;

        &.fail {
          color: #d8d8d8 !important;
        }
      }

      span {
        display: inline-block;
      }
    }
  }
}
</style>
<template>
  <div class="estate-search">
    <NavBar :navTitle="pageTitle" />
    <div class="estate-search-wrap">
      <!-- 第一步 -->
      <AutoForm v-model="form1Data" :data="firstData" @save="saveFirst" v-if="step === 1">
        <div slot="warrantNumber" class="hint" >
          <p>平房或独幢楼房没有进行实地查看的，请前往不动产登记中心办理实地勘察。</p>
        </div>
      </AutoForm>

      <!-- 第二步 -->
      <AutoForm v-model="form2Data" :data="getSecondData" @save="saveSecond" v-if="step === 2"></AutoForm>
    </div>
  </div>
</template>
<script>
import AutoForm from "@/common/AutoForm/components/AutoForm";
import {
  checkIdCard,
  getHouseTransferType,
  getFaceValidateStatus
} from "@/service/transfer";
import { Toast, Dialog } from "vant";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "eatateMortgage",
  data() {
    return {
      ...mapState,
      authenticationVisible: false,
      failedCount: 0,
      secondData: [],
      firstData: [],
      tag: "",
      step: 1,
      newHouse: true,
      form1Data: {},
      form2Data: {},
      // 房屋第一步
      data1: [
        {
          type: 3, //输入框 , 必填
          key: "warrantType", //key, 必填
          label: "证书类型", //描述
          value: 0, //命中值
          show: false, //设为true可以让初始化时就显示
          data: [
            { text: "不动产权证号", key: 1 },
            { text: "旧不动产权证号", key: 2 }
          ],
          placeholder: "请输入产权证号中数字部分",
          // data: [111, 222, 333, 444],
          callback: (value, index, item) => {
            if (value.key === 2) {
              // 旧不动产
              this.data1[1].hidden = true;
              this.data1[1].required = false;
            } else if (value.key === 1) {
              this.data1[1].hidden = false;
              this.data1[1].required = true;
            }
          }
        },
        {
          type: 3, //输入框 , 必填
          key: "years", //key, 必填
          label: "年份", //描述
          value: 0, //命中值
          show: false, //设为true可以让初始化时就显示
          data: this.getYearList(),
          // data: this.$store.getters.estateSearchYearList,
          callback: (value, index, item) => {
            console.log(`选中项=${value},索引${index}`, item);
            // item.value = index + 1
          }
        },
        {
          type: 1, //输入框 , 必填
          key: "warrantNumber", //key, 必填
          inputType: "text", //输入框类型, 可选
          label: "产权证号", //label, 可选
          placeholder: "请输入产权证号中数字部分",
          value: "", //初始值, 可选
          required: true //是否必填, 可选
        },
        {
          type: 7, //一个按钮
          label: "查询并办理",
          readonly: false,
          class: "search_btn", //自定义样式,类
          hidden: false, //隐藏字段
          bgcolor: "#309de5",
          color: "#fff",
          callback: form => form
        }
      ],
      // 房屋一手房第二步
      data2: [
        {
          type: 3, //输入框 , 必填
          key: "orgType", //key, 必填
          label: "申请人类型", //描述
          value: 0, //命中值
          show: false, //设为true可以让初始化时就显示
          data: [{ text: "个人", key: 1 }, { text: "企业/单位", key: 2 }],
          callback: (value, index, item) => {
            if (value.key === 1) {
              //个人
              this.data2[1].hidden = false;
              this.data2[1].required = true;

              this.data2[2].hidden = true;
              this.data2[2].required = false;

              this.data2[3].hidden = true;
              this.data2[3].required = false;
            } else if (value.key === 2) {
              // 企业/单位
              this.data2[1].hidden = true;
              this.data2[1].required = false;

              this.data2[2].hidden = false;
              this.data2[2].required = true;

              this.data2[3].hidden = false;
              this.data2[3].required = true;
            }
          }
        },
        {
          type: 1, //输入框 , 必填
          key: "name", //key, 必填
          inputType: "text", //输入框类型, 可选
          label: "姓名", //label, 可选
          value: "", //初始值, 可选
          required: true //是否必填, 可选
        },
        {
          type: 1, //输入框 , 必填
          key: "unitName", //key, 必填
          inputType: "text", //输入框类型, 可选
          hidden: true,
          label: "企业/单位名称", //label, 可选
          value: "", //初始值, 可选
          required: false //是否必填, 可选
        },
        {
          type: 1, //输入框 , 必填
          key: "name", //key, 必填
          inputType: "text", //输入框类型, 可选
          label: "法人/负责人姓名", //label, 可选
          hidden: true,
          value: "", //初始值, 可选
          required: false //是否必填, 可选
        },
        {
          type: 1, //输入框 , 必填
          key: "cardNo", //key, 必填
          inputType: "text", //输入框类型, 可选
          label: "身份证号码", //label, 可选
          value: "", //初始值, 可选
          required: true //是否必填, 可选
        },
        {
          type: 7, //一个按钮
          label: "提交",
          readonly: false,
          class: "search_btn", //自定义样式,类
          hidden: false, //隐藏字段
          bgcolor: "#309de5",
          color: "#fff",
          callback: form => form
        }
      ],

      // 土地第二步 && 二手房第二步
      data4: [
        {
          type: 3, //输入框 , 必填
          key: "orgType", //key, 必填
          label: "权利人类型", //描述
          value: 0, //命中值
          show: false, //设为true可以让初始化时就显示
          data: [{ text: "个人", key: 1 }, { text: "企业/单位", key: 2 }],
          callback: (value, index, item) => {
            if (value.key === 1) {
              //个人
              this.data4[1].hidden = false;
              this.data4[1].required = true;

              this.data4[2].hidden = true;
              this.data4[2].required = false;

              this.data4[3].hidden = true;
              this.data4[3].required = false;
            } else if (value.key === 2) {
              // 企业/单位

              this.data4[1].hidden = true;
              this.data4[1].required = false;

              this.data4[2].hidden = false;
              this.data4[2].required = true;

              this.data4[3].hidden = false;
              this.data4[3].required = true;
            }
          }
        },
        {
          type: 1, //输入框 , 必填
          key: "name", //key, 必填
          inputType: "text", //输入框类型, 可选
          label: "权利人姓名", //label, 可选
          hidden: false,
          value: "", //初始值, 可选
          required: true //是否必填, 可选
        },
        {
          type: 1, //输入框 , 必填
          key: "unitName", //key, 必填
          inputType: "text", //输入框类型, 可选
          label: "权利人名称", //label, 可选
          placeholder: "请输入企业/单位名称",
          hidden: true,
          value: "", //初始值, 可选
          required: false //是否必填, 可选
        },
        {
          type: 1, //输入框 , 必填
          key: "name", //key, 必填
          inputType: "text", //输入框类型, 可选
          label: "法人/负责人姓名", //label, 可选
          hidden: true,
          value: "", //初始值, 可选
          required: true //是否必填, 可选
        },
        {
          type: 1, //输入框 , 必填
          key: "cardNo", //key, 必填
          inputType: "text", //输入框类型, 可选
          label: "身份证号码", //label, 可选
          value: "", //初始值, 可选
          required: true //是否必填, 可选
        },
        {
          type: 7, //一个按钮
          label: "提交",
          readonly: false,
          class: "search_btn", //自定义样式,类
          hidden: false, //隐藏字段
          bgcolor: "#309de5",
          color: "#fff",
          callback: form => form
        }
      ]
    };
  },
  created() {
    this.tag = this.$route.params.tag;
    this.firstData =  this.data1;
  },
  computed: {
    pageTitle() {
      return `不动产信息查询（${this.step}/2）`;
    },
    getSecondData() {
      return this.tag === "house" && this.newHouse ? this.data2 : this.data4;
    }
  },
  methods: {
    ...mapActions(["mortgageSearch"]),
    ...mapMutations({
      setCallback: "SET_CALLBACK"
    }),
    saveFirst(data) {

        // 房屋
        if (typeof data.warrantType === "object") {
          data.warrantType = data.warrantType.key;
        }
        const params = {
          ...data,
          cardType: 1
        };
        getHouseTransferType(params).then(res => {
          const { success, data, msg, errorCode } = res;
          if (success) {
            this.registerType = data;
            if (data === 5030) {
              // 二手房转移
              Dialog.alert({
                title: "提示",
                message: "二手房转移登记发起方必须是产权人之一,请知悉！",
                confirmButtonText: "继续办理"
              }).then(() => {
                this.newHouse = false;
                this.step++;
              });
            } else if (data === 5020) {
              // 一手房转移
              this.newHouse = true;
              this.step++;
            }
          } else if (errorCode == 401) {
            this.$route.push("/login");
          } else {
            Toast(msg || fieldErrors[0].msg);
          }

        });
    },
    validCardNo(value) {
      return new Promise((resolve, reject) => {
        if (value.cardNo.toString().length !== 18) {
          // 居民身份证   18位校验
          Toast.fail("请输入18位证件号码");
          reject();
        }

        // 未输入姓名，不进行校验
        if (!value.name) {
          reject();
        }

        // 实名认证检验
        checkIdCard({
          personId: value.cardNo,
          personName: value.name
        }).then(res => {
          if (res.success) {
            resolve(res);
          } else {
            Toast.fail(res.msg || res.data.verificationFail);
            reject(res.msg || res.data.verificationFail);
          }
        });
      });
    },
    saveSecond(data) {
      if (typeof data.orgType === "object") {
        data.orgType = data.orgType.key;
      }
      const params = {
        ...this.form1Data,
        ...data,
        registerType: this.registerType
      };
      this.validCardNo(params).then(async () => {
        // TODO  人脸识别
        let callback = () => {
          this.$router.back();
          this.step = 2;
          this.mortgageSearch({
            cardType: 1,
            ...params
          });
          this.setCallback(null);
        };
        this.setCallback(callback);
        this.$router.push(
          `/certification/0/3/0?identity=${params.cardNo}&name=${params.name}`
        );
      });
    },
    getYearList() {
      const currentYear = new Date().getFullYear();
      const startYear = 2015;
      const yearList = [];
      for (let i = currentYear; i > startYear; i--) {
        yearList.push(i);
      }
      return yearList;
    }
  },
  components: { AutoForm }
};
</script>
<style lang="less" scoped>
.estate-search {
  width: 100%;
  min-height: calc(100vh - 44px);
  background-color: #fff;
  padding: 16px;

  .hint {
    margin-top: 13px;
    p {
      line-height: 20px;
      font-size: 14px;
      color: #999;
      margin-bottom: 4px;
    }
  }

  /deep/.van-cell--required {
    &:before {
      content: "";
    }
  }
  /deep/.search_btn {
    width: 343px;
    position: fixed;
    bottom: 24px;
    left: 16px;
    background-color: #309de5;
  }
}
</style>

<template>
  <div>
    <NavBar :navTitle="componentTitle" :goBack="goBack" />
    <div class="bisiapply-edit-orderTradeInfo">
      <div v-for="(item, index) in orderTradeInfoLabels" :key="index">
        <div
          v-if="item.type=='select'"
          @click="()=> {item.disabled ? ()=>{} :changeS(taxesPayerSelection,item.key,item.label, orderTradeInfo[item.key])}"
        >
          <van-field
            input-align="right"
            :value="orderTradeInfo[item.key]"
            :label="item.label"
            placeholder="请选择"
            icon="arrow"
            :disabled="item.disabled"
          />
        </div>
        <van-field
          v-else
          input-align="right"
          :disabled="item.disabled"
          :label="item.label"
          v-model="orderTradeInfo[item.key]"
          :placeholder="item.placeholder || `请输入${item.label}`"
        >
          <div
            v-if="item.sufix"
            slot="right-icon"
            size="small"
            type="primary"
            :style="{ 'color': '#5d6471'}"
          >{{item.sufix}}</div>
        </van-field>
      </div>
      <div
        v-if="transferbusiapplyForm.userRole == UserRoleEnum.fromAlias('ROLE_ASSIGNOR').value && UserRoleEnum.fromAlias('ROLE_ASSIGNOR').value == orderTradeInfo.taxesPayer"
      >
        <div
          class="indent"
          @click="beforeChangeS(applicantList,'taxesPayerName','缴纳税费主体人员', taxesPayerName)"
        >
          <van-field
            input-align="right"
            label="缴纳税费主体人员"
            :value.sync="taxesPayerName"
            placeholder="请选择"
            icon="arrow"
            disabled
          />
        </div>
      </div>
    </div>
    <Footer :toNextPage="finish" />
    <SelectPage
      :show="select_show"
      :select="select_arr"
      v-on:pageChange="pageChange"
      v-on:hideSelect="hideSelect"
      :propsValue="propsValue"
      nextPage="three"
      :onSelect="onSelect"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Field, Button, CellGroup, Checkbox, Toast } from "vant";
import SelectPage from "@/components/selectPage.vue";
import selectMix from "@/mixins/selectPage.js";
import businessMix from "@/mixins/business.js";
import NavBar from "@/components/navBar.vue";
import { newOrderTradeInfoDTO, newApplicantInfoDTO } from "./dao.js";
import {
  tabsRelateToUserRole,
  UserRolesEnum,
  UserRoleEnum //包含申请人
} from "@/views/transferbusiapply/const";
import Footer from "./components/footer.vue";
export default {
  mixins: [selectMix, businessMix],
  data() {
    return {
      applicantList: [],
      taxesPayerSelection: [],
      orderTradeInfo: {
        housePrice: undefined,
        taxesPayer: undefined,
        taxesPayerDesc: "",
        address: ""
      },
      taxesPayerName: "",
      UserRoleEnum: UserRoleEnum
    };
  },
  computed: {
    ...mapState("transferbusiapply", [
      "transferbusiapplyForm",
      "componentTitle"
    ]),
    orderTradeInfoLabels() {
      let canEdit = !this.canEdit();
      switch (this.transferbusiapplyForm.registerType) {
        case 5010: // 土地
          return [
            {
              disabled: canEdit,
              key: "housePrice",
              label: "不动产成交价",
              sufix: "元"
            },
            {
              type: "select",
              disabled: canEdit,
              key: "taxesPayerDesc",
              label: "缴纳税费主体"
            }
          ];
        case 5020: // 一手房
          return [
            {
              disabled: canEdit,
              key: "housePrice",
              label: "不动产成交价",
              sufix: "元"
            },
            {
              type: "select",
              disabled: true,
              key: "taxesPayerDesc",
              label: "缴纳税费主体"
            }
          ];
        case 5030: // 二手房
          return [
            {
              disabled: canEdit,
              key: "housePrice",
              label: "不动产成交价",
              sufix: "元"
            },
            {
              type: "select",
              disabled: canEdit,
              key: "taxesPayerDesc",
              label: "缴纳税费主体"
            }
          ];

        default:
          console.log(
            `暂不支持该登记类型${this.transferbusiapplyForm.registerType}`
          );

          break;
      }
    }
  },
  methods: {
    finish() {
      for (const iterator of this.applicantList) {
        if (iterator.name === this.taxesPayerName) {
          iterator.isTaxesPayer = 1;
        } else {
          iterator.isTaxesPayer = 0;
        }
      }
      let salerInfo = {
        ...newApplicantInfoDTO(),
        ...this.transferbusiapplyForm.salerInfo
      };
      this.$store.commit("transferbusiapply/setForm", {
        orderTradeInfoDTO: { ...this.orderTradeInfo },
        salerInfo: { ...salerInfo, applicantList: this.applicantList }
      });
      this.stage()
        .then(this.goNext)
        .catch(res => console.log(res));
    },
    onSelect(value, index, item) {
      if (this.select_key == "taxesPayerDesc") {
        this.orderTradeInfo = {
          ...this.orderTradeInfo,
          taxesPayer: item.key,
          taxesPayerDesc: item.name
        };
      }
    }
  },
  mounted() {
    let salerInfo = {
      ...newApplicantInfoDTO(),
      ...this.transferbusiapplyForm.salerInfo
    };
    this.applicantList = salerInfo.applicantList ? salerInfo.applicantList : [];
    let payer = this.applicantList.find(item => item.isTaxesPayer == 1) || {};
    this.taxesPayerName = payer.name;
    this.orderTradeInfo = {
      ...newOrderTradeInfoDTO(),
      ...this.transferbusiapplyForm.orderTradeInfoDTO
    };
    this.taxesPayerSelection = UserRolesEnum.toArray().map(item => {
      return { key: "" + item.value, name: item.text };
    });
    this.orderTradeInfo.address = this.transferbusiapplyForm.orderHouse
      ? this.transferbusiapplyForm.orderHouse.location
      : [];
    this.orderTradeInfo.taxesPayerDesc = this.getNameByKey(
      UserRoleEnum.toArray().map(item => {
        return { key: "" + item.value, name: item.text };
      }),
      this.orderTradeInfo.taxesPayer
    );
  },
  created() {},
  components: {
    Button,
    SelectPage,
    [Field.name]: Field,
    Footer
  }
};
</script>
<template>
  <div>
    <NavBar :navTitle="typeTitle" />
    <div class="bisiapply-edit">
      <component
        :is="whichEdit"
        :updateForm="updateForm"
        :form="form"
        v-bind="$attrs"
        :dict="dict"
        :materialTypeList="materialTypeList"
      ></component>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
import NavBar from "@/components/navBar.vue";
import { detail, getMaterialList } from "@/service/business";
import layout from "./layout.vue";
import materialList from "./materialList.vue";
import orderHouse from "./orderHouse.vue";
import orderTradeInfoDTO from "./orderTradeInfoDTO.vue";
import buyerInfo from "./buyerInfo.vue";
import buyerInfoForNew from "./buyerInfoForNew.vue";
import applicantOrderAskInfo from "./applicantOrderAskInfo.vue";
import buyerOrderAskInfo from "./buyerOrderAskInfo.vue";
import salerInfo from "./salerInfo.vue";
import salerOrderAskInfo from "./salerOrderAskInfo.vue";
import buyerInfoForSaler from "./buyerInfoForSaler.vue";
import salerInfoForBuyer from "./salerInfoForBuyer.vue";

import post from "./post.vue";
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import { UserRoleEnum } from "../const";
export default {
  name: "transferbusiapply",
  data() {
    return {
      materialTypeList: [],
      typeTitle: "" // 总览页的头部标题
    };
  },
  watch: {
    dict: {
      handler(dict) {
        let registerType = this.transferbusiapplyForm.registerType;

        let nameObj = dict["mailRegisterType"].find(
          ({ key }) => registerType == key
        );
        nameObj = nameObj || {};
        this.typeTitle = nameObj.name;
      }
    },
    immediate: true
  },
  methods: {
    ...mapActions("transferbusiapply", ["getData"]),
    ...mapMutations("transferbusiapply", ["setMaterialTypeList"]),
    updateForm(value) {
      this.$store.commit("transferbusiapply/setForm", value);
      if (localStorage) {
        localStorage.setItem("busiApply", JSON.stringify(this.form));
      }
    },
    setTitle(registerType) {
      let mailRegisterType = this.dict["mailRegisterType"] || [];
      let nameObj = mailRegisterType.find(({ key }) => registerType == key);
      nameObj = nameObj || {};
      this.typeTitle = nameObj.name;
    }
  },
  computed: {
    ...mapGetters(["dict"]),
    ...mapState("transferbusiapply", ["transferbusiapplyForm", "whichEdit"]),
    ...mapState({
      form: state => state.transferbusiapplyForm || {}
    })
  },
  mounted() {
    // let res = {"errorCode":"0","success":true,"fieldErrors":[],"msg":"请求成功！","data":{"respCode":"0000","respMessage":"成功","zdjbxxObj":{"sfcf":0,"sfdy":0,"sfgs":0,"sfyy":0,"bdcdyh":"BDC0001","xzqh":"鹤岗市向阳区","ssbdcqzh":"A10000","jd":"向阳街","jf":"五街坊","szz":"神马组","suoyouq":"国家","shiyongq":"张三","sffbcz":1,"qlrxxList":[{"bdcqzh":"BDCAAAA","qlrlx":"01","qlrxm":"龙丹","zjlx":"01","zjhm":"44098119931104612X","sfhmd":0},{"bdcqzh":"BDCAAAA","qlrlx":"01","qlrxm":"许欣欣","zjlx":"01","zjhm":"441502199102180246","sfhmd":0}],"qllx":"1","qlxz":"102","tdqslyzmcl":"123","tdzl":"向阳区","fddbrhfzrxm":"李四","dlrxm":"王五","dlrzjlx":"01","dlrzjbh":"321098197201233212","dlrdh":"13812345678","qlsdfs":"1","ybzddm":"y10234","zddm":"ZD1003","szblc":"1: 500","sztfh":"133","zdszb":"规划路","zdszd":"和谐路","zdszn":"胜利路","zdszx":"创新路","dj":"2","jg":"123.23","pzyt":"","tdyt":"072","tdytMap":null,"syqxq":"2019-09-30","syqxz":"2039-09-30","pzmj":"3000","jzzdmj":"6000","zdmj":"7000","fzmj":"7500","zjzmj":"6500","syqmj":"6000","ftmj":"500","ftxs":"0.8","dymj":"4000","gyqlrqk":"夫妻共有","mjdw":"平方米","bdcqzh":null},"fzwqkObj":{"jzrjl":"0.4","jzmd":"0.5","jzxg":"800","jzwzdmj":"900","jzwlx":"厂房","sbjzwqs":"申报建筑物权属","zjzmj":"1000","ftxs":"0.5"}}};
    // let values = {"cardType":1,"ancestralLandCode":"ZD1003","orgType":1,"name":"许欣欣","unitName":"","cardNo":"441502199102180246","registerType":5010}
    // this.$store.commit('transferbusiapply/setPropertyInfo', {...res.data,warrantType:'ZD1003', ...values});
    let registerType = this.transferbusiapplyForm.registerType;
    let orderId = parseInt(this.$route.query.id);
    let applicantOrgType = 1;
    let getApplicantOrgType = (userType) => {
      if (userType==1) {
        const {salerInfo = {applicantList:[]}, salerInfo:{applicantList=[]}} = this.transferbusiapplyForm;
        return (applicantList && applicantList.length) ? applicantList[0].orgType : 1
      } else {
        const {buyerInfo = {applicantList:[]}, buyerInfo:{applicantList=[]}} = this.transferbusiapplyForm;
        
        return (applicantList && applicantList.length) ? applicantList[0].orgType : 1
      }
    }
    // edit 1或者0,1是编辑，0是详情，没有值是编辑
    this.$store.commit(
      "transferbusiapply/setPageEditable",
      this.$route.query.edit !== "0"
    );
    if (orderId) {
      this.getData(orderId)
        .then(({ success, data, msg }) => {
          this.setTitle(data.registerType);
          let userType = this.transferbusiapplyForm.loginUserType || 2;
          getMaterialList({
            registerType: data.registerType,
            buyerOrSaler: userType,
            applicantOrgType: getApplicantOrgType(userType)
          }).then(({ data }) => {
            this.setMaterialTypeList(data || []);
          });
        })
        .catch(res => {
          Toast(res.msg || "获取数据失败");
        });
    } else if (registerType) {
      this.setTitle(registerType);
      let userType = registerType==5020 ? 2 : 1;// 一手房为买方，土地二手房是卖方
      getMaterialList({
        registerType: registerType,
        buyerOrSaler: userType,
        applicantOrgType: getApplicantOrgType(userType)
      }).then(({ data }) => {
        this.setMaterialTypeList(data || []);
      });
    } else {
      Toast("请先查询登记信息或选择已有登记");
      this.$router.go(-1);
    }
  },
  created() {},
  destroyed() {
    localStorage.setItem("busiApply", JSON.stringify({}));
  },
  components: {
    layout,
    materialList,
    orderHouse,
    orderTradeInfoDTO,
    buyerInfo,
    buyerInfoForNew,
    buyerOrderAskInfo,
    salerInfo,
    salerOrderAskInfo,
    buyerInfoForSaler,
    applicantOrderAskInfo,
    salerInfoForBuyer,
    post
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit {
  text-align: left;
  background: #f5f5f5;
  text-align: left;
  background: #f5f5f5;
  position: absolute;
  top: 43px;
  left: 0;
  right: 0;
  bottom: 0;
  .van-icon {
    color: #aab0b9 !important;
  }
  /deep/.van-field__label {
    width: 120px;
  }
  /deep/.btn-code {
    height: 24px;
    display: inline-block;
    line-height: 24px;
    color: #309de5;
    font-size: 15px;
    border: 0;
    padding-right: 0;
  }
  /deep/.tips {
    font-size: 14px;
    color: #666666;
    padding: 16px;
    background: #f5f5f5;
  }
}
.danger {
  color: #ff2626;
}
</style>
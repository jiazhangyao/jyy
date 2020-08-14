<template>
  <div>
    <NavBar :navTitle="typeTitle" />
    <div class="bisiapply-edit">
      <component
        :is="whichEdit"
        :title="title"
        :updateForm="updateForm"
        :changeComponent="changeComponent"
        :form="form"
        v-bind="$attrs"
        :dict="dict"
        :materialTypeList="materialTypeList"
      ></component>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navBar.vue";
import { detail, getMaterialList } from "@/service/business";
import mortgageInfo from "./mortgageInfo.vue";
import mortgagor from "./mortgagor.vue";
import mortgagee from "./mortgagee.vue";
import layout from "./layout.vue";
import signInfo from "./signInfo.vue";
import obligee from "./obligee.vue";
import obligor from "./obligor.vue";
import orderHouse from "./orderHouse.vue";
import materialList from "./materialList.vue";
import post from "./post.vue";
import { mapGetters } from "vuex";
import { tabItems, tabsRelateToType, registerTypeTransfer } from "../const";
export default {
  data() {
    return {
      materialTypeList: [],
      typeTitle: "",
      title: "",
      whichEdit: layout,
      form: {
        signInfo: {
          contractNo: null,
          signCompanyName: null,
          totalPrice: null
        },
        obligorInfo: {
          applicantList: []
        },
        obligeeInfo: {
          applicantList: [
            {
              faceIdentity: 0, // 人脸识别 1: 通过; 2:不通过  0:未验证
              /* 和liuwei 讨论，暂定设置为1传向后端，因为调用API时表示身份验证已经通过了！ --2018-5-18  // TODO... */
              credooIdentity: 1 // 身份验证 1: 通过; 2:不通过
            }
          ]
        },
        orderHouse: {},
        mortgageeInfo: {
          applicantList: []
        },
        mortgagorInfo: {
          applicantList: []
        },
        materialList: []
      }
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["dict"])
  },
  mounted() {
    let { name, tabs } = tabsRelateToType[this.$route.query.type];
    this.typeTitle = name;
    this.title = name;
    let typeTag = this.$route.query.type;
    let registerType = registerTypeTransfer[typeTag]
      ? registerTypeTransfer[typeTag]
      : typeTag;

    getMaterialList(registerType).then(({ data }) => {
      this.materialTypeList = data || [];
    });
    if (this.$route.query.id) {
      detail(this.$route.query.id).then(({ success, data }) => {
        if (success) {
          this.form = { ...this.form, ...data };
          this.preDataHandler(data);
          this.dealDefaultValue();
        }
      });
    }
    this.form.registerType = registerType;
    this.dealDefaultValue();
    this.$store.dispatch("getFileHost", {});
  },
  destroyed() {
    sessionStorage.setItem("busiApply", JSON.stringify({}));
  },
  components: {
    mortgageInfo,
    mortgagee,
    mortgagor,
    layout,
    signInfo,
    obligee,
    obligor,
    orderHouse,
    materialList,
    post
  },
  created() {},
  methods: {
    dealDefaultValue() {
      // 默认不邮寄
      this.form.isPost = this.form.isPost || 2;
      //抵押类型 默认为一般抵押
      this.form.mortgageInfo = this.form.mortgageInfo || {};
      this.form.mortgageInfo.type = this.form.mortgageInfo.type || 1;

      //共有方式 默认为单独所有
      this.form.obligeeInfo = this.form.obligeeInfo || {};
      this.form.obligeeInfo.ownershipType =
        this.form.obligeeInfo.ownershipType || 1;

      //持证方式 默认为分别持证
      this.form.obligeeInfo.holdingType =
        this.form.obligeeInfo.holdingType || 2;
      // 初始化familyMemberList
      for (const item of ["obligorInfo", "obligeeInfo", "mortgagorInfo"]) {
        this.form[item] = this.form[item] || {};
        this.form[item].familyList = this.form[item].familyList || [];
        this.form[item].familyList[0] = this.form[item].familyList[0] || {
          familyMemberList: []
        };
      }
    },
    changeComponent(component) {
      this.whichEdit = component.component;
      this.title = component.label || this.typeTitle;
    },
    updateForm(value) {
      this.form = { ...this.form, ...value };
      this.dealDefaultValue();
      if (sessionStorage) {
        sessionStorage.setItem("busiApply", JSON.stringify(this.form));
      }
    },
    preDataHandler(data) {
      let form = {
        signInfo: {},
        obligorInfo: {
          applicantList: [],
          familyList: [{ familyMemberList: [] }]
        },
        obligeeInfo: {
          applicantList: [],
          familyList: [{ familyMemberList: [] }]
        },
        orderHouse: {},
        mortgagorInfo: {
          applicantList: [],
          familyList: [{ familyMemberList: [] }]
        },
        mortgageeInfo: {
          applicantList: [],
          familyList: [{ familyMemberList: [] }]
        },
        materialList: []
      };
      let storage = sessionStorage
        ? JSON.parse(sessionStorage.getItem("busiApply"))
        : {};
      let typeTag = this.$route.query.type;
      let registerType = registerTypeTransfer[typeTag]
        ? registerTypeTransfer[typeTag]
        : typeTag;
      //商品房预告登记转商品房预抵押登记 权利人信息变成抵押人信息
      if (this.$route.query.type > 10) {
        data.obligorInfo && this.delAllId(data.obligorInfo);
        data.obligeeInfo && this.delAllId(data.obligeeInfo);
        data.mortgagorInfo && this.delAllId(data.mortgagorInfo);
        data.mortgageeInfo && this.delAllId(data.mortgageeInfo);
        data.orderHouseList && this.delOderHouseId(data.orderHouseList);
        if (this.$route.query.type == 12) data.mortgagorInfo = data.obligeeInfo;
      }

      if (typeTag > 10) {
        data.materialList = this.dealWithMaterials(data.materialList, typeTag);
      }
      this.form = { ...form, ...storage, ...data, registerType: registerType };
    },
    dealWithMaterials(dataMaterialList) {
      //对材料处理
      dataMaterialList = dataMaterialList.map((item, idx) => {
        return {
          fileList: item.fileList.map(file => {
            return { ...file, id: item.id };
          }),
          materialType: item.materialType
        };
      });

      return dataMaterialList;
    },
    delAllId(item) {
      if (item.applicantList && item.applicantList.length) {
        for (const applicant of item.applicantList) {
          applicant.id && delete applicant.id;
          if (applicant.proxyList && applicant.proxyList) {
            for (const proxy of applicant.proxyList) {
              proxy.id && delete proxy.id;
            }
          }
        }
      }
      if (item.familyList && item.familyList.length) {
        for (const family of item.familyList) {
          family.id && delete family.id;
          if (family.familyMemberList && family.familyMemberList) {
            for (const familyMember of family.familyMemberList) {
              familyMember.id && delete familyMember.id;
            }
          }
        }
      }
    },
    delOderHouseId(item) {
      for (const house of item) {
        house.id && delete house.id;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit {
  text-align: left;
  .van-icon {
    color: #aab0b9 !important;
  }
  footer {
    position: fixed;
    bottom: 0;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-top: 1Px solid #cbd2de;
    button {
      min-width: 109px;
    }
  }
}
.danger {
  color: #ff2626;
}
</style>
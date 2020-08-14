
import { Toast } from "vant";
import { tabItems } from "@/views/sealUp/consts/index.js";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState("sealUp", ["detailHistoryData", "registerType", "id", "whichEdit", "materialLists", "materialTypeList", "status", "pageEditable"]),
    tabsRelateToType() {
      let tabs = ["DetailEstate",
        this.pageEditable ? "AddSeal" : "DetailSeal",
        this.pageEditable ? "AddFile" : "AddFile"]
      if (this.detailHistoryData && [4050, 4060].indexOf(this.registerType) > -1) {
        tabs.unshift("DetailHistory")
      }

      return {
        name: "",
        tabs
      }
    },
    componentFinished() {
      let res = {
        AddFile: this.checkFile(),
        AddSeal: this.checkSeal(),
      };

      return res;
    },
    items() {
      let items = [];
      let { tabs = [] } = this.tabsRelateToType;
      for (const item of tabs) {
        items.push(tabItems[item]);
      }
      return items;
    }
  },
  methods: {
    ...mapMutations("sealUp", ["setWhichEdit", "setComponentTitle", "setPageEditable", "setMaterialTypeList"]),
    // 校验开始
    checkFile() {
      let result = true;
      if (!this.materialTypeList || !this.materialLists) return false;
      this.materialTypeList.forEach(type => {
        if (type.required) {
          let files = this.materialLists.find(item => item.materialType == type.id);
          result = result && files && files.fileList && files.fileList.length
        }
      });
      return result;
    },
    checkSeal() {
      let result = true;
      return result;
    },
    // 校验结束
    // 根据业务状态，判断该模块是否可以编辑
    canEdit(itemName) {
      if (!this.pageEditable) return false; // 不可编辑的时候，统一返回不可编辑
      // 状态为驳回。仅materialList支持编辑
      if ([20].indexOf(this.status) > -1 && itemName == "AddFile") {
        return true;
      }

      if (tabItems[itemName]) {
        return tabItems[itemName].canEdit;
      } else {
        return true;
      }
    },
    chanegCanEdit(data) {
      this.setPageEditable(data);
    },
    gotoComponent(component) {
      this.$router.push(`${component.path}?detail=${this.pageEditable ? 1 : 0}`);
    },
    changeComponent(component) {
      this.setWhichEdit(component.component);
      this.setComponentTitle(component.label || this.typeTitle);
    },
    // 上一页
    goPrev() {
      let { tabs } = this.tabsRelateToType;
      let componentKey = tabs[tabs.indexOf(this.whichEdit) - 1];
      this.changeComponent(componentKey ? { ...tabItems[componentKey] } : {
        label: '',
        component: "layout"
      });
    },
    goNext() {
      // 保存数据至后台
      let { tabs } = this.tabsRelateToType;
      let componentKey = tabs[tabs.indexOf(this.whichEdit) + 1];
      console.log(tabs, componentKey, this.whichEdit, tabs.indexOf(this.whichEdit) + 1);

      this.changeComponent({
        ...(componentKey ? tabItems[componentKey] : {
          label: '',
          component: "layout"
        })
      });
    },
    // 子模块返回，回到layout页
    goBack() {
      this.changeComponent({
        label: '',
        component: "layout"
      });
    },
    goHome() {
      this.$router.push("/");
    },

    add() {
      let params = {};

      this.$store.dispatch("sealUp/addFormSubmit", {
        ...params,
        orderId: this.id,
        registerType: this.registerType,
      });
    },

    linkUrl(opt) {
      let { id } = this.$route.params;
      if (id) {
        this.$router.push({ path: opt, query: { detail: true } });
      } else {
        this.$router.push(opt);
      }
    },
    commitBiz() {
      let finished = true;
      for (const item of this.items) {
        if (item.canEdit && !this.componentFinished[item.component]) {
          Toast("请检查" + item.label + "的信息");
          finished = false;
          return false;
        }
      }
      if (finished) {
        this.add();
      }
    },
  }
}
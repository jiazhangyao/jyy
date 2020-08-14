import {
  idCardValidate,
  mortGageOrderSubmission, //提交
  mortGageOrderSave,  //新房暂存
  mortGageOrderEndOrder, // 终止
} from "@/service/mortgageBusiness";

import { Toast } from "vant";
import { tabItems, tabsRelateToUserRole, UserRoleEnum } from "@/views/mortgage/busiapply/const.js";
import { verifyPhone } from "@/mixins/commonValid.js";
import { mapState, mapMutations } from "vuex";
const businessMix = {
  props: ["form", "title", "updateForm"],
  data() {
    return {
    }
  },
  computed: {
    ...mapState("mortgageBusiapply", ["transferbusiapplyForm", "whichEdit", "materialTypeList", "pageEditable"]),

    componentFinished() {
      let form = this.$store.state.mortgageBusiapply.transferbusiapplyForm;

      let res = {
        orderHouse: this.orderHouseValid(form.orderHouse).result,
        materialList: this.materialListValid(form.materialList || []).result,
        post: this.postValid(form.isPost, form.orderMail).result,
        mortgagorInfo: this.mortgagorInfoValid(form.mortgagorInfo).result,

        orderTradeInfoDTO: this.orderTradeInfoDTOValid(form.orderTradeInfoDTO).result,
        mortgagorInfoForBuyer: this.mortgagorInfoForBuyerValid(form.mortgagorInfo).result,
        buyerInfo: this.buyerInfoValid(form.buyerInfo || {}).result,
        buyerInfoForNew: this.buyerInfoValid(form.buyerInfo || {}).result,
        buyerInfoForSaler: this.buyerInfoForSalerValid(form.buyerInfoForSaler).result,
        buyerOrderAskInfo: this.buyerOrderAskInfoValid(form.buyerOrderAskInfo).result,
        salerOrderAskInfo: this.salerOrderAskInfoValid(form.buyerOrderAskInfo).result,
        applicantOrderAskInfo: this.buyerOrderAskInfoValid(form.buyerOrderAskInfo).result,
      };

      return res;
    },
    items() {
      let items = [];

      let { tabs = [] } = tabsRelateToUserRole|| {};
      for (const item of tabs) {
        items.push(tabItems[item]);
      }
      return items;
    }
  },
  methods: {
    ...mapMutations("mortgageBusiapply", ["setWhichEdit", "setComponentTitle", "setPageEditable", "setMaterialTypeList"]),
    // 个人 权利人证件类型中文名
    cardTypeDesc(key) {
      let cardTypes = this.$store.getters.dict["personCardType"];
      return this.getNameByKey(cardTypes, key);
    },

    // 删除义务人同时删除家庭成员
    delAllpplicant() {
      this.showApplicant = false;
      this.applicantList.splice(0, this.applicantList.length);
      // 删除对应家庭成员
      if (!this.familyList[0].familyMemberList) {
        this.familyList[0].familyMemberList = [];
      }
      this.familyList[0].familyMemberList = this.familyList[0].familyMemberList.find(
        (element) => (element.isApplicant !== 1) 
      );
      this.familyList = [...this.familyList];
    },
    // 删除义务人同时删除家庭成员
    delApplicant(value) {
      this.showApplicant = false;
      this.applicantList.splice(value.index, 1);
      // 删除对应家庭成员
      if (!this.familyList[0].familyMemberList) {
        this.familyList[0].familyMemberList = [];
      }
      let familyMemberIndex = undefined;
      this.familyList[0].familyMemberList.forEach(
        (element, index) => {
          if (element.name == value.name) {
            familyMemberIndex = index;
          }
        }
      );
      familyMemberIndex != undefined && this.delFamilyMember(0, familyMemberIndex);
    },
    async endTransOrder() {
      const { id } = this.transferbusiapplyForm;
      const res = await mortGageOrderEndOrder({ id: id });
      const { success, globalError } = res;
      if (success) {
        Toast("转移登记终止成功");
        this.$router.push(`/account/order/list/done`);
      } else {
        Toast(globalError || '转移登记终止失败');
      }
    },
    // 根据业务状态，判断该模块是否可以编辑
    canEdit(itemName = this.whichEdit) {
      if (!this.pageEditable) return false; // 不可编辑的时候，统一返回不可编辑
      // 状态为驳回。仅materialList支持编辑
      if ([20, 51, 55].indexOf(this.transferbusiapplyForm.status) > -1) {
        return ['materialList', 'layout'].includes(itemName) ? true : false;
      }
      if (tabItems[itemName]) {
        let canEditUserRoles = UserRoleEnum.getValueArrFromAliasArr(tabItems[itemName].canEdit || []);
        return canEditUserRoles.indexOf(this.transferbusiapplyForm.userRole) > -1;
      } else {
        return true;
      }
    },
    chanegCanEdit(data) {
      this.setPageEditable(data);
    },
    // select 上包装一层，当前页不可以编辑则不能选择
    beforeChangeS() {
      if (this.canEdit()) {
        this.changeS(...arguments);
      }
    },
    changeComponent(component) {
      console.log("component",component)
      this.setWhichEdit(component.component);
      this.setComponentTitle(component.label || this.typeTitle);
    },
    // 上一页
    goPrev() {
      this.$store.dispatch('mortgageBusiapply/getUserRole').then((userRole) => {
        let { tabs } = tabsRelateToUserRole;
        let componentKey = tabs[tabs.indexOf(this.whichEdit) - 1];
        this.changeComponent(componentKey ? { ...tabItems[componentKey] } : {
          label: '',
          component: "layout"
        });
      });
    },
    goNext() {
      // 保存数据至后台
      this.$store.dispatch('mortgageBusiapply/getUserRole').then((userRole) => {
        let { tabs } = tabsRelateToUserRole;
        let componentKey = tabs[tabs.indexOf(this.whichEdit) + 1];
        this.changeComponent({
          ...(componentKey ? tabItems[componentKey] : {
            label: '',
            component: "layout"
          })
        });
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
    commitBiz() {
      let finished = true;
      for (const item of this.items) {
        if (!this.componentFinished[item.component]) {
          Toast("请检查" + item.label + "的信息");
          finished = false;
          return false;
        }
      }

      if (finished) {
        this.submit()
          .then(() => {
            this.$router.push({ name: "home" });
          })
          .catch(res => {
            Toast(res.msg || "请检查提交的信息");
          });
      }
    },
    // 暂存
    stage() {
      let transferbusiapplyForm = this.$store.state.mortgageBusiapply.transferbusiapplyForm;
      return new Promise((resolve, reject) => {
        let postData = this.formDataToBackend(transferbusiapplyForm);

        mortGageOrderSave(postData).then(res => {
            if (res.success) {
              if (!transferbusiapplyForm.id) {
                transferbusiapplyForm.id = res.data;
                transferbusiapplyForm.orderTradeInfoDTO.orderId = res.data;
              }
              resolve(res);
            } else {
              Toast(res.msg || '保存数据失败！')
              reject(res);
            }
          })

      })
    },
    // 一手房提交
    submit() {
      let transferbusiapplyForm = this.$store.state.mortgageBusiapply.transferbusiapplyForm;
      return new Promise((resolve, reject) => {
        let postData = this.formDataToBackend(transferbusiapplyForm);

        mortGageOrderSubmission(postData).then(res => {
          if (res.success) {
            resolve();
          } else {
            reject(res);
          }
        })

      })
    },
    // 将数据处理成后端需要的结构
    formDataToBackend() {
      let form = this.$store.state.mortgageBusiapply.transferbusiapplyForm;
      if(!form.buyerOrderAskInfo){
        let {applicantList} = form.buyerInfo;
        applicantList = applicantList || [];
        form.buyerOrderAskInfo = {
          haveJoinOwner: (applicantList.length > 1 && applicantList[0].orgType != 2) ? 1 : 0,
          isLaw: 1,
          isReal: 1,
        };
      }

      return form;
    },

    /**
     * @author: jixuelian
     * @description: 材料上传页的校验
     * @param {type}
     * @return:
     */
    materialListValid(materialList = []) {
      if (materialList.length) {
        for (let item of this.materialTypeList) {
          if (item.required && !this.getMaterialsByType(materialList, item.id).length) {
            return { result: false, msg: `${item.name}不能为空` };
          }
        }
        return { result: true };
      } else {
        return { result: false, msg: `材料列表不能为空` };
      }
    },
    /**
     * @author: jixuelian
     * @description: 根据需要展示的材料类型，获取文件列表
     * @param {type} 
     * @return: 
    */
    getMaterialsByType(materialList, type) {
      materialList = materialList || [];
      for (let material of materialList) {
        if (material.materialType == type) {
          return material.fileList;
        }
      }
      return [];
    },
    // 以下是校验
    idCardValidateRes(person) {
      return new Promise(function (resolve) {
        idCardValidate({ personName: person.name, personId: person.cardNo }).then((res) => {
          res.personName = person.name;
          resolve(res);
        });
      });
    },
    idCardValid(data, callback = () => { }) {
      // 需要检查身份证的用户集合
      let personList = []
      // 检查applicant
      if (data.applicantList && data.applicantList.length) {
        for (const applicant of data.applicantList) {
          if (applicant.cardType == 1) {
            personList.push(this.idCardValidateRes(applicant))
          }

          // 检查proxy
          if (applicant.proxyList && applicant.proxyList.length) {
            for (const proxy of applicant.proxyList) {
              if (proxy.cardType == 1) {
                personList.push(this.idCardValidateRes(proxy))
              }
            }
          }
        }
      }

      // 检查family
      if (data.familyList && data.familyList.length) {
        let family = data.familyList[0];
        // 检查familymember
        if (family.familyMemberList && family.familyMemberList.length) {
          for (const familyMember of family.familyMemberList) {
            // applicant已经验证，无需再次验证
            if (familyMember.cardType == 1 && familyMember.isApplicant != 1) {
              personList.push(this.idCardValidateRes(familyMember))
            }
          }
        }
      }
      Promise.all(personList).then(function (values) {
        for (const val of values) {
          if (!val.success) {
            callback({
              result: false,
              msg: `${val.personName}身份证实名认证未通过`
            })
            return false;
          }
        }
        callback({ result: true });
      });
    },
    /**
     * 交易信息校验
     */
    orderHouseValid() {
      return { result: true };
    },
    /**
      * 交易信息校验
      */
    orderTradeInfoDTOValid() {
      if (!this.transferbusiapplyForm.orderTradeInfoDTO.housePrice) {
        return { result: false, msg: '请填写不动产成交价' };
      } 

      if (!/^(?=([0-9]{1,15}$|[0-9]{1,15}\.))(0|[1-9][0-9]*)(\.[0-9]{1,2})?$/.test(this.transferbusiapplyForm.orderTradeInfoDTO.housePrice)) {
        return { result: false, msg: '不动产成交价不能超出15位，小数点不能多于2位'};
      }

      // 一手房无需校验缴纳税费主体设置值为3
      if (this.transferbusiapplyForm.registerType !== 5020 && !this.transferbusiapplyForm.orderTradeInfoDTO.taxesPayer) {
        return { result: false, msg: '请选择缴纳税费主体' };
      }
      return { result: true };
    },

    /**
     * 询问信息校验
     * @param {*} data 询问信息提交数据
     */
    buyerOrderAskInfoValid() {
      return { result: true };
    },
    salerOrderAskInfoValid() {
      return { result: true };
    },
    mortgagorInfoForBuyerValid() {
      return { result: true };
    },
    mortgagorInfoValid() {
      let mortgagorInfo = this.transferbusiapplyForm.mortgagorInfo || {};
      let applicantList = mortgagorInfo.applicantList || [];
      for (const iterator of applicantList) {
        let res = this.checkApplicantFinished(iterator);
        if(!res.result) return res;
      }
      return { result: true };
    },
    buyerInfoForSalerValid() { 
      let {buyerInfo:{applicantList}} = this.transferbusiapplyForm;
      if (!applicantList || !applicantList.length || !applicantList[0].name) {
        return { result: false , msg: '请填写受让人信息'};
      }
      return { result: true };
    },
    // 检查权利人是否需要补充填写
    checkApplicantFinished(applicant) {
      // 由产调带来的转让人信息，或者转让人填写的受让人信息，不可以编辑
      if (applicant.isStarter == 1) {
        return this.applicantValid(applicant);
      } else {
        return { result: true };
      }
    },
    /**
    * @author: jixuelian
    * @description: 权利人页面的校验
    * @param {type}
    * @return:
    */
    buyerInfoValid(data) {
      if (!data.holdingType) {
        return {
          result: false,
          msg: '请选择持证方式'
        }
      }
      if (!data.ownershipType) {
        return {
          result: false,
          msg: '请选择共有方式'
        }
      } else if (data.ownershipType == 3) {
        // 共有方式为按份额共有，需要填写共有信息
        let proportion = 0;
        for (const applicant of data.applicantList) {
          if (applicant.rightProportion) {
            proportion = proportion + (applicant.rightProportion - 0);
          } else {
            proportion = false;
          }
        }
        if (proportion != 100) {
          return {
            result: false,
            msg: '请检查份额分配'
          }
        }
      }
      data.applicantList = data.applicantList || []
      return this.obliValid(data);
    },
    /**
    * @author: jixuelian
    * @description: 抵押权人页面的校验
    * @param {type}
    * @return:
    */
    mortgageeValid(data) {
      return this.obliValid(data);
    },
    /**
    * @author: jixuelian
    * @description: 抵押权人页面的校验
    * @param {type}
    * @return:
    */
    mortgagorValid(data) {
      return this.obliValid(data);
    },

    /**
    * @author: jixuelian
    * @description: 产证/证明页的校验
    * @param {type}
    * @return:
    */
    postValid(isPost, orderMail) {
      // 需要邮寄时，必填收件人，手机号，地址
      if (isPost == 1 && orderMail.addressInfo) {

        if (!orderMail.consignee) {
          return { result: false, msg: '收件人不能为空' };
        }
        if (orderMail.mobile) {
          let veriRes = verifyPhone(orderMail.mobile);

          if (veriRes != true) {
            return {
              result: false,
              msg: '收件人' + veriRes
            }
          }
        } else {
          return {
            result: false,
            msg: "收件人手机号不能为空"
          }
        }
        if (!(orderMail.addressInfo.cityId &&
          orderMail.addressInfo.provinceId &&
          orderMail.addressInfo.regionId)) {
          return { result: false, msg: '请选择区域' };
        }
        if (!orderMail.addressInfo.address) {
          return { result: false, msg: '详细地址不能为空' };
        }
        return { result: true };
      } else if (isPost == 2) {
        return { result: true };
      } else {
        return { result: false, msg: '请选择邮寄方式' };
      }
    },
    /**
    * @author: jixuelian
    * @description: 义务人/权利人的信息的校验
    * @param {type} 义务人/权利人
    * @return:
    */
    applicantValid(applicant) {
      if (applicant.orgType == 2) {
        // 必填项 义务人的姓名、证件类型、证件号码
        if (!applicant.name) {
          return {
            result: false,
            msg: '名称不能为空'
          }
        }
        if (!applicant.cardType) {
          return {
            result: false,
            msg: '企业/单位证件类型不能为空'
          }
        }
        if (!applicant.cardNo) {
          return {
            result: false,
            msg: '证件号不能为空'
          }
        }
        if (!applicant.corporationName) {
          return {
            result: false,
            msg: '法人/负责人证件姓名不能为空'
          }
        }
        if (!applicant.corporationCardType) {
          return {
            result: false,
            msg: '法人/负责人证件类型不能为空'
          }
        }
        if (!applicant.corporationCardNo) {
          return {
            result: false,
            msg: '法人/负责人证件号码不能为空'
          }
        }
        if (!applicant.mobile) {
          return {
            result: false,
            msg: '手机号不能为空'
          }
        }
        if (applicant.mobile) {
          let veriRes = verifyPhone(applicant.mobile);

          if (veriRes != true) {
            return {
              result: false,
              msg: veriRes
            }
          }
        }
        return {
          result: true,
          msg: ''
        }
      } else {
        // 必填项 义务人的姓名、证件类型、证件号码
        if (!applicant.name) {
          return {
            result: false,
            msg: '姓名不能为空'
          }
        }
        if (!applicant.cardType) {
          return {
            result: false,
            msg: '证件类型不能为空'
          }
        }
        if (!applicant.cardNo) {
          return {
            result: false,
            msg: '证件号不能为空'
          }
        }
        if (!applicant.mobile) {
          return {
            result: false,
            msg: '手机号不能为空'
          }
        }
        if (applicant.mobile) {
          let veriRes = verifyPhone(applicant.mobile);

          if (veriRes != true) {
            return {
              result: false,
              msg: veriRes
            }
          }
        }
        return {
          result: true,
          msg: ''
        }
      }


    },
    /**
    * @author: jixuelian
    * @description: 代理人的信息的校验
    * @param {type} 代理人
    * @return:
    */
    proxyValid(proxy) {
      // 必填项 代理人的姓名、证件类型、证件号码
      if (!proxy.name) {
        return {
          result: false,
          msg: '代理人姓名不能为空'
        }
      } if (!proxy.cardType) {
        return {
          result: false,
          msg: '代理人证件类型不能为空'
        }
      } if (!proxy.cardNo) {
        return {
          result: false,
          msg: '代理人证件号码不能为空'
        }
      }
      if (proxy.mobile) {
        let veriRes = verifyPhone(proxy.mobile);

        if (veriRes != true) {
          return {
            result: false,
            msg: '代理人' + veriRes
          }
        }
      }
      return {
        result: true,
        msg: ''
      }

    },
    /**
    * @author: jixuelian
    * @description: 权利人页面的校验
    * @param {type}
    * @return:
    */
    obliValid(data = { applicantList: [] }) {
      let res = { result: true };
      if (!data.applicantList.length) {
        return {
          result: false,
          msg: '请填写人员信息'
        };
      }
      for (let applicant of data.applicantList) {

        res = this.applicantValid(applicant);
        if (!res.result) {
          return res
        }
        if (applicant.proxyList) {
          for (let proxy of applicant.proxyList) {
            res = this.proxyValid(proxy);
            if (!res.result) {
              return res
            }
          }
        }
      }
      return res;
    },
  }
}
export default businessMix;
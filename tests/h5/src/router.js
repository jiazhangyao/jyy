import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";

import WaterList from "./views/water/list.vue";
import WaterDetail from "./views/water/detail.vue";
import WaterEdit from "./views/water/edit.vue";
import WaterPre from "./views/water/pre.vue";

import QueryIdentity from "./views/query/identity.vue";
import Query from "./views/query/query.vue";
import QueryDetail from "./views/query/detail.vue";

import NetList from "./views/net/list.vue";
import NetDetail from "./views/net/detail.vue";
import NetEdit from "./views/net/edit.vue";
import NetPre from "./views/net/editPre.vue";

import Guide from "./views/guide/list.vue";
import GuideDetail from "./views/guide/detail.vue";

import Cert from "./views/cert/list.vue";
import CertDetail from "./views/cert/detail.vue";

import Progress from "./views/progress/step.vue";
import Progress2 from "./views/progress/step2.vue";
import Progress3 from "./views/progress/step3.vue";
import agree from "./views/progress/agree.vue";

import NotFound from "./views/errPage/notFound.vue";

// 用户相关
import Login from "./views/login/login";
import Register from "./views/register/register";
import Agreement from "./views/agreement/agreement";
import Forget from "./views/forget/forget";
import PersonalCenter from "./views/account/home";
import AccountSetting from "./views/account/setting";
import ChangeMobile from "./views/account/changeMobile";
import Authenticated from "./views/account/authenticated";
import ResetPassword from "./views/account/resetPassword";
import Certification from "./views/certification/certification.vue";
import CertificationSuccess from "./views/success/certificationSuccess";
import SubmitSuccess from "./views/success/submitSuccess";
import ComplaintList from "./views/complaintList/complaintList.vue";
import ContactUs from "./views/account/contactUs.vue";

// 工单列表
import OrderList from "./views/account/order/list.vue";
import TodoList from "./views/account/order/todoList.vue";

// 用户管理
import UserManageList from "./views/account/userManage/list.vue";
import UserManageAdd from "./views/account/userManage/add.vue";

// 认证管理
import ApproveManage from "./views/account/approveManage/index";

// 电子证照
import CertificateCertification from "./views/eCertificate/certification";
import CertificateList from "./views/eCertificate/list";
import CertificateCard from "./views/eCertificate/infoCard";
import CertificateDetail from "./views/eCertificate/detail";

// 登记申请
import BusiApplyList from "./views/busiapply/list";
import BusiApplyTransferList from "./views/busiapply/transferList";
import BusiApplyEdit from "./views/busiapply/edit/index";
import BusiApplyDetail from "./views/busiapply/detail/index";

//转移登记
import TransferList from './views/transfer/home'
import TransferApply from './views/transfer/apply'
import TransferPretax from './views/transfer/pretax'
import TransferContract from './views/transfer/contract'
import TransferSign from './views/transfer/sign'
import transferEstateSearch from './views/transferForm/estateSearch'
import TransferTaxes from './views/transfer/taxes'

//抵押登记
import mortgageEstateSearch from './views/mortgage/estateSearch'
import MortgageBusiApplyEdit from './views/mortgage/busiapply/edit/index'
import MortgageTaxes from './views/mortgage/taxes'
import mortgageSign from './views/mortgage/sign'
import mortgageApply from "./views/mortgage/apply"
import mortgagePretax from  "./views/mortgage/pretax"
import mortgageContract from  "./views/mortgage/contract"
import mortgageList from  "./views/mortgage/home"


// 登记申请-转移登记
import TransferBusiApplyEdit from "./views/transferbusiapply/edit/index";
// import TransferBusiApplyDetail from "./views/transferbusiapply/detail/index";

//查封登记
import SealUpSearch from './views/sealUp' // 查询第一页
import SealUpDetail from './views/sealUp/detail' // 查询第二页
import SealUpDetailDisplay from './views/sealUp/detailDisplay' // 查询出来的某一项查封历史页面
import SealUpList from './views/sealUp/list'
import SealUpAdd from './views/sealUp/add'
import SealUpLink from './views/sealUp/addLinks'
import SealUpAddEstate from './views/sealUp/add_estate'
import SealUpAddSeal from './views/sealUp/add_seal' // 编辑查封信息页面
import SealUpAddHistory from './views/sealUp/add_history'
import SealUpAddFile from './views/sealUp/add_file'
import SealUpAddApply from './views/sealUp/addApply' //添加申请人页面

import SealUpHistoryDetail from './views/sealUp/history_detail'
import SealUpInfoDetail from './views/sealUp/sealInfo_detail'
import SealUpEstateDetail from './views/sealUp/estate_detail'

// 智能客服机器人
import Robot from "./views/robot/index.vue";

import viewPdf from "./components/pdf-component.vue";

import Ft from './common/AutoForm/index.vue'
import store from '@/store';
import Import from "less/lib/less/tree/import";


// tim huang：演示
// const Demo = () => import("./views/demo/index.vue");
// console.log("obje************ct", process.env.VUE_APP_ROUTER_PREFIX);

Vue.use(Router);
let router = new Router({
  // mode: "history",
  base: `${process.env.VUE_APP_ROUTER_PREFIX}`,
  routes: [
    {
      path: '/pdf',
      name: 'pdf',
      component: viewPdf,
      meta: { withoutLogin: true }
    },
    {
      path: "/robot",
      name: "robot",
      component: Robot,
      meta: { withoutLogin: true }
    },
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { withoutLogin: true }
    },
    {
      path: '/ft/',
      name: 'ft',
      component: Ft,
      meta: { withoutLogin: true }
    },
    {
      path: "/water/list",
      name: "waterList",
      component: WaterList
    },
    {
      path: "/water/detail/:id",
      name: "waterDetail",
      component: WaterDetail
    },
    {
      path: "/water/edit",
      name: "waterEdit",
      component: WaterEdit
    },
    {
      path: "/water/pre",
      name: "waterPre",
      component: WaterPre
    },

    {
      path: "/query/identity",
      name: "queryIdentity",
      component: QueryIdentity
    },
    {
      path: "/query/query",
      name: "queryQuery",
      component: Query
    },
    {
      path: "/query/detail",
      name: "queryDetail",
      component: QueryDetail
    },

    {
      path: "/net/list",
      name: "netList",
      component: NetList
    },
    {
      path: "/net/detail",
      name: "netDetail",
      component: NetDetail
    },
    {
      path: "/net/edit",
      name: "NetEdit",
      component: NetEdit
    },
    {
      path: "/net/pre",
      name: "netPre",
      component: NetPre
    },

    {
      path: "/guide",
      name: "guide",
      component: Guide,
      meta: { withoutLogin: true }
    },
    {
      path: "/guide/detail/:id",
      name: "guideDetail",
      component: GuideDetail,
      meta: { withoutLogin: true }
    },

    {
      path: "/cert",
      name: "cert",
      component: Cert
    },
    {
      path: "/cert/detail",
      name: "certDetail",
      component: CertDetail
    },

    {
      path: "/progress",
      name: "progress",
      component: Progress
    },
    {
      path: "/progress/face",
      name: "progressFace",
      component: Progress2
    },
    {
      path: "/progress/res",
      name: "progressRes",
      component: Progress3
    },
    {
      path: "/progress/agree",
      name: "agree",
      component: agree
    },
    // 登录
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { withoutLogin: true }
    },
    // 注册
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { withoutLogin: true }
    },
    // 《用户服务协议》
    {
      path: "/agreement",
      name: "agreement",
      component: Agreement,
      meta: { withoutLogin: true }
    },
    // 忘记密码
    {
      path: "/forget",
      name: "forget",
      component: Forget,
      meta: { withoutLogin: true }
    },
    // 个人中心
    {
      path: "/account/home",
      name: "personalCenter",
      component: PersonalCenter
    },
    // 联系我们
    {
      path: "/account/contactUs",
      name: "contactUs",
      component: ContactUs
    },
    // 账户设置
    {
      path: "/account/setting",
      name: "accountSetting",
      component: AccountSetting,
      meta: { withoutLogin: true }
    },
    // 用户管理-列表
    {
      path: "/account/userManage/list",
      name: "userManageList",
      component: UserManageList,
    },
    // 用户管理-新增
    {
      path: "/account/userManage/add",
      name: "userManageAdd",
      component: UserManageAdd,
    },
    // 认证管理
    {
      path: "/account/approveManage/index",
      name: "approveManage",
      component: ApproveManage
    },
    // 我的工单
    {
      path: "/account/order/list/:tag",
      name: "orderList",
      component: OrderList,
    },
    // 我的待办
    {
      path: "/account/order/todoList",
      name: "todoList",
      component: TodoList,
    },
    // 重置手机号
    {
      path: "/account/changemobile",
      name: "accountChangeMobile",
      component: ChangeMobile
    },
    // 已认证详情页
    {
      path: "/account/authenticated",
      name: "accountAuthenticated",
      component: Authenticated
    },
    // 实人认证
    {
      path: "/certificationh5",
      name: "certificationh5",
      component: Certification,
      meta: { withoutLogin: true }
    },
    {
      path: "/certification/:id/:type/:sourceType",
      name: "certification",
      component: Certification,
      meta: { withoutLogin: true }
    },
    {
      path: "/success/certificationSuccess/:type",
      name: "certificationSuccess",
      component: CertificationSuccess,
      meta: { withoutLogin: true }
    },
    {
      path: "/success/submitSuccess/:type",
      name: "submitSuccess",
      component: SubmitSuccess,
      meta: { withoutLogin: true }
    },
    // 重置密码
    {
      path: "/account/resetpassword",
      name: "accountResetPassword",
      component: ResetPassword
    },
    // 实人认证申诉
    {
      path: "/complaintList/:id/:type/:sourceType",
      name: "complaintList",
      component: ComplaintList,
      meta: { withoutLogin: true }
    },
    // 电子证照
    {
      path: "/certificate/certification",
      name: "certificateCertification",
      component: CertificateCertification,
      meta: { withoutLogin: true }
    },
    {
      path: "/certificate/list",
      name: "certificateList",
      component: CertificateList
    },
    {
      path: "/certificate/card",
      name: "certificateCard",
      component: CertificateCard
    },
    {
      path: "/certificate/detail",
      name: "certificateDetail",
      component: CertificateDetail
    },
    // 登记申请
    {
      path: "/busiapply/list",
      name: "busiApplyList",
      component: BusiApplyList
    },
    {
      path: "/busiapply/transferList",
      name: "busiApplyTransferList",
      component: BusiApplyTransferList
    },
    {
      path: "/busiapply/edit",
      name: "busiApplyEdit",
      component: BusiApplyEdit
    },
    {
      path: "/busiapply/detail",
      name: "busiApplyDetail",
      component: BusiApplyDetail
    },
    // 登记申请-转移登记
    {
      path: "/transfer/busiapply/edit",
      name: "transferBusiApplyEdit",
      component: TransferBusiApplyEdit
    },
    // {
    // path: "/transfer/busiapply/detail",
    // name: "transferBusiApplyDetail",
    // component: TransferBusiApplyDetail
    // },
    //转移登记
    {
      path: "/transfer/list",
      name: "transferList",
      component: TransferList,
    },
    {
      path: "/transfer/apply",
      name: "transferApply",
      component: TransferApply,
    },
    {
      path: "/transfer/pretax",
      name: "transferPretax",
      component: TransferPretax,
    },
    {
      path: "/transfer/contract",
      name: "transferContract",
      component: TransferContract,
    },
    {
      path: "/transfer/sign",
      name: "transferSign",
      component: TransferSign,
    },
    // 转移登记--不动产查询
    {
      path: '/transferForm/estateSearch/:tag',
      name: 'transferEstateSearch',
      component: transferEstateSearch
    },
    //抵押登记
    {
      path: "/mortgage/estateSearch/:tag",
      name: "mortgageEstateSearch",
      component: mortgageEstateSearch,
    },

      // 登记申请-转移登记
      {
        path: "/mortgage/busiapply/edit",
        name: "mortgageBusiApplyEdit",
        component: MortgageBusiApplyEdit
      },
      {
      path: "/mortgage/taxes",
      name: "mortgageTaxes",
      component: MortgageTaxes
    },
    {
      path: "/mortgage/sign",
      name: "mortgageSign",
      component: mortgageSign,
    },
    {
      path: "/mortgage/apply",
      name: "mortgageApply",
      component: mortgageApply,
    },
    {
      path: "/mortgage/pretax",
      name: "mortgagePretax",
      component: mortgagePretax,
    },
    {
      path: "/mortgage/contract",
      name: "mortgageContract",
      component: mortgageContract,
    },{
      path: "/mortgage/list",
      name: "mortgageList",
      component: mortgageList,
    },

    // {
    //   path: '/transferForm/applyTransfer',
    //   name: 'ApplyTransfer',
    //   component: ApplyTransfer,
    //   meta: { withoutLogin: true }
    // },
    //查封登记
    {
      path: '/sealUp/sealUpSearch',
      name: 'sealUpSearch',
      component: SealUpSearch,
    },
    {
      path: '/sealUp/sealUpList',
      name: 'sealUpList',
      component: SealUpList,
    },
    {
      path: '/sealUp/sealUpDetail',
      name: 'sealUpDetail',
      component: SealUpDetail,
    },
    {
      path: '/sealUp/sealUpDetailDisplay',
      name: 'sealUpDetailDisplay',
      component: SealUpDetailDisplay,
    },
    {
      path: '/sealUp/sealUpAdd',
      name: 'sealUpAdd',
      component: SealUpAdd,
    },
    {
      path: '/sealUp/sealUpLink',
      name: 'sealUpLink',
      component: SealUpLink,
    },
    {
      path: '/sealUp/sealUpAddEstate',
      name: 'sealUpAddEstate',
      component: SealUpAddEstate,
    },
    {
      path: '/sealUp/sealUpAddSeal',
      name: 'sealUpAddSeal',
      component: SealUpAddSeal,
    },
    {
      path: '/sealUp/sealUpAddHistory',
      name: 'sealUpAddHistory',
      component: SealUpAddHistory,
    },
    {
      path: '/sealUp/sealUpAddFile',
      name: 'sealUpAddFile',
      component: SealUpAddFile,
    },
    {
      path: '/sealUp/sealUpAddApply',
      name: 'sealUpAddApply',
      component: SealUpAddApply,
    },
    {
      path: '/sealUp/sealUpHistoryDetail',
      name: 'sealUpHistoryDetail',
      component: SealUpHistoryDetail,
    },
    {
      path: '/sealUp/sealUpInfoDetail',
      name: 'sealUpInfoDetail',
      component: SealUpInfoDetail,
    },
    {
      path: '/sealUp/sealUpEstateDetail',
      name: 'SealUpEstateDetail',
      component: SealUpEstateDetail,
    },
    {
      path: "/transfer/taxes",
      name: "transferTaxes",
      component: TransferTaxes
    },
    {
      path: "*",
      name: "404",
      component: NotFound,
      meta: { withoutLogin: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.withoutLogin) {  //判断该路由是否需要登录权限
    next();
  } else { // 默认为需要登录权限
    store.dispatch("account/getBaseinfo");
    next();
  }
})

export default router;

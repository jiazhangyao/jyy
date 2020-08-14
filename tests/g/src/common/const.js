export const DURATION = {
  success: 4,
  error: 3,
  info: 5,
  warning: 5,
  warn: 5,
  loading: 5
};

export const TIME_FORMAT_FE = "YYYY-MM-DD";
export const TIME_FORMAT_BD = "YYYY-MM-DD HH:mm:ss";

export const MENUS = [
  {
    name: "首页",
    key: "home",
    auths: [],
    icon: "icon-menu_home",
    path: "/home"
  },
  {
    name: "工单管理",
    key: "order",
    auths: ["MANAGE_ORDER_LIST", "MANAGE_ORDER_STATISTICS","MANAGE_ORDER_LAND"],
    icon: "icon-menu_orders",
    children: [
      {
        name: "工单审核",
        key: "orderAudit",
        path: `/order/audit/list`,
        auths: ["MANAGE_ORDER_LIST"]
      },
      {
        name: "业务统计",
        key: "orderStatistic",
        path: `/order/statistic/list`,
        auths: ["MANAGE_ORDER_STATISTICS"]
      },
      {
        name:"国土审核",
        key:"orderLand",
        path:`/order/test/list`,
        anths:["MANAGE_ORDER_LAND"]
      }
    ]
  },
  {
    name: "预约管理",
    key: "reserve",
    auths: ["MANAGE_RESERVE_LIST", "MANAGE_RESERVE_BRANCH_LIST"],
    icon: "icon-baseline-assignment_",
    children: [
      {
        name: "预约工单",
        key: "reserveOrder",
        path: `/reserve/order/list`,
        auths: ["MANAGE_RESERVE_LIST"]
      },
      {
        name: "网点管理",
        key: "reserveNet",
        path: `/reserve/net/list`,
        auths: ["MANAGE_RESERVE_BRANCH_LIST"]
      }
    ]
  },
  {
    name: "纳税管理",
    key: "ratepay",
    auths: ["MANAGE_TAX_MGR_LIST"],
    icon: "icon-menu_fund",
    children: [
      {
        name: "税费工单",
        key: "ratepayView",
        path: `/ratepay/view/list`,
        auths: ["MANAGE_TAX_MGR_LIST"]
      }
    ]
  },
  {
    name: "邮寄管理",
    key: "mailMailmgr",
    auths: ["MANAGE_MAIL_LIST"],
    icon: "icon-huabancopy",
    path: `/mail/mailmgr/list`
  },
  {
    name: "水电气过户",
    key: "utilitiesWaterele",
    auths: ["MANAGE_TRANSFER_LIST"],
    icon: "icon-huaban",
    path: `/utilities/waterele/list`
  },
  {
    name: "查封登记管理",
    key: "seizeRegister",
    auths: ["MANAGE_SEIZE_LIST"],
    icon: "icon-huaban",
    path: `/seize/register/list`
  },
  {
    name: "区块链看板",
    key: "blockchain",
    auths: [
      "MANAGE_CHAIN_DASHBOARD_LIST",
      "MANAGE_CHAIN_DASHBOARD_SEARCH",
      "MANAGE_CHAIN_DASHBOARD_QA"
    ],
    icon: "icon-menu_blockchain",
    children: [
      {
        name: "链上信息总览",
        key: "blockchainPreview",
        path: `/blockchain/preview/list`,
        auths: ["MANAGE_CHAIN_DASHBOARD_LIST"]
      },
      {
        name: "链上信息查询",
        key: "blockchainInfosearch",
        path: `/blockchain/infosearch/list`,
        auths: ["MANAGE_CHAIN_DASHBOARD_SEARCH"]
      },
      {
        name: "Q&A",
        key: "blockchainQa",
        path: `/blockchain/qa/list`,
        auths: ["MANAGE_CHAIN_DASHBOARD_QA"]
      }
    ]
  },
  {
    name: "机构管理",
    key: "institution",
    auths: ["COMPANY_MGR_AUTH_LIST", "COMPANY_MGR_AUTH_AUDIT_LIST"],
    icon: "icon-menu_publichouse",
    children: [
      {
        name: "认证机构信息查询",
        key: "institutionQuery",
        path: `/institution/query/list`,
        auths: ["COMPANY_MGR_AUTH_LIST"]
      },
      {
        name: "机构信息审核",
        key: "institutionExamine",
        path: `/institution/examine/list`,
        auths: ["COMPANY_MGR_AUTH_AUDIT_LIST"]
      }
    ]
  },

  {
    name: "账户管理",
    key: "account",
    auths: [
      "ACCOUNT_MGR_PERSONAL_SET_UPDATE_PWD",
      "ACCOUNT_MGR_USER_MER_LIST",
      "ACCOUNT_MGR_ROLE_FUNCTION_LIST"
    ],
    icon: "icon-menu_account",
    children: [
      {
        name: "个人账户设置",
        key: "accountSelf",
        path: `/account/self/info/list`,
        auths: ["ACCOUNT_MGR_PERSONAL_SET_UPDATE_PWD"]
      },
      {
        name: "用户管理",
        key: "accountUser",
        path: `/account/user/list`,
        auths: ["ACCOUNT_MGR_USER_MER_LIST"]
      },
      {
        name: "角色权限设置",
        key: "accountRole",
        path: `/account/role/list`,
        auths: ["ACCOUNT_MGR_ROLE_FUNCTION_LIST"]
      }
    ]
  },
  {
    name: "信息审核",
    key: "inforeview",
    auths: ["APPEAL_MGR_SET_LIST"],
    icon: "icon-menu_log",
    children: [
      {
        name: "身份认证审核",
        key: "inforeviewIdentity",
        path: `/inforeview/identity/list`,
        auths: ["APPEAL_MGR_SET_LIST"]
      }
    ]
  },
  {
    name: "办事指南",
    key: "guide",
    auths: ["MANAGE_GUIDE_LIST", "MANAGE_GUIDE_FILE_LIST"],
    icon: "icon-menu_news",
    children: [
      {
        name: "业务办事指南",
        key: "guideBusguide",
        path: `/guide/busguide/list`,
        auths: ["MANAGE_GUIDE_LIST"]
      },
      {
        name: "申请表",
        key: "guideApply",
        path: `/guide/apply/list`,
        auths: ["MANAGE_GUIDE_FILE_LIST"]
      }
    ]
  },
  //{
  //  name: "demo",
  //  key: "demo",
  //  auths: [],
  //  icon: "icon-menu_orders",
  //  children: [
  //    {
  //      name: "child",
  //      key: "demoChild",
  //      path: `/demo/child/list`,
  //      auths: []
  //    }
  //  ]
  //}
];

export const AUTHS = [
  {
    title: "工单管理",
    key: "order",
    roles: [
      {
        value: "MANAGE_ORDER_LIST",
        label: "工单审核"
      },
      {
        value: "MANAGE_ORDER_STATISTICS",
        label: "业务统计"
      },
      {
        value: "MANAGE_ORDER_LAND",
        label: "国土审核"
      }
    ]
  },
  {
    title: "预约管理",
    key: "reserve",
    roles: [
      {
        value: "MANAGE_RESERVE_LIST",
        label: "预约工单"
      },
      {
        value: "MANAGE_RESERVE_BRANCH_LIST",
        label: "网点管理"
      }
    ]
  },
  {
    title: "纳税管理",
    key: "ratepay",
    roles: [
      {
        value: "MANAGE_TAX_MGR_LIST",
        label: "税费工单"
      }
    ]
  },
  {
    title: "邮寄管理",
    key: "sendList",
    value: "MANAGE_MAIL_LIST"
  },
  {
    title: "水电气过户",
    key: "utilityList",
    value: "MANAGE_TRANSFER_LIST"
  },
  {
    title: "查封登记管理",
    key: "seizeRegister",
    value: "MANAGE_SEIZE_LIST"
  },
  {
    title: "区块链看板",
    key: "dashboard",
    roles: [
      {
        value: "MANAGE_CHAIN_DASHBOARD_LIST",
        label: "链上信息总览"
      },
      {
        value: "MANAGE_CHAIN_DASHBOARD_SEARCH",
        label: "链上信息查询"
      },
      {
        value: "MANAGE_CHAIN_DASHBOARD_QA",
        label: "Q&A"
      }
    ]
  },
  {
    title: "机构管理",
    key: "institution",
    roles: [
      {
        value: "COMPANY_MGR_AUTH_LIST",
        label: "认证机构查询"
      },
      {
        value: "COMPANY_MGR_AUTH_AUDIT_LIST",
        label: "认证机构审核"
      }
    ]
  },
  {
    title: "账户管理",
    key: "account",
    roles: [
      {
        value: "ACCOUNT_MGR_PERSONAL_SET_UPDATE_PWD",
        label: "个人账户设置"
      },
      {
        value: "ACCOUNT_MGR_USER_MER_LIST",
        label: "用户管理"
      },
      {
        value: "ACCOUNT_MGR_ROLE_FUNCTION_LIST",
        label: "角色权限设置"
      }
    ]
  },
  {
    title: "信息审核",
    key: "review",
    roles: [
      {
        value: "APPEAL_MGR_SET_LIST",
        label: "身份认证审核"
      }
    ]
  },
  {
    title: "办事指南",
    key: "guide",
    roles: [
      {
        value: "MANAGE_GUIDE_LIST",
        label: "业务办事指南"
      },
      {
        value: "MANAGE_GUIDE_FILE_LIST",
        label: "申请表"
      }
    ]
  }
];

export const APP_TITLE = "交易标准化智慧平台";
export const PAGE_SIZE = 20;
export const PAGE_OPTIONS = ["10", "20", "30", "40", "50"];

export const DEFAULT_PARAMS = {
  pageNo: 1,
  pageSize: 20
};

export const IMAGE_THUMB_SIZE = "96x72";
export const IMAGE_COMMON_SIZE = "900x675";
export const MAX_IMAGE_NUMBER = 10;

export const prefix = "/gm/api";
export const VIEW_URL = "/gm/api/file";
export const EXCEL_UPLOAD_URL = "/gm/api/file";

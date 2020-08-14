/*
 * @Description: 登记申请用到的变量定义，及数据结构
 * @Autor: jixuelian
 * @Date: 2019-06-19 16:36:43
 */
/**
 * @description: 方便新增登记申请的数据，value参考后端给的字典registerType
 */
export const registerTypeStep = [{
  name: "新增业务登记",
  types: [
    {
      name: "普通业务",
      key: "common",
      types: []
    },
    {
      name: "合并登记",
      key: "merge",
      types: []
    },
    {
      name: "转换登记",
      key: "transfer"
    }
  ]
}];
/**
 * @description: 登记申请的状态样式及文案的关系
 */
export const businessState = {
  40: {
    value: "已出证",
    style: {
      background: "#E8F4E3",
      color: "#52C41A"
    }
  },
  35: {
    value: "已登簿",
    style: {
      background: "#E8F4E3",
      color: "#52C41A"
    }
  },
  31: {
    value: "复审失败",
    style: {
      background: "#F9E3E5",
      color: "#F5222D"
    }
  },
  30: {
    value: "复审通过",
    style: {
      background: "#E8F4E3",
      color: "#52C41A"
    }
  },
  25: {
    value: "已终止",
    style: {
      background: "#E8F4E3",
      color: "#52C41A"
    }
  },
  20: {
    value: "被驳回",
    style: {
      background: "#F9E3E5",
      color: "#F5222D"
    }
  },
  15: {
    value: "预审通过",
    style: {
      background: "#E8F4E3",
      color: "#52C41A"
    }
  },
  10: {
    value: "预审中",
    style: {
      background: "#F9F0E3",
      color: "#F56A22"
    }
  },
  5: {
    value: "未提交",
    style: {
      background: "#E3E8F0",
      color: "#AAB0B9"
    }
  }
}
/**
 * @description: 登记申请的编辑页面，所有tab的总量
 */
export const tabItems = {
  signInfo: {
    label: "交易备案信息",
    component: "signInfo"
  },
  obligor: {
    label: "义务人",
    component: "obligor"
  },
  preObligor: {
    label: "预告义务人",
    component: "obligor"
  },
  obligee: {
    label: "权利人",
    component: "obligee"
  },
  preObligeeAmortgagee: {
    label: "预告权利人/抵押人",
    component: "obligee"
  },
  obligeeAmortgagee: {
    label: "权利人/抵押人",
    component: "obligee"
  },
  mortgagee: {
    label: "抵押权人",
    component: "mortgagee"
  },
  preMortgagee: {
    label: "预告抵押权人",
    component: "mortgagee"
  },
  orderHouse: {
    label: "产权信息",
    component: "orderHouse"
  },
  materialList: {
    label: "材料上传",
    component: "materialList"
  },
  mortgageInfo: {
    label: "抵押信息",
    component: "mortgageInfo"
  },
  post: {
    label: "产证/证明邮寄",
    component: "post"
  }
}
/**
 * @description: 登记申请的编辑页面，登记类型与tabItems的关系
 * key值为registertype值
 */
export const tabsRelateToType = {
  1: {
    name: "二手房买卖登记",
    tabs: ["signInfo", "obligor", "obligee", "orderHouse", "materialList", "post"]
  },
  3: {
    name: "商品房转移登记",
    tabs: ["signInfo", "obligor", "obligee", "orderHouse", "materialList", "post"]
  },
  5: {
    name: "商品房预告登记",
    tabs: ["obligor", "obligee", "orderHouse", "materialList", "post"]
  },
  11: {
    name: "房产注销登记",
    tabs: ["obligee", "orderHouse", "materialList"]
  },
  7: {
    name: "商品房预告登记+商品房预抵押登记",
    tabs: ["preObligor", "preObligeeAmortgagee", "preMortgagee", "orderHouse", "mortgageInfo", "materialList", "post"]
  },
  8: {
    name: "商品房转移登记+抵押权设立登记",
    tabs: ["signInfo", "obligor", "obligeeAmortgagee", "mortgagee", "orderHouse", "mortgageInfo", "materialList", "post"]
  },
  9: {
    name: "二手房买卖登记+抵押权设立登记",
    tabs: ["signInfo", "obligor", "obligeeAmortgagee", "mortgagee", "orderHouse", "mortgageInfo", "materialList", "post"]
  },
  15: {
    name: "商品房预告登记+商品房预抵押登记转商品房转移登记+抵押权设立登记",
    tabs: ["signInfo", "obligor", "obligeeAmortgagee", "mortgagee", "orderHouse", "mortgageInfo", "materialList", "post"]
  },
  2: {
    name: "抵押权设立登记",
    tabs: ["signInfo", "obligor", "obligee", "orderHouse", "materialList", "mortgageInfo", "post"]
  },
  4: {
    name: "抵押权注销登记",
    tabs: ["signInfo", "obligor", "obligee", "orderHouse", "materialList", "mortgageInfo", "post"]
  },
  6: {
    name: "商品房预抵押登记",
    tabs: ["signInfo", "obligor", "obligee", "orderHouse", "materialList", "mortgageInfo", "post"]
  },
  10: {
    name: "商品房首次登记",
    tabs: ["signInfo", "obligor", "obligee", "orderHouse", "materialList", "mortgageInfo", "post"]
  },
  12: {
    name: "商品房预告登记转商品房预抵押登记",
    tabs: ["signInfo", "obligor", "obligee", "orderHouse", "materialList", "mortgageInfo", "post"]
  },
  13: {
    name: "商品房预抵押登记转抵押权设立登记",
    tabs: ["signInfo", "obligor", "obligee", "orderHouse", "materialList", "mortgageInfo", "post"]
  },
  14: {
    name: "抵押权设立登记转抵押权注销登记",
    tabs: ["signInfo", "obligor", "obligee", "orderHouse", "materialList", "mortgageInfo", "post"]
  },
}
export const registerTypeTransfer = { "12": 6, "13": 2, "14": 4, "15": 8 }
/**
 * @author: jixuelian
 * @description:  同C端PC一致
 * @param {type} 
 * @return: 
 */
// 登记申请的编辑页面，共有方式
export const ownershipTypeConst = [
  {
    key: 1,
    name: '单独所有'
  },
  {
    key: 2,
    name: '共同所有'
  },
  {
    key: 3,
    name: '按份额共有'
  },
  {
    key: 4,
    name: '其他共有'
  }
]

// 登记申请的编辑页面，持证方式
export const holdingTypeConst = [
  {
    key: 1,
    name: '共同持证'
  },
  {
    key: 2,
    name: '分别持证'
  }
]

// 抵押类型
export const MortgageType = [
  { name: "一般抵押", key: 1 },
  { name: "最高额抵押", key: 2 }
];


// 产权信息(房屋基础信息)
export const orderHouseLabels = {
  1: [
    {
      required: true,
      key: "warrantNumber",
      label: "不动产权证号",
    },
    {
      required: true,
      key: "space",
      label: "建筑面积",
      sufix: '㎡'
    },
    {
      required: true,
      key: "fullAddress",
      label: "房屋坐落",
    },
    {
      required: true,
      key: "unitNumber",
      label: "不动产单元号",
    },
    {
      key: "buildYear",
      label: "建筑年代",
      sufix: '年'
    },
    {
      key: "planUseDesc",
      label: "规划用途",
    },
    {
      key: "houseStructureDesc",
      label: "房屋结构",
    },
    {
      required: true,
      key: "totalFloor",
      label: "总楼层",
      sufix: '层'
    },
    {
      required: true,
      key: "inFloor",
      label: "所在楼层",
      sufix: '层'
    },
  ],
  2: [
    {
      required: true,
      key: "warrantNumber",
      label: "不动产权证号",
    },
    {
      required: true,
      key: "space",
      label: "建筑面积",
      sufix: '㎡'
    },
    {
      required: true,
      key: "fullAddress",
      label: "房屋坐落",
    },
    {
      required: true,
      key: "unitNumber",
      label: "不动产单元号",
    },
    {
      key: "buildYear",
      label: "建筑年代",
      sufix: '年'
    },
    {
      key: "planUseDesc",
      label: "规划用途",
    },
    {
      key: "houseStructureDesc",
      label: "房屋结构",
    },
    {
      required: true,
      key: "totalFloor",
      label: "总楼层",
      sufix: '层'
    },
    {
      required: true,
      key: "inFloor",
      label: "所在楼层",
      sufix: '层'
    },
  ],
  3: [
    {
      required: true,
      key: "warrantNumber",
      label: "不动产权证号",
    },
    {
      required: true,
      key: "space",
      label: "建筑面积",
      sufix: '㎡'
    },
    {
      required: true,
      key: "fullAddress",
      label: "房屋坐落",
    },
    {
      required: true,
      key: "unitNumber",
      label: "不动产单元号",
    },
    {
      key: "buildYear",
      label: "建筑年代",
      sufix: '年'
    },
    {
      key: "planUseDesc",
      label: "规划用途",
    },
    {
      key: "houseStructureDesc",
      label: "房屋结构",
    },
    {
      required: true,
      key: "totalFloor",
      label: "总楼层",
      sufix: '层'
    },
    {
      required: true,
      key: "inFloor",
      label: "所在楼层",
      sufix: '层'
    },
  ],
  4: [
    {
      required: true,
      key: "warrantNumber",
      label: "房屋权证号",
    },
    {
      required: true,
      key: "space",
      label: "建筑面积",
      sufix: '㎡'
    },
    {
      required: true,
      key: "fullAddress",
      label: "房屋坐落",
    },
    {
      required: true,
      key: "unitNumber",
      label: "不动产单元号",
    },
    {
      key: "buildYear",
      label: "建筑年代",
      sufix: '年'
    },
    {
      key: "planUseDesc",
      label: "规划用途",
    },
    {
      key: "houseStructureDesc",
      label: "房屋结构",
    },
    {
      required: true,
      key: "totalFloor",
      label: "总楼层",
      sufix: '层'
    },
    {
      required: true,
      key: "inFloor",
      label: "所在楼层",
      sufix: '层'
    },
  ],
  5: [
    {
      required: true,
      key: "projectName",
      label: "项目名称", //（商品房预告登记时需要） ,
    },
    {
      required: true,
      key: "space",
      label: "建筑面积",
      sufix: '㎡'
    },
    {
      required: true,
      key: "fullAddress",
      label: "房屋坐落",
    },
    {
      required: true,
      key: "unitNumber",
      label: "不动产单元号",
    },
    {
      key: "buildYear",
      label: "建筑年代",
      sufix: '年'
    },
    {
      key: "planUseDesc",
      label: "规划用途",
    },
    {
      key: "houseStructureDesc",
      label: "房屋结构",
    },
    {
      required: true,
      key: "totalFloor",
      label: "总楼层",
      sufix: '层'
    },
    {
      required: true,
      key: "inFloor",
      label: "所在楼层",
      sufix: '层'
    }
  ],
  7: [
    {
      required: true,
      key: "projectName",
      label: "项目名称", //（商品房预告登记时需要） ,
    },
    {
      required: true,
      key: "space",
      label: "建筑面积",
      sufix: '㎡'
    },
    {
      required: true,
      key: "fullAddress",
      label: "房屋坐落",
    },
    {
      key: "buildYear",
      label: "建筑年代",
      sufix: '年'
    },
    {
      key: "planUseDesc",
      label: "规划用途",
    },
    {
      key: "houseStructureDesc",
      label: "房屋结构",
    },
    {
      required: true,
      key: "totalFloor",
      label: "总楼层",
      sufix: '层'
    },
    {
      required: true,
      key: "inFloor",
      label: "所在楼层",
      sufix: '层'
    },
  ],

  6: [
    {
      required: true,
      key: "warrantNumber",
      label: "不动产登记证明(他项权证)号",
    },
    {
      required: true,
      key: "space",
      label: "建筑面积",
      sufix: '㎡'
    },
    {
      required: true,
      key: "fullAddress",
      label: "房屋坐落",
    },
    {
      required: true,
      key: "unitNumber",
      label: "不动产单元号",
    },
    {
      key: "buildYear",
      label: "建筑年代",
      sufix: '年'
    },
    {
      key: "planUseDesc",
      label: "规划用途",
    },
    {
      key: "houseStructureDesc",
      label: "房屋结构",
    },
    {
      required: true,
      key: "totalFloor",
      label: "总楼层",
      sufix: '层'
    },
    {
      required: true,
      key: "inFloor",
      label: "所在楼层",
      sufix: '层'
    },
  ],
  8: [
    {
      required: true,
      key: "space",
      label: "建筑面积",
      sufix: '㎡'
    },
    {
      required: true,
      key: "fullAddress",
      label: "房屋坐落",
    },
    {
      required: true,
      key: "unitNumber",
      label: "不动产单元号",
    },
    {
      required: true,
      key: "warrantNumber",
      label: "不动产权证号",
    },
    {
      key: "buildYear",
      label: "建筑年代",
      sufix: '年'
    },
    {
      key: "planUseDesc",
      label: "规划用途",
    },
    {
      key: "houseStructureDesc",
      label: "房屋结构",
    },
    {
      required: true,
      key: "totalFloor",
      label: "总楼层",
      sufix: '层'
    },
    {
      required: true,
      key: "inFloor",
      label: "所在楼层",
      sufix: '层'
    },
  ],
  9: [
    {
      required: true,
      key: "warrantNumber",
      label: "原不动产权证号",
    },
    {
      required: true,
      key: "space",
      label: "建筑面积",
      sufix: '㎡'
    },
    {
      required: true,
      key: "fullAddress",
      label: "房屋坐落",
    },
    {
      required: true,
      key: "unitNumber",
      label: "不动产单元号",
    },
    {
      key: "buildYear",
      label: "建筑年代",
      sufix: '年'
    },
    {
      key: "planUseDesc",
      label: "规划用途",
    },
    {
      key: "houseStructureDesc",
      label: "房屋结构",
    },
    {
      required: true,
      key: "totalFloor",
      label: "总楼层",
      sufix: '层'
    },
    {
      required: true,
      key: "inFloor",
      label: "所在楼层",
      sufix: '层'
    },
  ],
  10: [
    {
      required: true,
      key: "projectName",
      label: "项目名称", //（商品房预告登记时需要） ,
    },
    {
      required: true,
      key: "space",
      label: "宗地面积",
    },
    {
      required: true,
      key: "fullAddress",
      label: "宗地坐落",
    },
    {
      key: "landUsageDesc",
      label: "土地用途",
    },
    {
      key: "landUse",
      label: "土地使用期限",
    },
  ],
  11: [
    {
      required: true,
      key: "warrantNumber",
      label: "原不动产权证号",
    },
    {
      required: true,
      key: "space",
      label: "建筑面积",
      sufix: '㎡'
    },
    {
      required: true,
      key: "fullAddress",
      label: "房屋坐落",
    },
    {
      required: true,
      key: "unitNumber",
      label: "不动产单元号",
    },
    {
      key: "buildYear",
      label: "建筑年代",
      sufix: '年'
    },
    {
      key: "planUseDesc",
      label: "规划用途",
    },
    {
      key: "houseStructureDesc",
      label: "房屋结构",
    },
    {
      key: "isLost",
      label: "不动产单元是否灭失", //0-否 1-是 ,
    },
    {
      required: true,
      key: "totalFloor",
      label: "总楼层",
      sufix: '层'
    },
    {
      required: true,
      key: "inFloor",
      label: "所在楼层",
      sufix: '层'
    },
  ]
}
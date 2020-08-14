import Enum from 'utils/Enum';
// 业务登记类型
export const OrderRegisterType = new Enum(
  { alias: 'SECOND_HAND_HOUSE', text: '二手房买卖登记', value: '1' },
  { alias: 'MORTGAGE_CREATE', text: '抵押权设立登记', value: '2' },
  { alias: 'COMMODITY_HOUSE_TRANSFER', text: '商品房转移登记', value: '3' },
  { alias: 'MORTGAGE_CANCLE', text: '抵押权注销登记', value: '4' },
  { alias: 'COMMODITY_PREVIEW', text: '商品房预告登记', value: '5' },
  { alias: 'COMMODITY_HOUSE_PRE_MORTGAGE', text: '商品房预抵押登记', value: '6' },
  { alias: 'FIRST_REG_HOUSE', text: '商品房首次登记', value: '10' },
  { alias: 'CANCEL_REG_HOUSE', text: '房产注销登记', value: '11' },
  { alias: 'PREVIEW_A_PRE_MORTGAGE', text: '商品房预告登记+商品房预抵押登记', value: '7' },
  { alias: 'HOUSE_TRANSFER_A_REATE', text: '商品房转移登记+抵押权设立登记', value: '8' },
  { alias: 'SECOND_HOUSE_A_CREATE', text: '二手房买卖登记+抵押权设立登记', value: '9' },
  { alias: 'HOUSE_PREVIEW_TO_TRANSFER', text: '商品房预告登记转商品房预抵押登记', value: '12' },
  { alias: 'HOUSE_PRE_MORTGAGE_TO_CREATE', text: '商品房预抵押登记转抵押权设立登记', value: '13' },
  { alias: 'HOUSE_CREATE_TO_MORTGAGE', text: '抵押权设立登记转抵押权注销登记', value: '14' },
  { alias: 'PREVIEW_PREVIEWZ_TO_TRANSFER_A_CREATE', text: '商品房预告登记+商品房预抵押登记转商品房转移登记+抵押权设立登记', value: '15' },


);
// 抵押类型
export const MortgageInfo = new Enum(
  { alias: 'PRIMARY', text: '一般抵押', value: 1 },
  { alias: 'HEIGHTEST', text: '最高额抵押', value: 2 }
);
// 产权信息(房屋基础信息)
export const houseBaseInfo = {
  projectName: '项目名称',//（商品房预告登记时需要） ,
  warrantNumber: '不动产权证号',
  space: '建筑面积',
  fullAddress: '房屋坐落',
  unitNumber: '不动产单元号',
  totalFloor: '总楼层',
  inFloor: '所在楼层',
  buildYear: '建筑年代',
  planUseDesc: '规划用途',
  houseStructureDesc: '房屋结构',
  isLost: '是否灭失',//0-否 1-是 ,
  landUsageDesc: '土地用途',
  landUseEnd: '土地使用期限',//（结束） ,
  landUseStart: '土地使用期限',//（开始） ,
  floor: '楼层',
  landUse: '土地使用期限',
  holder: '不动产权人',
  houseStatus: '房屋状态',
  propertyCategory: "产权类别",
  natureHouse: "房屋性质",
  eastWall: "东墙",
  southWall: "南墙",
  westernWall: "西墙",
  northWall: "北墙",
  landDroitNature: '土地权利性质'
};

export const workorderStatus = {
  '0': '未支付',
  '1': '已支付'
};

export const organizationType = {
  '1': '法院',
  '2': '金融机构',
  '3': '非金融机构',
  '4': '开发商'
};
export const auditStatusDesc = {
  '1': '未审核',
  '2': '审核通过',
  '3': '审核中',
  '4': '审核驳回'
};

export const examineStatuses = {
  '2': '审核通过',
  '4': '审核驳回'
};

export const businessScope = {
  '1': "二手房买卖登记",
  '2': "抵押权设立登记",
  '3': "商品房转移登记",
  '4': "抵押权注销登记",
  '5': "商品房预告登记",
  '6': "商品房预抵押登记",
  '7': "商品房预告登记+商品房预抵押登记",
  '8': "商品房转移登记+抵押权设立登记",
  '9': "二手房买卖登记+抵押权设立登记",
  '10': "商品房首次登记",
  '11': "房产注销登记",
  '12': "商品房预告登记转商品房预抵押登记",
  '13': "商品房预抵押登记转抵押权设立登记",
  '14': "抵押权设立登记转抵押权注销登记",
  '15': "商品房预告登记+商品房预抵押登记转商品房转移登记+抵押权设立登记",
  '101': '查封',
  '102': '预查封',
  '103': '轮候查封',
  '104': '轮候预查封',
  '105': '续封',
  '106': '解封',
  '107': '其他',
  '108': '查封历史',
  '109': '注销',
  '110': '抵押权首次登记',
  '111': '抵押权注销登记',
  '112': '国有建设用地使用权首次登记',
  '113': '开发项目初始登记'
};

export const AccountStatus = {
  "1": "启用",
  "2": "停用",
  "3": "离职"
};
//预约状态
export const FlagStatuses = new Enum(
  { alias: '已预约', text: '已预约', value: 1 },
  { alias: '已取消 ', text: '已取消', value: 2 },
);

// 抵押不动产类型
export const houseType = {
  '1': '土地',
  '2': '土地和房屋',
  '3': '林地和林木',
  '4': '土地和在建建筑物',
  '5': '海域',
  '6': '海域和构筑物',
  '7': '其他',
  '8': '房屋'
};
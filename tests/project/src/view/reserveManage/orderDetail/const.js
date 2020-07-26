import Enum from 'utils/Enum';


// 工单信息
export const orderInfo = {
  orderNo: '工单编号',
  registerType: '登记类别',
  statusDesc: '工单状态',
  followerUser: '处理人',
  createUser: '申请人',
  submitTime: '提交时间'
};
// 业务登记类型
export const OrderRegisterType = new Enum(
  {alias: 'SECOND_HAND_HOUSE', text: '二手房买卖登记', value: '1' },
  {alias: 'MORTGAGE_CREATE', text: '抵押权设立登记', value: '2' },
  {alias: 'COMMODITY_HOUSE_TRANSFER', text: '商品房转移登记', value: '3' },
  {alias: 'MORTGAGE_CANCLE', text: '抵押权注销登记', value: '4' },
  {alias: 'COMMODITY_PREVIEW', text: '商品房预告登记', value: '5' },
  {alias: 'COMMODITY_HOUSE_PRE_MORTGAGE', text: '商品房预抵押登记', value: '6' },
  {alias: 'FIRST_REG_HOUSE', text: '商品房首次登记', value: '10' },
  {alias: 'CANCEL_REG_HOUSE', text: '房产注销登记', value: '11' },
  {alias: 'PREVIEW_A_PRE_MORTGAGE', text: '商品房预告登记+商品房预抵押登记', value: '7' },
  {alias: 'HOUSE_TRANSFER_A_REATE', text: '商品房转移登记+抵押权设立登记', value: '8' },
  {alias: 'SECOND_HOUSE_A_CREATE', text: '二手房买卖登记+抵押权设立登记', value: '9' },
  {alias: 'HOUSE_PREVIEW_TO_TRANSFER', text: '商品房预告登记转商品房预抵押登记', value: '12' },
  {alias: 'HOUSE_PRE_MORTGAGE_TO_CREATE', text: '商品房预抵押登记转抵押权设立登记', value: '13' },
  {alias: 'HOUSE_CREATE_TO_MORTGAGE', text: '抵押权设立登记转抵押权注销登记', value: '14' },
  {alias: 'PREVIEW_PREVIEWZ_TO_TRANSFER_A_CREATE', text: '商品房预告登记+商品房预抵押登记转商品房转移登记+抵押权设立登记', value: '15' },


);
// 备案信息
export const filingInfo = {
  contractNo: '网签备案合同编号',
  signDate: '备案日期',
  signCompanyName: '中介公司名称',
  totalPrice: '合同总价'
};

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
  landUse: '土地使用期限'
};

// 交易信息
export const transactionInfo = {
  totalPrice: '合同总价'
};

// 抵押信息
export const mortgageInfo = {
  acceptNo: '抵押受理号',
  typeDesc: '抵押类型',
  beginDate: '债务履行起始日期',
  endDate: '债务履行截止日期',
  mainClaimAmount: '被担保债权数额',
  highestClaimAmount: '最高债权数额',
  evaluationPrice: '房屋评估价',
  hisWarrantNumber: '他项权利证书号',//不动产登记证明号（抵押注销业务）
  //serialNo: '序号',
  // a: '抵押权人',
  // b: '证件种类',
  // c: '证件号',
  // d: '不动产登记证明号',
  // e: '被担保主债权数额',
  // f: '登记时间',
  // g: '注销日期',
  // h: '权属状态',
  // i: '附记',
  // j: '备注'
};

// 材料信息
export const materialInfo = {
  obligorID: '义务人身份证明',
  obligorProxy: '义务人授权委托书',
  obligorAgentID: '义务人代理人身份证明',
  ownnerID: '权利人身份证明',
  ownnerProxy: '权利人授权委托书',
  contract: '二手房买卖合同',
  propertyCertificate: '不动产权证书/房屋所有权证书',
  registrationApplication: '登记申请书',
  other: '其他材料'
};

// 产权信息
export const propertyInfo = {
  projectName: '项目名称',
  houseCode: '房屋代码',
  location: '坐落',
  ownershipNumber: '不动产权证号',
  // orientation: '方位区',
  // street: '街道',
  planUsage: '规划用途',
  // mapNumber: '图号',
  // propertyType: '产别',
  // certificateNumber: '证书编号',
  // administrativeRegion: '行政区',
  constructDate: '竣工时间',
  unitNumber: '不动产单元号',
  isMortgage: '抵押',
  isSealUp: '查封',
  objection: '异议', //新增
  isFrozen: '冻结',
  isLost: '是否灭失', //0-否 1-是
};

// 土地信息
export const landInfo = {
  projectName: '项目名称',
  landNature: '权利性质',
  landUser: '土地使用者',
  landNumber: '宗地号',
  landUsage: '用途',
  //obtainWay: '土地取得方式',
  usingRightArea: '宗地面积',
  usingRightNumber: '不动产权证号',
  landLocation: '土地坐落',
  //mapNumber: '图号',
  landLevel: '土地等级',
  terminateDate: '使用权结束日期',
  periodUse: '土地使用期限',
  //shareArea: '分摊面积',
  unitNumber: '不动产单元号' //新增
};

// 房屋状况信息
export const houseInfo = {
  houseCode: '房屋编码',
  //buildingNo: '幢号',
  //unitNo: '单元/门牌号',
  naturalBuildingNo: '自然幢号',
  logicBuildingNo: '逻辑幢号',
  roomNumber: '户号',
  structure: '户型结构',
  totalFloor: '总层数',
  locateFloor: '所在层',
  architectureArea: '建筑面积',
  innerArchitectureArea: '套内建筑面积',
  sharedArea: '分摊建筑面积',
  constructDate: '竣工时间',
  address: '房屋坐落',
  planUse: '规划用途',
};

// 他项权信息
export const presentmMortgagesInfo = {
  sequenceNumber: '序号',
  rightType: '权利种类',
  acceptMortgageNo: '抵押受理号',
  mortgageNo: '他项权证号',
  certificateNo: '证书编号',
  guaranteeScope: '担保范围',
  creditorAmount: '债权数额',
  mortgageArea: '抵押面积',
  currency: '币种',
  signDate: '设定日期',
  debtDeadline: '债务履行期限/债权确认期间',
  cancelDate: '注销日期',
  status: '状态'
};

//邮寄信息
export const orderMailInfo = {
  isMailing: '产证/证明邮寄',
  consignee: '收件人',
  mobile: '收件人手机号',
  address: '收件地址'
};


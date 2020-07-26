// 产权信息(二手房/商品房)
export const EstatePropertyInfo = {
  unitNo: '不动产单元号',
  houseCode: '房屋代码',
  location: '坐落',
  warrantNo: '不动产权证号',
  using: '规划用途',
  completedDate: '竣工时间',
  isMortgage: '抵押',
  isCloseDown: '查封',
  isDissent: '异议',
  isFreeze: '冻结'
};

// 产权信息(转移登记)
export const EstatePropertyInfoForTransfer = {
  qllx: '不动产权利类型',
  cqr: '产权人',
  cqlb: '产权类别',
  cqly: '产权来源',
  gyqk: '共有情况',
  bdcqzh: '不动产权证号' // TODO
};

// 土地信息(二手房/商品房)
export const LandInfo = {
  droitNature: '权利性质',
  unitNo: '不动产单元号',
  ancestralLandCode: '宗地号',
  ancestralUser: '土地使用者',
  using: '用途',
  ancestralLandArea: '宗地面积',
  propertyRightNo: '不动产权证号',
  location: '土地坐落',
  level: '土地等级',
  endTime: '使用权结束日期',
};
// 土地信息(转移登记)
export const LandInfoForTransfer = {
  tdyt: '土地用途',
  zjzmj : '土地面积',
  dymj : '独用土地面积',
  ftmj : '分摊土地面积',
  qlxz : '土地权利性质',
  syqxq : '土地使用起始时间',
  syqxz : '土地使用结束时间'
};
// 土地情况(转移登记)
export const LandMsgForTransfer = {
  tdyt: '土地用途',
  syqmj : '土地使用权面积',
  dymj : '独用土地面积',
  ftmj : '分摊土地面积',
  syqxq : '土地使用起始时间',
  syqxz : '土地使用结束时间',
  qlxz : '土地权利性质',
  tdzl: '土地坐落',
  zddm : '宗地代码',
  bdcdyh : '不动产单元号',
  qllx : '权利类型',
  qlsdfs : '权利设定情况',
  zdszd: '东墙',
  zdszn: '南墙',
  zdszx: '西墙',
  zdszb : '北墙',
};

// 房屋状况信息
export const HouseInfo = {
  houseCode: '房屋编码',
  naturalBuildingNo: '自然幢号',
  logicBuildingNo: '逻辑幢号',
  householdNo: '户号',
  houseStructure: '户型结构',
  floorNo: '楼层',
  buildingArea: '建筑面积',
  innerBuildingArea: '套内建筑面积',
  divideBuildingArea: '分摊建筑面积',
  completedDate: '竣工时间',
  location: '房屋坐落',
  using: '规划用途',
};
// 房屋信息(转移登记)
export const HouseInfoForTransfer = {
  bdczl : '房屋坐落',
  bdcdyh : '不动产单元号',
  cjh : '产籍号',
  zlc : '总层数',
  lc : '所在层次',
  dscs : '地上层数',
  dxcs : '地下层数',
  fwyt : '规划用途',
  fwjg : '房屋结构',
  fwxz : '房屋性质',
  fwlx : '房屋类型',
  jzmj : '建筑面积',
  tnjzmj : '套内建筑面积',
  ftjzmj : '分摊建筑面积',
  jgrq : '竣工时间',
  dq : '东墙',
  nq : '南墙',
  xq : '西墙',
  bq : '北墙',
};

// 他项权信息
export const PresentmMortgagesInfo = {
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
  status: '状态',
  excursus: '附记',
  remark: '备注'
};

// 抵押
export const MortgageInfo = {
  mortgageNo: '序号',
  mortgageUser: '抵押权人',
  cardType: '证件种类',
  cardNo: '证件号',
  registerProveNo: '不动产登记证明号',
  mortgageMode: '抵押方式',
  startTime: '债务履行起始时间',
  endTime: '债务履行截止时间',
  mainMortgageAmount: '被担保主债权数额',
  registerTime: '登记时间',
  withdrawTime: '注销日期',
  status: '权属状态',
  remark: '附记',
};

//查封
export const CloseDownInfo = {
  closeDownOrg: '查封机关',
  closeDownType: '查封类型',
  closeDownFile: '查封文件',
  closeDownFileNo: '查封文号',
  startTime: '查封起始时间',
  endTime: '查封结束时间',
  closeDownRange: '查封范围',
  registerTime: '登记时间',
  unlockOrg: '解封机关',
  unlockFile: '解封文件',
  unlockFileNo: '解封文号',
  unlockRegisterTime: '解封登记时间',
  status: '权属状态',
  remark: '附记',
};

//异议
export const DissentInfo = {
  dissent: '异议事项',
  applier: '申请人',
  cardType: '证件种类',
  cardNo: '证件号',
  registerProveNo: '不动产登记证明号',
  registerTime: '登记时间',
  withdrawReason: '注销异议原因',
  withdrawRegisterTime: '注销异议登记时间',
  status: '权属状态',
  remark: '附记',
};
// 2019-11-20号之前的业务页面，设置成默认展示的card
// 为数组，值是ModuleMap的value值
export const defaultModules = [
  function (data) { return this.renderCardInfo(EstatePropertyInfo, data.estateProperty, '产权信息') },
  function (data) { return this.renderCardInfo(LandInfo, data.ancestralLandInfo, '土地信息') },
  function (data) { return this.renderCardInfo(HouseInfo, data.natureInfo, '房屋状况信息') },
  function (data) { return this.getUserInfo({ dataSource: data.buyerSetList, title: '买方套次信息' }) },
  function (data) { return this.getUserInfo({ dataSource: data.sellerSetList, title: '卖方套次信息' }) },
  function (data) { return this.getOwenrInfo({ dataSource: data.droitInfo, title: '权利人信息' }) },
  function (data) { return this.renderCardInfo(MortgageInfo, data.mortgageInfo, '抵押信息') },
  function (data) { return this.renderCardInfo(CloseDownInfo, data.closeDownInfo, '查封信息') },
  function (data) { return this.renderCardInfo(DissentInfo, data.dissentInfo, '异议信息') },
];

/**
 * ModuleMap{
 *  key: 是个函数，用于判断当前Card是否展示，返回值true展示，false不展示
 *  value: 渲染DOM的函数
 *         该函数不能是箭头函数（会取不到this），函数定义在StatusInfoDetail组件里
 */
export const ModuleMap = new Map();
ModuleMap.set((item) => (['5010','5020','5030'].indexOf(item.registerType) > -1), function (data) { return this.renderTransterEstateInfo(EstatePropertyInfoForTransfer, data.estateInfo, '产权信息') });
ModuleMap.set((item) => (['5010','5020','5030'].indexOf(item.registerType) > -1), function (data) { return this.renderCardInfo(HouseInfoForTransfer, data.houseInfo, '房屋信息') });
ModuleMap.set((item) => (['5010','5020','5030'].indexOf(item.registerType) > -1), function (data) { return this.renderCardInfo(LandInfoForTransfer, data.landProperty, '土地信息') });
ModuleMap.set((item) => (['5010','5020','5030'].indexOf(item.registerType) > -1), function (data) { return this.renderCardInfo(LandMsgForTransfer, data.landProperty , '土地情况') });
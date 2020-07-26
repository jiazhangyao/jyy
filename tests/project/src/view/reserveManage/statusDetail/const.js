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
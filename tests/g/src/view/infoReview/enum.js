import Enum from 'utils/Enum';

// 审核状态
export const AuditStatus = new Enum(
  // {alias: 'TODO', text: '待审核', value: 0},
  {alias: 'TODO', text: '待审核', value: 3},
  {alias: 'DONE', text: '已审核', value: 1}
);

// 申诉材料信息
export const MediaType = new Enum(
  {alias: 'TYPE1', text: '身份证正面照片', value: 0},
  {alias: 'TYPE2', text: '身份证反面照片', value: 1},
  {alias: 'TYPE3', text: '申诉人手持身份证照', value: 2}
);

// 审核结果
export const AuditResult = new Enum(
  {alias: 'SUCCESS', text: '认证通过', value: 0},
  {alias: 'FAIL', text: '认证驳回', value: 1}
);
// log审核结果
export const LogAuthResult = new Enum(
  {alias: 'PENDING', text: '待审核', value: 0},
  {alias: 'REJECT', text: '审核驳回', value: 1},
  {alias: 'PASS', text: '审核通过', value: 2}
);

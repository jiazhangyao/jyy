import Enum from '@/utils/Enum';

// 企业/单位证件类型
export const CompanyCardTypes = new Enum(
  { text: "统一社会信用代码", value: 3, alias: "TYSHXYDM" },
  { text: "组织机构代码", value: 4, alias: "ZZJGDMZ" },
  { text: "其他证件", value: 11, alias: "QT" }
);
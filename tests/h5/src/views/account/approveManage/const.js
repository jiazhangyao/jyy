import Enum from '@/utils/Enum';

/**
 * @description: 认证状态
 * 未认证：1，
 * 认证通过：2
 * 认证中：3
 * 认证驳回：4
 */
export const AuditStatusEnum = new Enum(
  // { alias: "STATUS_UNVERIFIED", text: "未认证", value: 3 },
  { alias: "STATUS_VERIFIED", text: "审核通过", value: 2 },
  { alias: "STATUS_VERIFING", text: "审核中", value: 1 },
  { alias: "STATUS_REJECTED", text: "审核驳回", value: 4 },
)

/**
 * @description: 机构类型
 * 法院：1，
 * 金融机构：2
 * 非金融机构：3
 */
export const Type = new Enum(
  { alias: "FY", text: 0, value: 1 },
  { alias: "JRJG", text: 1, value: 2 },
  { alias: "FJRJG", text: 2, value: 3 }
)

/**
 * @description: 企业/单位证件类型
 * 统一社会信用代码：1，
 * 组织机构代码：2
 * 其他：3
 */
export const CardType = new Enum(
  { alias: "TYSHXYDM", text: 0, value: 1 },
  { alias: "ZZJGDM", text: 1, value: 2 },
  { alias: "QT", text: 2, value: 3 }
)

/**
 * @description: 企业/单位证件类型
 * 身份证
 * 工作证
 */
export const CertificateType = new Enum(
  { alias: "SFZ", text: 0, value: 1 },
  { alias: "GZZ", text: 1, value: 2 }
)



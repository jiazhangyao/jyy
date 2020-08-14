import Enum from '@/utils/Enum';
/**
 * @description: 不动产权利类型
 */
export const RightTypeEnum = new Enum(
    { alias: "RIGHT_PERSON", text: "个人", value: 1 },
    { alias: "RIGHT_ORG", text: "企业", value: 2 },
)

/**
 * @description: 转移登记申请的编辑页面，登记类型与用户类型的关系
 * key值为registertype值
 */
export const tabsRelateToType = {};
Object.defineProperties(tabsRelateToType, {
    4050: {
        value: {
            name: "",
            tabs: ["History", "Estate", "Seal", "File"]
        }
    },
    4060: {
        value: {
            name: "",
            tabs: ["History", "Estate", "Seal", "File"]
        }
    },
    4010: {
        value: {
            name: "",
            tabs: ["Estate", "Seal", "File"]
        }
    }
});

/**
 * @description: 登记申请的编辑页面，所有tab的总量
 */
export const tabItems = {
    AddHistory: {
        label: "历史查封信息",
        component: "DetailHistory",
        canEdit: false,
        path: "/sealUp/sealUpHistoryDetail"
    },
    AddEstate: {
        label: "不动产信息",
        component: "DetailEstate",
        canEdit: false,
        path: "/sealUp/sealUpEstateDetail"
    },
    AddSeal: {
        label: "查封信息",
        component: "AddSeal",
        canEdit: true,
        path: "/sealUp/sealUpAddSeal"
    },
    AddFile: {
        label: "材料上传",
        component: "AddFile",
        canEdit: true,
        path: "/sealUp/sealUpAddFile"
    },
    DetailHistory: {
        label: "历史查封信息",
        component: "DetailHistory",
        canEdit: false,
        path: "/sealUp/sealUpHistoryDetail"
    },
    DetailEstate: {
        label: "不动产信息",
        component: "DetailEstate",
        canEdit: false,
        path: "/sealUp/sealUpEstateDetail"
    },
    DetailSeal: {
        label: "查封信息",
        component: "DetailSeal",
        canEdit: false,
        path: "/sealUp/sealUpInfoDetail"
    },
    DetailFile: {
        label: "材料上传",
        component: "AddFile",
        canEdit: false,
        path: "/sealUp/sealUpAddFile"
    }
}

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

// 登记申请的编辑页面，持证方式
export const orgTypeConst = [
    {
        key: 1,
        name: '个人'
    },
    {
        key: 2,
        name: '企业'
    }
]

/**
 * 转移登记状态表
 */
export const TransferStatusEnum = new Enum(
    { alias: "UNSUBMITTED", value: 5, text: "未提交，信息填写中" },
    { alias: "SUBMIT", value: 10, text: "预审受理中" },
    { alias: "PRE_ADOPTION", value: 15, text: "预审通过" },
    { alias: "PRE_REJECT", value: 20, text: "受理预审驳回" },
    { alias: "INFO_WRITE_SUBMIT", value: 50, text: "权籍预审中" },
    { alias: "MAINTAIN_FUND_AUDIT_REJECT", value: 51, text: "维修资金受理驳回" },
    { alias: "PRE_TAX_COUNT_OK", value: 56, text: "确认预核税中" },
    { alias: "PRE_TAX_CONFIRM_OK", value: 52, text: "签署合同中" },
    { alias: "SIGN_CONTRACT_OK", value: 53, text: "缴纳税费中" },
    { alias: "PAY_TAX_OK", value: 54, text: "复审中" },
    { alias: "AUDIT_REJECT", value: 55, text: "复审驳回" },
    { alias: "AUDIT_PASS", value: 30, text: "复审通过" },
    { alias: "AUDIT_FAIL", value: 31, text: "复审失败" },
    { alias: "REGISTER", value: 35, text: "已登簿" },
    { alias: "MAKED_CERTIFICATE", value: 40, text: "已出证" },
    { alias: "ARCHIVEDING", value: 62, text: "已归档" },//用于除提醒归档的其它所有登记业}务
    { alias: "END", value: 25, text: "已终止" },
)

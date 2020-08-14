import {
    detail,// 业务登记详情
} from "@/service/business";
import { UserRoleEnum } from "@/views/transferbusiapply/const";
function getDefaultTransferbusiapplyForm(params) {
    return {
        "applicantType": undefined,// 申请人类型 1、个人；2、企业
        "buyerInfo": {}, // 买方信息（权利人）
        "buyerJoinOwner": {}, // 买方共有人列表 
        "buyerOrderAskInfo": {}, // 买方询问信息 
        "id": undefined, // 订单id,
        "isPost": 2, // 是否邮寄1是2否
        "materialList": [], // 材料信息列表 
        "orderHouse": {},// 房产信息列表
        "orderLand": {}, // 土地信息
        "orderMail": {}, // 邮寄信息 
        "orderTradeInfoDTO": {}, // 订单交易信息
        "registerPrimaryType": undefined, // 登记大类: 1预告登记 2首次登记 3抵押登记 4查封登记 5转移登记 6变更登记 7更正登记 8注销登记 9异议登记 10换证和遗失补发登记 
        "registerType": undefined, // 登记类型: 5030二手房转移登记 5020 一手房转移登记 5010 土地转移登记
        "salerInfo": null, // 卖方信息（义务人）
        "salerJoinOwner": {}, // 卖方共有人列表
        "salerOrderAskInfo": null, // 卖方询问信息
        "submitType": undefined, // 1、卖方提交；2、买方提交

        // 上面是swagger有的数据，下面是C端PC提交的多出来的数据，不确定是否有用
        "orderNo": undefined, // 订单号 
        "status": undefined, // 订单状态，流程状态
        "writeStatus": undefined, //编辑状态，卖方填写，买方填写，都已经填写 TODO  曹克江
        "loginUserType": undefined, // 当前登陆用户的类型 1卖方，2买方
        "orderRejectApplocant": undefined, // 订单拒绝-描述-来自G端审核
        "orderRejectReson4Buyer": undefined, // 订单拒绝-买方-来自G端审核
        "orderRejectReson4Saler": undefined, // 订单拒绝-卖方-来自G端审核
        "payUrl": undefined, // 来自后端数据
        "confirmUrl": undefined, // 来自后端数据
        "signUrl": undefined, // 来自后端数据
        "appFile": null,
        "contractFile": null,
        "editable": undefined,
        "familyList": [],
        "obligorFamilyList": []
    }
}
export default {
    namespaced: true,
    state: {
        pageEditable: true, // 表明当前页是详情页还是编辑页面
        componentTitle: '',// 进入模块后的头部标题
        whichEdit: 'layout',
        materialTypeList: '', // 材料类型枚举
        transferbusiapplyForm: {}
    },
    getters: {
    },
    mutations: {
        setPageEditable(state, data) {
            state.pageEditable = data;
        },
        setMaterialTypeList(state, data) {
            state.materialTypeList = data;
        },
        setWhichEdit(state, data) {
            state.whichEdit = data;
        },
        setComponentTitle(state, data) {
            state.componentTitle = data;
        },
        setForm(state, data) {
            state.transferbusiapplyForm = {
                ...state.transferbusiapplyForm,
                ...data
            };
        },
        setInitForm(state, data) {
            state.transferbusiapplyForm = {
                ...getDefaultTransferbusiapplyForm(),
                ...data
            };
            state.whichEdit = 'layout';
        },
        setPropertyInfo(state, data) {
            function getHouseInfo() {
                return {
                    propertyPerson: cqjbxxObj.fj,
                    address: cqjbxxObj.bdczl,
                    location: cqjbxxObj.bdczl,
                    buildYear: cqjbxxObj.jznd,
                    houseStructure: Number(cqjbxxObj.fwjg) || cqjbxxObj.fwjg,
                    inFloor: cqjbxxObj.lc,
                    planUse: cqjbxxObj.fwyt,
                    regionId: 100,
                    space: cqjbxxObj.jzmj,
                    totalFloor: cqjbxxObj.zlc,
                    unitNumber: cqjbxxObj.bdcdyh,
                    warrantNumber: cqjbxxObj.bdcqzh || qsxxObj.bdcqzh,
                    southWall: cqjbxxObj.nq,
                    westernWall: cqjbxxObj.xq,
                    northWall: cqjbxxObj.bq,
                    eastWall: cqjbxxObj.dq,
                    completedDate: cqjbxxObj.jgrq,
                    certificateType: warrantType,     //需要特殊处理
                    natureHouse: cqjbxxObj.fwxz,
                    landUsage: cqjbxxObj.tdyt,
                    houseType: cqjbxxObj.fwlx,
                    projectName: '',
                    propertyCategory: cqjbxxObj.cqlb,
                    ownershipType: qsxxObj.gyfs || 1,
                    isLost: 2,
                };
            }
            const { warrantType, cqjbxxObj = {}, qsxxObj = {}, syqrxxList } = data;
            let propertyPerson = []; // 产权人，一手房直接取用，二手房和土地需要拼接
            let obj = {}; // 最终处理的数据，与后端交互
            if (data.registerType == 5020) { // 新房
                obj.orderHouse = { ...getHouseInfo(), name: cqjbxxObj.fj };
                obj.buyerOrderAskInfo = {
                    haveJoinOwner: 0,
                    isLaw: 1,
                    isReal: 1,
                };
            } else if (data.registerType == 5030) { // 二手房
                //义务人/卖方/转让方
                obj.salerInfo = {
                    applicantList: [],
                    familyList: [{ familyMemberList: [] }]
                };
                obj.salerOrderAskInfo = {
                    haveJoinOwner: syqrxxList.length > 1 ? 1 : 0,
                    isLaw: 1,
                    isReal: 1,
                };
                obj.salerJoinOwner = {
                    applicantList: [],
                    familyList: [{ familyMemberList: [] }]
                };
                if (syqrxxList) {
                    obj.salerInfo.applicantList = syqrxxList.map((item, index) => {
                        propertyPerson.push(item.syqrxm);
                        let applicant = {
                            typeDesc: `义务人${index + 1}`,
                            name: item.syqrxm,
                            cardType: Number(item.zjlx) ? Number(item.zjlx) : item.zjlx,
                            cardNo: item.zjhm,
                            mobile: item.lxdh || '',
                            orgType: item.qllx ? +item.qllx : data.orgType,
                            smsStatus: 0,
                            credooIdentity: 1,
                            isStarter: 1,
                            rightProportion: item.zyfe,
                            proxyList: [],
                            faceIdentity: 1,
                            holdingType: 2,
                            isHolder: 1,
                            isTaxesPayer: 1,
                            type: 1
                        };
                        obj.salerInfo.familyList[0].familyMemberList.push(applicant);
                        obj.salerJoinOwner.applicantList.push(applicant);
                        return applicant;
                    });
                } else {
                    obj.salerInfo = [];
                }
                
                obj.orderHouse = { ...getHouseInfo(),propertyPerson: propertyPerson.join(','), name: propertyPerson.join(',') };
            } else if (data.registerType == 5010) { // 土地
                const { zdjbxxObj } = data;
                const { qlrxxList } = zdjbxxObj;
                obj.salerInfo = {
                    applicantList: [],
                    familyList: [{ familyMemberList: [] }]
                };
                obj.salerOrderAskInfo = {
                    haveJoinOwner: qlrxxList.length > 1 ? 1 : 0,
                    isLaw: 1,
                    isReal: 1,
                }
                obj.salerJoinOwner = {
                    applicantList: [],
                    familyList: [{ familyMemberList: [] }]
                }
                obj.salerInfo.applicantList = qlrxxList.map((item) => {
                    propertyPerson.push(item.qlrxm);
                    let applicant = {
                        name: item.qlrxm,
                        cardType: Number(item.zjlx) ? Number(item.zjlx) : item.zjlx,
                        cardNo: item.zjhm,
                        mobile: item.lxdh || '',
                        orgType: item.qllx ? +item.qllx : data.orgType,
                        smsStatus: 0,
                        credooIdentity: 1,
                        isStarter: 1,
                        proxyList: [],
                        corporationName: '',
                        corporationCardType: '',
                        corporationCardNo: '',
                        faceIdentity: 1,
                        type: 1,
                        isApplicant: 1,
                    };
                    obj.salerInfo.familyList[0].familyMemberList.push(applicant);
                    obj.salerJoinOwner.applicantList.push(applicant);
                    return applicant;
                });
                obj.orderLand = {
                    ...zdjbxxObj,
                    bdcqzh: zdjbxxObj.zddm,// (string, optional): 不动产单元号 ,
                    warrantNumber: zdjbxxObj.zddm,// (string, optional): 宗地代码
                    commonInfo: '',// (string, optional): 共有信息 ,
                    id: 0,//(integer, optional): 申请人id ,
                    space: zdjbxxObj.jzzdmj,//(string, optional): 建筑占地面积（单位：平米 ,
                    ownershipType: null,//(integer, optional): 共有方式-1单独所有 2共同共有 3按份额共有 4其它共有 ,
                    landDroitNature: zdjbxxObj.qlxz,//(string, optional): 权利性质 ,
                    rightHolder: propertyPerson.join(','),//(string, optional): 权利人 ,
                    propertyPerson: propertyPerson.join(','),//(string, optional): 权利人 ,
                    landUsage: zdjbxxObj.tdyt,//(string, optional): 土地用途 ,
                    landUsageDesc: zdjbxxObj.tdytDesc,//(string, optional): 土地用途 ,
                    location: zdjbxxObj.tdzl,//(string, optional): 土地座落 ,
                    landArea: zdjbxxObj.zdmj,//(string, optional): 宗地面积（单位：平米） ,
                    planUse: '',
                    planUseDesc: '',
                    natureHouse: '',
                    name: propertyPerson.join(',')
                }
            }
            state.whichEdit = 'layout';
            state.transferbusiapplyForm = {
                ...getDefaultTransferbusiapplyForm(),
                ...obj,
                userRole: data.registerType == 5020 ? UserRoleEnum.getValueFromAlias('ROLE_APPLICANT') : UserRoleEnum.getValueFromAlias('ROLE_ASSIGNOR'),
                orderTradeInfoDTO: {
                    taxesPayer: data.registerType == 5020 ? UserRoleEnum.getValueFromAlias('ROLE_APPLICANT') : UserRoleEnum.getValueFromAlias('ROLE_ASSIGNOR')
                },
                location: data.registerType == 5010 ? obj.orderLand.location : obj.orderHouse.location,
                registerType: data.registerType,
                "registerPrimaryType": 50, // 转移登记大类，写死50
            };
        },
        setValue(state) {
            state.whichEdit = 'layout';
            state.transferbusiapplyForm = {
                ...getDefaultTransferbusiapplyForm(),
                ...state.transferbusiapplyForm
            };
        },
    },
    actions: {
        getUserRole() {
            return this.state.transferbusiapply.transferbusiapplyForm.userRole;
        },
        getData: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                detail(data).then(res => {
                    if (res.success) {
                        let data = res.data;
                        res.data.location = res.data.registerType == 5010 ? data.orderLand.tdzl : data.orderHouse.location;
                        commit("setInitForm", {
                            ...res.data,
                            userRole: res.data.registerType == 5020 ? 3 : res.data.loginUserType
                        })
                        resolve(res);
                    } else {
                        reject(res)
                    }
                })
            })
        }
    },
    modules: {}
}
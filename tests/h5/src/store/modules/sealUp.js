import { searchSealUp, reminderSubmit, addTypeSealUp, addFormSubmits, closures, historySealOrder, orderDetail, getMaterialList, saveSealOrder } from "../../service/sealUp";
import { Toast } from "vant";
import router from "../../router";

export default {
    namespaced: true,
    state: {
        // 详情编辑导航页
        id: undefined,
        orderId: null,
        pageEditable: true, // 表明当前页是详情页还是编辑页面
        whichEdit: "layout",
        statusDesc: "",
        status: "",
        remark: "",
        componentTitle: '',// 进入模块后的头部标题
        materialTypeList: [],
        // 详情编辑导航页
        navData: [],
        mainData: [],
        showReminders: true,
        immovableDatas: '',
        //新增获取类型入参
        searchDatas: {},
        changeTypeData: [],

        // 查封类型-文字
        sealUpType: '',
        // 查封类型-代码
        registerType: '',

        //新增产权信息
        addNavData: [],
        //申请人列表
        addApplyLists: [],
        estateSealDTOObj: {},
        estateImmovableSealDTOListArr: [],
        sealUpTypes: [],
        //历史订单信息
        historySealUpData: [],
        historySealUpDataShow: [],
        closureNum: 0,
        totalSubmitData: {
            estateInfo: {
                data: [],
                isDown: false
            },
            sealApplicant: {
                data: {},
                isDown: false
            },
            sealInfo: {
                data: {},
                isDown: false
            },
            materialList: {
                data: {},
                isDown: false
            },
            externalSealingInfo: {
                data: {},
                isDown: false
            }
        },
        // 详情编辑导航页
        totalDetailData: {},
        // 查封信息
        sealUpInfo: [],
        // 申请人
        applyLists: [],
        //附件材料
        materialLists: [],
        // 历史信息
        historyDetailData: {},
        changeSealInfosData: {},
        // 原始不动产信息
        estateInfo: null,

        estateDetailInfo: null
    },
    mutations: {
        changeEstateInfo(state, data) {
            state.estateDetailInfo = data;
        },
        changeSealInfos(state, data) {
            state.changeSealInfosData = data
        },
        // 详情编辑导航页
        setDefaultState(state, data) {
            Object.assign(state, {
                // 详情编辑导航页
                id: undefined,
                pageEditable: true, // 表明当前页是详情页还是编辑页面
                whichEdit: "layout",
                statusDesc: "",
                status: "",
                remark: "",
                componentTitle: '',// 进入模块后的头部标题
                materialTypeList: [],
                // 详情编辑导航页
                navData: [],
                mainData: [],
                showReminders: true,
                immovableDatas: '',
                //新增获取类型入参
                searchDatas: {},
                changeTypeData: [],
                // sealUpType: '',
                // 查封类型
                // registerType: '',
                //新增产权信息
                addNavData: [],
                //申请人列表
                addApplyLists: [],
                estateSealDTOObj: {},
                estateImmovableSealDTOListArr: [],
                sealUpTypes: [],
                //历史订单信息
                historySealUpData: [],
                historySealUpDataShow: [],
                closureNum: 0,
                totalSubmitData: {
                    estateInfo: {
                        data: [],
                        isDown: false
                    },
                    sealApplicant: {
                        data: {},
                        isDown: false
                    },
                    sealInfo: {
                        data: {},
                        isDown: false
                    },
                    materialList: {
                        data: {},
                        isDown: false
                    },
                    externalSealingInfo: {
                        data: {},
                        isDown: false
                    }
                },
                // 详情编辑导航页
                totalDetailData: {},
                // 查封信息
                // sealUpInfo: [],
                // 申请人
                applyLists: [],
                //附件材料
                materialLists: [],
                // 历史信息
                // historyDetailData: {},
                changeSealInfosData: {}
            })
        },
        setMaterialTypeList(state, data) {
            state.materialTypeList = data;
        },
        changeSealUpBaseInfo(state, params) {
            state.id = params.id;
            state.status = params.status;
            state.statusDesc = params.statusDesc;
            state.remark = params.remark;
        },
        setWhichEdit(state, data) {
            state.whichEdit = data;
        },
        setComponentTitle(state, data) {
            state.componentTitle = data;
        },
        setPageEditable(state, data) {
            state.pageEditable = data;
        },
        changeWhichEdit(state, params) {
            state.whichEdit = params;
        },
        changeMaterialList(state, params) {
            state.materialLists = params
        },
        changeSealUpInfo(state, params) {
            state.sealUpInfo = params;
        },
        changeAddNavData(state, params) {
            state.addNavData = params;
        },
        changeTotalDetailDate(state, params) {

        },
        changeTotalSubmitData(state, params) {
            state.totalSubmitData.registerType = state.registerType;
            switch (params.type) {
                case 'estateInfo':
                    state.totalSubmitData.estateInfo = params;
                    break;
                case 'sealApplicant':
                    state.totalSubmitData.sealApplicant = params;
                    break;
                case 'sealInfo':
                    state.totalSubmitData.sealInfo = params;
                    break;
                case 'materialList':
                    state.totalSubmitData.materialList = params
                    break;
                case 'externalSealingInfo':
                    state.totalSubmitData.externalSealingInfo = params;
                    break;
                default: ''
            }
        },
        changeHistorySealUpDataShow(state, params) {
            state.historySealUpDataShow = params
        },
        changeClosureNum(state, params) {
            state.closureNum = params
        },
        getSearchSealUp(state, params) {
            const { navDataArr, mainDataArr, showReminder, addNavDataArr, estateSealDTO, estateImmovableSealDTOList } = params
            state.navData = navDataArr
            state.mainData = mainDataArr
            state.showReminders = showReminder
            state.addNavData = addNavDataArr
            state.estateSealDTOObj = estateSealDTO
            state.estateImmovableSealDTOListArr = estateImmovableSealDTOList
            state.immovableDatas = params
        },
        changeSearchDatas(state, params) {
            state.searchDatas = params
        },
        //新增获取类型入参
        changeTypes(state, params) {
            state.changeTypeData = params
        },
        changeSealUpType(state, params) {
            state.sealUpType = params.opt
            state.registerType = params.keys
        },
        // 重置申请人数组
        resetAddApplyLists(state, params) {
            // 置空申请人数组
            state.addApplyLists = []
        },
        delAddApplyLists(state, params) {
            state.addApplyLists.splice(params, 1)
        },
        changeAddApplyLists(state, params) {
            state.addApplyLists.push(...params)
        },
        changeAddApplyListsArr(state, params) {
            state.addApplyLists = params
        },
        changeSealUpTypes(state, params) {
            state.sealUpTypes = params
        },
        changehistorySealUpData(state, params) {
            state.historySealUpData = params
        },
        saveAddApplyLists(state, params) {
            state.applyLists = params;
        },
        saveDetailHistoryData(state, params) {
            state.historyDetailData = params;
        },
        // 保存不动产信息
        saveEstateInfo(state, params) {
            state.estateInfo = params;
        }
    },
    actions: {
        // 详情编辑导航页


        // 详情编辑导航页
        //查询
        async doSearchSealUp({ commit, state }, params) {
            const { success, data, msg } = await searchSealUp(params)
            if (success) {
                const { houseStatus, estateSealDTO: { certificateType, warrantNumber, droiterName, },
                    estateSealDTO,
                    estateImmovableSealDTOList, showRemincertificateTypeder } = data
                let addNavDataArr = [['证书类型', certificateType == 1 ? '不动产权证号' : '旧不动产权证号'], ['产权证号', warrantNumber], ['权利人名称', droiterName], ['房屋状态', houseStatus]]
                let navDataArr = []
                const navDataTitle = ['证书类型', '产权证号', '权利人姓名/名称', '房屋状态']
                const navDataVal = [certificateType == 1 ? '不动产权证号' : '旧不动产权证号', warrantNumber, droiterName, houseStatus]
                for (let i = 0; i < navDataTitle.length; i++) {
                    navDataArr.push([navDataTitle[i], navDataVal[i]])
                }
                let mainDataArr = []
                estateImmovableSealDTOList.map((ele, index) => {
                    mainDataArr.push({
                        mainContents: [['查封机关', ele.sealAgency], ['协助执行书', ele.needShowInfo ? ele.civilBook : '--'], ['民事执行书', ele.needShowInfo ? ele.assistBook : '--']],
                        listWrapText: {
                            listTitle: ele.sealType,
                            type: '查封类型',
                            info: `查封信息${index + 1}`,
                            needShowInfo: ele.needShowInfo,
                            detail: "查看详情"
                        }
                    })
                })

                const datas = {
                    navDataArr,
                    mainDataArr,
                    showReminder: state.showReminder,
                    addNavDataArr,
                    estateSealDTO,
                    estateImmovableSealDTOList
                }
                commit('getSearchSealUp', datas)
                commit('changeTotalSubmitData', { type: 'estateInfo', isDown: true })
                // 保存原始不动产信息
                commit('saveEstateInfo', estateSealDTO);
                router.push('/sealUp/sealUpDetail')


                // 保存不动产信息
                commit('changeEstateInfo', addNavDataArr);
            } else {
                Toast(msg)
            }
        },
        //归档提醒
        async doReminder({ commit }, params) {
            const reminderData = await reminderSubmit(params)
            return reminderData
        },
        async doTypes({ commit, state }, params) {
            // 获取查封操作类型  addTypeSealUp
            const types = await addTypeSealUp(params)
            let arr = []
            for (let ele of types.data) {
                arr.push(ele.name)
            }
            commit('changeTypes', arr)
            commit('changeSealUpTypes', types.data)
            return state.changeTypeData
        },
        //新增提交
        async addFormSubmit({ commit, state }, params) {
            const types = await addFormSubmits(params)
        },
        //续封
        async closure({ commit, state }, params) {
            const result = await closures(params)
            const { data } = result

            const historyText = await historySealOrder(data)
            // 保存历史查封消息

            const { data: datas } = historyText
            commit('saveDetailHistoryData', datas);
            commit('changehistorySealUpData', datas)
            const {
                sealAgency, applyTime, sealType, startTime, civilBook, sealRange, endTime, assistBook, remark,

            } = datas
            const listsArr = [['查封机关', sealAgency],
            ['申请时间', applyTime],
            ['查封类型', sealType],
            ['查封起始时间', startTime],
            ['协助执行书', civilBook],
            ['查封范围', sealRange],
            ['查封结束时间', endTime],
            ['民事执行书', assistBook],
            ['附记', remark]
            ]
            commit('changeHistorySealUpDataShow', listsArr);
            // router.push({ name: 'sealUpAdd', params: { keys: state.closureNum } })
            // 续封和注销跳转编辑页面
            router.replace({ name: 'sealUpLink', params: { params } });
        },
        //订单详情
        async orderDetails({ commit, state }, params) {
            state.orderId = params;
            const result = await orderDetail(params)

            const {
                estateInfo: { certificateType, warrantNumber, droiterName, propertyStatus },
                sealApplicant: { applicantList },
                sealInfo: {
                    closeDownOrg,
                    applyTime,
                    closeDownType,
                    startTime,
                    endTime,
                    executionBook,
                    civilAmibitration,
                    closeDownRange,
                    remark
                },
                sealInfo,
                materialList,
                externalSealingInfo,
                estateInfo
            } = result.data
            state.sealInfo = sealInfo;
            console.log('sealInfo-----------', sealInfo)
            let addNavDataArr = [['证书类型', certificateType == 1 ? '不动产权证号' : '旧不动产权证号'], ['产权证号', warrantNumber], ['权利人名称', droiterName], ['房屋状态', propertyStatus]]
            let arr = []
            for (let i of applicantList) {
                arr.push({ applyListsAdd: [[i.name, i.mobile], ['工作证件号', i.cardNo]] })
            }
            const sealData = [
                ['查封机关', closeDownOrg],
                ['申请时间', applyTime],
                ['查封类型', closeDownType],
                ['查封起止时间', `${startTime}-${endTime}`],
                ['协助执行书', executionBook],
                ['民事执行书', civilAmibitration],
                ['查封范围', closeDownRange],
                ['附记', remark],
            ]
            commit('changeSealUpBaseInfo', result.data);
            commit('changeSealUpInfo', sealData);
            commit('changeAddNavData', addNavDataArr);
            commit('changeAddApplyListsArr', arr);
            commit('changeMaterialList', materialList)
            // commit('saveAddApplyLists', addApplyLists);
            // 保存历史查封消息
            commit('saveDetailHistoryData', externalSealingInfo);
            // 保存不动产信息详情
            commit('changeEstateInfo', addNavDataArr);
            // 保存原始不动产信息
            commit('saveEstateInfo', estateInfo);
            return result
        },
        // 附件材料
        async getMaterialTypeList({ commit, state }, params) {
            const res = await getMaterialList(state.registerType)
            commit('setMaterialTypeList', res.data);
            return res;
        },
        // 暂存工单
        async saveOrder({ commit, state }, params) {
            const res = await saveSealOrder(params);
            const {success, data} = res;
            if (success) {
                Toast('暂存成功');
                console.log('暂存返回数据', data);
                state.orderId = data;
            }else {
                Toast('暂存失败');
            }
        }
    }
}

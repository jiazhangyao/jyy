import { transferPretaxInfo, transferPreTaxConfirm, transferPreTaxConfirms } from "../../service/mortgage";
import { Toast } from "vant";
import router from "../../router";
import { propertySource } from "../../utils/utils";

export default {
	namespaced: true,
	state: {
		name: 'transfer-detail',
		title: '抵押登记缴纳税费信息',
		basicInfo: [
			{ name: '工单编号', value: '--' },
			{ name: '申请时间', value: '--' },
			{ name: '登记类别', value: '--' },
		],
		cqInfo: [
			{ name: '不动产权证号', value: '--' },
			{ name: '土地用途/规划用途', value: '--' },
			{ name: '宗地面积/建筑面积', value: '--' },
			{ name: '房屋坐落', value: '--' }
		],
		jyInfo: [
			{ name: '购房价格', value: '--' },
			{ name: '缴纳税费主体', value: '--' },
			{ name: '申请原因', value: '--' }
		],
		fgzInfo: [
			{ name: '房屋评估价格', value: '--' },
		],
		buyerTcInfo: [],
		sellerTcInfo: [],
		noTaxInfo: [
			{ name: '登记费', value: '--' },
			{ name: '工本费', value: '--' },
			{ name: '土地出让金', value: '--' },
			{ name: '维修基金', value: '--' },
			{ name: '非税总计', value: '--', cls: 'black' },
		],
		sellerTax: [],
		buyerTax: [],
		paytaxStatus: 0,
		registerType: 5030,
		pretaxStatus: 0,
		taxesPayerText: 0
	},
	mutations: {
		houseRelateChange(state, params) {
			const { orderNo, createTime, warrantNumber, planUse, space, address, housePrice, taxesPayer, propertyRightSource } = params;
			let basicInfoData = [orderNo, createTime];
			let taxesPayerText = taxesPayer === 1 ? '转让人' : (taxesPayer === 2 ? '受让人' : "申请人");
			let propertyRightSourceText = "";
			for (let i in propertySource) {
				if (propertySource[i].key == propertyRightSource) {
					propertyRightSourceText =  propertySource[i].name
				}
			}
			state.basicInfo.map((item, index) => {
				item.value = basicInfoData[index] || '--';
			})
			let cqInfoData = [warrantNumber, planUse, space + ' 平方米', address];
			state.cqInfo.map((item, index) => {
				item.value = cqInfoData[index] || '--';
			})
			let jyInfoData = [housePrice + ' 元', taxesPayerText, propertyRightSourceText];
			state.jyInfo.map((item, index) => {
				item.value = jyInfoData[index] || '--';
			})
			state.taxesPayerText = taxesPayer
		},
		noTaxInfoChange(state, params) {
			state.noTaxInfo.map((item, index) => {
				item.value = params[index] || '--';
			})
		},
		estimatePriceChange(state, params) {
			state.fgzInfo[0].value = params || '--';
		},
		sellerChange(state, params) {
			state.sellerTcInfo = params;
		},
		buyerChange(state, params) {
			state.buyerTcInfo = params;
		},
		sellerTaxChange(state, params) {
			state.sellerTax = params;
		},
		buyerTaxChange(state, params) {
			state.buyerTax = params;
		},
		paytaxStatusChange(state, params) {
			state.paytaxStatus = params;
		},
		registerTypeChange(state, params) {
			state.registerType = params;
		},
		pretaxStatusChange(state, params) {
			state.pretaxStatus = params;
		},
	},
	actions: {
		async getPretaxInfo({ commit, rootState }, id) {
			const { buyerOrSeller, paytaxStatus, registerType, pretaxStatus } = rootState.transfer;
			const { success, data, msg, fieldErrors } = await transferPretaxInfo(id);
			if (success) {
				const { houseRelateDTO, registerFee, productionFee, landTransferFee, nonTaxTotal,
					estimatePrice, obligeeSets, obligorSets, obligeePreTax, obligorPreTax, maintainCapital } = data;
				let sellers = [], buyers = [], sellerTax = [], buyerTax = [];
				let labels = ['个税', '增值税', '城市维护建设税', '印花税', '土地增值税', '教育税附加', '地方教育附加', '契税'];
				const noTaxInfoData = [
					registerFee,
					productionFee,
					landTransferFee,
					maintainCapital,
					nonTaxTotal
				];
				if (obligeeSets) {
					buyers.unshift({ name: '权利人所在家庭总套次', value: obligeeSets.length })
					if (buyerOrSeller === 2) {
						obligeeSets.map((item, index) => {
							if (item.editFlag === 2) {
								buyers.push({ name: "权利人" + (index + 1) + "姓名", value: item.name, cls: 'red' }, { name: "套次", value: item.value, cls: 'red' })
							} else {
								buyers.push({ name: "权利人" + (index + 1) + "姓名", value: item.name }, { name: "套次", value: item.value })
							}

						})
					}
				}
				if (obligorSets) {
					sellers.unshift({ name: '义务人所在家庭总套次', value: obligorSets.length })
					if (buyerOrSeller === 1) {
						obligorSets.map((item, index) => {
							if (item.editFlag === 2) {
								sellers.push({ name: "义务人" + (index + 1) + "姓名", value: item.name, cls: 'red' }, { name: "套次", value: item.value, cls: 'red' })
							} else {
								sellers.push({ name: "义务人" + (index + 1) + "姓名", value: item.name }, { name: "套次", value: item.value })
							}
						})
					}
				}
				let sellerData = Object.values(obligorPreTax);
				let buyerData = Object.values(obligeePreTax);
				// buyerData.map((item, i) => {
				//     labels.push('预核税总计');
				//     buyerTax.push({ name: labels[i], value: item || '--' })
				// })
				// sellerData.map((item, i) => {
				//     sellerTax.push({ name: labels[i], value: item || '--' })
				// })
				labels.map((item, i) => {
					sellerTax.push({ name: item, value: sellerData[i] || '--' })
					buyerTax.push({ name: item, value: buyerData[i] || '--' })
				})
				sellerTax.push({ name: '总计', value: obligorPreTax.total || '--', cls: 'black' })
				buyerTax.push({ name: '总计', value: obligeePreTax.total || '--', cls: 'black' }, { name: '预核税总计', value: (obligorPreTax.total + obligeePreTax.total) || '--', cls: 'red' })

				commit('houseRelateChange', houseRelateDTO);
				commit('noTaxInfoChange', noTaxInfoData)
				commit('estimatePriceChange', estimatePrice); //房屋评估价格
				commit('sellerChange', sellers); //义务人（卖方）信息
				commit('buyerChange', buyers); //权利人（买方）信息
				commit('sellerTaxChange', sellerTax);
				commit('buyerTaxChange', buyerTax);
				commit('paytaxStatusChange', paytaxStatus);
				commit('registerTypeChange', registerType);
				commit('pretaxStatusChange', pretaxStatus);
			} else {
				Toast(msg || fieldErrors[0].msg);
			}
		},
		async subPreTaxConfirm({ commit, rootGetters }, params) {
			const obj = {
				...params,
				...rootGetters.transferParams
			}
			const { success, msg, fieldErrors } = await transferPreTaxConfirm(obj);
			if (success) {
				router.push(`/transfer/list?orderId=${rootGetters.transferParams.orderId}`);
			} else {
				Toast(msg || fieldErrors[0].msg);
			}
		},

		async subPreTaxConfirms({ commit, rootGetters }, params) {
			const obj = {
				...params,
				orderId:window.orderId ,
				"ext": "",
				"key": "",
				"signData": "",
				"signKey": ""
			}

			const { success, msg, fieldErrors } = await transferPreTaxConfirms(obj);
			if (success) {
				router.push(`/mortgage/list?orderId=${rootGetters.transferParams.orderId}`);
			} else {
				Toast(msg || fieldErrors[0].msg);
			}
		}

	}
}
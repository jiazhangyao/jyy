import { transferConfirmInfo, upload, applicationSign, contractSign } from "../../service/transfer";
import { Toast, Dialog } from "vant";

import router from "../../router";

export default {
	namespaced: true,
	state: {
		sessionParams: {},
		userFaceInfo: {},
		confirmData: {},
		arrs: [
			{
				name: "预核税信息",
				url: "/transfer/pretax",
				state: '1',
				adjust: true
			},

		],
		arrlis: [
			{
				name: "不动产所有权登记申请信息",
				url: "/transfer/apply",
				type: "apply",
				state: 1,
				registerType: 5010,
				datas: [
					{ name: '克里斯', icon: 1, },
					{ name: '亨利', icon: 0, },
					{ name: '马修', icon: 1, }
				]
			},
			{
				name: "鹤岗市不动产买卖合同信息",
				url: "/transfer/contract",
				type: "contract",
				state: 1,
				registerType: 5010,
				datas: [
					{ name: '克里斯', icon: 1, },
					{ name: '亨利', icon: 0, },
					{ name: '马修', icon: 1, }
				]
			}
		],
		show: false,
		orderStatus: 25,
		isTaxesPayer: 0,
		pretaxStatus: 1,
		applicationSignStatus: 1,
		contractSignStatus: 0,
		// 1卖方 2买方
		buyerOrSeller: 1,
		signType: 1,
		exApplicationSignStatus: 1,
		exContractSignStatus: 1,
		paytaxStatus: 1,
		taxesPayerSignInfo: {},
		registerType: 5030,
	},
	mutations: {
		changeSessionParams(state, params) {
			state.sessionParams = params
		},
		getUserInfo(state, params) {
			state.userFaceInfo = params
		},
		confirmInfoChange(state, params) {
			const { status, isTaxesPayer, pretaxStatus, applicationSignStatus, contractSignStatus, buyerOrSeller, type, applicationSignInfo,
				exApplicationSignStatus, exContractSignStatus, paytaxStatus, taxesPayerSignInfo, registerType } = params
			state.show = true
			state.orderStatus = status
			state.signType = type
			state.isTaxesPayer = isTaxesPayer
			state.pretaxStatus = pretaxStatus
			state.applicationSignStatus = applicationSignStatus
			state.contractSignStatus = contractSignStatus
			state.buyerOrSeller = buyerOrSeller
			state.exApplicationSignStatus = exApplicationSignStatus
			state.exContractSignStatus = exContractSignStatus
			state.paytaxStatus = paytaxStatus
			state.taxesPayerSignInfo = taxesPayerSignInfo
			state.registerType = registerType
			state.arrs[0].state = pretaxStatus
			state.arrlis[0].state = applicationSignStatus
			state.arrlis[0].registerType = registerType
			state.arrlis[0].datas = applicationSignInfo
			if (registerType == 5030) {
				state.arrlis[1].state = contractSignStatus
				state.arrlis[1].datas = applicationSignInfo
				state.arrlis[1].registerType = registerType
			} else {
				state.arrlis.splice(1)
			}
			state.registerType = registerType; 
			if (status === 25) {
				Dialog.alert({
				  title: "提示",
				  message: "本次交易已结束，如需了解详情请登录鹤岗市不动产集成服务平台，www.jcfwpt.hgbdc.org.cn/h5",
				  confirmButtonText: "我知道了"
				});
			  }
		}
	},
	actions: {
		async confirmInfo({ commit, rootGetters
		}, params) {
			const { success, data, msg, fieldErrors, errorCode } = await transferConfirmInfo(rootGetters.transferParams)
			if (success) {
				const { status, isTaxesPayer, pretaxStatus, applicationSignStatus, contractSignStatus, buyerOrSeller, type, applicationSignInfo,
					exApplicationSignStatus, exContractSignStatus, paytaxStatus, taxesPayerSignInfo, registerType } = data
				const objs = {
					status,
					isTaxesPayer,
					pretaxStatus,
					applicationSignStatus,
					contractSignStatus,
					buyerOrSeller,
					type,
					applicationSignInfo,
					exApplicationSignStatus,
					exContractSignStatus,
					paytaxStatus,
					taxesPayerSignInfo,
					registerType
				}
				commit('confirmInfoChange', objs);
				return success;
			} else {
				if (errorCode === '401') {
					router.push('/home')
				}
				Toast(msg || fieldErrors[0].msg)
			}
			return false;
		},

		async uploads({rootGetters, rootState, state}, params) {

			const adjustStr = router.history.current.params

			const { success, data: { key, ext } } = await upload(params)
			let results = document.getElementById('result').value 
			if (results === '') {
				Dialog.alert({
					title: '签名失败',
					message: '请重新签署'
				}).then(() => {
					router.push(`/transfer/list?orderId=${rootGetters.transferParams.orderId}`)
				});
				return
			}
			if (success) {
				const contractInfo = {
					confirmStatus: 1,
					orderId: rootGetters.transferParams.orderId,
					signData: results,
					signKey: signKey,
					key: key,
					ext: ext
				}
				if (adjustStr.names == '1') {
					const { success, data } = await applicationSign(contractInfo)
					if (success) {
						Dialog.alert({
							title: '办理成功',
							message: '您本次业务已成功办理'
						}).then(() => {
							router.push(`/transfer/list?orderId=${rootGetters.transferParams.orderId}`)
						});
					} else {
						Dialog.alert({
							title: '办理失败',
							message: '请重试'
						}).then(() => {
							router.push(`/transfer/list?orderId=${rootGetters.transferParams.orderId}`)
						});
					}
				} else {
					const { success, data } = await contractSign(contractInfo)
					if (success) {
						Dialog.alert({
							title: '办理成功',
							message: '您本次业务已成功办理!'
						}).then(() => {
							router.push(`/transfer/list?orderId=${rootGetters.transferParams.orderId}`)
						});
					} else {
						Dialog.alert({
							title: '办理失败',
							message: '请重试!'
						}).then(() => {
							router.push(`/transfer/list?orderId=${rootGetters.transferParams.orderId}`)
						});
					}
				}
			}
		}
	}
}

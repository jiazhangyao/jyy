import { getHouseTransferType, validHouse } from "../../service/transfer";
import { Toast } from "vant";
import router from "../../router";

export default {
	// namespaced: true,
	state: {
		houseState: {},
	},
	mutations: {
		setHouseState(houseState = {}) {
			this.houseState = houseState;
		}
	},
	actions: {
		async getHouseTransferType({ commit }, params) {
			const { success, data, msg, fieldErrors } = await getHouseTransferType(params)
			if (success) {
				console.log('返回信息', data);
			}
		},
		async search({ commit }, values) {
			const res = await validHouse(values)
			if (res.success) {
				Toast("数据查询成功");
				commit('transferbusiapply/setPropertyInfo', {...res.data,warrantType:values.warrantType, ...values});
				router.push(`/transfer/busiapply/edit`);
			} else {
				Toast.fail(res.msg);
				return false;
			}
		},
	},

}

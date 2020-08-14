import { getHouseTransferType, validHouse } from "../../service/transfer";
import { Toast } from "vant";
import router from "../../router";

export default {
	state: {
		houseState: {},
	},
	mutations: {

	},
	actions: {
		async getHouseTransferType({ commit }, params) {
			const { success, data } = await getHouseTransferType(params)
			if (success) {
				console.log('返回信息', data);
			}
		},
		async mortgageSearch({ commit }, values) {
            
			const res = await validHouse(values)
			if (res.success) {
				Toast("数据查询成功");
				commit('mortgageBusiapply/setPropertyInfo', {...res.data,warrantType:values.warrantType, ...values});
				router.push(`/mortgage/busiapply/edit`);
			} else {
				Toast.fail(res.msg);
				return false;
			}
		},
	},
}

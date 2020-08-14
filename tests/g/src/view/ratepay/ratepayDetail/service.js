/**
 * Created by EX-GEQIANG001 on 2019/1/17.
 */
import { request } from "utils/request";

export async function submit(data) {
    return request(`/order/tax/detail/${data.id}`, {
        method: "GET",
        data: {
            from: 2
        }
    });
}

// 获取订单审批流程节点信息
export async function queryOrderProcess(id) {
    return request(`/order/query/orderProcessSchema/${id}`, { method: 'GET' });
}
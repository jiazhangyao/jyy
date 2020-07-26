/**
 * Created by EX-GEQIANG001 on 2019/1/17.
 */
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { submit, queryOrderProcess } from "./service";
import { DetailStore } from "super/store";
export const moduleName = "ratepayDetail";

class Store extends DetailStore {
    crumbList = [
        {
            name: "纳税管理",
            // url: "/ratepay/view/list"
        },
        {
            name: "税费工单",
            url: "/ratepay/view/list"
        },
        {
            name: "工单详情"
        }
    ];

    @observable
    orderProcess=[];
    @action
    getData = async () => {
        const values = { ...this.entity };
        const res = await submit(values);
        if (res.success) {
            this.data = res.data;
        }
        const orderProcessRes = await queryOrderProcess(values.id);
        if (orderProcessRes.success) {
            // 转移只节选三个阶段，转移流程节点-非税预审-预核税计算-确认预核税
            this.orderProcess = orderProcessRes.data.filter((item) => ['transfer_order_non_tax_audit', 'transfer_count_pre_tax', 'transfer_order_confirm_tax'].includes(item.taskKey));
        }
    };
}

storeMgr.register(moduleName, new Store());
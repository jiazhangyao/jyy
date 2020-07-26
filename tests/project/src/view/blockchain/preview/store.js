
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { submit } from "./service";
import { ListStore } from "super/store";
export const moduleName = "blockViewModel";

class Store extends ListStore {
    crumbList = [
        {
            name: "区块链看板",
            // url: "/blockchain/preview/list"
        },
        {
            name: "链上信息总览"
        }
    ];

    getDefaultParams = (val) => {
        const date = new Date();
        const current_date = date.getDate();
        const current_month = date.getMonth() + 1;
        const current_year = date.getFullYear();
        const current = current_year + "-" + ( current_month < 10 ? ( '0' + current_month ) : current_month )  + "-" + ( current_date < 10 ? ( '0' + current_date ) : current_date);

        const preDate = new Date() ;
        preDate.setDate(preDate.getDate()-30);
        const preYear = preDate.getFullYear();
        const preMonth = preDate.getMonth()+1;
        const preDay = preDate.getDate() ;
        const pre = preYear + '-' + ( preMonth < 10 ? ( '0' + preMonth ) : preMonth ) + '-' + ( preDay < 10 ? ( '0' + preDay ) : preDay) ;
        const queryParam = {
            "startDate": pre,
            "endDate": current,
            "tradeType": "all",
            "queryNum": 20,
            "ledger":  val ? val: "gtj",
            "nodeCpuQueryType": "hour"//节点统计类型
        };
        return queryParam;
    };

    changeSelect = val =>{
        this.getData(val);
    };

    @action
    getData = async (val) => {
        const values = {  ...this.entity,...this.getDefaultParams(val) };
        const res = await submit(values);
        if (res.success) {
            this.data = res.data;
        }
    };
}

storeMgr.register(moduleName, new Store());

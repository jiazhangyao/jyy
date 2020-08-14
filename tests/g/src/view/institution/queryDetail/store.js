/**
 * Created by EX-GEQIANG001 on 2019/1/17.
 */
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { submit } from "./service";
import { DetailStore } from "super/store";
export const moduleName = "queryDetail";

class Store extends DetailStore {
    crumbList = [
        {
            name: "认证机构管理",
            // url: "/institution/query/list"
        },
        {
            name: "认证机构查询",
            url: "/institution/query/list"
        },
        {
            name: "详情"
        }
    ];

    @action
    getData = async () => {
        const values = { ...this.entity };
        const res = await submit(values);
        if (res.success) {
            this.data = res.data;
        }
    };
}

storeMgr.register(moduleName, new Store());
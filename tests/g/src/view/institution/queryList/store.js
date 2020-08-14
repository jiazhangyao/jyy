/**
 * Created by EX-GEQIANG001 on 2019/1/17.
 */
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { submit } from "./service";
import { ListStore } from "super/store";
export const moduleName = "queryList";

class Store extends ListStore {
    autoSearchFields = ["type"];
    crumbList = [
        {
            name: "认证机构管理",
            // url: "/institution/query/list"
        },
        {
            name: "认证机构查询"
        }
    ];

    getDefaultParams = () => {
        const result = {
            auditStatus: 2
        };
        return result;
    };

    @action
    getData = async () => {
        const values = { ...this.entity,...this.getDefaultParams() };
        const res = await submit(values);
        if (res.success) {
            this.data = res.data;
        }
    };
}

storeMgr.register(moduleName, new Store());
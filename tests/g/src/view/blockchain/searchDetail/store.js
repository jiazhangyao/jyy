
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { detail } from "./service";
import { DetailStore } from "super/store";
export const moduleName = "BlockSearchDetail";

class Store extends DetailStore {
  crumbList = [{
    name: "区块链看板",
    // url: "/blockchain/infosearch/list"
  },
  {
    name: "链上信息查询",
    url: "/blockchain/infosearch/list"
  },
  {
    name: "详情",
  }];

  @observable
  data = {}

  @action
  getData = async () => {
    const values = { ...this.entity, ...this.getTabParams() };
    const res = await detail(values);
    if (res.success) {
      const dataFilter = res.data.filter(item => {
        return item.tradeId == values.tradeId
      });
      const detailData = JSON.parse(dataFilter[0].value);
      this.data = detailData;
    }
  };
}

storeMgr.register(moduleName, new Store());

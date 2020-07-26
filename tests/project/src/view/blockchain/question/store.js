
import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { DetailStore } from "super/store";
export const moduleName = "blockchainQa";

class Store extends DetailStore {
  crumbList = [
    {
      name: "区块链看板",
      // url: "/blockchain/qa/list"
    },
    {
      name: "Q&A"
    }
  ];


  @action
  getData = async () => {

  };
}

storeMgr.register(moduleName, new Store());

import { observable } from "mobx";
import storeMgr from "utils/storeManager";
import { BaseStore } from "super/store";
export const moduleName = "home";

class Store extends BaseStore {
  @observable
  entity = {};
}

storeMgr.register(moduleName, new Store());

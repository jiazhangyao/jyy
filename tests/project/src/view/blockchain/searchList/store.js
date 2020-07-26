import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { getList } from "./service";
import { ListStore } from "super/store";
import { message } from "antd";
export const moduleName = "BlockSearchList";

class Store extends ListStore {
  crumbList = [
    {
      name: "区块链看板",
      // url: "/blockchain/infosearch/list"
    },
    {
      name: "链上信息查询"
    }
  ];

  @observable
  updateFieldStatus = {
    showInputField: false,
    btnDisabled: true
  };

  // @action
  // init = async values => {
  //   this.setDefaultEntity(values);
  // };

  @action
  updateShowField = values => {
    let params = {};
    if (values.ledgerType) {
      switch (values.ledgerType) {
        case "bdcdyh":
          params = { showInputLabel: "不动产单元号" };
          break;
        case "fwcqh":
          params = { showInputLabel: "不动产权证号" };
          break;
        case "ywjyh":
          params = { showInputLabel: "工单编号" };
          break;
        default:
          params = { showInputLabel: "区块链交易ID" };
      }
    }
    this.updateFieldStatus = {
      ...this.updateFieldStatus,
      ...values,
      ...params
    };
  };

  @action
  getData = async () => {
    if (!this.entity.ledgerType) {
      this.entity.ledgerType = "gtj";
    }
    const values = { ...this.entity, ...this.getTabParams() };
    const res = await getList(values);
    if (res.success) {
      let { pageNo, pageSize } = values;
      let list = res.data.map((item, index) => ({
        ...item,
        antOrderNumber: (pageNo - 1) * pageSize + index + 1
      }));
      this.data = list;
    }
  };
}

storeMgr.register(moduleName, new Store());


import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { submit} from "./service";
import { ListStore } from "super/store";
export const moduleName = "reserveOrderList";

class Store extends ListStore {
  autoSearchFields = ["dateInfo", "registerType", "timePeriod","flag"];
  crumbList = [
    {
      name: "预约管理",
      // url: "/reserve/order/list"
    },
    {
      name: "预约工单"
    }
  ];

  @observable
  timePeriod=[];

  @action
  getData = async () => {
    const values = { ...this.entity};
    const res = await submit(values);
    if (res.success) {
      this.data = res.data;
    }
  };
  @action
    submit = async (values, isSerarch = true) => {
      this.isSerarch = isSerarch
      await this.updateEntityForDateInfo(values);
      await this.getData();
    };

  @action
  updateEntityForDateInfo = values => {
    // 处理始末时间
    const {dateInfo} = values;
    if (dateInfo) {
      values.reserveStartDate = dateInfo.beginTime;
      values.reserveEndDate = dateInfo.endTime;
    }
    this.entity = {
      ...this.entity,
      ...values
    };
  };
}

storeMgr.register(moduleName, new Store());

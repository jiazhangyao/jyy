import { action, observable, toJS} from "mobx";
import { message } from "antd";
import storeMgr from "utils/storeManager";
import { queryOrderList, queryLicenseInfo,queryLicenseUsers, queryLicensePic, queryStatus } from "./service";
import { ListStore } from "super/store";

export const moduleName = "auditList";

class Store extends ListStore {
  autoSearchFields = ["dateInfo", "registerPrimaryType", "status"];
  crumbList = [{ name: "工单管理" }, { name: "工单审核" }];
  @observable orderStatusDict = [];
  @observable tabList = [{ name: "待处理", key: "todo" }, { name: "已处理", key: "done" }];
  @observable registerPrimaryType =-1;
  @action setDefaultInfo = () => {
    this.activedTabKey = this.activedTabKey || "todo"; // tab默认为“待处理”
  };
 
  @action changeRegisterPrimaryType = async (value) => {
    let res = {}
    if(value === -1) {
      this.orderStatusDict = [];
    } else {
      res = await queryStatus({
        "flag": this.activedTabKey === 'todo' ? 0 : 1,//是否处理 0：待处理 1：已处理 ,
        "registerPrimaryType": value
      });
      if (res.success) {
        this.orderStatusDict = toJS(res.data);
      } else {
        this.orderStatusDict = []
      }
    }
  };

  getTabParams = () => {
    const result = { isHandle: "0" };
    if (this.activedTabKey === "done") {
      result.isHandle = "1";
    }
    return result;
  };

  @action getData = async () => {
    const values = { ...this.entity, ...this.getTabParams() };
    const { success, data } = await queryOrderList(values);
    if (success) {
      this.data = data;
    }
  };


  @action queryLicenseInfo = async (item, modalInst, userInst) => {
    /** 获取电子证照图片 */
    const { success, data, globalError }  = await queryLicensePic({ certificateNumber: item.certificateNumber, orderId: item.id });
    if (success) {
      modalInst.open(data);
    } else {
      message.error(globalError);
      userInst && userInst.open(item);
    }
  }

  @action queryLicenseUser = async (item, modalInst, userInst) => {
    // 检查是否有权利人
    const { success: usersuccess, data: userdata, globalError: userglobalError } = await queryLicenseUsers({ orderId: item.id });
    
    if (usersuccess) {
      // 权利人人数只有一个，直接展示证照弹窗
      if (userdata.length === 0) {
        message.error('暂无可选证照');
      } else if (userdata.length === 1) {
        this.queryLicenseInfo({
          ...item,
          ...userdata[0],
        }, modalInst)
      } else {
        // 权利人人数多个，弹窗选择查询的权利人
        userInst.open({...item, userdata, modalInst, queryLicenseInfo: this.queryLicenseInfo});
      }
    } else {
      message.error(userglobalError)
    }
  }
}

storeMgr.register(moduleName, new Store());

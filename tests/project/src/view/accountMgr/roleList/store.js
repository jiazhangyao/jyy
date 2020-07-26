import { action } from "mobx";
import storeMgr from "utils/storeManager";
import { queryList, deleteRole } from "./service";
import { ListStore } from "super/store";
import { message } from "components";

export const moduleName = "roleList";

class Store extends ListStore {
  crumbList = [
    {
      name: "账户管理",
      // url: "/account/role/list"
    },
    {
      name: "角色权限设置"
    }
  ];

  @action
  getData = async () => {
    const values = { ...this.entity };
    const res = await queryList(values);
    if (res.success) {
      this.data = res.data;
    }
  }

  @action
  deleteRole = async (id) => {
    const res = await deleteRole(id);
    if (res.success) {
      message.success("删除成功");
      this.getData()
    } else {
      message.error(res.globalError);
    }
  };
}

storeMgr.register(moduleName, new Store());

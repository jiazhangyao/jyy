import { action } from "mobx";
import storeMgr from "utils/storeManager";
import { submit, chainStatus, queryOrderProcess, queryMaterialList } from "./service";
import { message } from 'antd';

import { DetailStore } from "super/store";
export const moduleName = "reserveOrderDetail";

class Store extends DetailStore {
  crumbList = [
    {
      name: "预约管理",
      // url: "/reserve/order/list"
    },
    {
      name: "预约工单",
      url: "/reserve/order/list"
    },
    {
      name: "工单详情"
    }
  ];
  @action
  getData = async () => {
    const values = { ...this.entity };
    await this.getProcess(values.id);
    if (values.id) {
      await this.getChainStatus(values);
      const res = await submit(values);
      if (res.success) {
        await this.getMaterialList(res.data.registerType);
        //await this.getProcess(res.data.id);

        this.data = res.data;
      } else {
        message.error(`获取信息失败：${res.globalError}`);
      }
    }

  };
  //获取上链状态
  @action
  getChainStatus = async (values) => {
    const chainStatusInfo = await chainStatus(values);
    if (chainStatusInfo.success) {
      this.chainStatusInfo = chainStatusInfo.data
    }
    else {
      message.error(`获取信息失败：${chainStatusInfo.msg}`);
    }
  };
  // 获取材料信息
  @action
  getMaterialList = async (id) => {
    const res = await queryMaterialList(id);
    if (res.success) {
      this.MaterialJson = res.data
    }
  };
  // 获取审批流程图
  @action
  getProcess = async (id) => {
    const res = await queryOrderProcess(id);
    if (res.success) {
      this.orderProcess = res.data
    } else {
      message.error(`获取流程图失败：${res.msg}`);
    }
  };
}

storeMgr.register(moduleName, new Store());

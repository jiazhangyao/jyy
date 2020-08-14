
import { action, observable, runInAction } from "mobx";
import storeMgr from "utils/storeManager";
import { create, update, getData } from "./service";
import { EditStore } from "super/store";
import { message } from "components";
import history from "utils/history";
import { EditPage } from "super/page";
const { PAGE_TYPES } = EditPage;
export const moduleName = "busGuideEdit";

class Store extends EditStore {

  @action
  setCrumbList = async () => {
    const { page } = this.entity;
    this.crumbList = [{
      name: "办事指南",
      // url: "/guide/busguide/list"
    },
    {
      name: "业务办事指南",
      url: "/guide/busguide/list"
    },
    {
      name: page === PAGE_TYPES.EDIT ? "编辑" : "新增"
    }
    ];
  }

  @action
  init = async () => {
    const { page, id } = this.entity;
    await this.setCrumbList()
    if (page === PAGE_TYPES.EDIT) {
      await this.getData({ id });
    }
  };


  @action
  getData = async data => {
    const res = await getData(data);
    if (res.success) {
      this.setData(res.data);
      return;
    }
    this.failHandler(res);
  };


  @action
  submit = async values => {
    const { page } = this.entity;
    let res;
    if (page === PAGE_TYPES.EDIT) {
      res = await update(values);
    } else {
      res = await create(values);
    }

    // test
    // res.success = false;
    // res.fieldErrors = [
    //   { fieldName: "registerTypeArr", msg: "registerTypeArr错了" }
    // ];

    if (res.success) {
      const msg = page === PAGE_TYPES.EDIT ? "编辑成功" : "添加成功";

      message.success(msg);
      history.push("/guide/busguide/list");
    }
  };

  @action
  onCancal = () => {
    history.push("/guide/busguide/list");
  }
}

storeMgr.register(moduleName, new Store());


import { action, observable } from "mobx";
import storeMgr from "utils/storeManager";
import { message } from "antd";
import { submit,deleteFile,uploadFileSave} from "./service";
import { ListStore, } from "super/store";
export const moduleName = "ApplyList";
class Store extends ListStore {
  crumbList = [
    {
      name: "办事指南",
      // url: "/guide/apply/list"
    },
    {
      name: "申请表"
    }
  ];

  @observable
  fileList=[];

  @observable
  versible=false;

  @action
  getData = async () => {
    const values = { ...this.entity, ...this.getTabParams() };
    const res = await submit(values);
    if (res.success) {
      this.fileList = res.data;
    }
  };
  @action
  deleteFile = async (id) => {
    const res = await deleteFile(id);
    if (res.success) {
      this.getData()
    }
  };
  @action
  handleVersible = async (flag) => {
   this.versible=flag;
  };
  @action
    fileSubmitData = async (fileList) => {
    let values = [];
    (fileList || []).map(item => {
      if(item.response){
        values.push(item.response.data);
      }
    });
    if(values.length>0){
      const res = await uploadFileSave(values);
      if (res.success) {
        await this.getData();
        await this.handleVersible(false);
      } else {
        this.failHandler(res)
      }
    }else{
      message.error('请选择文件上传！');
    }

  }
}

storeMgr.register(moduleName, new Store());

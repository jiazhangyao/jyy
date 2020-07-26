import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import createForm from "utils/createForm";
import { moduleName } from "./store";
import { Modal, Form } from 'antd';
import { Button,ListResultStatus } from "components";
import ExcelUploader from "./components/excelUploader"
import FileListItem from "./components/filelist";

import './index.less';
const FormItem = Form.Item;
const clsPrefix = "upload-page";
const { PrimaryButton } = Button;

@inject(store => ({
  store: store[moduleName],
  userInfo: store.frame.userInfo
}))
@createForm({ clsPrefix })

@observer
class ApplyList extends DetailPage {
  constructor() {
    super();
    this.state = { fileL: [] };

  }

  handleVersibleOk = () => {
    const { store } = this.props;
    store.handleVersible(true);
  };
  handleVersibleCancel = e => {
    const { store } = this.props;
    store.handleVersible(false);
  };
  handleOk = e => {
    const { fileL } = this.state;
    const { store, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        store.fileSubmitData(fileL);
        this.setState({
          fileL: []
        })
      }
    });
  };
  onChange = data => {
    this.setState({
      fileL: data
    });
  };
  topActionRender = () => {
    return (
      <>
        <PrimaryButton size="large" onClick={this.handleVersibleOk}>
          上传
        </PrimaryButton>
      </>
    );
  };
  doRender() {
    const { store: { fileList, versible } } = this.props;
    const { fileL } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <>
        <Modal className='upload-fileList-modal'
          title='文件上传'
          width='400px'
          visible={versible}
          onOk={this.handleOk}
          onCancel={this.handleVersibleCancel}
          okText='上传'
        >
          <Form>
            <FormItem>
              {getFieldDecorator('fileList', {
                rules: [
                  {
                    required: true,
                    message: '请选择文件上传'
                  }
                ]
              })(<ExcelUploader onChange={this.onChange} fileList={fileL} />)}
            </FormItem>
          </Form>
        </Modal>
       <div className={ !fileList.length?"sys-operation minH":"sys-operation" }>
          {
            !!fileList.length && fileList.map((item = {}, i) => {
              let temp = {
                ...item,
                onDeleteFile: this.onDeleteFile,
                onDownLoadProps: this.onDownloadFile
              };
              return <FileListItem {...temp} key={i} />;
            })}
           {
             !fileList.length &&
             <ListResultStatus list={fileList}/>
           }
        </div>
      </>
    )
  }
}

export default ApplyList;

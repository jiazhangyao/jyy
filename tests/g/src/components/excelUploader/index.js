import React, { Component } from 'react';
import { Upload, message, Icon, Radio, Button } from 'antd';
import { EXCEL_UPLOAD_URL } from 'common/const'
import pdf_icon from "../../static/img/pdf.png";
import docx_icon from "../../static/img/docx.png";
import xls_icon from "../../static/img/xls.png";
import ppt_icon from "../../static/img/ppt.png";
import unknown from "../../static/img/unknown.png";

import {inject, observer} from "mobx-react";

import _ from 'underscore';
import './index.less';
import {moduleName} from "../../view/guide/applyList/store";
const Dragger = Upload.Dragger;

@inject(store => ({
  store: store[moduleName],
}))

@observer
export default class ExcelUploader extends Component {
  constructor(props) {
    super(props);
    let state = this.setStateFromProps(props);
    this.state = { fileList: [], ...state };
  }
  getIcon = type => {
    let icon = "";
    if (/(xls|xlsx)$/.test(type)) {
      icon = <img src={xls_icon} />;
    } else if (/(doc|docx)$/.test(type)) {
      icon = <img src={docx_icon} />;
    } else if (/(pdf)$/.test(type)) {
      icon = <img src={pdf_icon} />;
    } else if (/(ppt|pptx)$/.test(type)) {
      icon = <img src={ppt_icon} />;
    } else {
      icon = <img src={unknown} />;
    }
    return icon;
  };
  componentWillReceiveProps(nextProps) {
    let state = this.setStateFromProps(nextProps);
    this.setState({ ...state });
  }
  setStateFromProps(props) {
    let { action, fileList = [] } = props;
    action = action || EXCEL_UPLOAD_URL;
    return { action, fileList };
  }
  fireChange = () => {
    let { fileList } = this.state;
    this.props.onChange && this.props.onChange(fileList);
  };
  changeHandler = info => {
    const { file } = info;
    let { fileList } = info;
    let { max } = this.props;
    max = parseInt(max, 10);
    const { status, name, response, uid } = file;
    fileList.map(record => {
      const { file, result = {} } =
        record && record.response ? record.response : {};
      const { urls } = result;
      if (result && !file && urls) {
        record.response = {
          file: result.urls[0]
        };
      }
      return record;
    });
    if (
      status === 'done' &&
      response &&
      response.result &&
      response.result.code === '0'
    ) {
      message.success(`${name}上传成功！`);
      fileList = fileList.slice(0, max);
      this.setState(
        { fileList, ifFull: fileList.length >= max },
        this.fireChange
      );
    } else if (
      (status === 'done' &&
        response &&
        response.result &&
        response.result.code !== '0') ||
      status === 'error'
    ) {
      message.error(`${response.result.desc} ${name}上传失败`);
      // 去掉失败的file
      fileList = _.filter(fileList, item => item.uid !== uid);
      this.setState({ fileList }, this.fireChange);
    } else {
      this.setState({ fileList }, this.fireChange);
    }
  };
  onRemove = uid => {
    return () => {
      this.remove(uid);
    };
  };
  buildItem = (fileInfo, index) => {
    let { name, percent, status, uid, response = {} } = fileInfo;
    let { ext } = response.data || {};
    let className = `ant-upload-list-item ant-upload-list-item-${status}`;
    let isUploading = status === 'uploading';
    let isDone = status === 'done';
    return (
      <div className={className} key={index + '_' + name}>
        <div className='ant-upload-list-item-info'>
          <span>
            {isUploading && (
              <div className='ant-upload-list-item-uploading-text'>
                文件上传中
              </div>
            )}
            {isDone && (
              <span>
                {/* <i className='anticon anticon-paper-clip' /> */}
                <span className='ant-icon-img'>{this.getIcon(ext)}</span>
                <span className='ant-upload-list-item-name' title={name}>
                  {name}
                </span>
              </span>
            )}
          </span>
        </div>
        {isUploading && (
          <div className='ant-upload-list-item-progress'>
            <div className='ant-progress ant-progress-line ant-progress-status-success'>
              <div>
                <div className='ant-progress-outer'>
                  <div className='ant-progress-inner'>
                    <div
                      className='ant-progress-bg'
                      style={{ width: percent + '%', height: 2 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {(isDone || isUploading) && (
          <i
            title='删除文件'
            className='anticon anticon-cross'
            onClick={this.onRemove(uid)}
          />
        )}
      </div>
    );
  };

  buildUploadList = files => {
    console.log(files, 'files');
    return files.map((file, index) => {
      return this.buildItem(file, index);
    });
  };

  remove = uid => {
    const fileList = this.state.fileList.reduce((list, file) => {
      if (file.uid !== uid) {
        list.push(file);
      }
      return list;
    }, []);

    this.setState({ fileList }, this.fireChange);
  };
  beforeUpload = file => {
    if (!/(xls|xlsx|doc|docx|pdf|ppt|pptx)$/.test(file.name)) {
      message.error(
        '仅支持.xls/*.xlsx/*.doc/*.docx/*.pdf/*.ppt/*.pptx扩展名文件'
      );
      return false;
    }
  };
  render = () => {
    let { fileList, action } = this.state;
    // let { placeholder } = this.props;
    const uploadProps = {
      name: this.props.name || 'file',
      multiple: false,
      showUploadList: false,
      fileList: [...fileList],
      action: action,
      onChange: this.changeHandler,
      beforeUpload: this.beforeUpload,
      headers: { 'X-Requested-With': null }
    };
    return (
      <div className='xlsx-uploader'>
        <Dragger {...uploadProps}>
          <div className='up_text'>将文件拖拽至此 或 <span>上传模板</span></div>
        </Dragger>
        <div className={`${fileList.length ? "xlsx-upload-list" : ""}`}>
          {this.buildUploadList(fileList)}
        </div>
      </div>
    );
  };
}

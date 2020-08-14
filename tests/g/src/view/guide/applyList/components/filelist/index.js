import React from "react";
import { Col, Modal } from "antd";
import pdf_icon from "../img/pdf.png";
import docx_icon from "../img/docx.png";
import xls_icon from "../img/xls.png";
import ppt_icon from "../img/ppt.png";
import unknown from "../img/unknown.png";
import { moduleName } from "../../store";
import { inject, observer } from "mobx-react";

import "./index.less";
import { prefix } from "common/const";
const { confirm } = Modal;

@inject(store => ({
  store: store[moduleName]
}))
@observer
class FileListItem extends React.Component {

 onDownloadFile(key, ext) {
    const url =
      window.location.origin +
      `${prefix}/file/readToOriginalName/${key}.${ext}`;
    window.location.href = url;
  }
  onDeleteFile(id) {
    const {
      store: { deleteFile }
    } = this.props;
    confirm({
      iconType: "none",
      content: "确认删除该文件？",
      width: 400,
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        deleteFile(id);
      },
      onCancel() {}
    });
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

  render() {
    const { originalName, id, ukey, ext } = this.props;
    return (
      <Col className="file-item">
        <div className="file-info">
          <span className="file-icon">{this.getIcon(ext)}</span>
          <span className="file-name">{originalName}</span>
            <a onClick={e => this.onDownloadFile(ukey, ext)}>
                <span className="file-download">下载</span>
            </a>
            <a onClick={e => this.onDeleteFile(id)}>
                <span className="file-download">删除</span>
            </a>
        </div>
      </Col>
    );
  }
}

export default FileListItem;

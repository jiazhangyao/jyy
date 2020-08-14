import React from "react";
import { Upload, message } from "antd";

import "./index.less";

const { Dragger } = Upload;
const uploadUrl = "/gm/api/file";
const MAXCOUNT = 5;

// 生成图片地址
const getImageUrl = (key, type) => {
  return `/gm/api/file/${key}.${type}`;
};

class ImagesUploader extends React.Component {
  constructor(props) {
    super(props);
    const stateFormProps = this.setStateFromProps(props);
    this.state = {
      ...stateFormProps
    };
  }

  componentWillReceiveProps(nextProps) {
    const stateFromNextProps = this.setStateFromProps(nextProps);
    this.setState({ ...stateFromNextProps });
  }

  setStateFromProps = props => {
    const {
      value,
      maxcount = MAXCOUNT,
      needSetCover = true,
      width = 120,
      height = 90
    } = props;
    const fileList = value || [];
    // 默认第一个封面
    if (needSetCover && fileList.length > 0) {
      const temp = fileList.filter(file => file.isCover === 1);
      if (temp.length === 0) {
        fileList[0].isCover = 1;
      }
    }
    return {
      maxcount,
      needSetCover,
      width,
      height,
      fileList,
      ifFull: fileList.length >= maxcount
    };
  };

  getThumbUrl = fileInfo => {
    const { key, ext } = fileInfo;
    if (key) {
      return getImageUrl(key, ext);
    }
    return "";
  };

  onRemove = uid => () => {
    const { fileList } = this.state;
    const afterFileList = fileList.reduce((fileList, file) => {
      if (file.uid !== uid) {
        fileList.push(file);
      }
      return fileList;
    }, []);
    this.setState(
      {
        fileList: afterFileList
      },
      this.fireChange
    );
  };

  setCover = uid => () => {
    const { fileList } = this.state;
    fileList.map(item => {
      if (item.uid === uid) {
        item.isCover = 1;
      } else {
        item.isCover = 0;
      }
    });
    this.setState(
      {
        fileList
      },
      this.fireChange
    );
  };

  buildItem = (file) => {
    const { width, height, needSetCover } = this.state;
    const { status, response, uid, isCover = 0 } = file;
    const fileInfo = status === "done" ? response.data : {};
    const thumbUrl = this.getThumbUrl(fileInfo);
    return (
      <div
        key={ file.key }
        className="cpn-imagesuploader-filelist-item"
        style={ { width, height, padding: '2px' } }
      >
        { status === "uploading" && (
          <p className="tips-uploading">文件上传中...</p>
        ) }
        { status === "done" && (
          <div className="img-wrap" style={ { width: '100%', height: '100%' } }>
            <img
              className="cpn-imagesuploader-filelist-item-img"
              src={ thumbUrl }
              alt={ file.name }
            />
            { needSetCover && (
              <div>
                { isCover != 1 && (
                  <div
                    className="cpn-imagesuploader-filelist-item-action"
                    onClick={ this.setCover(uid) }
                  >
                    设为封面
                  </div>
                ) }
                { isCover == 1 && (
                  <div className="cpn-imagesuploader-filelist-item-tag">
                    封面图
                  </div>
                ) }
              </div>
            ) }
            <i
              className="iconfont icon-empty cpn-imagesuploader-filelist-item-del"
              onClick={ this.onRemove(uid) }
            />
          </div>
        )
        }
      </div>
    );
  };

  fireChange = () => {
    const { fileList } = this.state;
    this.props.onChange(fileList);
  };

  handleChange = data => {
    const { maxcount } = this.state;
    let { fileList, file } = data;
    const { status, name, response, uid } = file;
    if (status === "done" && response.success) {
      message.success(`${name}上传成功！`);
      this.setState(
        { fileList, ifFull: fileList.length >= maxcount },
        this.fireChange
      );
    }
    if ((status === "done" && !response.success) || status === "error") {
      const { fieldErrors = [] } = response;
      if (fieldErrors.length > 0) {
        message.error(fieldErrors[0].msg);
      } else {
        message.error(`${name}上传失败`);
      }
      // 去掉失败的file
      fileList = fileList.filter(file => file.uid !== uid);
      this.setState({ fileList }, this.fireChange);
    } else {
      this.setState({ fileList });
    }
  };

  render = () => {
    const { fileList = [], width, height, ifFull } = this.state;
    const imageUploaderProps = {
      action: uploadUrl,
      fileList,
      name: "file",
      multiple: true,
      accept: "image/png,image/jpeg",
      onChange: this.handleChange,
      onPreview: this.handlePreview
    };

    const notFinishedList = fileList.filter(item => item.status !== "done");
    const canUpload = !ifFull || notFinishedList.length !== 0;
    return (
      <div className="cpn-imagesuploader">
        { fileList.length ? fileList.map((file, index) => this.buildItem(file, index)):'' }
        { canUpload && (
          <div className="cpn-imagesuploader-action" style={ { width, height } }>
            <Dragger { ...imageUploaderProps }>
              <div className="icon-upload-wrap">
                <i className="iconfont icon-upload" />
              </div>
              <p>拖拽至此 或 点击上传</p>
            </Dragger>
          </div>
        ) }
      </div>
    );
  };
}

// 后端图片数据转化为前端可用
export const formatBackendImagesToFrontEnd = files => {
  files = files || [];
  return files.map(item => {
    return {
      ...item,
      uid: item.key,
      name: item.key,
      status: "done",
      url: getImageUrl(item.key, item.ext),
      response: {
        data: {
          fileType: item.ext,
          key: item.key
        }
      },
      isCover: item.isCover,
    };
  });
};
export default ImagesUploader;

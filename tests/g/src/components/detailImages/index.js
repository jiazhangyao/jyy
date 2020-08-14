import React from 'react';
import { Modal, Icon } from 'antd';
import dynamicConst from 'common/dynamicConst';
import './style.less';

export default class DetailPics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prefix: dynamicConst.getItem("filehost"),
      previewVisible: false,
      showPreviewImage: false,
      previewImage: null
    }
  }

  handlePreview = () => this.setState({ previewVisible: true });
  handleCancel = () => this.setState({ previewVisible: false });

  previewImage = (src) => {
    this.setState({previewImage: src, showPreviewImage: true})
  }

  hidePreview = () => this.setState({showPreviewImage: false})

  render = () => {
    const {fileArr, title} = this.props;
    let { prefix, previewVisible, showPreviewImage, previewImage} = this.state;

    prefix = dynamicConst.getItem("filehost") || "//pahf-jiaoyi.st4.anhouse.com.cn/gm/api/file";//前缀
    // prefix = dynamicConst.getItem("filehost") || "//10.28.172.227:8881/erp/api/file";//前缀
    const total = fileArr.length;
    let src = null;
    let alt = null;
    if (fileArr && total) {
      fileArr.forEach((item, index) => {
        if(index === 0) {
          src = `${prefix}/${item.key}.${item.ext}`
          alt = item.originalName;
        }
      });
    }

    return (
      <div className="detail-img-wrap">
        {fileArr && total > 0 && (
          <div className="img-wrap">
            <img src={src} alt={alt} onClick={this.handlePreview} />
            <div className="tag" onClick={this.handlePreview}>{`共${total}张`}</div>
            <Modal 
              className="img-pop-preview"
              visible={previewVisible}
              title={title}
              footer={null}
              onCancel={this.handleCancel}
              centered>
              {fileArr.map(item => <img src={`${prefix}/${item.key}.${item.ext}`} alt={item.originalName} onClick={this.previewImage.bind(this, `${prefix}/${item.key}.${item.ext}`)} />)}
            </Modal>
            <Modal 
              className="preview-active"
              visible={showPreviewImage}
              title='预览'
              width={'auto'}
              footer={null}
              onCancel={this.hidePreview}
              centered>
              <img src={previewImage} alt='大图' />
            </Modal>
          </div>
        )}
        {fileArr && !total && (
          <div className="img-wrap">
            <div className="no-pics"></div>
          </div>
        )}
      </div>
    )
  }
}

import React from 'react';
import { Modal, Icon } from 'antd';
import dynamicConst from 'common/dynamicConst';
import './style.less';

export default class DetailPics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prefix: dynamicConst.getItem("filehost"),
      previewVisible: false
    }
  }

  handlePreview = () => this.setState({ previewVisible: true });
  handleCancel = () => this.setState({ previewVisible: false });

  render = () => {
    const { name, suffix, alt = "" } = this.props;
    let { prefix, previewVisible } = this.state;

    prefix = dynamicConst.getItem("filehost")//前缀
    //let src = `${prefix}/${name}.${suffix}`;
    let src = `/web/api/file/${name}.${suffix}`
    return (
      <div className="detail-img-box">
        <img src={src} alt={alt} onClick={this.handlePreview} />
        <p className="img-actions-cover-btn">
          <Icon className="view-big-pic" title="查看大图" onClick={this.handlePreview} type="arrows-alt" />
        </p>

        <Modal className="img-pop-previews" width={900} visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="大图" src={src} />
        </Modal>
      </div>
    )
  }
}

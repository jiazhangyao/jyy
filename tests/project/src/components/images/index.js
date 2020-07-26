import React, { PropTypes, Component } from "react";
import { Modal, Button, Icon } from "antd";
import Viewer from "react-viewer";
import "react-viewer/dist/index.css";
import "./style.less";

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = { previewVisible: false, imgIndex: 0 };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = () => {
    this.props.fullSrc.map((item, index) => {
      if (item.url == this.props.src) {
        this.setState({
          previewImage: this.props.fullSrc,
          previewVisible: true,
          imgIndex: index
        });
      }
    });
    // this.setState({
    //   previewImage: this.props.fullSrc,
    //   previewVisible: true,
    //   imgIndex: index
    // });
  };

  getPreviewImg = fullSrc => {
    return fullSrc.map((item, index) => {
      // this.setState({
      //   imgIndex: index,
      // });
      return {
        src: item.url,
        alt: "大图",
        defaultSize: { width: 900, height: 900 }
        // downloadUrl:item.url
      };
    });
  };

  render() {
    let { src, width, height, fullSrc, showStatus } = this.props;
    let { previewVisible, previewImage, imgIndex } = this.state;
    let flag = true;
    if (navigator.userAgent.indexOf("MSIE") > 0) {
      if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
        flag = false;
      }
      if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
        flag = false;
      }
      if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
        flag = false;
      }
      if (navigator.userAgent.indexOf("MSIE 9.0") > 0) {
        flag = false;
      }
    }
    return (
      <div className="axg-image" style={{ width, height }}>
        <img
          className="axg-image-body"
          src={src}
          width={width}
          height={height}
        />
        {showStatus == 0 && <span className="axg-image-status-tag">无效</span>}
        <span className="axg-image-actions-cover">
          <Icon
            className="axg-image-actions-cover-btn last"
            title="查看大图"
            onClick={this.handlePreview}
            type="arrows-alt"
          />
        </span>
        {flag ? (
          <Viewer
            // downloadable={true}
            activeIndex={imgIndex}
            visible={this.state.previewVisible}
            onClose={() => {
              this.setState({ previewVisible: false });
            }}
            images={this.getPreviewImg(fullSrc)}
          />
        ) : (
          <Modal
            className="axg-image-pop-previewer"
            width={900}
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="预览" src={src} />
          </Modal>
        )}
      </div>
    );
  }
}

Image.propTypes = {};

export default Image;


import React from 'react';
import ToolBar from './com/galleryTolbar';
import MoveWrap from './com/moveWrap';
import "./index.less";
class Gallery extends React.Component {
  constructor(props) {
    super(props);
    let state = this.setStateFromProps(props);
    this.state = {
      ...state,
      rotateDeg: 0,
      zoomRatio: 0.2,
      showIcons: {
        zoomInIcon: true,
        zoomOutIcon: true,
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    let state = this.setStateFromProps(nextProps);
    this.setState({ ...state });
  }
  setStateFromProps = (props) => {
    let { extraParams } = props;
    return { extraParams };
  }
  /*
   1.点击缩放
   @params zoomIn true 放大 false 缩小
   2.滚动鼠标滚轮 进行缩放
   */
  onZoom = (zoomIn, e) => {
    e.preventDefault();
    e.stopPropagation();
    this.afterZoomed(1 + (zoomIn ? this.state.zoomRatio : -this.state.zoomRatio))
  }
  afterZoomed = (currentRatio) => {
    console.log(currentRatio, "currentRatio")
    let ImgEle = document.querySelectorAll(".gallery-inner")[0].querySelector("img");
    let zoomedSize = {
      zoomedWidth: ImgEle.offsetWidth * currentRatio,
      zoomedHeight: ImgEle.offsetHeight * currentRatio
    }
    //1.边界问题
    ImgEle.style.width = zoomedSize.zoomedWidth + 'px'
    ImgEle.style.height = zoomedSize.zoomedHeight + 'px'
    this.setState({
      ...zoomedSize,
    })
  }
  render() {
    let { showIcons, extraParams } = this.state;
    return (
      <div className='gallery'>
        <div className='gallery-inner'>
          <MoveWrap>
            <img src={extraParams.src} />
          </MoveWrap>
        </div>
        <ToolBar
          ShowIcon={showIcons}
          onZoomIn={this.onZoom.bind(this, true)}
          onZoomOut={this.onZoom.bind(this, false)}
        />
      </div>
    );
  }
}
export default Gallery;




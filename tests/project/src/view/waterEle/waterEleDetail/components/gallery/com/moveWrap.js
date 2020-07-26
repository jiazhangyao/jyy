import React from "react";
class MoveWrap extends React.Component {
  constructor() {
    super();
    this.state = {
      canMove: false
    };
  }
  movingCallBack = (a, b) => {};
  onMoving = e => {
    if (!this.state.canMove) {
      return false;
    }
    e.preventDefault();
    e.stopPropagation();
    const moveOffset = {
      left: e.clientX - this.clientX,
      top: e.clientY - this.clientY
    };
    this.setState({
      moveCoodinate: {
        left: this.state.moveCoodinate.left + moveOffset.left,
        top: this.state.moveCoodinate.top + moveOffset.top
      },
      moved: true
    });
    this.movingCallBack(moveOffset, {
      originalClientx: this.clientX,
      originalClientY: this.clientY,
      originalPageX: this.pageX,
      originalPageY: this.pageY,
      clientX: e.clientX,
      clientY: e.clientY,
      pageX: e.pageX,
      pageY: e.pageY
    });
    //update clientX clientY every moved
    this.updateCursorPoint(e);
  };
  updateCursorPoint = e => {
    this.pageX = e.pageX;
    this.pageY = e.pageY;
    this.clientX = e.clientX;
    this.clientY = e.clientY;
  };
  onMouseDown = e => {
    this.setState({
      canMove: true,
      moveCoodinate: {
        left: e.currentTarget.offsetLeft,
        top: e.currentTarget.offsetTop
      }
    });
    this.updateCursorPoint(e);
  };
  onMouseUporLeave = e => {
    this.setState({
      canMove: false
    });
  };
  render() {
    const {
      children,
      className = "",
      style = {},
      disabledMove = false
    } = this.props;
    const { canMove, moveCoodinate, moved } = this.state;
    let calculateStyle = {};
    if (canMove) {
      Object.assign(calculateStyle, style, {
        cursor: "move",
        ...moveCoodinate
      });
    } else {
      Object.assign(calculateStyle, style, {
        cursor: "default",
        ...moveCoodinate
      });
      // Object.assign(calculateStyle, style)
    }
    moved &&
      Object.assign(
        calculateStyle,
        style,
        disabledMove
          ? { position: "fixed" }
          : { moveCoodinate, position: "absolute" }
      );
    //!canMove && delete calculateStyle.position
    return (
      <span
        className={className}
        style={calculateStyle}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUporLeave}
        onMouseLeave={this.onMouseUporLeave}
        onMouseMove={this.onMoving}
      >
        {children}
      </span>
    );
  }
}
export default MoveWrap;

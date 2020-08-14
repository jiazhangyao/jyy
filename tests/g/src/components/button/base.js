import React, { Component } from "react";
import "./index.less";
import { Button as AntButton } from "antd";
const clsPrefix = "mt-button"

class Button extends Component {
  static defaultProps = {
    //size: "large",
    className: "",
  }
  render() {
    const { className, ...rest } = this.props
    return <AntButton className={className + " " + clsPrefix} {...rest} />

  }
}

export default Button
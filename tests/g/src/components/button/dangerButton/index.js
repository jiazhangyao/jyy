import React from "react";
import Button from "../base";
import "./index.less";
const clsPrefix = "mt-danger-button";

class DangerButton extends Button {
  static defaultProps = {
    className: "",
    type: "danger"
  };
  render() {
    const { className, ...rest } = this.props;
    return <Button className={className + " " + clsPrefix} {...rest} />;
  }
}

export default DangerButton;

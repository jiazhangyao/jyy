import React from "react";
import Button from "../base";
import "./index.less";
const clsPrefix = "mt-primary-button";

class PrimaryButton extends Button {
  static defaultProps = {
    className: "",
    type: "primary"
  };
  render() {
    const { className, ...rest } = this.props;
    return <Button className={className + " " + clsPrefix} {...rest} />;
  }
}

export default PrimaryButton;

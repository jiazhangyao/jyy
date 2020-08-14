import React from "react";
import Button from "../base";
import "./index.less";
const clsPrefix = "mt-no-border-button";

class NoBorderButton extends Button {
  static defaultProps = {
    className: ""
  };
  render() {
    const { className, ...rest } = this.props;
    return <Button className={className + " " + clsPrefix} {...rest} />;
  }
}

export default NoBorderButton;

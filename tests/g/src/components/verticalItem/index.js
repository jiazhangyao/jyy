import React from "react";
import { Form } from "antd";
import "./style.less";

const VerticalItem = ({
  clsPrefix = "vertical-item",
  className = "",
  ...rest
}) => {
  return <Form.Item {...rest} className={clsPrefix + " " + className} />;
};

export default VerticalItem;

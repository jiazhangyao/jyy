import React, { Component } from "react";
import { Form } from "antd";
import T from "prop-types";

class AppFormItem extends Component {
  render() {
    const {
      field,
      req: required,
      msg: message,
      creator,
      children,
      validator,
      ...rest
    } = this.props;
    return (
      <Form.Item {...rest}>
        {creator(field, {
          rules: [
            {
              required,
              message
            },
            { validator: validator }

          ]
        })(children)}
      </Form.Item>
    );
  }
}

export default AppFormItem;

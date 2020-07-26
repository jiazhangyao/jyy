import React, { Component } from "react";
// import FormItem from "components/verticalItem";
import { Form } from "antd";

const FormItem = Form.Item;

export default ({ form, data }) => {
  class FormField extends Component {
    render() {
      const {
        children,
        id,
        label,
        required,
        message,
        options = {}
      } = this.props;
      const {
        labelCol,
        wrapperCol,
        rules = [],
        width,
        style,
        ...rest
      } = options;
      const layout = {};
      if (labelCol) {
        layout.labelCol = labelCol;
      }
      if (wrapperCol) {
        layout.wrapperCol = wrapperCol;
      }
      if (style) {
        layout.style = style;
      }
      layout.style = layout.style || {};
      if (width) {
        layout.style.width = width;
      }
      rules.unshift({
        required,
        message
      });

      const fieldOptions = { rules };
      if (data[id] !== undefined) {
        let initValue = data[id];
        if (initValue.toJS) {
          initValue = initValue.toJS();
        }
        if (typeof initValue === "number") {
          initValue = initValue + "";
        }
        fieldOptions.initialValue = initValue;
      }

      return (
        <FormItem label={label} required={required} {...layout}>
          {form.getFieldDecorator(id, fieldOptions)(children)}
        </FormItem>
      );
    }
  }

  return FormField;
};

import React, { Component } from "react";
import FormItem from "./base";
import { Input } from "antd";
import T from "prop-types";

class InputField extends Component {
  render() {
    const {
      children,
      placeholder,
      autoComplete,
      type,
      inputOption,
      onPressEnter,
      suffix,
      ...rest
    } = this.props;
    return (
      <FormItem {...rest}>
        <Input
          autoComplete={autoComplete}
          type={type}
          placeholder={placeholder}
          onPressEnter={onPressEnter}
          suffix={suffix}
          {...inputOption}
        />
      </FormItem>
    );
  }
}

export default InputField;

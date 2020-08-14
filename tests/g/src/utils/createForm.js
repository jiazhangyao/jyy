/*
 * @Author: tim huang
 * @Date: 2018-12-26 14:48:28
 * @Last Modified by: tim huang
 * @Last Modified time: 2019-01-24 11:40:44
 */

import React, { Component } from "react";
import { observer } from "mobx-react";
import { Form } from "antd";

export default ({ clsPrefix, ...option }) => Wrapper => {
  @Form.create({
    ...option,
    onFieldsChange: ({ store = {} }, targetField, allFields) => {
      store.onFieldsChange && store.onFieldsChange(targetField, allFields);
    }
  })
  @observer
  class WrapperComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errorTag: undefined,
        preErrorTag: undefined,
        submitting: false
      };
    }

    static getDerivedStateFromProps(props, state) {
      const { store } = props;
      return {
        errorTag: store.fieldErrors.tag,
        preErrorTag: state.errorTag
      };
    }

    componentDidUpdate() {
      const { errorTag, preErrorTag } = this.state;
      if (errorTag !== preErrorTag) {
        // 表单错误处理
        this.handleFormErrors();
      }
    }

    handleFormErrors = () => {
      const {
        store: {
          fieldErrors: { errors }
        },
        form: { getFieldsValue, setFields }
      } = this.props;
      const fields = getFieldsValue();
      const errorFields = {};
      Object.keys(fields).forEach(fieldKey => {
        const filed = { value: fields[fieldKey] };
        if (errors[fieldKey]) {
          filed.errors = [new Error(errors[fieldKey])];
        }
        errorFields[fieldKey] = filed;
      });
      setFields(errorFields);
    };

    //校验错误统一处理
    handleSubmit = (e, beforeSubmit) => {
      e.preventDefault();

      const { form, store } = this.props;
      form.validateFields({ force: true }, (errors, values) => {
        if (errors) {
          return;
        }
        const submitvalues = {};
        Object.keys(values).forEach(key => {
          if (Array.isArray(values[key]) && values[key].length) {
            values[key] = values[key].filter(item => item !== undefined);
          }
          if (values[key] !== null && values[key] !== undefined) {
            submitvalues[key] = values[key];
          }
        });
        let cansubmit = true;

        if (
          beforeSubmit &&
          Object.prototype.toString.call(beforeSubmit) === "[object Function]"
        ) {
          cansubmit = beforeSubmit(values);
          cansubmit = cansubmit === undefined ? true : cansubmit;
        }
        if (!cansubmit || !store) {
          return;
        }

        let fn = undefined;
        if (store.submitHook) {
          fn = "submitHook";
        } else if (store.submit) {
          fn = "submit";
        }

        if (!fn) {
          // 异常提示
          console.warn("store 并未提供submit方法");
          return;
        }

        this.setState({ submitting: true }, () => {
          store[fn](submitvalues);
          this.setState({ submitting: false });
        });
      });
    };

    render() {
      const { store } = this.props;
      const { submitting } = this.state;
      return (
        <>
          <Form className={clsPrefix}>
            <Wrapper
              {...this.props}
              submitting={submitting}
              ref="wrappedComponent"
              handleSubmit={this.handleSubmit}
            />
          </Form>
          <div style={{ display: "none" }}>{store.fieldErrors.tag}</div>
        </>
      );
    }
  }
  return WrapperComponent;
};

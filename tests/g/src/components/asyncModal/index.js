/**
 * 3/19/2018
 * tim huang
 * 比较简单的封装，待优化
 */

import React, {Component} from "react";
import T from "prop-types";
import {request} from "utils/request";
import {Modal, message} from "antd";

export default class AsyncModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false, // 确定按钮loading状态
      extraParams: {}
    };
  }

  static propTypes = {
    onOk: T.func, // ok跟后台交互成功后的回调
    onCancel: T.func,
    // 在发送请求前调用
    //onBeforeRequest返回结果处理：false:将取消请求发送，否则：当做请求的参数
    onBeforeRequest: T.func,
    // 请求后台的方法
    reqMethod: T.string,
    // 请求后台的url
    reqUrl: T.string,
    /**  closeMode: 关闭窗体的方式
     *   "1": 请求成功后，关闭并调用 onOk
     *   "2": 发送请求则关闭并调用 onOk
     */
    closeMode: T.string.isRequired,
    // 自定义处理：表单提交后返回的错误
    onError: T.func
  };

  static defaultProps = {
    reqMethod: "POST",
    closeMode: "1"
  };

  onOk = () => {
    if (window.__fileUploading) {
      message.info("上传中，请稍后...");
      return;
    }

    if (!this.props.form) {
      // 普通弹窗
      this.sendRequest();
    } else {
      // 表单弹窗
      this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        this.sendRequest(fieldsValue);
      });
    }
  };

  sendRequest = (fieldsValue = {}, headers = {"Content-Type": "application/json"}) => {
    // 发送请求
    let {reqMethod, reqUrl: url, apiPrefix = "/gm/api", onBeforeRequest, closeMode} = this.props;
    const {extraParams} = this.state;

    onBeforeRequest = this.onBeforeRequest || onBeforeRequest;

    let params = {...extraParams, ...fieldsValue};

    // restructure url
    if (this.restructureUrl) {
      url = this.restructureUrl(params);
    }
    // props
    if (onBeforeRequest) {
      // onBeforeRequest 1. 上层组件处理参数的机会； 2. 取消请求的机会
      params = onBeforeRequest(params);
      if (params === false) {
        return;
      }
    } else if (this.requestWillSend) {
      // class
      // requestWillSend 1. 子类处理参数的机会； 2. 取消请求的机会
      params = this.requestWillSend(params);
      if (params === false) {
        return;
      }
    }

    const method = reqMethod.toUpperCase();
    // console.log(url, {method, params, headers}, apiPrefix)

    // return 
    request(url, {method, params, headers}, apiPrefix)
      .then(res => {
        const {
          data = {},
          success,
          globalError,
          fieldErrors
        } = res;
        if (success) {
          // 关闭窗口
          this.setState({visible: false});
          // 回调onOk
          this.props.onOk && this.props.onOk(data);
        } else {
          if (closeMode === "2") {
            // 回调onOk
            this.props.onOk && this.props.onOk(data);
          }
          if (this.props.onError) {
            this.props.onError(res);
          } else {
            message.error(globalError || (fieldErrors && fieldErrors[0] && fieldErrors[0].msg) || "操作失败");
          }
        }
      })
      .catch(err => {
        if (closeMode === "2") {
          // 回调onOk
          this.props.onOk && this.props.onOk();
        }
        message.error("操作失败，确认网络是否畅通！");
      });
  };

  onCancel = () => {
    this.close(this.props.onCancel);
  };

  getRender = () => {
    const {extraParams} = this.state;
    if (this._render) {
      return this._render(extraParams); // from child class
    } else {
      return this.props.children; // from children
    }
  };

  render() {
    const {visible: _visible, onOk, onCancel, form, ...others} = this.props;
    let {visible, confirmLoading, maskClosable} = this.state;
    maskClosable = typeof maskClosable === "boolean" ? maskClosable : true;

    if (others.footer !== null) {
      others.okText = others.okText || "确定";
      others.cancelText = others.cancelText || "取消";
    }

    return (
      <Modal
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        confirmLoading={confirmLoading}
        maskClosable={!!maskClosable}
        {...others}
      >
        {this.getRender()}
      </Modal>
    );
  }

  /**
   * @param  {string} extraParams 当做发送请求的额外参数
   */
  open = extraParams => {
    if (this.props.form) {
      this.props.form.resetFields();
    }

    this.modalWillOpen && this.modalWillOpen();
    console.log('extraParams', extraParams)
    this.setState({visible: true, extraParams}, () => {
      this.modalDidOpen && this.modalDidOpen();
    });
  };

  close = cb => {
    this.setState({visible: false}, () => cb && cb());
  };
}

/**
 * 依据包装 AsyncModal 父类的引用，来获取AsyncModal 中的应用实例，以方便后续调用方法处理。
 * 例如：getAsyncModalInst(this.rejectModalInst).open({ id: 12 })
 * @param inst  wrapped Modal Inst
 * @returns {*}
 */
export function getAsyncModalInst(inst) {
  return inst;
}

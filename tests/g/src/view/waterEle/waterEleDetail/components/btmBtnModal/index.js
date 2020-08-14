import React from 'react';
import { Form, Input } from 'antd';
import { AsyncModal } from 'components';
const FormItem = Form.Item;
const { TextArea } = Input;
class BtmBtnModal extends AsyncModal {
  static defaultProps = {
    ...AsyncModal.defaultProps,
    reqUrl: '/transfer/approval',
    reqMethod: 'POST',
    title: '审批意见',
  }


  _render = () => {
    const { getFieldDecorator } = this.props.form;
    const { transferStatus } = this.state.extraParams;
    let passStatus = transferStatus == 2
    const placeholder = passStatus ? "请输入通过理由 120字以内（非必填）" : "请输入驳回理由 120字以内（必填）"
    return (
      <Form className="vertical-form-container">
        <FormItem>
          {
            getFieldDecorator('rejectReason', {
              rules: [{
                required: !passStatus,
                message: '请输入备注信息'
              }, {
                max: 120,
                message: '最多输入120字符'
              }]
            })(
              <TextArea rows={4} placeholder={placeholder} />
            )
          }
        </FormItem>
      </Form>
    );
  }
}
export default Form.create({ wrappedComponentRef: true })(BtmBtnModal)
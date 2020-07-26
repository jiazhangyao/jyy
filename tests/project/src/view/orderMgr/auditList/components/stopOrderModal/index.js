import React from 'react';
import { Form, Input } from 'antd';
import { AsyncModal } from 'components';
const FormItem = Form.Item;
const { TextArea } = Input;

class StopOrderModal extends AsyncModal {
  static defaultProps = {
    ...AsyncModal.defaultProps,
    reqUrl: '/order/operate/end',
    reqMethod: 'POST',
    title: '工单终止',
  };

  _render = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="vertical-form-container">
        <FormItem>
          {
            getFieldDecorator('reason', {
              rules: [{
                required: true,
                message: '请输入备注信息'
              }, {
                max: 120,
                message: '最多输入120字符'
              }]
            })(
              <TextArea rows={4} placeholder="请输入工单终止理由 120字以内（必填）" />
            )
          }
        </FormItem>
        <div style={{color: "#f5222d"}}>注：工单终止后，将不能再进行任何操作</div>
      </Form>
    );
  }
}
export default Form.create({ wrappedComponentRef: true })(StopOrderModal)
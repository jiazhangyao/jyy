import React from 'react';
import {Form, Input} from 'antd';
import {AsyncModal} from 'components';
import {
  LogAuthResult
} from '../../../enum';

const FormItem = Form.Item;
const { TextArea } = Input;


class Pass extends AsyncModal {
  static defaultProps = {
    ...AsyncModal.defaultProps,
    // reqUrl: '/appeal/audit/%id',
    reqUrl: '/account/common/face/validate/appeal/approve',
    apiPrefix: "/modules/api",
    reqMethod: 'POST',
    title: '审批意见',
    className: 'with-input-field-model',
    onBeforeRequest: ({id, isPass, version}) => ({accountId: id, appealStatus: isPass, version: version || 0})
  }

  // restructureUrl = () => {
    // const {reqUrl} = this.props;
    // const {id} = this.state.extraParams;
    // return reqUrl.replace('%id', id);
  // }

  _render = () => {
    const {getFieldDecorator} = this.props.form;
    const {isPass} = this.state.extraParams;
    const isPassOption = isPass === LogAuthResult.PASS;
    const placeholder = `请输入${isPassOption ? '通过' : '驳回'}理由 120字以内（非必填）`;

    return (
      <Form className="vertical-form-container">
        <FormItem>
          {
            getFieldDecorator('reason', {
              rules: [{
                required: false,
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
export default Form.create({ wrappedComponentRef: true })(Pass)

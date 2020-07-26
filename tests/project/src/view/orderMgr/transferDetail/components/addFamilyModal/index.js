import React from 'react';
import { Form, Input, Modal } from 'antd';
import { idCardValidate } from '../../service';
import './index.less'

class AddFamilyMemberForm extends React.Component {
    //校验身份证号
    verifyIdentity = (rule, value, callback) => {
        const { getFieldValue } = this.props.form;
        if (value && (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value))) {
            callback('身份证号码格式不正确');
        } else {
            // 认证识别
            idCardValidate({
                personId: value,
                personName: getFieldValue('name')
            }).then((res) => {
                if (res.success) {
                    callback()
                } else {
                    callback('实名认证失败');
                }
            })
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;

        return (<Form layout="horizontal">
            <Form.Item label="家庭成员姓名">
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入家庭成员姓名!' }],
                    validateTrigger: ['onChange', 'onBlur'],
                })(
                    <Input placeholder="请输入家庭成员姓名" />
                )}
            </Form.Item>
            <Form.Item label="家庭成员身份证号">
                {getFieldDecorator('cardNo', {
                    rules: [{ required: true, message: '请输入家庭成员身份证号!' },
                    { validator: this.verifyIdentity }],
                    validateTrigger: ['onChange', 'onBlur'],
                })(
                    <Input
                        placeholder="请输入家庭成员身份证号"
                    />
                )}
            </Form.Item>
        </Form>
        )
    }
}

const EnhancedForm = Form.create()(AddFamilyMemberForm)

class AddFamilyModal extends React.Component {
    handleSubmit = e => {
        const { validateFields } = this.addFamilyForm.props.form;
        const { addFamilyMember } = this.props;
        e.preventDefault();
        validateFields({ force: true }, function (err, values) {
            if (!err) {
                addFamilyMember(values)
            }
        });
    };
    render() {
        const { visible, onCancel } = this.props;
        return (
            <Modal
                visible={visible}
                title="新增家庭成员"
                onOk={this.handleSubmit}
                onCancel={onCancel}
                className="addFamilyModel"
            >
                <EnhancedForm wrappedComponentRef={(form) => this.addFamilyForm = form} />
            </Modal>
        );
    }
}

export default AddFamilyModal
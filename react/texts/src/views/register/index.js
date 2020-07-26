import React from 'react'
import { Form, Input, Button } from 'antd'

import './style.scss'

export default function () {
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };
    return (
        <div className="logins">
            <div className="login">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <p>原始密码</p>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input size="large" placeholder="Username" />
                    </Form.Item>
                    <p>设置新密码</p>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            size="large"
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
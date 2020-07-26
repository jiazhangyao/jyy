import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const ChangePwd = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <section style={{ background: '#fff', padding: 30 }}>
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
      <p>再输入一次新密码</p>
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
          Log in
        </Button>
      </Form.Item>
    </Form>
    </section>
  );
};

export default ChangePwd
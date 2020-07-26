import React from 'react'
import { Form, Input, Button, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './style.scss'

const { Option } = Select;

const CreateAccount = ({ changePages }) => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <section className="create-account" style={{ background: '#fff', padding: 30 }}>
      <nav>
        <h2>创建子账号</h2>
        <p style={{float: 'right', marginTop: '-40px'}} onClick={() => {
          changePages('lists')
        }}>返回上一页</p>
      </nav>
      <section style={{clear: 'both', marginTop: 50}}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <p>设置子账户名称 </p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input size="large" placeholder="Username" />
          </Form.Item>
          <p style={{fontSize: '12px'}}>字母或字母数字混合，长度最小为4位，例如：worker、wk001、wk002</p>
          <p style={{marginTop: 30}}>设置填写提币地址（选填）</p>
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
          <p>设置选择起付金额（选填）</p>
          <Form.Item
            name="passwords"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
        </Button>
          </Form.Item>
        </Form>
      </section>
    </section>
  );
};

export default CreateAccount
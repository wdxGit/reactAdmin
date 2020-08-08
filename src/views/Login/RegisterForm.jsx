import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';

class RegisterForm extends Component {
  
  onFinish = values => {
    console.log('Received values of form: ', values);
  };

  handleToggleFrom = () => {
    this.props.switchFrom('login');
  }

  render() {
    return (
      <Fragment>
        <div className="form_header">
          <h4 className="column">账号注册</h4>
          <span onClick={this.handleToggleFrom}>账号登录</span>
        </div>
        <div className="form_content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={() => this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="password1"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Row gutter={13}>
                <Col span={16}>
                  <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                </Col>
                <Col span={8}>
                  <Button type="danger" >
                    获取验证码
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default RegisterForm;
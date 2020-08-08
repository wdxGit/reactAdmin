import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';

// 引入密码验证
import { validate_password } from "../../utils/validate";
// 登录api
import { Login, reqGetCode } from "../../api/account";
class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      // 获取验证码按钮状态
      code_button_loading: false,
      code_button_disabled: false,
      code_button_text: '获取验证码'
    };
    // react没有双向数据绑定
  };
  
  // antd内置 
  onFinish = async values => {
    const res = await Login(values);
    console.log(res)
    console.log('Received values of form: ', values);
  };

  // 倒计时
  CountDown = () => {
    // 定时器
    let timer = null;
    // 倒计时时间
    let sec = 60;
    // 修改状态
    timer = setInterval(() => {
      sec--;
      if (sec <= 1) {
        sec = 60;
        this.setState({
          code_button_disabled: false,
          code_button_loading: false,
          code_button_text: '获取验证码'
        });

        clearInterval(timer);
      } 
      this.setState({
        code_button_disabled: true,
        code_button_loading: false,
        code_button_text: `${sec}s`
      });
    }, 1000);
  }

  // 绑定input val
  inputUserName = (e) => {
    let { value } = e.target;
    this.setState({
      username: value
    });
  }

  // 切换登录 注册
  handleToggleFrom = (val) => {
    // 调用父级方法传参
    this.props.switchFrom('register');
  };

  // 获取验证码
  handleGetCode = async () => {
    const { username } = this.state;
    if (!username) {
      message.info('请输入邮箱');
      return;
    }
    const requestData = {
      username: this.state.username,
      module: "login"
    };
    this.setState({
      code_button_loading: true,
      code_button_text: '发送中'
    });
    const res = await reqGetCode(requestData);
    if (res.data.message) {
      // 成功 执行倒计时函数
      this.CountDown();
      // this.setState({
      //   code_button_loading: false,
      //   code_button_text: '获取验证码'
      // });
    } else {
      this.setState({
        code_button_loading: false,
        code_button_text: '重新获取'
      });
    }
  }

  render() {
    const { username, code_button_loading, code_button_text, code_button_disabled } = this.state;
    // const _this = this;

    return (
      <Fragment>
        <div className="form_header">
          <h4 className="column">登录</h4>
          <span onClick={this.handleToggleFrom}>账号注册</span>
        </div>
        <div className="form_content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名!', },
                { type: 'email', message: '格式不正确' }
                // ({ getFieldValue }) => ({
                //   validator(rule, value) {
                //     if (validate_email.test(value)) {
                //       _this.setState({ code_button_disabled: false });
                //       return Promise.resolve();
                //     }
                //     return Promise.reject('格式不正确!');
                //   },
                // })
              ]}
            >
              <Input value={username} onChange={this.inputUserName} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[ // rules验证
                { required: true, message: '请输入您的密码!', },
                // { min: 6, message: '长度不能小于6位!' },
                // { max: 20, message: '长度不能大于20位!' },
                { pattern: validate_password, message: '密码必须是6-20位 字母+数字 不能纯数字！' }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="字母+数字 6-20位"
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                { required: true, message: '请输入您的验证码!', },
                { len: 6, message: '验证码必须是6位' }
              ]}
            >
              <Row gutter={15}>
                <Col span={16}>
                  <Input prefix={<UnlockOutlined className="site-form-item-icon" />} 
                  placeholder="Code" />
                </Col>
                <Col span={8}>
                  <Button type="danger" disabled={code_button_disabled} loading={code_button_loading} onClick={this.handleGetCode}>
                    { code_button_text }
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

export default LoginForm;
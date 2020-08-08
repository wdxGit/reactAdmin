import React, { Component } from 'react'
import './index.scss';

// 组件
import LoginForm from "./LoginForm";
import RegisterForm from './RegisterForm'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formType: 'login'
    };
  };

  switchFrom = (formType) => {
    this.setState({ formType })
  }

  render() {
    return (
      <div className="form_wrap">
        <div>
          {
            this.state.formType === 'login' ?
              <LoginForm switchFrom={this.switchFrom} />
              : <RegisterForm switchFrom={this.switchFrom} />
          }
        </div>
      </div>
    )
  }
}

export default Login;
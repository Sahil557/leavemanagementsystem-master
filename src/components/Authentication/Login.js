import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import './Login.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
// import { Link } from 'react-router-dom';  
import Dashboard from '../App/Dashboard';

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      errorMessage: '',
      isSubmitted: false,
      isDashboard: false,
      id: '',
      password: '',
      userInfo: {},
      isAdmin: false
    }
  }

  handleSubmit = () => {
    const { id, password } = this.state;
      axios.get(`http://localhost:3001/${this.state.isAdmin ? "admin" : "users-config"}/${id}/${password}`)
        .then((response) => {
          if (response.data.length) {
            this.setState({ userInfo: response.data[0] });
            this.setState({ isDashboard: true })
          }
        })
        .catch((error) => {
        });
    }
  
    componentDidMount() {
      this.getData();
    }

    getData = () => {
      debugger;
      const { isAdmin, id } = this.state;
      axios.get(`http://localhost:3001/users-config-grid/${isAdmin ? id : 'admin'}`)
        .then((response) =>{
            console.log('getdataResponse---', response.data)
        })
        .catch(error => {
            console.error(error);
        });
      }

    


  render() {
    const { getFieldDecorator } = this.props.form;
    return (

      <div className="wrapper">
        {!this.state.isDashboard ?
          <div className="login-center">
            <Form className="login-form">
              <h6>{this.state.isAdmin ? "Admin Login" : "LMS"}</h6>
              <h5 className="title">L E A V E  M A N A G E M E N T  S Y S T E M</h5>
              <br></br>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    value={this.state.id}
                    onChange={(e) => { this.setState({ id: e.target.value }) }}
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    value={this.state.password}
                    placeholder="Password"

                    onChange={(e) => { this.setState({ password: e.target.value }) }}
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="/forgotpass">
                  Forgot password
                </a>
                <div>
                  {/* <Link to='/dashboard'> */}
                  <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
                    Log in
                  </Button>
                  <p>If you are a {this.state.isAdmin ? "User" : "Admin"} <a onClick={() => { this.setState({ isAdmin: !this.state.isAdmin }) }}>click here</a> to Login</p>
                  {/* </Link> */}
                </div>
                {/* <div className="text-right p-t-225">
              <span className="txt1">Don’t have an account? </span>
              <a className="txt2" href="Signup"> Sign Up</a>
            </div> */}
              </Form.Item>
            </Form>
          </div>
          : <Dashboard userInfo={this.state.userInfo} isAdmin={this.state.isAdmin} />
        }
      </div>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

export default LoginForm;
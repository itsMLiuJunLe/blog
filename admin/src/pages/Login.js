import React, { useState } from 'react';
import { Card, Input, Button, Spin, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import axios from 'axios';

import servicePath from '../config/apiUrl.js';

import 'antd/dist/antd.css';
import '../static/css/Login.css';

function Login(props) {

  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = () => {
    setIsLoading(true);
    if (!userName) {
      message.error('用户名不能为空！');
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return false;
    } else if (!password) {
      message.error('密码不能为空！');
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return false;
    }
    let dataProps = {
      'userName': userName,
      'password': password
    }

    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true //前后端共享session
    }).then((res) => {
      setIsLoading(false);
      //console.log(res.data.data);
      if(res.data.data === '登陆成功') {
        localStorage.setItem('openId', res.data.openID);
        props.history.push('/index');
      } else {
        message.error('用户名或密码错误！');
      }
    })
  }

  return (
    <div className='login-div'>
        <Spin tip='Loading...' spinning={isLoading}>
          <Card title='HaShiQi BLOG' bordered={true} style={{width: 400}}>
            <Input 
              id='userName'
              size='middle'
              placeholder='Enter your userName'
              prefix={<UserOutlined  style={{color:'rgba(0,0,0,.25)'}}/> }
              onChange={(e) => {setUsername(e.target.value)}}
            />
            <br/><br/>
            <Input.Password 
              id='password'
              size='middle'
              placeholder='Enter your password'
              prefix={<KeyOutlined  style={{color:'rgba(0,0,0,.25)'}}/> }
              onChange={(e) => {setPassword(e.target.value)}}
            />
            <br/><br/>
            <Button 
              type='primary' 
              size='middle' 
              block 
              onClick={checkLogin}
            >
            Login
            </Button>
          </Card>
        </Spin>
    </div>
  )
}

export default Login;
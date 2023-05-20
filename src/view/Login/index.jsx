import React from 'react';
import { Button, Form, Input } from 'antd';
import './index.scss';

const fnSubmit = (values) => {
    console.log('Success:', values);
};

const Login = function Login(){
    return (
        <div className="login-container f-c-c">
            <Form name="basic" className="login-form-container" onFinish={fnSubmit}>
                <p className="login-form-title">欢迎使用</p>
                <Form.Item
                    name="account"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input placeholder="用户名" allowClear={true}/>
                </Form.Item>

                <Form.Item
                    name="pwd"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password placeholder="密码" allowClear={true}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-btn">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;

import React from 'react';
import { Button, Form, Input } from 'antd';
import { login } from '@/api/user';
import './index.scss';

/**
 * 登录调用登录接口，并存储token
 * @param values
 */
const fnSubmit = async (values) => {
    const res = await login(values);
    console.log('提交', res);
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

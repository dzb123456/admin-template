import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '@/api/user';
import { user } from '@/store/modules/user';
import './index.scss';

const Login = function Login(){

    //定义dispatch派发器
    let  dispatch = useDispatch();

    //定义导航
    let navigate = useNavigate();

    const { setToken } = user.actions;

    /**
     * 登录调用登录接口，并存储token
     * @param values
     */
    const fnSubmit = async (values) => {
        const res = await login(values);

        //将token存储更新
        dispatch(setToken(res));

        //重定向到首页
        navigate('/');
    };

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

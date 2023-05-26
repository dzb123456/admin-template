import React, { lazy } from 'react';
import { MenuFoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined,} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
const { Sider, Content } = Layout;
import './index.scss';

//加载侧边栏、导航组件
const Header = lazy(() => import('@/component/Header'));
const LeftNav = lazy(() => import('@/component/LeftNav'));

const Index = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <LeftNav/>
            <Layout>
                <Header/>
                <Content className="index-content">
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Index;

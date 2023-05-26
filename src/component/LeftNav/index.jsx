import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import { getMenu } from '@/api/menu';
import './index.scss';

function LeftNav(){

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const [menuList, setMenuList] = useState([]);

    /**
     * 获取侧边栏数据
     * @returns {Promise<void>}
     */
    const getMenuList = async () =>{
        const res = await getMenu();
        setMenuList(res);
    }

    //模拟生命周期-挂载阶段
    useEffect( () =>{
        getMenuList();
    }, [])

    return (
        <div className="left-nav-container">
            <Sider trigger={null} collapsible collapsed={collapsed} className="left-nav-side">
                <div className="demo-logo-vertical" />
                <Menu onClick={ ({ item }) => {
                    console.log('===>', item.props.menuaddr);

                    //跳转路由
                    navigate('/system/menu');
                }} theme="light" mode="inline" defaultSelectedKeys={['1']} items={menuList}/>
            </Sider>
        </div>
    );
}

export default LeftNav;

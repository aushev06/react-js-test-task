import React from "react";
import {Layout, Menu} from "antd";

import {
    PieChartOutlined,
    UserOutlined,
    ShopOutlined,
    LoginOutlined,
    OrderedListOutlined,
    MenuOutlined
} from '@ant-design/icons'
import {useNavigate} from "react-router-dom";

const {Sider} = Layout;


const defaultSelected = () => {
    if (window.location.pathname === '/' || window.location.pathname.includes('Главная')) {
        return "1"
    } else if (window.location.pathname.includes('users')) {
        return "2";
    } else if (window.location.pathname.includes('tests')) {
        return "3";
    } else if (window.location.pathname.includes('statistics')) {
        return "4";
    }

    return "";
}

export const Sidebar = () => {
    const [collapsed, setCollapse] = React.useState(false);
    const navigate = useNavigate();


    return (
        <Sider className={"sider"} collapsible collapsed={collapsed} onCollapse={() => setCollapse(!collapsed)}>
            <div className="logo"/>
            <Menu theme="dark" selectedKeys={[defaultSelected()]} defaultSelectedKeys={[defaultSelected()]} mode="inline">
                <Menu.Item key="1" onClick={() => navigate('/')}>
                    <MenuOutlined/>
                    <span>Главная</span>
                </Menu.Item>


                <Menu.Item key="2" onClick={() => navigate('/users')}>
                    <UserOutlined/>
                    <span>Пользователи</span>
                </Menu.Item>

                <Menu.Item key="3" onClick={() => navigate('/tests')}>
                    <UserOutlined/>
                    <span>Тесты</span>
                </Menu.Item>

                <Menu.Item key="5" onClick={() => {
                    if (window.confirm('Вы действительно хотите покинуть сайт ?')) {
                        // userApi.logout();
                    }
                }}>
                    <LoginOutlined/>
                    <span>Выйти</span>
                </Menu.Item>

            </Menu>
        </Sider>
    )
}

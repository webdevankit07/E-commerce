'use client';
import { ReactNode, useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
};

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return { key, icon, children, label } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className='min-h-screen'>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className='pt-10'>
                <div className='demo-logo-vertical' />
                <Button
                    type='text'
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className='w-52 h-16 absolute -right-10'
                />
                <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
            </Sider>
            <Layout>
                <Content className='mx-4'>{children}</Content>
                <Footer className='text-center bg-dark-4 text-white py-3.5'>
                    ShopWave ©{new Date().getFullYear()} Created by WebDev Ankit
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;

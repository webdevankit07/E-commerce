'use client';
import { ReactNode, useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { Metadata } from 'next';
import { AiOutlineDashboard } from 'react-icons/ai';
import { MdAddToPhotos } from 'react-icons/md';
import { FaShoppingCart, FaRegUser, FaClipboardList } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { IoList } from 'react-icons/io5';
import { SiBrandfolder } from 'react-icons/si';
import { TbCategoryFilled } from 'react-icons/tb';
import { IoIosColorPalette } from 'react-icons/io';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { ScrollArea } from '../ui/scroll-area';
import Image from 'next/image';
import HeaderCustom from './HeaderCustom';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
};

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return { key, icon, children, label } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Dasboard', 'dashboard', <AiOutlineDashboard />),
    getItem('Customers', 'customers', <FaRegUser />),
    getItem('Catalog', 'catalog', <FaShoppingCart />, [
        getItem('Add Product', 'add-product', <MdAddToPhotos />),
        getItem('Product List', 'product-list', <IoList />),
        getItem('Brand', 'brand', <SiBrandfolder />),
        getItem('Brand List', 'brand-list', <IoList />),
        getItem('Category', 'category', <TbCategoryFilled />),
        getItem('Category List', 'category-list', <IoList />),
        getItem('Color', 'color', <IoIosColorPalette />),
        getItem('Color List', 'color-list', <IoList />),
    ]),
    getItem('Orders', 'orders', <FaClipboardList />),
    getItem('Enquiries', 'enquiries', <RiQuestionnaireFill />),
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className='min-h-screen'>
            <ScrollArea className='h-screen'>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    className='min-h-screen'
                >
                    <div className='font-bold text-3xl text-white py-5 text-center adminLogo'>ShopWave</div>
                    <Menu
                        theme='dark'
                        defaultSelectedKeys={['dashboard']}
                        mode='inline'
                        items={items}
                        onClick={(key) => router.push(`/admin/${key.key}`)}
                        className='adminSider'
                    />
                </Sider>
            </ScrollArea>
            <Layout className='min-h-screen'>
                <ScrollArea className='h-screen'>
                    <div className='min-h-screen flex flex-col'>
                        <Header
                            style={{ padding: 0, background: colorBgContainer }}
                            className='flex items-center justify-between'
                        >
                            <Button
                                type='text'
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            <HeaderCustom />
                        </Header>
                        <Content className='mx-4 flex-1'>{children}</Content>
                        <Footer className='text-center bg-dark-4 text-white py-3.5'>
                            ShopWave ©{new Date().getFullYear()} Created by WebDev Ankit
                        </Footer>
                    </div>
                </ScrollArea>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;

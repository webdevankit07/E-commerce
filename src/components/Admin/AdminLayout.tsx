'use client';
import { ReactNode, useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { Metadata } from 'next';
import { AiOutlineDashboard } from 'react-icons/ai';
import { MdAddToPhotos } from 'react-icons/md';
import { FaShoppingCart, FaRegUser, FaClipboardList } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import { IoList } from 'react-icons/io5';
import { SiBrandfolder } from 'react-icons/si';
import { TbCategoryFilled } from 'react-icons/tb';
import { IoIosColorPalette } from 'react-icons/io';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { ScrollArea } from '../ui/scroll-area';
// import Image from 'next/image';
import HeaderCustom from './Dasboard/HeaderCustom';
import { useAppSelector } from '@/hooks/storeHooks';
import Loading from '../shared/Loading';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
};

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return { key, icon, children, label } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Dashboard', '/', <AiOutlineDashboard />),
    getItem('Customers', 'customers', <FaRegUser />),
    getItem('Catalog', 'catalog', <FaShoppingCart />, [
        getItem('Add Product', 'add-product', <MdAddToPhotos />),
        getItem('Product List', 'product-list', <IoList />),
        getItem('Brand', 'product-brand', <SiBrandfolder />),
        getItem('Category', 'product-category', <TbCategoryFilled />),
        getItem('Color', 'product-color', <IoIosColorPalette />),
    ]),
    getItem('Orders', 'orders', <FaClipboardList />),
    getItem('Enquiries', 'enquiries', <RiQuestionnaireFill />),
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
    const { user } = useAppSelector((state) => state.auth);
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        if (user?.role !== 'admin') {
            router.push('/');
        } else {
            router.push('/admin/dashboard');
        }
    }, [user, router]);

    if (user?.role === 'admin') {
        return (
            <Layout className='min-h-screen'>
                <ScrollArea className='h-screen'>
                    <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                        className='min-h-screen'
                        width={250}
                    >
                        <div
                            className='font-bold text-3xl text-white py-5 text-center adminLogo cursor-pointer'
                            onClick={() => router.push('/admin/dashboard')}
                        >
                            ShopWave
                        </div>
                        <Menu
                            theme='dark'
                            defaultSelectedKeys={['/']}
                            mode='inline'
                            items={items}
                            onClick={(key) => router.push(`/admin/dashboard/${key.key}`)}
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
                            <Content className='flex-1 bg-zinc-200'>
                                <div className='px-4'>{children}</div>
                            </Content>
                            <Footer className='text-center bg-dark-4 text-white py-3.5'>
                                ShopWave ©{new Date().getFullYear()} Created by WebDev Ankit
                            </Footer>
                        </div>
                    </ScrollArea>
                </Layout>
            </Layout>
        );
    } else {
        return <Loading />;
    }
};

export default AdminLayout;

'use client';
import { ReactNode, useState } from 'react';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu } from 'antd';
import { FaRegUser } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { ScrollArea } from '../ui/scroll-area';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import Loading from '../shared/Loading';
import CustomHeader from './CustomHeader';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return { key, icon, children, label } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Profile', 'profile', <FaRegUser />),
    getItem('Orders', 'orders', <RiShoppingBag3Fill />),
];

const ProfileLayout = ({ children }: { children: ReactNode }) => {
    const { user } = useAppSelector((state) => state.auth);
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    if (user?.role === 'admin') {
        return (
            <Layout className='min-h-screen'>
                <ScrollArea className='h-screen'>
                    <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                        className='min-h-screen hidden md:block'
                        width={250}
                    >
                        <div
                            className='font-bold text-3xl text-white py-5 text-center adminLogo cursor-pointer'
                            onClick={() => router.push('/')}
                        >
                            ShopWave
                        </div>
                        <Menu
                            theme='dark'
                            defaultSelectedKeys={['/my-account/profile']}
                            mode='inline'
                            items={items}
                            onClick={(key) => router.push(`/my-account/${key.key}`)}
                            className='adminSider'
                        />
                    </Sider>
                </ScrollArea>
                <Layout className='min-h-screen'>
                    <ScrollArea className='h-screen'>
                        <div className='min-h-screen flex flex-col'>
                            <Content className='flex-1 bg-slate-50'>
                                <CustomHeader />
                                <div className='px-4 pb-10'>{children}</div>
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

export default ProfileLayout;

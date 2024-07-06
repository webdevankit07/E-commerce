'use client';
import { ReactNode, useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
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
import { RiDiscountPercentFill, RiQuestionnaireFill } from 'react-icons/ri';
import { ScrollArea } from '../ui/scroll-area';
// import Image from 'next/image';
import HeaderCustom from './Dasboard/HeaderCustom';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import Loading from '../shared/Loading';
import toast from 'react-hot-toast';
import { getAllOrders } from '@/redux/features/order/orderSlice';
import { getAllBrands } from '@/redux/features/brand/brandSlice';
import { getAllCategories } from '@/redux/features/categories/categorySlice';
import { getAllColors } from '@/redux/features/color/colorSlice';
import { getAllusers } from '@/redux/features/customer/customerSlice';
import { getAllProducts } from '@/redux/features/product/productSlice';
import { getAllEnquiries } from '@/redux/features/enquiry/enquirySlice';
import { getAllCoupons } from '@/redux/features/coupon/couponSlice';

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
        getItem('Coupon', 'coupon', <RiDiscountPercentFill />),
    ]),
    getItem('Orders', 'orders', <FaClipboardList />),
    getItem('Enquiries', 'enquiries', <RiQuestionnaireFill />),
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
    const { user, isLoading } = useAppSelector((state) => state.auth);
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        (async () => {
            await dispatch(getAllusers());
            await dispatch(getAllProducts());
            await dispatch(getAllCategories());
            await dispatch(getAllBrands());
            await dispatch(getAllColors());
            await dispatch(getAllCoupons());
            await dispatch(getAllOrders());
            await dispatch(getAllEnquiries());
        })();
    }, [dispatch]);

    useEffect(() => {
        if (!isLoading && !user === null && user?.role !== 'admin') {
            router.push('/');
            toast.error('You are not Admin');
        } else if (user?.role === 'admin') {
            router.push('/admin/dashboard');
            toast.success('Welcom to Admin Dashboard');
        }
    }, [user, router, isLoading]);

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

'use client';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import ShowDate from '@/components/shared/ShowDate';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getAllOrders } from '@/redux/features/order/orderSlice';
import { useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';

const Order = () => {
    const { orders, isLoading } = useAppSelector((state) => state.order);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!orders || orders.length === 0) {
            dispatch(getAllOrders());
        }
    }, [dispatch, orders]);

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Customer', dataIndex: 'customer', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
        { title: 'Product', dataIndex: 'product', sorter: (a: any, b: any) => a.username.localeCompare(b.username) },
        { title: 'Amount', dataIndex: 'amount', sorter: (a: any, b: any) => a.role.length - b.role.length },
        { title: 'Date', dataIndex: 'date', sorter: (a: any, b: any) => a.role.length - b.role.length },
        { title: 'Actions', dataIndex: 'actions' },
    ];

    const dataSource = orders.map((order, index) => ({
        key: ++index,
        customer: `${order.orderby.firstname} ${order.orderby.lastname}`,
        product: order.products.map(({ product }) => (
            <>
                <p className='font-semibold'>{product.title}</p>
            </>
        )),
        amount: <p className='font-semibold'>&#8377;{order.paymentIntent.amount}</p>,
        date: <ShowDate timestamp={order.createdAt} />,
        actions: <Action productId={order._id} />,
    }));

    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Orders' }]} />
            {isLoading ? <Loading /> : <Table title='Orders' columns={columns} dataSource={dataSource} />}
        </div>
    );
};

const Action = ({ productId }: { productId: string }) => {
    return (
        <div className='flex gap-4'>
            <Button
                variant={'outline'}
                size={'sm'}
                className='flex items-center gap-1.5 bg-green-600/[.2] text-green-800 border-green-800 px-5 py-1 font-semibold'
            >
                <FiEdit />
                Edit
            </Button>
            <Button
                variant={'outline'}
                size={'sm'}
                className='flex items-center gap-1.5 bg-red-600/[.2] text-red-800 border-red-800 px-5 py-1 font-semibold'
            >
                <MdDeleteSweep />
                Delete
            </Button>
        </div>
    );
};

export default Order;

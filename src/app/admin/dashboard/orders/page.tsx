'use client';
import Actions from '@/components/Admin/Acion';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import ShowDate from '@/components/shared/ShowDate';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getAllOrders, updateOrderStatus } from '@/redux/features/order/orderSlice';
import { useEffect } from 'react';
import { Select, SelectValue, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import toast from 'react-hot-toast';

interface Statustype {
    status: string;
    orderId: string;
}

const Order = () => {
    const { orders, isLoading } = useAppSelector((state) => state.order);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!orders.length) {
            dispatch(getAllOrders());
        }
    }, [dispatch, orders]);

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Customer', dataIndex: 'customer', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
        { title: 'Product', dataIndex: 'product', sorter: (a: any, b: any) => a.username.localeCompare(b.username) },
        { title: 'Amount', dataIndex: 'amount', sorter: (a: any, b: any) => a.role.length - b.role.length },
        { title: 'Date', dataIndex: 'date', sorter: (a: any, b: any) => a.role.length - b.role.length },
        { title: 'Status', dataIndex: 'status' },
        { title: 'Actions', dataIndex: 'actions' },
    ];

    const handleDelete = () => {};

    const handleStateChange = async (value: Statustype) => {
        try {
            await dispatch(updateOrderStatus({ status: value.status, orderId: value.orderId }));
            toast.success('Order status changed');
        } catch (error) {
            console.log(error);
        }
    };

    const dataSource = orders.map((order, index) => ({
        key: ++index,
        customer: `${order.orderby.firstname} ${order.orderby.lastname}`,
        product: order.products.map(({ product }) => (
            <>
                <p className='font-semibold'>{product ? product.title : 'Product not available'}</p>
            </>
        )),
        amount: <p className='font-semibold'>&#8377;{order.paymentIntent.amount}</p>,
        date: <ShowDate timestamp={order.createdAt} />,
        status: <Status status={order.orderStatus} onChange={handleStateChange} orderId={order._id} />,
        actions: (
            <Actions
                Id={order._id}
                handleDelete={handleDelete}
                dialougeDescription='This action cannot be undone. This will permanently delete this Order.'
            />
        ),
    }));

    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Orders' }]} />
            {isLoading ? <Loading /> : <Table title='Orders' columns={columns} dataSource={dataSource} />}
        </div>
    );
};

const Status = ({
    status,
    onChange,
    orderId,
}: {
    status: string;
    orderId: string;
    onChange: (value: Statustype) => void;
}) => {
    return (
        <Select onValueChange={(val) => onChange({ status: val, orderId })}>
            <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder={status} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value='Submitted'>Not Processed</SelectItem>
                    <SelectItem value='Contacted'>Cash on Delivery</SelectItem>
                    <SelectItem value='In Progress'>Processing</SelectItem>
                    <SelectItem value='Dispatched'>Dispatched</SelectItem>
                    <SelectItem value='Delivered'>Delivered</SelectItem>
                    <SelectItem value='Cancelled'>Cancelled</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default Order;

'use client';
import { HiMiniArrowTrendingDown, HiMiniArrowTrendingUp } from 'react-icons/hi2';
import Chart from '@/components/Admin/Dasboard/Chart';
import DashboardTable from '@/components/Admin/Dasboard/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { useEffect } from 'react';
import { getAllOrders } from '@/redux/features/order/orderSlice';
import Loading from '@/components/shared/Loading';
import Table from '@/components/Admin/Table';
import ShowDate from '@/components/shared/ShowDate';
import { Button } from '@/components/ui/button';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';

const AdminDashBoard = () => {
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
        <div className='pb-5'>
            <BreadCrumb BreadCrumbs={[{ name: 'Admin DashBoard' }]} />
            <h3 className='font-semibold text-2xl mb-5'>DashBoard</h3>
            <div className='flex items-center justify-between flex-wrap gap-3'>
                <div className='flex flex-grow gap-4 justify-between items-center bg-white rounded-md py-5 px-4 shadow *:space-y-2'>
                    <div>
                        <p className='font-medium text-slate-600'>Total</p>
                        <h2 className='font-bold text-xl'>$100</h2>
                    </div>
                    <div>
                        <h2 className='flex items-center justify-end gap-1 font-semibold text-end text-xl'>
                            {<HiMiniArrowTrendingUp className='text-green-500' /> || (
                                <HiMiniArrowTrendingDown className='text-red-500' />
                            )}
                            <span>36%</span>
                        </h2>
                        <p className='font-medium text-slate-600'>Compared to April 2024</p>
                    </div>
                </div>
                <div className='flex flex-grow gap-4 justify-between items-center bg-white rounded-md py-5 px-4 shadow *:space-y-2'>
                    <div>
                        <p className='font-medium text-slate-600'>Total</p>
                        <h2 className='font-bold text-xl'>$100</h2>
                    </div>
                    <div>
                        <h2 className='flex items-center justify-end gap-1 font-semibold text-end text-xl'>
                            {<HiMiniArrowTrendingUp className='text-green-500' /> || (
                                <HiMiniArrowTrendingDown className='text-red-500' />
                            )}
                            <span>36%</span>
                        </h2>
                        <p className='font-medium text-slate-600'>Compared to April 2024</p>
                    </div>
                </div>
                <div className='flex flex-grow gap-4 justify-between items-center bg-white rounded-md py-5 px-4 shadow *:space-y-2'>
                    <div>
                        <p className='font-medium text-slate-600'>Total</p>
                        <h2 className='font-bold text-xl'>$100</h2>
                    </div>
                    <div>
                        <h2 className='flex items-center justify-end gap-1 font-semibold text-end text-xl'>
                            {<HiMiniArrowTrendingUp className='text-green-500' /> || (
                                <HiMiniArrowTrendingDown className='text-red-500' />
                            )}
                            <span>36%</span>
                        </h2>
                        <p className='font-medium text-slate-600'>Compared to April 2024</p>
                    </div>
                </div>
            </div>
            <div className='max-w-[250]'>
                <Chart />
            </div>
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
                onClick={(e) => {}}
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

export default AdminDashBoard;

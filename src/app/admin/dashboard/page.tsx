'use client';
import { HiMiniArrowTrendingDown, HiMiniArrowTrendingUp } from 'react-icons/hi2';
import Chart from '@/components/Admin/Dasboard/Chart';
import BreadCrumb from '@/components/shared/Breadcrumb';
import { useAppSelector } from '@/hooks/storeHooks';
import Loading from '@/components/shared/Loading';
import Table from '@/components/Admin/Table';
import ShowDate from '@/components/shared/ShowDate';

const AdminDashBoard = () => {
    const { orders, isLoading } = useAppSelector((state) => state.order);

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Customer', dataIndex: 'customer', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
        { title: 'Product', dataIndex: 'product', sorter: (a: any, b: any) => a.username.localeCompare(b.username) },
        { title: 'Amount', dataIndex: 'amount', sorter: (a: any, b: any) => a.role.length - b.role.length },
        { title: 'Date', dataIndex: 'date', sorter: (a: any, b: any) => a.role.length - b.role.length },
    ];

    const dataSource = orders.map((order, index) => ({
        key: ++index,
        customer: `${order.user.firstname} ${order.user.lastname}`,
        product: order.orderItems.map(({ product }) => (
            <>
                <p className='font-semibold'>{product ? product.title : 'not Available'}</p>
            </>
        )),
        amount: (
            <p className='font-semibold'>
                &#8377;{order.totalPriceAfterDiscount !== 0 ? order.totalPriceAfterDiscount : order.totalPrice}
            </p>
        ),
        date: <ShowDate timestamp={order.createdAt} />,
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

export default AdminDashBoard;

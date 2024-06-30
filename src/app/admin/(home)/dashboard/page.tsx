'use client';
import { HiMiniArrowTrendingDown, HiMiniArrowTrendingUp } from 'react-icons/hi2';
import { Column } from '@ant-design/charts';
import { Table } from 'antd';
import { Key } from 'react';

const columns = [
    { title: 'SNo', dataIndex: 'key' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Product', dataIndex: 'product' },
    { title: 'Address', dataIndex: 'address' },
];
const ordersData: { key: Key; name: string; product: number; address: string }[] = [];
for (let i = 0; i < 46; i++) {
    ordersData.push({
        key: i,
        name: `Edward King ${i}`,
        product: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

const AdminDashBoard = () => {
    const data = [
        { type: 'Jan', sales: 38 },
        { type: 'Feb', sales: 52 },
        { type: 'Mar', sales: 61 },
        { type: 'Apr', sales: 110 },
        { type: 'May', sales: 48 },
        { type: 'Jun', sales: 38 },
        { type: 'July', sales: 80 },
        { type: 'Aug', sales: 15 },
        { type: 'Sept', sales: 45 },
        { type: 'Oct', sales: 57 },
        { type: 'Nov', sales: 76 },
        { type: 'Dec', sales: 33 },
    ];
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        label: { style: { fill: '#FFFFFF', opacity: 1 } },
        xAxis: { label: { autoHide: true, autoRotate: false } },
        meta: { type: { alias: 'Month' }, sales: { alias: 'Income' } },
    };
    return (
        <div className='py-5'>
            <h3 className='font-bold text-2xl mb-5'>DashBoard</h3>
            <div className='flex items-center justify-between flex-wrap gap-3'>
                <div className='flex flex-grow gap-4 justify-between items-center bg-white rounded-md py-3 px-4 shadow *:space-y-2'>
                    <div>
                        <p className='font-medium text-slate-600'>Total</p>
                        <h2 className='font-bold text-xl'>$100</h2>
                    </div>
                    <div>
                        <h2 className='flex items-center justify-end gap-1 font-semibold text-end text-xl'>
                            <HiMiniArrowTrendingUp className='text-green-500' />
                            {/* <HiMiniArrowTrendingDown className='text-red-500' /> */}
                            <span>36%</span>
                        </h2>
                        <p className='font-medium text-slate-600'>Compared to April 2024</p>
                    </div>
                </div>
                <div className='flex flex-grow gap-4 justify-between items-center bg-white rounded-md py-3 px-4 shadow *:space-y-2'>
                    <div>
                        <p className='font-medium text-slate-600'>Total</p>
                        <h2 className='font-bold text-xl'>$100</h2>
                    </div>
                    <div>
                        <h2 className='flex items-center justify-end gap-1 font-semibold text-end text-xl'>
                            <HiMiniArrowTrendingUp className='text-green-500' />
                            {/* <HiMiniArrowTrendingDown className='text-red-500' /> */}
                            <span>36%</span>
                        </h2>
                        <p className='font-medium text-slate-600'>Compared to April 2024</p>
                    </div>
                </div>
                <div className='flex flex-grow gap-4 justify-between items-center bg-white rounded-md py-3 px-4 shadow *:space-y-2'>
                    <div>
                        <p className='font-medium text-slate-600'>Total</p>
                        <h2 className='font-bold text-xl'>$100</h2>
                    </div>
                    <div>
                        <h2 className='flex items-center justify-end gap-1 font-semibold text-end text-xl'>
                            <HiMiniArrowTrendingUp className='text-green-500' />
                            {/* <HiMiniArrowTrendingDown className='text-red-500' /> */}
                            <span>36%</span>
                        </h2>
                        <p className='font-medium text-slate-600'>Compared to April 2024</p>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <h3 className='mb-10 font-bold text-3xl'>Income Statics</h3>
                <div className='w-full'>
                    <Column {...config} className={'max-w-[90%]'} />
                </div>
            </div>
            <div className='mt-4'>
                <h3 className='mb-10 font-bold text-3xl'>Recent Orders</h3>
                <div>
                    <Table columns={columns} dataSource={ordersData} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashBoard;

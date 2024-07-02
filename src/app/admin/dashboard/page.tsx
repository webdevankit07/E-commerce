'use client';
import { HiMiniArrowTrendingDown, HiMiniArrowTrendingUp } from 'react-icons/hi2';
import Chart from '@/components/Admin/Dasboard/Chart';
import DashboardTable from '@/components/Admin/Dasboard/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';

const AdminDashBoard = () => {
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
            <DashboardTable />
        </div>
    );
};

export default AdminDashBoard;

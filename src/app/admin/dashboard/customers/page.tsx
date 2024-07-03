'use client';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getAllusers } from '@/redux/features/customer/customerSlice';
import { useEffect } from 'react';

const Customers = () => {
    const { customers, isLoading } = useAppSelector((state) => state.customer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!customers || customers.length === 0) {
            dispatch(getAllusers());
        }
    }, [dispatch, customers]);

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Name', dataIndex: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
        { title: 'Username', dataIndex: 'username', sorter: (a: any, b: any) => a.username.localeCompare(b.username) },
        { title: 'Email', dataIndex: 'email', sorter: (a: any, b: any) => a.email.localeCompare(b.email) },
        { title: 'Mobile no.', dataIndex: 'mobile' },
        { title: 'Role', dataIndex: 'role', sorter: (a: any, b: any) => a.role.length - b.role.length },
    ];

    const dataSource = customers.map((customer, index) => ({
        key: ++index,
        name: `${customer.firstname} ${customer.lastname}`,
        email: customer.email,
        username: customer.username,
        mobile: customer.mobile,
        role: <RoleBadge role={customer.role} />,
    }));

    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Customers' }]} />
            {isLoading ? <Loading /> : <Table title='Customers' columns={columns} dataSource={dataSource} />}
        </div>
    );
};

const RoleBadge = ({ role }: { role: 'admin' | 'user' }) => {
    return (
        <div className='w-full text-center'>
            <Badge
                variant={'outline'}
                className={`bg-red-500/[.3] border-red-500 text-red-700 capitalize ${
                    role === 'admin' && 'bg-green-500/[.3] border-green-800 text-green-800'
                }`}
            >
                {role}
            </Badge>
        </div>
    );
};

export default Customers;

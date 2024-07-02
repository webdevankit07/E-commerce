'use client';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getAllusers } from '@/redux/features/customer/customerSlice';
import { useEffect } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

const Customers = () => {
    const { customers, isLoading } = useAppSelector((state) => state.customer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllusers());
    }, [dispatch]);

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Mobile no.', dataIndex: 'mobile' },
        { title: 'Role', dataIndex: 'role' },
    ];

    const dataSource = customers.map((customer, index) => ({
        key: ++index,
        name: `${customer.firstname} ${customer.lastname}`,
        email: customer.email,
        mobile: customer.mobile,
        role: customer.role,
    }));

    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Customers' }]} />
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Table title='Customers' columns={columns} dataSource={dataSource} />
                </>
            )}
        </div>
    );
};

export default Customers;

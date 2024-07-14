'use client';
import FilterButtons from '@/components/My Account/order/FilterButtons';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import NoData from '@/components/shared/NoData';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getMyOrders } from '@/redux/features/order/orderSlice';
import { OrderType } from '@/types';
import { useEffect, useState } from 'react';
import OrderCard from './OrderCard';

const MyOrders = () => {
    const { myOrders } = useAppSelector((state) => state.order);
    const [selectedBtnFilter, setSelectedBtnFilter] = useState('All');
    const [orders, setOrders] = useState<OrderType[]>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            if (!myOrders || !myOrders.length) {
                await dispatch(getMyOrders());
            }
        })();
        if (myOrders && myOrders.length) {
            const filterOrders = myOrders.filter((order) => {
                if (selectedBtnFilter === 'All') {
                    return order;
                } else {
                    return order.orderStatus === selectedBtnFilter;
                }
            });
            setOrders(filterOrders);
        }
    }, [myOrders, dispatch, selectedBtnFilter]);

    console.log(myOrders);

    return !myOrders ? (
        <Loading />
    ) : (
        <div className='pt-2'>
            <BreadCrumb BreadCrumbs={[{ name: 'My Account' }, { name: 'Orders' }]} />
            <div className='mt-5'>
                <FilterButtons selectedBtnFilter={selectedBtnFilter} setSelectedBtnFilter={setSelectedBtnFilter} />

                {!orders?.length ? (
                    <NoData headLine='No Orders Found' />
                ) : (
                    <div>
                        {orders.map((order) => (
                            <OrderCard order={order} key={order._id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;

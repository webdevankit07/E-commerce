import { OrderType } from '@/types';
import { useState } from 'react';
import { formateOrderDate, formatePrice } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import OrderItem from './OrderItem';
import { Button } from '@/components/ui/button';

interface OrderCardProps {
    order: OrderType;
}

const OrderCard = ({ order }: OrderCardProps) => {
    const [viewAllItems, setViewAllitems] = useState(false);

    const orderId = order.paymentInfo.razorpayOrderId.slice(6);
    const totalProduct = order.orderItems.reduce((total, item) => total + item.count, 0);

    return (
        <div className='mt-8 pl-5 ' key={order._id}>
            <div className='p-5 border border-slate-500 rounded-xl max-w-[1000px] transition-all saturate-200 ease-in-out'>
                <div className='flex gap-2 items-center'>
                    <div>
                        <div className='flex items-center gap-1.5 bg-yellow-300/[.5] px-3 py-1 rounded-2xl'>
                            <div className='h-2 w-2 rounded-full bg-orange-800'></div>
                            <span className='text-orange-800 font-medium'>{order.orderStatus}</span>
                        </div>
                    </div>
                    <span className='h-5 rounded-full w-[1px] ml-1 bg-slate-500'></span>
                    <div className='font-medium text-slate-600'>{formateOrderDate(order.createdAt)}</div>
                </div>
                {!viewAllItems ? (
                    <div>
                        <div className='flex items-center gap-5 mt-4'>
                            <Link
                                href={`/products/${order.orderItems[0].product._id}`}
                                className='border p-1 rounded-md'
                            >
                                <Image
                                    src={order.orderItems[0].product.images[0].url}
                                    height={100}
                                    width={100}
                                    alt='as'
                                />
                            </Link>
                            <div>
                                <div className='text-orange-800 font-bold'>
                                    Order ID: {order.paymentInfo.razorpayOrderId.slice(6)}
                                </div>
                                <div className='font-semibold text-slate-900'>
                                    <Link href={`/products/${order.orderItems[0].product._id}`} className='space-y-1'>
                                        {order.orderItems[0].product.title}{' '}
                                    </Link>
                                    {order.orderItems.length > 1 && (
                                        <span
                                            className='text-orange-800 font-bold cursor-pointer'
                                            onClick={() => setViewAllitems(true)}
                                        >
                                            & {order.orderItems.length - 1} more items.
                                        </span>
                                    )}
                                    <div className='flex items-center gap-10 font-bold pt-2 text-slate-900'>
                                        <div className='font-bold'>
                                            <span>Price: </span>
                                            {formatePrice(order.orderItems[0].price)}
                                        </div>
                                        <div>Quantity: {order.orderItems[0].count}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {order.orderItems.length > 1 && (
                            <div className='flex items-center gap-10 ml-32 font-bold pt-2 text-slate-900'>
                                <div className='font-bold'>
                                    <span>Total Price: </span>
                                    {formatePrice(
                                        order.totalPriceAfterDiscount !== 0
                                            ? order.totalPriceAfterDiscount
                                            : order.totalPrice
                                    )}
                                </div>
                                <div>Total Quantity: {totalProduct}</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {order.orderItems.map((item) => (
                            <OrderItem item={item} orderId={orderId} key={item._id} />
                        ))}
                        <div className='flex items-center gap-10 ml-32 font-bold pt-2 text-slate-900'>
                            <div className='font-bold'>
                                <span>Total Price: </span>
                                {formatePrice(
                                    order.totalPriceAfterDiscount !== 0
                                        ? order.totalPriceAfterDiscount
                                        : order.totalPrice
                                )}
                            </div>
                            <div>Total Quantity: {totalProduct}</div>
                        </div>
                        <Button
                            variant={'link'}
                            onClick={() => setViewAllitems(false)}
                            className='ml-auto block text-orange-800'
                        >
                            See less
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderCard;

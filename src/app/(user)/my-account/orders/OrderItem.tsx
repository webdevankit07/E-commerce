import { formatePrice } from '@/lib/utils';
import { CartProductType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface OrderItemPropsType {
    item: CartProductType;
    orderId: string;
}

const OrderItem = ({ item, orderId }: OrderItemPropsType) => {
    return (
        <div className='flex items-center gap-5 mt-4'>
            <Link href={`/products/${item.product._id}`} className='border p-1 rounded-md'>
                <Image src={item.product.images[0].url} height={100} width={100} alt='as' />
            </Link>
            <div>
                <div className='text-orange-800 font-bold'>Order ID: {orderId}</div>
                <div className='font-semibold text-slate-900'>
                    <Link href={`/products/${item.product._id}`} className='space-y-1'>
                        {item.product.title}{' '}
                    </Link>
                </div>
                <div className='flex items-center gap-10 font-bold pt-2 text-slate-900'>
                    <div className='font-bold'>
                        <span>Price: </span>
                        {formatePrice(item.price)}
                    </div>
                    <div>Quantity: {item.count}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;

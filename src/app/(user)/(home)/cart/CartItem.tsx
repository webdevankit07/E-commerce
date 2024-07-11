import SetCartProductQuantity from '@/components/cart/setCartProductQuantity';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { useAppDispatch } from '@/hooks/storeHooks';
import useDebounce from '@/hooks/useDebounce';
import { formatePrice } from '@/lib/utils';
import { deleteCartProduct, updateCartProduct } from '@/redux/features/cart/cartSlice';
import { CartProductType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

const CartItem = ({ cartProduct }: { cartProduct: CartProductType }) => {
    const [quantity, setQuantity] = useState(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setQuantity(cartProduct.count);
    }, [cartProduct]);

    const updateCart = useDebounce(async (val) => {
        await dispatch(
            updateCartProduct({
                productId: cartProduct._id,
                cartData: { count: val, color: cartProduct.color },
            })
        );
    }, 2000);

    const { product } = cartProduct;
    const productPrice = formatePrice(product.price);
    const productTotalPrice = formatePrice(product.price * quantity);

    return (
        <TableRow>
            <TableCell className='pr-10'>
                <Link href={`/products/${cartProduct.product._id}`} className='flex items-center gap-5'>
                    <div>
                        <Image src={cartProduct.product.images[0].url} width={80} height={80} alt='cartProduct-img' />
                    </div>
                    <div className='space-y-1 max-w-[450px]'>
                        <p className='font-medium'>{cartProduct.product.title}</p>
                        {cartProduct.color && (
                            <div className='flex items-center'>
                                <span className='font-medium mr-2'>Color: </span>
                                <div
                                    style={{ backgroundColor: `${cartProduct.color}` }}
                                    className='w-5 h-5 inline-block rounded-full'
                                ></div>
                            </div>
                        )}
                    </div>
                </Link>
            </TableCell>
            <TableCell className='font-medium text-center'>{productPrice}</TableCell>
            <TableCell className='text-center'>
                <SetCartProductQuantity quantity={quantity} setQuantity={setQuantity} updateCart={updateCart} />
            </TableCell>
            <TableCell className='text-center'>
                <Button
                    size={'sm'}
                    variant={'destructive'}
                    className='space-x-1 rounded-sm'
                    onClick={() => dispatch(deleteCartProduct(cartProduct._id))}
                >
                    <MdDeleteForever className='text-lg' />
                    <span>Delete</span>
                </Button>
            </TableCell>
            <TableCell className='text-right font-medium'>{productTotalPrice}</TableCell>
        </TableRow>
    );
};

export default CartItem;

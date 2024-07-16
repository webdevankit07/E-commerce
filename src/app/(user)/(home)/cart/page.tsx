'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import CartItem from './CartItem';
import { Button } from '@/components/ui/button';
import { MdArrowBack } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import Loading from '@/components/shared/Loading';
import { useEffect } from 'react';
import { emptyCart, getMyCart } from '@/redux/features/cart/cartSlice';
import { formatePrice } from '@/lib/utils';
import NoData from '@/components/shared/NoData';

const Cart = () => {
    const { cart, isLoading } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!cart) {
            dispatch(getMyCart());
        }
    }, [dispatch, cart]);

    return isLoading ? (
        <Loading />
    ) : (
        <div className='bg-slate-100 pb-10'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Cart' }]} />
                {!cart || !cart.products.length ? (
                    <NoData headLine='No Cart Product Available' />
                ) : (
                    <div className='bg-white p-5 rounded-md shadow-md mt-5'>
                        <Table>
                            <TableHeader>
                                <TableRow className='*:text-gray-800 *:font-bold *:text-[16px]'>
                                    <TableHead className='w-[600px]'>Product</TableHead>
                                    <TableHead className='text-center'>Price</TableHead>
                                    <TableHead className='text-center'>Quantity</TableHead>
                                    <TableHead className='text-center'>Remove</TableHead>
                                    <TableHead className='text-right'>Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.products.map((item) => (
                                    <CartItem cartProduct={item} key={item._id} />
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow className='max-sm:hidden'>
                                    <TableCell colSpan={4} className='text-lg font-semibold'>
                                        Subtotal
                                    </TableCell>
                                    <TableCell className='text-lg font-semibold text-right'>
                                        {formatePrice(cart.cartTotal)}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <div className='border-t-[1.5px] border-slate-200 py-4 flex justify-between w-full'>
                            <Button size={'sm'} onClick={() => dispatch(emptyCart())} className='max-sm:hidden'>
                                Clear Cart
                            </Button>
                            <div className='flex flex-col items-start gap-2 text-slate-700 font-medium text-sm max-sm:w-full'>
                                <div className='flex items-center justify-between w-full py-5'>
                                    <div className='text-lg font-semibold'>Subtotal</div>
                                    <div className='text-lg font-semibold text-right'>
                                        {formatePrice(cart.cartTotal)}
                                    </div>
                                </div>
                                <p className='max-sm:text-xs'>Taxes and shipping calculate at checkout</p>
                                <Link href={'/checkout'} className='w-full block'>
                                    <Button
                                        variant={'outline'}
                                        className='py-5 px-5 w-full text-lg hover:bg-black hover:text-white'
                                    >
                                        Checkout
                                    </Button>
                                </Link>
                                <Button
                                    size={'sm'}
                                    variant={'outline'}
                                    className='py-5 px-5 w-full text-lg hover:bg-black hover:text-white'
                                    onClick={() => dispatch(emptyCart())}
                                >
                                    Clear Cart
                                </Button>
                                <Link
                                    href={'/products'}
                                    className='flex items-center font-normal gap-1 mt-2 hover:text-blue-700 hover:underline'
                                >
                                    <MdArrowBack />
                                    <span>Continue Shopping</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Cart;

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

const Cart = () => {
    const { cart, isLoading } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!cart) {
            dispatch(getMyCart());
        }
    }, [dispatch, cart]);

    return isLoading || !cart ? (
        <Loading />
    ) : (
        <div className='bg-slate-100 pb-10'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Cart' }]} />
                {cart.products.length ? (
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
                                <TableRow>
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
                            <Button size={'sm'} onClick={() => dispatch(emptyCart())}>
                                Clear Cart
                            </Button>
                            <div className='flex flex-col items-start gap-2 text-slate-700 font-medium text-sm'>
                                <p>Taxes and shipping calculate at checkout</p>
                                <Link href={'/checkout'} className='w-full block'>
                                    <Button
                                        variant={'outline'}
                                        className='py-5 px-5 w-full text-lg hover:bg-black hover:text-white'
                                    >
                                        Checkout
                                    </Button>
                                </Link>
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
                ) : (
                    <div className='text-center wf h-72'>No Cart Product Available</div>
                )}
            </Container>
        </div>
    );
};

export default Cart;

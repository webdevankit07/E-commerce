'use client';
import Link from 'next/link';
import { BsHeart } from 'react-icons/bs';
import { TfiReload } from 'react-icons/tfi';
import { FaRegUser, FaRegUserCircle } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { userLogout } from '@/redux/features/auth/authSlice';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCart } from '@/redux/features/cart/cartSlice';
import { formatePrice } from '@/lib/utils';

const CustomHeader = () => {
    const { cart } = useAppSelector((state) => state.cart);
    const { user, isError } = useAppSelector((state) => state.auth);
    const [search, setSearch] = useState('');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!cart) {
            dispatch(getCart());
        }
    }, [dispatch, cart]);

    let cartProductCount = '0';
    if (cart) {
        cartProductCount = cart.totalCartProducts > 9 ? `${cart?.totalCartProducts}` : `${cart?.totalCartProducts}`;
    }

    const handleSignOut = async () => {
        await dispatch(userLogout());
        if (!isError) {
            router.refresh();
        }
    };

    return (
        <div className='py-3 px-5 bg-dark-1 text-slate-100'>
            <div className='flex justify-end gap-5 items-center pr-16'>
                {user && (
                    <div className='flex justify-between items-center gap-10'>
                        <Link href={'/compare-products'} className='flex items-center gap-3 hover:text-slate-100'>
                            <TfiReload className='text-2xl' />
                            <p className='text-xs'>
                                Compare <br /> Products
                            </p>
                        </Link>
                        <Link href={'/wishlist'} className='flex items-center gap-3 hover:text-slate-100'>
                            <BsHeart className='text-2xl' />
                            <p className='text-xs'>
                                Favourite <br /> Wishlist
                            </p>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex items-center gap-3 text-start'>
                                <FaRegUserCircle className='text-3xl' />
                                <p className='text-xs'>
                                    {`${user.firstname} ${user.lastname}`} <br /> {user.email}
                                </p>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='min-w-[150px] mt-3 *:cursor-pointer'>
                                <DropdownMenuItem onClick={() => router.push('/my-account/profile')}>
                                    View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push('/my-account/orders')}>
                                    My Orders
                                </DropdownMenuItem>
                                {user.role === 'admin' && (
                                    <DropdownMenuItem>
                                        <Link href={'/admin/dashboard/'}>Dashboard</Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link href={'/cart'} className='hover:text-slate-100'>
                            <div className='flex items-center justify-center gap-3 text-sm space-y-1'>
                                <div className='relative'>
                                    <GiShoppingCart className='text-3xl text-yellow-1' />
                                    <p className='bg-white absolute text-xs p-1 -top-1 -right-1 w-5 h-5 text-black flex items-center justify-center rounded-full text-center font-medium'>
                                        {cartProductCount}
                                    </p>
                                </div>
                            </div>
                            <p className='text-center text-sm'>
                                {cart ? formatePrice(cart.cartTotal) : <>&#x20B9;00.00</>}
                            </p>
                        </Link>
                    </div>
                )}
            </div>
            <div className='flex gap-6 items-center justify-end pr-16'>
                {!user && (
                    <Link href={'/sign-in'} className='flex items-center gap-3'>
                        <FaRegUser className='text-2xl' />
                        <p className='text-xs text-nowrap'>
                            Log in <br /> My Account
                        </p>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CustomHeader;

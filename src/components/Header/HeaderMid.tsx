'use client';
import Container from '../shared/Container';
import Link from 'next/link';
import { BsHeart, BsSearch } from 'react-icons/bs';
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
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { getMyCart } from '@/redux/features/cart/cartSlice';
import { formatePrice } from '@/lib/utils';

const HeaderMid = () => {
    const { cart } = useAppSelector((state) => state.cart);
    const { user, isError } = useAppSelector((state) => state.auth);
    const [search, setSearch] = useState('');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!cart) {
            dispatch(getMyCart());
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
        <div className='py-3'>
            <Container>
                <div className='flex justify-between gap-5 items-center'>
                    <div className='flex items-center justify-between gap-16 w-full max-w-[900px] mr-10'>
                        <h2 className='text-2xl font-semibold'>
                            <Link href={'/'}>ShopWave</Link>
                        </h2>
                        <div className='flex justify-center items-center rounded-sm overflow-hidden w-full'>
                            <input
                                type='text'
                                className='py-2 px-3 w-full focus:outline-none text-black'
                                placeholder='Search Product Here...'
                                onChange={debounce((e) => {
                                    setSearch(e.target.value);
                                    if (pathname === '/products') {
                                        router.push(`/products?search=${e.target.value}`);
                                    }
                                }, 2000)}
                            />
                            <span
                                className='bg-yellow-1 text-black p-3 cursor-pointer group'
                                onClick={() => router.push(`/products?search=${search}`)}
                            >
                                <BsSearch className='group-hover:scale-125 transition-all duration-200 ease-in-out' />
                            </span>
                        </div>
                    </div>
                    <div>
                        {user && (
                            <div className='flex justify-between items-center gap-8'>
                                <Link href={'/compare-products'} className='flex items-center gap-3'>
                                    <TfiReload className='text-2xl' />
                                    <p className='text-xs'>
                                        Compare <br /> Products
                                    </p>
                                </Link>
                                <Link href={'/wishlist'} className='flex items-center gap-3'>
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
                            </div>
                        )}
                    </div>
                    <div className='flex gap-6'>
                        {!user && (
                            <Link href={'/sign-in'} className='flex items-center gap-3'>
                                <FaRegUser className='text-2xl' />
                                <p className='text-xs text-nowrap'>
                                    Log in <br /> My Account
                                </p>
                            </Link>
                        )}
                        <Link href={'/cart'}>
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
                </div>
            </Container>
        </div>
    );
};

export default HeaderMid;

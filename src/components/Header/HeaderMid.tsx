'use client';
import Container from '../shared/Container';
import Link from 'next/link';
import { BsHeart, BsSearch } from 'react-icons/bs';
import { TfiReload } from 'react-icons/tfi';
import { FaRegUser, FaRegUserCircle } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { userLogout } from '@/redux/features/auth/authSlice';
import { usePathname, useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { getCart } from '@/redux/features/cart/cartSlice';
import { formatePrice } from '@/lib/utils';
import MidHeaderActions from './MidHeaderActions';

const HeaderMid = () => {
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

    return (
        <div className='py-3'>
            <Container>
                <div className='flex items-center justify-between gap-8'>
                    <div className={`flex xl:flex-row justify-between gap-5 items-center w-full ${user && 'flex-col'}`}>
                        <div className='flex items-center justify-between gap-8 max-md:py-2 md:gap-16 w-full max-w-[900px] lg:mr-10'>
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
                        <div className='hidden md:block'>
                            {user && <MidHeaderActions cartProductCount={cartProductCount} />}
                        </div>
                    </div>
                    {!user && (
                        <Link href={'/sign-in'} className='hidden md:flex items-center gap-3 mr-5'>
                            <FaRegUser className='text-2xl' />
                            <p className='text-xs text-nowrap'>
                                Log in <br /> My Account
                            </p>
                        </Link>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default HeaderMid;

'use client';
import Link from 'next/link';
import Container from '../shared/Container';
import { RiArrowDownSLine, RiLoginCircleFill } from 'react-icons/ri';
import { CgMenuGridR } from 'react-icons/cg';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getAllCategories } from '@/redux/features/categories/categorySlice';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TbMenuOrder } from 'react-icons/tb';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { userLogout } from '@/redux/features/auth/authSlice';
import { IoMdHome } from 'react-icons/io';
import { IoCall, IoCart, IoStorefrontSharp } from 'react-icons/io5';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { FaArrowsRotate } from 'react-icons/fa6';
import { MdFavorite } from 'react-icons/md';
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { Button } from '../ui/button';

interface ListItemProps {
    name: string;
    url: string;
    setOpen: (value: boolean) => void;
}

const HeaderBottom = () => {
    const { categories } = useAppSelector((state) => state.category);
    const { user } = useAppSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!categories.length) {
            dispatch(getAllCategories());
        }
    }, [categories, dispatch]);

    const dropdownTrigger = useRef(null);
    const dropdownMenu = useRef(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (e.target !== dropdownTrigger.current && e.target !== dropdownMenu.current) {
            setOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='bg-dark-3 '>
            <Container>
                <div className={`flex items-center py-3 gap-5`}>
                    <div className='relative'>
                        <div
                            className='hidden md:flex items-center gap-5 cursor-pointer'
                            ref={dropdownTrigger}
                            onClick={() => setOpen(!open)}
                        >
                            <CgMenuGridR className='-mr-3 text-xl' />
                            Shop category
                            <RiArrowDownSLine
                                className={`text-lg  ${
                                    open
                                        ? 'rotate-180 transition ease-in-out duration-500'
                                        : 'rotate-0 transition ease-in-out duration-500'
                                }`}
                            />
                        </div>
                        <div
                            className={`absolute px-2 py-2 z-[999999] rounded-sm bg-white text-slate-950 drop-shadow-xl left-4 top-10 transition duration-150 ease-in-out ${
                                open ? 'scale-1 opacity-100' : 'scale-0 opacity-0'
                            }`}
                            ref={dropdownMenu}
                        >
                            <ul>
                                <ListItem name='ALL' setOpen={setOpen} url='/products' />
                                {categories &&
                                    categories?.map((category) => (
                                        <ListItem
                                            name={category.title}
                                            setOpen={setOpen}
                                            url={`/products?category=${category.title}`}
                                            key={category._id}
                                        />
                                    ))}
                            </ul>
                        </div>
                    </div>
                    <div className='md:space-x-3 hidden md:block md:border-l-2 md:pl-5 *:py-2 *:px-3 *:uppercase *:text-sm *:tracking-[0.3]'>
                        <Link href={'/'}>Home</Link>
                        <Link href={'/products'}>Our Store</Link>
                        <Link href={'/contact'}>Contact</Link>
                        <Link href={'/my-account/orders'}>My Orders</Link>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex md:hidden outline-none items-center gap-3 text-start w-full'>
                            <div className='flex items-center justify-between border w-full rounded py-2 px-5 -ml-2.5'>
                                <span>Menu</span>
                                <TbMenuOrder />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={`min-w-[90vw] md:hidden mt-3 py-3 px-3 ${!user && 'ml-4'}`}>
                            <Link href={'/'}>
                                <DropdownMenuItem className='flex items-center gap-3 py-2'>
                                    <IoMdHome size={15} className='text-gray-700' />
                                    <span>Home</span>
                                </DropdownMenuItem>
                            </Link>
                            <Link href={'/products'}>
                                <DropdownMenuItem className='flex items-center gap-3 py-2'>
                                    <IoStorefrontSharp size={15} className='text-gray-700' />
                                    <span>Our Store</span>
                                </DropdownMenuItem>
                            </Link>
                            {user && (
                                <>
                                    <Link href={'/my-account/profile'}>
                                        <DropdownMenuItem className='flex items-center gap-3 py-2'>
                                            <FaUser size={15} className='text-gray-700' />
                                            <span>View Profile</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href={'/cart'}>
                                        <DropdownMenuItem className='flex items-center gap-3 py-2'>
                                            <IoCart size={15} className='text-gray-700' />
                                            <span>Cart</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href={'/my-account/orders'}>
                                        <DropdownMenuItem className='flex items-center gap-3 py-2'>
                                            <HiMiniShoppingBag size={15} className='text-gray-700' />
                                            <span>My Orders</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href={'/compare-products'}>
                                        <DropdownMenuItem className='flex items-center gap-3 py-2'>
                                            <FaArrowsRotate size={15} className='text-gray-700' />
                                            <span>Compare products</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href={'/wishlist'}>
                                        <DropdownMenuItem className='flex items-center gap-3 py-2'>
                                            <MdFavorite size={15} className='text-gray-700' />
                                            <span>Wishlist</span>
                                        </DropdownMenuItem>
                                    </Link>
                                </>
                            )}
                            <Link href={'/contact'}>
                                <DropdownMenuItem className='flex items-center gap-3 py-2'>
                                    <IoCall size={15} className='text-gray-700' />
                                    <span>Contact</span>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            {user && (
                                <div onClick={() => dispatch(userLogout())}>
                                    <DropdownMenuItem className='flex items-center gap-3 py-2'>
                                        <LiaSignOutAltSolid size={15} className='text-gray-700' />
                                        <span>Sign Out</span>
                                    </DropdownMenuItem>
                                </div>
                            )}
                            {!user && (
                                <>
                                    <Link href={'/sign-in'}>
                                        <DropdownMenuItem className='flex items-center gap-3 py-2'>
                                            <RiLoginCircleFill size={15} className='text-gray-700' />
                                            <span>Log In</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href={'/sign-up'}>
                                        <DropdownMenuItem className='flex items-center gap-3 py-2'>
                                            <FaUserPlus size={15} className='text-gray-700' />
                                            <span>Register</span>
                                        </DropdownMenuItem>
                                    </Link>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {!user && (
                        <Link href={'/sign-in'}>
                            <Button>Sign in</Button>
                        </Link>
                    )}
                </div>
            </Container>
        </div>
    );
};

const ListItem = ({ name, url, setOpen }: ListItemProps) => {
    return (
        <li>
            <Link
                href={url}
                className='inline-block w-full px-3 py-2 mb-1 text-sm text-nowrap hover:bg-slate-100/[0.95] rounded mr-15'
                onClick={() => setOpen(false)}
            >
                {name}
            </Link>
        </li>
    );
};

export default HeaderBottom;

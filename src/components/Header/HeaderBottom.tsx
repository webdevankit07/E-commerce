'use client';
import Link from 'next/link';
import Container from '../shared/Container';
import { RiArrowDownSLine } from 'react-icons/ri';
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
                            className={`absolute px-2 py-2 z-[999999] rounded-sm bg-white text-slate-950 drop-shadow-xl left-4 top-10 transition duration-200 ease-in-out ${
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
                        <DropdownMenuContent className='min-w-[90vw] md:hidden mt-3 py-5 px-3 -ml-4'>
                            {user && (
                                <>
                                    <Link href={'/my-account/profile'}>
                                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                                    </Link>
                                    <Link href={'/my-account/orders'}>
                                        <DropdownMenuItem>My Orders</DropdownMenuItem>
                                    </Link>
                                </>
                            )}
                            <Link href={'/products'}>
                                <DropdownMenuItem>Our Store</DropdownMenuItem>
                            </Link>
                            <Link href={'/contact'}>
                                <DropdownMenuItem>Contact</DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <Link href={'/contact'} className='mt-5'>
                                <DropdownMenuItem>Sign Out</DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                className='inline-block w-full px-3 py-2 mb-1 text-sm text-nowrap hover:bg-slate-100/[0.95] rounded mr-20'
                onClick={() => setOpen(false)}
            >
                {name}
            </Link>
        </li>
    );
};

export default HeaderBottom;

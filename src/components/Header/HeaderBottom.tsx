'use client';
import Link from 'next/link';
import Container from '../shared/Container';
import { RiArrowDownSLine } from 'react-icons/ri';
import { CgMenuGridR } from 'react-icons/cg';
import { useEffect, useRef, useState } from 'react';

interface ListItemProps {
    name: string;
    url: string;
    setOpen: (value: boolean) => void;
}

const HeaderBottom = () => {
    const [open, setOpen] = useState(false);

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
        <div className='bg-dark-3'>
            <Container>
                <div className='flex items-center py-3 gap-5'>
                    <div className='relative'>
                        <div
                            className='flex items-center gap-5 cursor-pointer'
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
                            className={`absolute px-2 py-2 z-[999999]  rounded-sm text-slate-600 bg-dark-1 drop-shadow-xl left-10 top-10 transition duration-200 ease-in-out ${
                                open ? 'scale-1 opacity-100' : 'scale-0 opacity-0'
                            }`}
                            ref={dropdownMenu}
                        >
                            <ul>
                                <ListItem name='ankit' setOpen={setOpen} url='/' />
                                <ListItem name='ankit' setOpen={setOpen} url='/' />
                                <ListItem name='ankit' setOpen={setOpen} url='/' />
                                <ListItem name='ankit' setOpen={setOpen} url='/' />
                            </ul>
                        </div>
                    </div>
                    <div className='space-x-3 border-l-2 pl-5 border-gray-500 *:py-2 *:px-3 *:uppercase *:text-sm *:tracking-[0.3]'>
                        <Link href={'/'}>Home</Link>
                        <Link href={'/'}>Our Store</Link>
                        <Link href={'/'}>Blogs</Link>
                        <Link href={'/contact'}>Contact</Link>
                    </div>
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
                className='inline-block w-full px-5 py-2 mb-2 border-b border-dark-2 text-white text-nowrap hover:bg-slate-700'
                onClick={() => setOpen(false)}
            >
                {name}
            </Link>
        </li>
    );
};

export default HeaderBottom;

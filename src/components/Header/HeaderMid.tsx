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
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const HeaderMid = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await dispatch(userLogout());
            toast.success('Logged out successfully');
            router.push('/');
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
    };

    return (
        <div className='py-3'>
            <Container>
                <div className='flex justify-between gap-10 items-center'>
                    <div className='flex items-center justify-between gap-16 w-full'>
                        <h2 className='text-2xl font-semibold'>
                            <Link href={'/'}>ShopWave</Link>
                        </h2>
                        <div className='flex justify-center items-center rounded-sm overflow-hidden w-full'>
                            <input
                                type='text'
                                className='py-2 px-3 w-full focus:outline-none text-black'
                                placeholder='Search Product Here...'
                            />
                            <span className='bg-yellow-1 text-black p-3 cursor-pointer'>
                                <BsSearch />
                            </span>
                        </div>
                    </div>
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
                        <div>
                            {user ? (
                                <div className='flex items-center gap-3'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className='flex items-center gap-3 text-start'>
                                            <FaRegUserCircle className='text-3xl' />
                                            <p className='text-xs'>
                                                {`${user.firstname} ${user.lastname}`} <br /> {user.email}
                                            </p>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='min-w-[150px] mt-3 *:cursor-pointer'>
                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
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
                            ) : (
                                <Link href={'/sign-in'} className='flex items-center gap-3'>
                                    <FaRegUser className='text-2xl' />
                                    <p className='text-xs text-nowrap'>
                                        Log in <br /> My Account
                                    </p>
                                </Link>
                            )}
                        </div>
                        <Link href={'/cart'} className='flex items-center gap-3'>
                            <GiShoppingCart className='text-4xl text-yellow-1' />
                            <div className='text-sm space-y-1'>
                                <p className='bg-white px-3 text-black rounded-md text-center'>0</p>
                                <p className=''>$0.00</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HeaderMid;

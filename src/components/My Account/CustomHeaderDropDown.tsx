import { GiHamburgerMenu } from 'react-icons/gi';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useAppDispatch } from '@/hooks/storeHooks';
import { userLogout } from '@/redux/features/auth/authSlice';
import { IoMdHome } from 'react-icons/io';
import { IoCall, IoCart, IoStorefrontSharp } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { FaArrowsRotate } from 'react-icons/fa6';
import { MdFavorite } from 'react-icons/md';
import { LiaSignOutAltSolid } from 'react-icons/lia';

const CustomHeaderDropDown = () => {
    const dispatch = useAppDispatch();

    return (
        <div className='lg:hidden'>
            <DropdownMenu>
                <DropdownMenuTrigger className='outline-none items-center gap-3 text-start'>
                    <div className='border w-full rounded px-2 py-1 text-xl'>
                        <GiHamburgerMenu />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='md:hidden mt-3 p-2 mr-5'>
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
                    <Link href={'/contact'}>
                        <DropdownMenuItem className='flex items-center gap-3 py-2'>
                            <IoCall size={15} className='text-gray-700' />
                            <span>Contact</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <div onClick={() => dispatch(userLogout())}>
                        <DropdownMenuItem className='flex items-center gap-3 py-2'>
                            <LiaSignOutAltSolid size={15} className='text-gray-700' />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default CustomHeaderDropDown;

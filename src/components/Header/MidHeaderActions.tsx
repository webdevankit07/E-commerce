import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { formatePrice } from '@/lib/utils';
import { userLogout } from '@/redux/features/auth/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsHeart } from 'react-icons/bs';
import { FaRegUserCircle } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
import { TfiReload } from 'react-icons/tfi';

const MidHeaderActions = ({ cartProductCount }: { cartProductCount: string }) => {
    const { user, isError } = useAppSelector((state) => state.auth);
    const { cart } = useAppSelector((state) => state.cart);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleSignOut = async () => {
        await dispatch(userLogout());
        if (!isError) {
            router.refresh();
        }
    };

    return (
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
                        {`${user?.firstname} ${user?.lastname}`} <br /> {user?.email}
                    </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='min-w-[150px] mt-3 *:cursor-pointer'>
                    <DropdownMenuItem>
                        <Link href={'/my-account/profile'}>View Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={'/my-account/orders'}>My Orders</Link>
                    </DropdownMenuItem>
                    {user?.role === 'admin' && (
                        <DropdownMenuItem>
                            <Link href={'/admin/dashboard/'}>Dashboard</Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Link href={'/cart'}>
                <div className='flex items-center justify-center gap-3 text-sm space-y-1'>
                    <div className='relative'>
                        <GiShoppingCart className='text-3xl text-yellow-1' />
                        <p className='bg-white absolute text-xs p-1 -top-1 -right-1 w-5 h-5 text-black flex items-center justify-center rounded-full text-center font-medium'>
                            {cartProductCount}
                        </p>
                    </div>
                </div>
                <p className='text-center text-sm'>{cart ? formatePrice(cart.cartTotal) : <>&#x20B9;00.00</>}</p>
            </Link>
        </div>
    );
};

export default MidHeaderActions;

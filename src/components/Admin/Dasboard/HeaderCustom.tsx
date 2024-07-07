import Image from 'next/image';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { userLogout } from '@/redux/features/auth/authSlice';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { handleAxiosError } from '@/config/axios';
import { useRouter } from 'next/navigation';

const HeaderCustom = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await dispatch(userLogout());
            toast.success('Logged out successfully');
            router.push('/');
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
        }
    };

    return (
        <div>
            <div className='flex items-center gap-4 mr-10'>
                <div className='relative'>
                    <IoMdNotifications className='text-3xl' />
                    <span className='absolute top-0 right-0 p-2 font-semibold bg-yellow-1 w-4 h-4 rounded-full leading-3 grid place-content-center'>
                        3
                    </span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center gap-4'>
                        <div>
                            {/* <Image width={100} height={100} src={'/AppStore logo.png'} alt='img' /> */}
                            <FaRegUserCircle className='text-4xl' />
                        </div>
                        <div className='*:leading-5'>
                            <h5 className='font-semibold text-start'>{`${user?.firstname} ${user?.lastname}`}</h5>
                            <p>{user?.email}</p>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='min-w-[150px] mt-3 *:cursor-pointer'>
                        <DropdownMenuItem>
                            <Link href={'/'}>Home</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default HeaderCustom;

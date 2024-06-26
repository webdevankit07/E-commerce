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

const HeaderCustom = () => {
    return (
        <div className='flex items-center gap-3 pr-10'>
            <div></div>
            <div className='flex items-center gap-4'>
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
                            <h5 className='font-semibold text-start'>Ankit Yadav</h5>
                            <p>ankityadav.webdev@gmail.com</p>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='min-w-[150px] mt-3'>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Sign Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default HeaderCustom;

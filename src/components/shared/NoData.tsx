import React from 'react';
import { BsArrowLeft, BsFillInboxFill } from 'react-icons/bs';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { RiHome3Line } from 'react-icons/ri';

const NoData = () => {
    const router = useRouter();
    return (
        <div className='min-h-[50vh] flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <BsFillInboxFill size={80} className='text-slate-500' />
                <div className='text-2xl text-slate-500'>No Data Available</div>
            </div>
            <div className='flex items-center gap-3'>
                <Button
                    className='mt-5 flex gap-2 items-center text-'
                    size={'sm'}
                    variant={'link'}
                    onClick={() => router.back()}
                >
                    <BsArrowLeft size={17} />
                    Go Back
                </Button>
                <Button
                    className='mt-5 flex gap-2 items-center'
                    size={'sm'}
                    variant={'link'}
                    onClick={() => router.push('/')}
                >
                    <RiHome3Line size={17} />
                    Go Home
                </Button>
            </div>
        </div>
    );
};

export default NoData;

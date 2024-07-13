import React from 'react';
import { BsArrowLeft, BsFillInboxFill } from 'react-icons/bs';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { RiHome3Line } from 'react-icons/ri';

interface NoDataProps {
    headLine: string;
    className?: string;
}

const NoData = ({ headLine, className }: NoDataProps) => {
    const router = useRouter();
    return (
        <div className={`min-h-[50vh] flex flex-col items-center justify-center ${className}`}>
            <div className='flex flex-col items-center justify-center'>
                <BsFillInboxFill size={80} className='text-slate-200' />
                <div className='text-xl text-slate-700 font-sans'>{headLine}</div>
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

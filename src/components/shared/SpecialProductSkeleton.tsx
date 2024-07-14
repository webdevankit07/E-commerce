import { Skeleton } from '../ui/skeleton';

const SpecialProductSkeleton = () => {
    return (
        <div>
            <div className='drop-shadow rounded-md p-4   bg-white'>
                <div className='flex items-center gap-5'>
                    <div className='flex flex-col gap-2 justify-between'>
                        <Skeleton className='w-[150px] h-[150px]' />
                        <div className='flex *:flex-1 items-center justify-center gap-2'>
                            <Skeleton className='w-[50px] h-[50px]' />
                            <Skeleton className='w-[50px] h-[50px]' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 w-full'>
                        <Skeleton className='w-[120px] h-4' />
                        <Skeleton className='w-full h-3' />
                        <Skeleton className='w-full h-3' />
                        <Skeleton className='w-full h-3' />
                        <Skeleton className='w-[150px] h-4' />
                        <Skeleton className='w-[150px] h-3' />
                        <Skeleton className='w-full h-2' />
                        <Skeleton className='w-full h-8' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialProductSkeleton;

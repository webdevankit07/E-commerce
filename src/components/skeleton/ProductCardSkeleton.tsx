import { Skeleton } from '../ui/skeleton';

const ProductCardSkeleton = () => {
    return (
        <div className={`drop-shadow rounded-md p-3 bg-white`}>
            <div className='space-y-2'>
                <Skeleton className={`min-h-[200px]`} />
                <Skeleton className={`w-[100px] h-4`} />
                <Skeleton className={`w-full h-4`} />
                <Skeleton className={`w-[100px] h-4`} />
                <Skeleton className={`w-full h-4`} />
                <Skeleton className={`w-full h-4`} />
                <Skeleton className={`w-full h-4`} />
                <Skeleton className={`w-[100px] h-4`} />
            </div>
        </div>
    );
};

export default ProductCardSkeleton;

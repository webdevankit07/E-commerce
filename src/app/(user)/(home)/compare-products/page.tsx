'use client';
import CompareProductCard from '@/components/Compare-Product/CompareProductCard';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import NoData from '@/components/shared/NoData';
import ProductCardSkeleton from '@/components/skeleton/ProductCardSkeleton';
import { useAppSelector } from '@/hooks/storeHooks';

const CompareProducts = () => {
    const { user, isLoading } = useAppSelector((state) => state.auth);

    return (
        <div className='bg-slate-100 pb-10'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Compare-Products' }]} />
                {isLoading || !user ? (
                    <div className='grid max-[500px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item}>
                                <ProductCardSkeleton />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        {!user.compare.length ? (
                            <NoData headLine='No Compare Product Available' />
                        ) : (
                            <div className='grid max-[500px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                                {user.compare.map((product) => (
                                    <div key={product._id}>
                                        <CompareProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default CompareProducts;

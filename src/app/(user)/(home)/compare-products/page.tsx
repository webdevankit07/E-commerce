'use client';
import CompareProductCard from '@/components/Compare-Product/CompareProductCard';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import ProductCardSkeleton from '@/components/skeleton/ProductCardSkeleton';
import { useAppSelector } from '@/hooks/storeHooks';

const CompareProducts = () => {
    const { user, isLoading } = useAppSelector((state) => state.auth);

    return (
        <div className='bg-slate-100 pb-10'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Compare-Products' }]} />
                {isLoading || !user ? (
                    <div className='grid grid-cols-5 gap-3'>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item}>
                                <ProductCardSkeleton />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        {!user.compare.length ? (
                            <div className='min-h-60'>No Compare Product Available</div>
                        ) : (
                            <div className='grid grid-cols-5 gap-3'>
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

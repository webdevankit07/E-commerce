'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import NoData from '@/components/shared/NoData';
import ProductCardSkeleton from '@/components/skeleton/ProductCardSkeleton';
import WishlistProduct from '@/components/wishlist/WishlistProduct';
import { useAppSelector } from '@/hooks/storeHooks';

const Whishlist = () => {
    const { user, isLoading } = useAppSelector((state) => state.auth);

    return (
        <div className='bg-slate-100 pb-10'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'WishList' }]} />
                {isLoading || !user ? (
                    <div className='grid grid-cols-6 gap-3'>
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item}>
                                <ProductCardSkeleton />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        {!user.wishlist.length ? (
                            <NoData />
                        ) : (
                            <div className='grid grid-cols-6 gap-3'>
                                {user.wishlist.map((product) => (
                                    <div key={product._id}>
                                        <WishlistProduct product={product} />
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

export default Whishlist;

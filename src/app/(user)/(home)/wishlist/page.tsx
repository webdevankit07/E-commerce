'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import WishlistProduct from '@/components/wishlist/WishlistProduct';

const Whishlist = () => {
    return (
        <div className='bg-slate-100 pb-10'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ location: '/wishlist', name: 'WishList', lastElement: true }]} />
                <div className='flex gap-5'>
                    <WishlistProduct />
                    <WishlistProduct />
                    <WishlistProduct />
                    <WishlistProduct />
                </div>
            </Container>
        </div>
    );
};

export default Whishlist;

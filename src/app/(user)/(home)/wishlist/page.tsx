'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import WishlistProduct from '@/components/wishlist/WishlistProduct';

const Whishlist = () => {
    return (
        <div className='bg-slate-100 pb-10'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'WishList' }]} />
                <div className='grid grid-cols-6 gap-3'>
                    <WishlistProduct />
                    <WishlistProduct />
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

import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Wishlist',
};

const Whishlist = () => {
    return (
        <div className='bg-slate-100 pb-10'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ location: '/wishlist', name: 'WishList', lastElement: true }]} />
                <div></div>
            </Container>
        </div>
    );
};

export default Whishlist;

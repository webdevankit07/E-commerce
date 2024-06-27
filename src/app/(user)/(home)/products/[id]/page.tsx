'use client';
import Container from '@/components/shared/Container';
import BreadCrumb from '@/components/shared/Breadcrumb';
import DescriprionSection from '@/components/Our Store/Product/DescriprionSection';
import ReviewsSection from '@/components/Our Store/Product/ReviewsSection';
import PopularProducts from '@/components/Home/PopularProducts';

const Productdetails = ({ params }: { params: { id: string } }) => {
    return (
        <div className='bg-slate-200 min-h-screen'>
            <Container className='mb-5'>
                <BreadCrumb
                    BreadCrumbs={[
                        { location: '/products', name: 'Products' },
                        { name: params.id, lastElement: true },
                    ]}
                />
                <div className='flex gap-10'>
                    <div>1</div>
                    <div>2</div>
                </div>
                <DescriprionSection />
                <ReviewsSection />
            </Container>
            <PopularProducts />
        </div>
    );
};

export default Productdetails;

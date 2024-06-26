import FilterSection from '@/components/Our Store/FilterSection';
import ProductTags from '@/components/Our Store/ProductTags';
import ShopByCategory from '@/components/Our Store/ShopByCategory';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Store',
};

const Store = () => {
    return (
        <div className='bg-slate-200'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'store', location: '/store' }]} />
                <div className='flex items-center gap-3 pb-8'>
                    <div className='space-y-3 max-w-[250px]'>
                        <ShopByCategory />
                        <FilterSection />
                        <ProductTags />
                    </div>
                    <div>1</div>
                </div>
            </Container>
        </div>
    );
};

export default Store;

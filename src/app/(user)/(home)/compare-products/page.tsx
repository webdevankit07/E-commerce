import CompareProductCard from '@/components/Compare-Product/CompareProductCard';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Compare Products',
};

const CompareProducts = () => {
    return (
        <div className='bg-slate-100 pb-10'>
            <Container>
                <BreadCrumb
                    BreadCrumbs={[{ location: '/compare-products', name: 'Compare-Products', lastElement: true }]}
                />
                <div className='flex items-center gap-5 flex-wrap'>
                    <CompareProductCard />
                    <CompareProductCard />
                    <CompareProductCard />
                    <CompareProductCard />
                    <CompareProductCard />
                </div>
            </Container>
        </div>
    );
};

export default CompareProducts;

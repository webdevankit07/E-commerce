'use client';
import ProductCard from '@/components/Home/ProductCard';
import FilterSection from '@/components/Our Store/FilterSection';
import ProductTags from '@/components/Our Store/ProductTags';
import ShopByCategory from '@/components/Our Store/ShopByCategory';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaGripLinesVertical } from 'react-icons/fa';

const Store = () => {
    const [grid, setGrid] = useState(5);
    const pathname = usePathname();

    return (
        <div className='bg-slate-200'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Products' }]} />
                <div className='flex gap-3 pb-8'>
                    <div className='space-y-3 max-w-[250px]'>
                        <ShopByCategory />
                        <FilterSection />
                        <ProductTags />
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-5 bg-white py-2 px-4 rounded'>
                            <p className='font-semibold text-slate-800'>Sort By:</p>
                            <select className='py-1.5 px-2 focus:outline-none border-2 border-dark-2/[.5] rounded'>
                                <option value='manual'>Featured</option>
                                <option value='best-selling' selected>
                                    Best Selling
                                </option>
                                <option value='title-ascending'>Alphabetically, A-Z</option>
                                <option value='title-descending'>Alphabetically, Z-A</option>
                                <option value='price-ascending'>Price, low to high</option>
                                <option value='price-descending'>Price, high to low</option>
                                <option value='created-ascending'>Date, old to new</option>
                                <option value='created-descending'>Date, new to old</option>
                            </select>
                            <div className='flex items-center gap-2 ml-auto'>
                                <p className='font-medium text-gray-800 mr-4'>21 products</p>
                                <FaBars
                                    className={`bg-slate-200 p-1.5 text-3xl rounded-md hover:bg-slate-800 hover:text-white shadow transition duration-200 cursor-pointer ${
                                        grid === 5 && 'bg-slate-800 text-white'
                                    }`}
                                    onClick={() => setGrid(5)}
                                />
                                <FaGripLinesVertical
                                    className={`bg-slate-200 p-1.5 text-3xl rounded-md hover:bg-slate-800 hover:text-white shadow transition duration-200 cursor-pointer ${
                                        grid === 1 && 'bg-slate-800 text-white'
                                    }`}
                                    onClick={() => setGrid(1)}
                                />
                            </div>
                        </div>
                        <div className={`mt-4 grid gap-3 ${grid === 1 ? 'grid-cols-1' : 'grid-cols-5'}`}>
                            <ProductCard grid={grid} />
                            <ProductCard grid={grid} />
                            <ProductCard grid={grid} />
                            <ProductCard grid={grid} />
                            <ProductCard grid={grid} />
                            <ProductCard grid={grid} />
                            <ProductCard grid={grid} />
                            <ProductCard grid={grid} />
                            <ProductCard grid={grid} />
                            <ProductCard grid={grid} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Store;

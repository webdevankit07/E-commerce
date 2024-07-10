'use client';
import ProductCard from '@/components/Home/ProductCard';
import FilterSection from '@/components/Our Store/FilterSection';
import ShopByBrand from '@/components/Our Store/ShopByBrand';
import ShopByCategory from '@/components/Our Store/ShopByCategory';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import ProductCardSkeleton from '@/components/skeleton/ProductCardSkeleton';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getAllBrands } from '@/redux/features/brand/brandSlice';
import { getAllCategories } from '@/redux/features/categories/categorySlice';
import { getAllColors } from '@/redux/features/color/colorSlice';
import { getClientProducts } from '@/redux/features/product/productSlice';
import { ProductType } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaGripLinesVertical } from 'react-icons/fa';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { ParseProductQueries } from '@/lib/utils';
import SelectOption from '@/components/shared/Select';

const Store = () => {
    const { clientProducts, isLoading } = useAppSelector((state) => state.product);
    const { categories } = useAppSelector((state) => state.category);
    const { colors } = useAppSelector((state) => state.color);
    const { brands } = useAppSelector((state) => state.brand);

    const [grid, setGrid] = useState(5);
    const [filterProducts, setFilterProducts] = useState<ProductType[]>([]);
    const [totaPage, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [maxPrice, setMaxPrice] = useState<number>(1000000000000000);

    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    const search = searchParams.get('search') || '';
    const title = searchParams.get('title') || '';
    const brand = searchParams.get('brand') || '';
    const color = searchParams.get('color') || '';
    const category = searchParams.get('category') || '';

    useEffect(() => {
        (async () => {
            if (!categories.length) {
                await dispatch(getAllCategories());
            }
            if (!colors.length) {
                await dispatch(getAllColors());
            }
            if (!brands.length) {
                await dispatch(getAllBrands());
            }
        })();
    }, [dispatch, categories, colors, brands]);

    useEffect(() => {
        (async () => {
            const query = ParseProductQueries({ search, title, category, maxPrice, color, brand, pageNo });
            await dispatch(getClientProducts(query));
        })();
    }, [dispatch, search, title, brand, category, maxPrice, color, pageNo]);

    useEffect(() => {
        if (clientProducts) {
            setFilterProducts(clientProducts?.products);
            const totalPages = clientProducts.products.length / 10;
            setTotalPages(totalPages);
        }
    }, [clientProducts]);

    const handleValueChange = () => {};

    const handlePrevPageCall = () => {};
    const handleNextPageCall = () => {};

    return (
        <div className='bg-slate-200'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Products' }]} />
                <div className='flex gap-3 pb-8'>
                    <div className='space-y-3 w-[350px] h-full'>
                        <ShopByCategory categories={categories} />
                        <ShopByBrand brands={brands} />
                        <FilterSection colors={colors} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-5 bg-white py-2 px-4 rounded'>
                            <div className='flex items-center gap-3 max-w-[300px] w-full'>
                                <p className='font-semibold text-slate-800 text-nowrap'>Sort By:</p>
                                <SelectOption
                                    trigger='Best Selling'
                                    selectItems={[
                                        'Alphabetically, A-Z',
                                        'Alphabetically, Z-A',
                                        'Price, low to high',
                                        'Price, high to low',
                                        'Date, old to new',
                                        'Date, new to old',
                                    ]}
                                    onValueChange={handleValueChange}
                                />
                            </div>
                            <div className='flex items-center gap-2 ml-auto'>
                                <p className='font-medium text-gray-800 mr-4'>
                                    {clientProducts?.totalProducts} products
                                </p>
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
                        {!clientProducts || isLoading ? (
                            <div className={`mt-4 grid gap-3 ${grid === 1 ? 'grid-cols-1' : 'grid-cols-5'}`}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((a) => (
                                    <ProductCardSkeleton key={a} />
                                ))}
                                <ProductCardSkeleton />
                            </div>
                        ) : (
                            <div className={`mt-4 grid gap-3 ${grid === 1 ? 'grid-cols-1' : 'grid-cols-5'}`}>
                                {filterProducts.map((product, index) => (
                                    <>
                                        <ProductCard grid={grid} product={product} />
                                    </>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <Pagination className='pb-10'>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href='#' onClick={handlePrevPageCall} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href='#'>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href='#' isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href='#'>3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href='#' aria-disabled onClick={handleNextPageCall} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </Container>
        </div>
    );
};

export default Store;

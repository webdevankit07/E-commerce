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
import StoreHeader from '@/components/Our Store/StoreHeader';

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
    const [sortBy, setSortBy] = useState('');

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

    const handleValueChange = (val: string) => {
        console.log(val);
    };

    const handlePrevPageCall = () => {};
    const handleNextPageCall = () => {};

    return (
        <div className='bg-slate-200'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Products' }]} />
                <div className='flex gap-3 pb-8'>
                    <div className='space-y-3 hidden lg:block w-[350px] h-full'>
                        <ShopByCategory categories={categories} />
                        <ShopByBrand brands={brands} />
                        <FilterSection colors={colors} setMaxPrice={setMaxPrice} />
                    </div>
                    <div className='w-full'>
                        <StoreHeader
                            clientProducts={clientProducts}
                            handleValueChange={handleValueChange}
                            grid={grid}
                            setGrid={setGrid}
                            categories={categories}
                            brands={brands}
                            colors={colors}
                            maxPrice={maxPrice}
                            setMaxPrice={setMaxPrice}
                        />
                        {!clientProducts || isLoading ? (
                            <div
                                className={`mt-4 grid gap-3 ${
                                    grid === 1
                                        ? 'grid-cols-1'
                                        : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
                                }`}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((a) => (
                                    <ProductCardSkeleton key={a} />
                                ))}
                                <ProductCardSkeleton />
                            </div>
                        ) : (
                            <div
                                className={`mt-4 grid gap-3 ${
                                    grid === 1
                                        ? 'grid-cols-1'
                                        : 'grid-cols-1 min-[470px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
                                }`}
                            >
                                {filterProducts.map((product) => (
                                    <ProductCard grid={grid} product={product} key={product._id} />
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

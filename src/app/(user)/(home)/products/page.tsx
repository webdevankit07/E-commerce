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
import { filterProduct, getClientProducts } from '@/redux/features/product/productSlice';
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
import toast from 'react-hot-toast';

const Store = () => {
    const { clientProducts, isLoading } = useAppSelector((state) => state.product);
    const { categories } = useAppSelector((state) => state.category);
    const { colors } = useAppSelector((state) => state.color);
    const { brands } = useAppSelector((state) => state.brand);
    const [filterProducts, setFilterProducts] = useState<ProductType[]>([]);
    const [pageNumbers, setPageNumbers] = useState<number[]>([0]);
    const [grid, setGrid] = useState(5);
    const [maxPrice, setMaxPrice] = useState<number>(1000000000000000);
    const [pageNo, setPageNo] = useState(1);

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
            if (clientProducts.nbHits >= 10) {
                const pageNumbers = Array.from(
                    { length: Math.ceil(clientProducts.totalProducts / clientProducts.products.length) },
                    (_, i) => i + 1
                );
                setPageNumbers(pageNumbers);
            }
        }
    }, [clientProducts]);

    const handleValueChange = (val: string) => {
        if (val) {
            dispatch(filterProduct(val));
        }
    };

    const handlePrevPageCall = () => {
        if (pageNo >= 2) {
            setPageNo(pageNo - 1);
        }
    };
    const handleNextPageCall = () => {
        if (clientProducts && pageNo < clientProducts.totalPages && clientProducts.nbHits >= 10) {
            setPageNo(pageNo + 1);
        }
    };

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
                {clientProducts && (
                    <Pagination className='pb-10'>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href='#' onClick={handlePrevPageCall} />
                            </PaginationItem>
                            {pageNumbers.map((pagenumber) => (
                                <PaginationItem key={pagenumber} onClick={() => setPageNo(pagenumber)}>
                                    <PaginationLink isActive={pageNo === pagenumber}>{pagenumber}</PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext onClick={handleNextPageCall} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </Container>
        </div>
    );
};

export default Store;

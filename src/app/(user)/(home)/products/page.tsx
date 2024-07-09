'use client';
import ProductCard from '@/components/Home/ProductCard';
import FilterSection from '@/components/Our Store/FilterSection';
import ShopByBrand from '@/components/Our Store/ShopByBrand';
import ShopByCategory from '@/components/Our Store/ShopByCategory';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import Loading from '@/components/shared/Loading';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getAllBrands } from '@/redux/features/brand/brandSlice';
import { getAllCategories } from '@/redux/features/categories/categorySlice';
import { getAllColors } from '@/redux/features/color/colorSlice';
import { getClientProducts } from '@/redux/features/product/productSlice';
import { ProductResType, ProductType } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaGripLinesVertical } from 'react-icons/fa';

const Store = () => {
    const { clientProducts, isLoading } = useAppSelector((state) => state.product);
    const { categories } = useAppSelector((state) => state.category);
    const { colors } = useAppSelector((state) => state.color);
    const { brands } = useAppSelector((state) => state.brand);

    const [grid, setGrid] = useState(5);
    const [stock, setStock] = useState<{ inStock: ProductType[] | []; outOfStock: ProductType[] | [] }>({
        inStock: [],
        outOfStock: [],
    });
    const [filterProducts, setFilterProducts] = useState<ProductType[]>([]);

    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    const search = searchParams.get('search') || '';
    const title = searchParams.get('title') || '';
    const brand = searchParams.get('brand') || '';
    const color = searchParams.get('color') || '';
    const category = searchParams.get('category') || '';
    const price = searchParams.get('price') || '';
    const minPrice = searchParams.get('minPrice') || '';

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
            await dispatch(
                getClientProducts(
                    `search=${search}&title=${title}&brand=${brand}&category=${category}&price=${price}&minPrice=${minPrice}&color=${color}`
                )
            );
        })();
    }, [dispatch, search, title, brand, category, price, minPrice, color]);

    useEffect(() => {
        const inStock = clientProducts?.products.filter((product) => product.quantity > 0) || [];
        const outOfStock = clientProducts?.products.filter((product) => product.quantity === 0) || [];
        setStock({ inStock: inStock, outOfStock: outOfStock });
    }, [clientProducts?.products]);

    useEffect(() => {
        setFilterProducts(stock.inStock);
    }, [stock.inStock]);

    return (
        <div className='bg-slate-200'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Products' }]} />
                <div className='flex gap-3 pb-8'>
                    <div className='space-y-3 max-w-[250px] h-full'>
                        <ShopByCategory categories={categories} />
                        <ShopByBrand brands={brands} />
                        <FilterSection colors={colors} stock={stock} setFilterProducts={setFilterProducts} />
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
                            <Loading />
                        ) : (
                            <div className={`mt-4 grid gap-3 ${grid === 1 ? 'grid-cols-1' : 'grid-cols-5'}`}>
                                {/* {clientProducts.products.map((product) => (
                                    <>
                                        <ProductCard grid={grid} product={product} />
                                    </>
                                ))} */}
                                {filterProducts.map((product, index) => (
                                    <>
                                        <ProductCard grid={grid} product={product} />
                                    </>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Store;

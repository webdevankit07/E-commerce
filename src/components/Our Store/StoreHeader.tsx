import { FaBars, FaGripLinesVertical } from 'react-icons/fa';
import SelectOption from '../shared/Select';
import { LuFilter } from 'react-icons/lu';
import { BrandType, ColorType, ProductCategoryType, ProductResType } from '@/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ShopByCategory from './ShopByCategory';
import ShopByBrand from './ShopByBrand';
import FilterSection from './FilterSection';
import { ScrollArea } from '../ui/scroll-area';
import debounce from 'lodash.debounce';
import { Input } from '../ui/input';

interface StoreHeaderProps {
    clientProducts: ProductResType | null;
    handleValueChange: (val: string) => void;
    grid: number;
    setGrid: Dispatch<SetStateAction<number>>;
    categories: [] | ProductCategoryType[];
    brands: [] | BrandType[];
    colors: [] | ColorType[];
    maxPrice: number;
    setMaxPrice: Dispatch<SetStateAction<number>>;
}

const StoreHeader = ({
    clientProducts,
    handleValueChange,
    grid,
    setGrid,
    categories,
    brands,
    colors,
    maxPrice,
    setMaxPrice,
}: StoreHeaderProps) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [maxPrice]);

    return (
        <div className='flex items-center justify-between gap-5 bg-white py-2 px-4 rounded'>
            <div className='flex items-center gap-3 max-w-[300px] w-full'>
                <p className='font-semibold text-slate-800 text-nowrap hidden sm:block'>Sort By:</p>
                <SelectOption
                    trigger='Best Selling'
                    selectItems={[
                        'Alphabetically, A-Z',
                        'Alphabetically, Z-A',
                        'Price, low to high',
                        'Price, high to low',
                    ]}
                    onValueChange={handleValueChange}
                />
            </div>
            <div className='items-center gap-2 ml-auto flex'>
                <p className='font-medium text-gray-800 sm:mr-4 text-nowrap max-sm:text-sm text-center'>
                    {clientProducts?.totalProducts} products
                </p>
                <FaBars
                    className={`bg-slate-200 p-1.5 hidden sm:block text-3xl rounded-md hover:bg-slate-800 hover:text-white shadow transition duration-200 cursor-pointer ${
                        grid === 5 && 'bg-slate-800 text-white'
                    }`}
                    onClick={() => setGrid(5)}
                />
                <FaGripLinesVertical
                    className={`bg-slate-200 p-1.5 hidden sm:block  text-3xl rounded-md hover:bg-slate-800 hover:text-white shadow transition duration-200 cursor-pointer ${
                        grid === 1 && 'bg-slate-800 text-white'
                    }`}
                    onClick={() => setGrid(1)}
                />
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger
                    className='border border-slate-900 px-2 py-2 rounded bg-slate-100 lg:hidden'
                    onClick={() => setOpen(true)}
                >
                    <LuFilter />
                </SheetTrigger>
                <SheetContent side={'left'}>
                    <SheetHeader>
                        <ScrollArea className='text-start h-screen py-10 *:mr-10'>
                            <div className='border border-slate-400 rounded-md'>
                                <FilterSection colors={colors} setMaxPrice={setMaxPrice} />
                                <div className='my-5 px-4'>
                                    <h5 className='font-semibold text-slate-700 text-sm mb-1.5'>Max Price (&#8377;)</h5>
                                    <Input
                                        type='number'
                                        placeholder='Max Price'
                                        onChange={debounce((e) => {
                                            const val = +e.target.value;
                                            setMaxPrice(val === 0 ? 1000000000000000 : val);
                                        }, 1000)}
                                    />
                                </div>
                            </div>
                            <div className='border border-slate-400 rounded-md my-5' onClick={() => setOpen(false)}>
                                <ShopByCategory categories={categories} />
                            </div>
                            <div className='border border-slate-400 rounded-md' onClick={() => setOpen(false)}>
                                <ShopByBrand brands={brands} />
                            </div>
                        </ScrollArea>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default StoreHeader;

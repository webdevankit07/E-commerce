import { ColorType, ProductType } from '@/types';
import Link from 'next/link';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface FilterSectionProps {
    colors: ColorType[];
    stock: { inStock: ProductType[] | []; outOfStock: ProductType[] | [] };
    setFilterProducts: Dispatch<SetStateAction<ProductType[]>>;
}

const FilterSection = ({ colors, stock, setFilterProducts }: FilterSectionProps) => {
    const handleStockFilter = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.name === 'inStock') {
            setFilterProducts(stock.inStock);
        } else if (e.target.name === 'outOfStock') {
            setFilterProducts(stock.outOfStock);
        }
    };

    return (
        <section>
            <div className='bg-white rounded-md py-3 px-4'>
                <h3 className='font-semibold text-slate-900 mb-4'>Filter By</h3>
                <div className='my-5'>
                    <h5 className='font-semibold text-slate-700 text-sm mb-1.5'>Colors</h5>
                    <div>
                        <ul className='flex items-center flex-wrap gap-2.5'>
                            {colors.map((color) => (
                                <Link href={`/products?color=${color.name}`} key={color._id}>
                                    <li
                                        style={{ backgroundColor: color.colorCode }}
                                        className='w-5 h-5 rounded-full border border-gray-500'
                                    ></li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='my-5'>
                    <h5 className='font-semibold text-slate-700 text-sm mb-1.5'>Price (&#8377;)</h5>
                    <div className='flex items-center gap-5'>
                        <input
                            type='number'
                            id='from'
                            className='border border-dark-1/[.5] rounded py-2 px-2 text-sm focus:outline-none w-[100px] bg-slate-100'
                            placeholder='From'
                        />
                        <input
                            type='number'
                            id='from'
                            className='border border-dark-1/[.5] rounded py-2 px-2 text-sm focus:outline-none w-[100px] bg-slate-100'
                            placeholder='To'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterSection;

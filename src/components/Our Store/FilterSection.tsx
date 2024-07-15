import { ColorType } from '@/types';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { Input } from '../ui/input';
import debounce from 'lodash.debounce';

interface FilterSectionProps {
    colors: ColorType[];
    setMaxPrice: Dispatch<SetStateAction<number>>;
}

const FilterSection = ({ colors, setMaxPrice }: FilterSectionProps) => {
    return (
        <section>
            <div className='bg-white rounded-md py-3 px-4 w-full'>
                <h3 className='font-semibold text-slate-900 mb-4'>Filter By</h3>
                <div className='my-5'>
                    <h5 className='font-semibold text-slate-700 text-sm mb-1.5'>Colors</h5>
                    <div>
                        <ul className='flex items-center flex-wrap gap-2.5'>
                            {colors.map((color) => (
                                <Link href={`/products?color=${color.colorCode.slice(1)}`} key={color._id}>
                                    <li
                                        style={{ backgroundColor: color.colorCode }}
                                        className='w-5 h-5 rounded-full border border-gray-500'
                                    ></li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='my-5 hidden lg:block'>
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
        </section>
    );
};

export default FilterSection;

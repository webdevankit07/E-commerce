import { BrandType } from '@/types';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';

const ShopByBrand = ({ brands }: { brands: BrandType[] }) => {
    return (
        <div className='bg-white rounded-md py-3 px-4'>
            <h3 className='font-semibold text-slate-700 mb-2.5'>Shop By Brands</h3>
            <div>
                <ScrollArea className='h-[250px]'>
                    <ul className='*:text-sm  *:leading-[30px]'>
                        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/products`}>
                            <li>All</li>
                        </Link>
                        {brands.map((brand) => (
                            <Link
                                href={`${process.env.NEXT_PUBLIC_BASE_URL}/products?brand=${brand.name}`}
                                key={brand._id}
                            >
                                <li>{brand.name}</li>
                            </Link>
                        ))}
                    </ul>
                </ScrollArea>
            </div>
        </div>
    );
};

export default ShopByBrand;

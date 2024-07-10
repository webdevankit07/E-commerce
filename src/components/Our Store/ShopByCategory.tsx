import { ProductCategoryType } from '@/types';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';

const ShopByCategory = ({ categories }: { categories: ProductCategoryType[] }) => {
    return (
        <div className='bg-white rounded-md py-3 px-4 w-full'>
            <h3 className='font-semibold text-slate-700 mb-2.5'>Shop By categories</h3>
            <div>
                <ScrollArea className='h-[250px]'>
                    <ul className='*:text-sm  *:leading-[30px]'>
                        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/products`}>
                            <li>All</li>
                        </Link>
                        {categories.map((category) => (
                            <Link
                                href={`${process.env.NEXT_PUBLIC_BASE_URL}/products?category=${category.title}`}
                                key={category._id}
                            >
                                <li>{category.title}</li>
                            </Link>
                        ))}
                    </ul>
                </ScrollArea>
            </div>
        </div>
    );
};

export default ShopByCategory;

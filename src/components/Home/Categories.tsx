import Container from '@/components/shared/Container';
import { categories } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

const Categories = () => {
    return (
        <section className='bg-slate-100 pb-10 pt-5'>
            <Container>
                <h3 className='flex justify-between items-center font-semibold mb-4 text-lg'>Shop by Categories</h3>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 place-content-center gap-x-5 gap-y-5 bg-white py-5 px-5 md:px-8 rounded-sm'>
                    {categories.map((category, index) => {
                        const { location, details, imgUrl, title } = category;
                        return (
                            <Link
                                href={location}
                                className='group flex flex-col sm:flex-row gap-2 sm:gap-5  items-center justify-center sm:justify-center hover:shadow-lg px-3 py-1.5 rounded-md border border-gray-500 transition-all duration-200 ease-in-out w-full'
                                key={index}
                            >
                                <div>
                                    {/* <div className='hidden sm:block'> */}
                                    <h6 className='font-semibold text-sm w-full'>{title}</h6>
                                    <p className='text-gray-800 text-xs'>{details}</p>
                                </div>
                                <Image
                                    src={`/images/${imgUrl}`}
                                    width={50}
                                    height={50}
                                    style={{ width: 'auto', height: 'auto' }}
                                    alt={title.toLocaleLowerCase()}
                                    className='group-hover:scale-110 transition-all duration-300 ease-in-out'
                                />
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default Categories;

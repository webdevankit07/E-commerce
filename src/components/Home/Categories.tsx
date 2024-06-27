import Container from '@/components/shared/Container';
import Image from 'next/image';
import Link from 'next/link';

const Categories = () => {
    return (
        <section className='bg-slate-100 pb-10 pt-5'>
            <Container>
                <div className='grid grid-cols-5 gap-x-12 gap-y-5 bg-white py-5 px-8 rounded-sm'>
                    <CategoriesCard title='Computers & Laptop' details='10 Items' imgUrl='laptop.webp' location='/' />
                    <CategoriesCard title='Cameras & videos' details='10 Items' imgUrl='camera.webp' location='/' />
                    <CategoriesCard title='Smart Television' details='10 Items' imgUrl='tv.jpg' location='/' />
                    <CategoriesCard title='Smart Watches' details='10 Items' imgUrl='watch.webp' location='/' />
                    <CategoriesCard title='Music & Gaming' details='10 Items' imgUrl='headphones.webp' location='/' />
                    <CategoriesCard title='Mobiles & Tablets' details='10 Items' imgUrl='headphone.webp' location='/' />
                    <CategoriesCard title='Headphones' details='10 Items' imgUrl='phone.jpg' location='/' />
                    <CategoriesCard title='Accessories' details='10 Items' imgUrl='accessories.jpg' location='/' />
                    <CategoriesCard title='Portable Speakers' details='10 Items' imgUrl='speaker.webp' location='/' />
                    <CategoriesCard
                        title='Home Appliance'
                        details='10 Items'
                        imgUrl='home-appliance.jpg'
                        location='/'
                    />
                </div>
            </Container>
        </section>
    );
};

interface CategoriesCardProps {
    title: string;
    details: string;
    location: string;
    imgUrl: string;
}
const CategoriesCard = ({ title, details, location, imgUrl }: CategoriesCardProps) => {
    return (
        <Link href={location} className='flex gap-3  items-center'>
            <div>
                <h6 className='font-semibold text-sm'>{title}</h6>
                <p className='text-gray-800 text-xs'>{details}</p>
            </div>
            <Image
                src={`/images/${imgUrl}`}
                width={50}
                height={50}
                style={{ width: 'auto', height: 'auto' }}
                alt={title.toLocaleLowerCase()}
            />
        </Link>
    );
};

export default Categories;

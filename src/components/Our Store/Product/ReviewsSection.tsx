import WriteReview from '@/components/shared/WriteReview';
import Link from 'next/link';
import ReactStars from 'react-stars';
import Reviews from './Reviews';
import { ProductType, RatingType } from '@/types';
import { Dispatch, SetStateAction } from 'react';

interface ReviewSectionPropsType {
    productId: string;
    totalRating: number;
    ratings: RatingType[];
    setProduct: Dispatch<SetStateAction<ProductType | undefined>>;
}

const ReviewsSection = ({ productId, totalRating, ratings, setProduct }: ReviewSectionPropsType) => {
    return (
        <section>
            <h2 className='font-semibold text-lg mt-5 mb-2'>Reviews</h2>
            <div className='py-5 px-5 bg-white rounded'>
                <div>
                    <h4 className='font-medium'>Customer Reviews</h4>
                    <div className='flex items-center gap-2'>
                        <ReactStars count={5} value={totalRating} size={20} color2={'#ffd700'} edit={false} />
                        <span className='text-xs font-medium text-slate-600'>Based on {ratings.length} Reviews</span>
                        <Link href={'#writeReview'} className='text-xs font-medium text-slate-600 ml-auto underline'>
                            Write a Review
                        </Link>
                    </div>
                    <hr className='mt-2' />
                </div>
                <Reviews ratings={ratings} />
                <div id='writeReview'>
                    <WriteReview setProduct={setProduct} productId={productId} />
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;

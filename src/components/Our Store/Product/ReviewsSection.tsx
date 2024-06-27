import WriteReview from '@/components/shared/WriteReview';
import Link from 'next/link';
import { useState } from 'react';
import ReactStars from 'react-stars';
import Reviews from './Reviews';

const ReviewsSection = () => {
    const [orderProducts, setOrderProducts] = useState(true);

    return (
        <section>
            <h2 className='font-semibold mt-5 mb-2'>Reviews</h2>
            <div className='py-5 px-5 bg-white rounded'>
                <div>
                    <h4 className='font-medium'>Customer Reviews</h4>
                    <div className='flex items-center gap-2'>
                        <ReactStars count={5} value={4} size={20} color2={'#ffd700'} edit={false} />
                        <span className='text-xs font-medium text-slate-600'>Based on 2 Reviews</span>
                        {orderProducts && (
                            <Link href={'#'} className='text-xs font-medium text-slate-600 ml-auto underline'>
                                Write a Review
                            </Link>
                        )}
                    </div>
                    <hr className='mt-2' />
                </div>
                <Reviews />
                <WriteReview />
            </div>
        </section>
    );
};

export default ReviewsSection;

import { RatingType } from '@/types';
import ReactStars from 'react-stars';

const Reviews = ({ ratings }: { ratings: RatingType[] }) => {
    return (
        <div className='mt-5 mb-8 grid md:grid-cols-2 gap-5'>
            {ratings.map((rating) => (
                <div className='border py-3 px-5 bg-slate-50 rounded-md' key={rating._id}>
                    <p className='font-medium text-xs'>{`${rating.postedby.firstname} ${rating.postedby.lastname} - (@${rating.postedby.username})`}</p>
                    <ReactStars count={5} value={rating.star} size={15} color2={'#ffd700'} edit={false} />
                    <p className='text-sm text-slate-600'>{rating.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default Reviews;

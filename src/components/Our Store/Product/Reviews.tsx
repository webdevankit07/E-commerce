import ReactStars from 'react-stars';

const Reviews = () => {
    return (
        <div className='mt-5 mb-8 grid grid-cols-2 gap-5'>
            <Review />
        </div>
    );
};

export const Review = () => {
    return (
        <div className='border py-3 px-5 bg-slate-50 rounded-md'>
            <p className='font-medium text-xs'>Ankit Kumar</p>
            <ReactStars count={5} value={4} size={15} color2={'#ffd700'} edit={false} />
            <p className='text-sm text-slate-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, commodi quaerat dignissimos possimus
                dolorum similique doloribus quasi harum ipsa necessitatibus nemo corporis quas iusto reprehenderit
                minima sit tempore provident optio.
            </p>
        </div>
    );
};

export default Reviews;

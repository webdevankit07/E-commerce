import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Product from '@/models/product.model';
import { RatingSchema } from '@/validators/ratingSchema';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { star, comment } = body;
        const { id } = params;
        const { userId } = await validateToken(req);
        await validate(body, RatingSchema);

        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ message: 'Product not found', success: false }, { status: 400 });
        }

        const alreadyRated = product.ratings.find((rating) => rating.postedby.toString() === userId?.toString());
        let updateRating;
        if (alreadyRated) {
            updateRating = await Product.findOneAndUpdate(
                { ratings: { $elemMatch: alreadyRated } },
                {
                    $set: { 'ratings.$.star': star, 'ratings.$.comment': comment },
                },
                { new: true }
            );
        } else {
            updateRating = await Product.findByIdAndUpdate(
                id,
                {
                    $push: { ratings: { star, comment, postedby: userId } },
                },
                { new: true }
            );
        }

        const totalratings = updateRating?.ratings.length || 0;
        const ratingsSum =
            updateRating?.ratings.map((rating) => rating.star).reduce((sum, rating) => sum + rating, 0) || 0;
        const totalRating = Math.round((ratingsSum / totalratings) * 2) / 2;

        const finalUpdate = await Product.findByIdAndUpdate(id, { totalRating }, { new: true });

        return NextResponse.json({ product: finalUpdate, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while rating product', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};

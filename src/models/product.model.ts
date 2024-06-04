import { Schema, model, Document, ObjectId, models, Model } from 'mongoose';

export type ImageType = {
    public_id: string;
    url: string;
    optimizeUrl: string;
};

type RatingType = {
    star: number;
    comment: string;
    postedby: ObjectId;
};

type ColourType = 'Black' | 'Brown' | 'Red' | 'White';

export interface ProductSchemaType extends Document {
    title: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    quantity: number;
    sold: number;
    images: ImageType[];
    color: ColourType[];
    tags: string;
    ratings: RatingType[];
    totalRating: number;
}

const ProductSchema: Schema<ProductSchemaType> = new Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        brand: { type: String, required: true },
        quantity: { type: Number, required: true },
        sold: { type: Number, default: 0 },
        images: [{ public_id: String, url: String, optimizeUrl: String }],
        color: [{ type: String, enum: ['Black', 'Brown', 'Red', 'White'] }],
        tags: String,
        ratings: [{ star: Number, comment: String, postedby: { type: Schema.Types.ObjectId, ref: 'User' } }],
        totalRating: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Product = (models.Product as Model<ProductSchemaType>) || model<ProductSchemaType>('Product', ProductSchema);
export default Product;

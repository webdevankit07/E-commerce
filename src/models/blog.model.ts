import { Schema, model, Model, models, Document, ObjectId } from 'mongoose';
import { ImageType } from './product.model';

interface BlogSchemaType extends Document {
    title: string;
    description: string;
    category: string;
    numViews: number;
    isLiked: boolean;
    isDisliked: boolean;
    likes: ObjectId[];
    dislikes: ObjectId[];
    author: string;
    images: ImageType[];
}

const BlogSchema: Schema<BlogSchemaType> = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        numViews: { type: Number, default: 0 },
        isLiked: { type: Boolean, default: false },
        isDisliked: { type: Boolean, default: false },
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        author: { type: String, default: 'Admin' },
        images: [{ public_id: String, url: String, optimizeUrl: String }],
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

const Blog = (models.Blog as Model<BlogSchemaType>) || model<BlogSchemaType>('Blog', BlogSchema);
export default Blog;

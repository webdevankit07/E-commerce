import { Schema, model, Model, models, Document } from 'mongoose';

interface BlogcategorySchemaType extends Document {
    title: string;
}

const BlogcategorySchema: Schema<BlogcategorySchemaType> = new Schema(
    { title: { type: String, required: true, unique: true, index: true } },
    { timestamps: true }
);

const BlogCategory =
    (models.BlogCategory as Model<BlogcategorySchemaType>) || model('BlogCategory', BlogcategorySchema);
export default BlogCategory;

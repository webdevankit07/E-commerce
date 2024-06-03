import { Schema, model, Model, models, Document } from 'mongoose';

interface ProductcategorySchemaType extends Document {
    title: string;
}

const ProductcategorySchema: Schema<ProductcategorySchemaType> = new Schema(
    { title: { type: String, required: true, unique: true, index: true } },
    { timestamps: true }
);

export const ProductCategory =
    (models.ProductCategory as Model<ProductcategorySchemaType>) || model('ProductCategory', ProductcategorySchema);

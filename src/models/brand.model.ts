import { Schema, model, Model, models, Document } from 'mongoose';

interface BrandSchemaType extends Document {
    title: string;
}

const BrandSchema: Schema<BrandSchemaType> = new Schema(
    { title: { type: String, required: true, unique: true, index: true } },
    { timestamps: true }
);

const Brand = (models.Brand as Model<BrandSchemaType>) || model('Brand', BrandSchema);
export default Brand;

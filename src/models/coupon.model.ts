import { Model, model, models, Schema, Document } from 'mongoose';

interface CouponSchemaType extends Document {
    name: string;
    expiry: Date;
    discount: number;
}

const CouponSchema: Schema<CouponSchemaType> = new Schema({
    name: { type: String, required: true, unique: true, uppercase: true },
    expiry: { type: Date, required: true },
    discount: { type: Number, required: true },
});

const Coupon = (models.Coupon as Model<CouponSchemaType>) || model<CouponSchemaType>('Coupon', CouponSchema);
export default Coupon;

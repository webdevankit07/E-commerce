import { Schema, Document, ObjectId, models, Model, model } from 'mongoose';
import Product from './product.model';

interface CartSchemaType extends Document {
    products: { product: ObjectId; count: number; color: string; price: number; _id: ObjectId }[];
    cartTotal: number;
    totalCartProducts: number;
    totalAfterDiscount: number;
    orderby: ObjectId;
}

const CartSchema: Schema<CartSchemaType> = new Schema(
    {
        products: [
            { product: { type: Schema.Types.ObjectId, ref: 'Product' }, count: Number, color: String, price: Number },
        ],
        cartTotal: Number,
        totalCartProducts: Number,
        totalAfterDiscount: Number,
        orderby: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

const Cart = (models.Cart as Model<CartSchemaType>) || model<CartSchemaType>('Cart', CartSchema);
export default Cart;

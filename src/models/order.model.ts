import { Document, model, Model, models, ObjectId, Schema } from 'mongoose';

interface OrderSchemaType extends Document {
    user: ObjectId;
    shippingInfo: {
        firstname: string;
        lastname: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
    };
    paymentInfo: {
        razoepayOrderId: string;
        razoepayPaymentId: string;
    };
    orderItems: {
        product: ObjectId;
        color: string;
        quantity: number;
        price: number;
    }[];
    paidAt: Date;
    totalPrice: number;
    totalPriceAfterDiscount: number;
    orderStatus: string;
}

const OrderSchema: Schema<OrderSchemaType> = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        shippingInfo: {
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
        },
        paymentInfo: {
            razorpayOrderId: { type: String, required: true },
            razorpayPaymentId: { type: String, required: true },
        },
        orderItems: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                color: { type: String, required: true },
                count: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        paidAt: { type: Date, default: Date.now() },
        totalPrice: { type: Number, required: true },
        totalPriceAfterDiscount: { type: Number, required: true },
        orderStatus: { type: String, default: 'Ordered' },
    },
    { timestamps: true }
);

const Order = (models.Order as Model<OrderSchemaType>) || model<OrderSchemaType>('Order', OrderSchema);
export default Order;

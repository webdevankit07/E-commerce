import { Document, model, Model, models, ObjectId, Schema } from 'mongoose';

type StatusType = 'Not Processed' | 'Cash on Delivery' | 'Processing' | 'Dispatched' | 'Cancelled' | 'Delivered';

interface PaymentIntentType {
    id: string;
    method: string;
    amount: number;
    status: StatusType;
    created: Date;
    currency: string;
}

interface OrderSchemaType extends Document {
    products: {
        product: ObjectId;
        count: number;
        color: string;
    }[];
    paymentIntent: PaymentIntentType;
    orderStatus: StatusType;
    orderby: ObjectId;
}

const OrderSchema: Schema<OrderSchemaType> = new Schema(
    {
        products: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product' },
                count: Number,
                color: String,
            },
        ],
        paymentIntent: {},
        orderStatus: {
            type: String,
            default: 'Not Processed',
            enum: ['Not Processed', 'Cash on Delivery', 'Processing', 'Dispatched', 'Cancelled', 'Delivered'],
        },
        orderby: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

const Order = (models.Order as Model<OrderSchemaType>) || model<OrderSchemaType>('Order', OrderSchema);
export default Order;

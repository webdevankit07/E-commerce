import { z } from 'zod';

const shippingInfo = z.object({
    firstname: z.string({ required_error: 'firstname is required' }),
    lastname: z.string().optional(),
    address: z.string({ required_error: 'address is required' }),
    city: z.string({ required_error: 'city name is required' }),
    state: z.string({ required_error: 'state nmae is required' }),
    pincode: z.string({ required_error: 'pincode is required' }),
});

const paymentInfo = z.object({
    razorpayOrderId: z.string({ required_error: 'OrderId is required' }),
    razorpayPaymentId: z.string({ required_error: 'PaymentId is required' }),
});

const orderItems = z
    .object({
        product: z.object({}),
        color: z.string({ required_error: 'product Color is required' }),
        count: z.number({ required_error: 'Order Items count is required' }),
        price: z.number({ required_error: 'product price is required' }),
    })
    .array();

export const CreateOrderValidator = z.object({
    shippingInfo,
    paymentInfo,
    orderItems,
    totalPrice: z.number({ required_error: 'totalPrice is required' }),
    totalPriceAfterDiscount: z.number({ required_error: 'totalPriceAfterDiscount is required' }),
});

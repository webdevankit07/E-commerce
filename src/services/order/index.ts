import { Axios, handleAxiosError } from '@/config/axios';
import { CreateOrderData, CreateOrderResType, OrderResType, updateOrderResType } from '@/types';

export const getOrders = async () => {
    try {
        const { data } = await Axios.get<OrderResType>('/user/orders');
        return data.orders;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const createOrder = async (orderData: CreateOrderData) => {
    try {
        const { data } = await Axios.post<CreateOrderResType>('/user/cart/create-order', orderData);
        return data.order;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const UpdateOrderStatus = async (status: string, orderId: string) => {
    try {
        const { data } = await Axios.put<updateOrderResType>(`/user/orders/update-status/${orderId}`, {
            status,
        });
        return data.order;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

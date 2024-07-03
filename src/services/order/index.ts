import { Axios, handleAxiosError } from '@/config/axios';
import { OrderResType } from '@/types';

export const getOrders = async () => {
    try {
        const { data } = await Axios.get<OrderResType>('/user/orders');
        return data.orders;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

import { Axios, handleAxiosError } from '@/config/axios';
import { ProductResType } from '@/types';

export const getProducts = async () => {
    try {
        const { data } = await Axios.get<ProductResType>('/product/all-products');
        return data.products;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

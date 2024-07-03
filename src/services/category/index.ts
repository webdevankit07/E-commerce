import { Axios, handleAxiosError } from '@/config/axios';
import { ProductCategoryResType } from '@/types';

export const getCategories = async () => {
    try {
        const { data } = await Axios.get<ProductCategoryResType>(`/category/product-category/all-category`);
        return data.categories;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

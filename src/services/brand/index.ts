import { Axios, handleAxiosError } from '@/config/axios';
import { BrandResType } from '@/types';

export const getBrands = async () => {
    try {
        const { data } = await Axios.get<BrandResType>(`/brand/all-brands`);
        return data.brands;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

import { Axios, handleAxiosError } from '@/config/axios';
import { BrandResType, CreateBrandResType, DeleteBrandResType } from '@/types';

export const getBrands = async () => {
    try {
        const { data } = await Axios.get<BrandResType>(`/brand/all-brands`);
        return data.brands;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const CreateBrand = async (name: string) => {
    try {
        const { data } = await Axios.post<CreateBrandResType>(`/brand/create`, { name });
        return data.newBrand;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const DeleteBrand = async (brandId: string) => {
    try {
        const { data } = await Axios.delete<DeleteBrandResType>(`/brand/delete/${brandId}`);
        return data.brand._id;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

import { Axios, handleAxiosError } from '@/config/axios';
import { CreateProductInfo, CreateProductResType, ProductResType } from '@/types';

export const getProducts = async () => {
    try {
        const { data } = await Axios.get<ProductResType>('/product/all-products');
        return data.products;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const CreateProduct = async (productInfo: CreateProductInfo, imageFiles: FormData) => {
    try {
        const { data } = await Axios.post<CreateProductResType>('/product/create-product', productInfo);
        const { data: resData } = await Axios.put<CreateProductResType>(
            `/product/${data.product._id}/upload-images`,
            imageFiles
        );
        return resData.product;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

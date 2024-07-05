import { Axios, handleAxiosError } from '@/config/axios';
import {
    CreateProductInfo,
    CreateProductResType,
    DeleteProductResType,
    ProductResType,
    ProductType,
    UpdateProductInfo,
    UpdateProductResType,
} from '@/types';

export const getProducts = async () => {
    try {
        const { data } = await Axios.get<ProductResType>('/product/all-products');
        return data.products;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const getProduct = async (productId: string) => {
    try {
        const { data } = await Axios.get<{ product: ProductType }>(`/product/${productId}`);
        return data.product;
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

export const UpdateProduct = async (productInfo: UpdateProductInfo, imageFiles: FormData) => {
    try {
        console.log({ productInfo, imageFiles });
        const { data } = await Axios.put<UpdateProductResType>(
            `/product/update-product/${productInfo._id}`,
            productInfo
        );

        if (imageFiles) {
            const { data: resData } = await Axios.put<UpdateProductResType>(
                `/product/${data.product._id}/upload-images`,
                imageFiles
            );
            return resData.product;
        }

        return data.product;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const DeleteProduct = async (productId: string) => {
    try {
        const { data } = await Axios.delete<DeleteProductResType>(`/product/delete-product/${productId}`);
        return data.productId;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

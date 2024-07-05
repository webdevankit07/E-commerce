import { Axios, handleAxiosError } from '@/config/axios';
import { CreateCategoryResType, DeleteCategoryResType, ProductCategoryResType } from '@/types';

export const getCategories = async () => {
    try {
        const { data } = await Axios.get<ProductCategoryResType>(`/category/product-category/all-category`);
        return data.categories;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const createCategory = async (title: string) => {
    try {
        const { data } = await Axios.post<CreateCategoryResType>(`/category/product-category/create`, { title });
        return data.newCategory;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const deleteCategory = async (categoryId: string) => {
    try {
        const { data } = await Axios.delete<DeleteCategoryResType>(`/category/product-category/delete/${categoryId}`);
        return data.deletedcategory._id;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

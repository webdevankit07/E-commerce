import { Axios, handleAxiosError } from '@/config/axios';
import { ApiResposeType, LoginData, LoginResType, SignUpFormData, SignUpResType, WishListResType } from '@/types';

export const register = async (userData: SignUpFormData) => {
    try {
        const { data } = await Axios.post<SignUpResType>(`/user/register`, userData);
        return data.user;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const login = async (userData: LoginData) => {
    try {
        const { data } = await Axios.post<LoginResType>(`/user/login`, userData);
        return data.user;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const logout = async () => {
    try {
        const { data } = await Axios.post<ApiResposeType>(`/user/logout`);
        return data;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const togglewishList = async (productId: string) => {
    try {
        const { data } = await Axios.put<WishListResType>(`/product/${productId}/wishlist`);
        return data.user;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const togglecompare = async (productId: string) => {
    try {
        const { data } = await Axios.put<WishListResType>(`/product/${productId}/compare`);
        return data.user;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

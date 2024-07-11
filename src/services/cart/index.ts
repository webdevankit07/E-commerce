import { Axios, handleAxiosError } from '@/config/axios';
import { AddToCartResType, CartType } from '@/types';

export const myCart = async () => {
    try {
        const { data } = await Axios.get<{ cart: CartType }>(`/user/cart`);
        return data.cart;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const AddToCart = async (productId: string, cartData: { count: number; color: string }) => {
    try {
        const { data } = await Axios.post<{ cart: CartType }>(`/product/${productId}/add-to-cart`, cartData);
        return data.cart;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const UpdateCartProduct = async (cartProductId: string, cartData: { count: number; color: string }) => {
    try {
        const { data } = await Axios.put<{ cart: CartType }>(`/user/cart/product/${cartProductId}/update`, cartData);
        return data.cart;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const DeleteCartProduct = async (cartProductId: string) => {
    try {
        const { data } = await Axios.delete<{ cart: CartType }>(`/user/cart/product/${cartProductId}/delete`);
        return data.cart;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const EmptyCart = async () => {
    try {
        const { data } = await Axios.delete<{ cart: CartType }>(`/user/cart/empty`);
        return data.cart;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

import { handleAxiosError } from '@/config/axios';
import { AddToCart, DeleteCartProduct, EmptyCart, myCart, UpdateCartProduct } from '@/services/cart';
import { CartInitialStateType, ColorInitialStateType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const getMyCart = createAsyncThunk('cart/get-my-cart', async (_, { rejectWithValue }) => {
    try {
        const cart = await myCart();
        return cart;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

export const getCart = createAsyncThunk('cart/get-cart', async (_, { rejectWithValue }) => {
    try {
        const cart = await myCart();
        return cart;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw rejectWithValue(err);
    }
});

export const addToCart = createAsyncThunk(
    'cart/add-to-cart',
    async (
        { productId, cartData }: { productId: string; cartData: { count: number; color: string } },
        { rejectWithValue }
    ) => {
        try {
            const cart = await AddToCart(productId, cartData);
            toast.success('Added to cart');
            return cart;
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            throw rejectWithValue(err);
        }
    }
);

export const updateCartProduct = createAsyncThunk(
    'cart/update-cart-product',
    async (
        { productId, cartData }: { productId: string; cartData: { count: number; color: string } },
        { rejectWithValue }
    ) => {
        try {
            const cart = await UpdateCartProduct(productId, cartData);
            toast.success('Cart Product updated');
            return cart;
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            throw rejectWithValue(err);
        }
    }
);

export const deleteCartProduct = createAsyncThunk(
    'cart/delete-cart',
    async (cartProductId: string, { rejectWithValue }) => {
        try {
            const cart = await DeleteCartProduct(cartProductId);
            toast.success('Deleted');
            return cart;
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            throw rejectWithValue(err);
        }
    }
);

export const emptyCart = createAsyncThunk('cart/empty-cart', async (_, { rejectWithValue }) => {
    try {
        const cart = await EmptyCart();
        toast.success('Success');
        return cart;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

const initialState: CartInitialStateType = {
    cart: null,
    isLoading: false,
    createLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMyCart.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getMyCart.fulfilled, (state, { payload }) => {
                state.cart = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getMyCart.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(getCart.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getCart.fulfilled, (state, { payload }) => {
                state.cart = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getCart.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(addToCart.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, { payload }) => {
                state.cart = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(addToCart.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(updateCartProduct.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(updateCartProduct.fulfilled, (state, { payload }) => {
                state.cart = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(updateCartProduct.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(deleteCartProduct.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(deleteCartProduct.fulfilled, (state, { payload }) => {
                state.cart = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(deleteCartProduct.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(emptyCart.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(emptyCart.fulfilled, (state, { payload }) => {
                state.cart = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(emptyCart.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            });
    },
});

export default colorSlice.reducer;
export const {} = colorSlice.actions;

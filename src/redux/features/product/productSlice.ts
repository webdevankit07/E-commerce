import { getProducts } from '@/services/products';
import { ProductSliceInitialStateType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllProducts = createAsyncThunk('products/getAllProducts', async (_, { rejectWithValue }) => {
    try {
        const products = await getProducts();
        return products;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState: ProductSliceInitialStateType = {
    products: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

const productsSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, { payload }) => {
                state.products = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getAllProducts.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.products = [];
                state.message = error;
            });
    },
});

export default productsSlice.reducer;
export const {} = productsSlice.actions;

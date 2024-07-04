import { CreateProduct, DeleteProduct, getProducts } from '@/services/products';
import { CreateProductInfo, ProductSliceInitialStateType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllProducts = createAsyncThunk('products/getAllProducts', async (_, { rejectWithValue }) => {
    try {
        const products = await getProducts();
        return products;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const createProduct = createAsyncThunk(
    'products/create-product',
    async (
        { productInfo, imageFiles }: { productInfo: CreateProductInfo; imageFiles: FormData },
        { rejectWithValue }
    ) => {
        try {
            const product = await CreateProduct(productInfo, imageFiles);
            return product;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteProduct = createAsyncThunk('products/delete-product', async (id: string, { rejectWithValue }) => {
    try {
        const productId = await DeleteProduct(id);
        return productId;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState: ProductSliceInitialStateType = {
    products: [],
    isLoading: false,
    isProductEditing: false,
    isProductDeleting: false,
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
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, { payload }) => {
                state.products = [...state.products, payload];
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(createProduct.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isProductDeleting = true;
            })
            .addCase(deleteProduct.fulfilled, (state, { payload }) => {
                const products = state.products.filter((product) => product._id !== payload);
                state.products = products;
                state.isProductDeleting = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(deleteProduct.rejected, (state, { error }) => {
                state.isProductDeleting = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            });
    },
});

export default productsSlice.reducer;
export const {} = productsSlice.actions;

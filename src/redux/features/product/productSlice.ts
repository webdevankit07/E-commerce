import toast from 'react-hot-toast';
import { clientProducts, CreateProduct, DeleteProduct, getProducts, UpdateProduct } from '@/services/products';
import { CreateProductInfo, ProductSliceInitialStateType, UpdateProductInfo } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleAxiosError } from '@/config/axios';

export const getAllProducts = createAsyncThunk('products/getAllProducts', async (_, { rejectWithValue }) => {
    try {
        const products = await getProducts();
        return products;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

export const getClientProducts = createAsyncThunk(
    'products/getAll-clientProducts',
    async (queries: string, { rejectWithValue }) => {
        try {
            const products = await clientProducts(queries);
            return products;
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            throw rejectWithValue(err);
        }
    }
);

export const createProduct = createAsyncThunk(
    'products/create-product',
    async (
        { productInfo, imageFiles }: { productInfo: CreateProductInfo; imageFiles: FormData },
        { rejectWithValue }
    ) => {
        try {
            const product = await CreateProduct(productInfo, imageFiles);
            toast.success('Product created');
            return product;
        } catch (error) {
            toast.error(error as string);
            const err = await handleAxiosError(error);
            toast.error(err);
            throw rejectWithValue(err);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/update-product',
    async (
        { ProductInfo, imageFiles }: { ProductInfo: UpdateProductInfo; imageFiles: FormData },
        { rejectWithValue }
    ) => {
        try {
            const product = await UpdateProduct(ProductInfo, imageFiles);
            toast.success('Product updated');
            return product;
        } catch (error) {
            toast.error(error as string);
            const err = await handleAxiosError(error);
            toast.error(err);
            throw rejectWithValue(err);
        }
    }
);

export const deleteProduct = createAsyncThunk('products/delete-product', async (id: string, { rejectWithValue }) => {
    try {
        const productId = await DeleteProduct(id);
        toast.error('Product deleted');
        return productId;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

const initialState: ProductSliceInitialStateType = {
    products: [],
    popularProducts: [],
    featuredProducts: [],
    clientProducts: null,
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
    reducers: {
        getPopularProducts: (state) => {
            const allProducts = state.products;
            const popularProducts = allProducts.sort((a, b) => b.totalRating - a.totalRating).slice(0, 10);
            state.popularProducts = popularProducts;
        },
        getFeaturedProducts: (state) => {
            const allProducts = state.products;
            const popularProducts = allProducts.sort((a, b) => b.price - a.price).slice(0, 10);
            state.featuredProducts = popularProducts;
        },
        filterProduct: (state, { payload }) => {
            state.clientProducts?.products.sort((a, b) =>
                payload === 'Price, low to high'
                    ? a.price - b.price
                    : payload === 'Price, high to low'
                    ? b.price - a.price
                    : payload === 'Alphabetically, A-Z'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isError = false;
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
            .addCase(getClientProducts.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getClientProducts.fulfilled, (state, { payload }) => {
                state.clientProducts = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getClientProducts.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.products = [];
                state.message = error;
            })
            .addCase(createProduct.pending, (state) => {
                state.isError = false;
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
            .addCase(updateProduct.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, { payload }) => {
                state.products = state.products.map((product) => {
                    if (product._id === payload._id) {
                        return payload;
                    }
                    return product;
                });
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(updateProduct.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isError = false;
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
export const { getPopularProducts, getFeaturedProducts, filterProduct } = productsSlice.actions;

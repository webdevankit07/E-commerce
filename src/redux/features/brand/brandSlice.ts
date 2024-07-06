import { CreateBrand, DeleteBrand, getBrands } from '@/services/brand';
import { BrandInitialStateType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const getAllBrands = createAsyncThunk('brands/all-brands', async (_, { rejectWithValue }) => {
    try {
        const brands = await getBrands();
        return brands;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const createBrand = createAsyncThunk('brands/create-brand', async (name: string, { rejectWithValue }) => {
    try {
        const brand = await CreateBrand(name);
        toast.success('Brand created');
        return brand;
    } catch (error) {
        toast.error(error as string);
        return rejectWithValue(error);
    }
});

export const deleteBrand = createAsyncThunk('brands/delete-brand', async (brandId: string, { rejectWithValue }) => {
    try {
        const id = await DeleteBrand(brandId);
        toast.success('Brand deleted');
        return id;
    } catch (error) {
        toast.error(error as string);
        return rejectWithValue(error);
    }
});

const initialState: BrandInitialStateType = {
    brands: [],
    isLoading: false,
    createLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBrands.fulfilled, (state, { payload }) => {
                state.brands = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getAllBrands.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.brands = [];
                state.message = error;
            })
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true;
                state.createLoading = true;
            })
            .addCase(createBrand.fulfilled, (state, { payload }) => {
                state.brands = [...state.brands, payload];
                state.isLoading = false;
                state.createLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(createBrand.rejected, (state, { error }) => {
                state.isLoading = false;
                state.createLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(deleteBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBrand.fulfilled, (state, { payload }) => {
                state.brands = state.brands.filter((brand) => brand._id !== payload);
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(deleteBrand.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            });
    },
});

export default brandSlice.reducer;
export const {} = brandSlice.actions;

import { getBrands } from '@/services/brand';
import { BrandInitialStateType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllBrands = createAsyncThunk('brands/all-brands', async (_, { rejectWithValue }) => {
    try {
        const brands = await getBrands();
        return brands;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState: BrandInitialStateType = {
    brands: [],
    isLoading: false,
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
            });
    },
});

export default brandSlice.reducer;
export const {} = brandSlice.actions;

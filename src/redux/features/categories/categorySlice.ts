import { getCategories } from '@/services/category';
import { CategoryInitialStateType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllCategories = createAsyncThunk('category/all-categories', async (_, { rejectWithValue }) => {
    try {
        const categories = await getCategories();
        return categories;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState: CategoryInitialStateType = {
    categories: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, { payload }) => {
                state.categories = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getAllCategories.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.categories = [];
                state.message = error;
            });
    },
});

export default categorySlice.reducer;
export const {} = categorySlice.actions;

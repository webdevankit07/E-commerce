import { CreateCategory, DeleteCategory, getCategories } from '@/services/category';
import { CategoryInitialStateType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const getAllCategories = createAsyncThunk('category/all-categories', async (_, { rejectWithValue }) => {
    try {
        const categories = await getCategories();
        return categories;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const createCategory = createAsyncThunk(
    'category/create-category',
    async (title: string, { rejectWithValue }) => {
        try {
            const category = await CreateCategory(title);
            toast.success('Category created');
            return category;
        } catch (error) {
            toast.error(error as string);
            return rejectWithValue(error);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'brands/delete-brand',
    async (categoryId: string, { rejectWithValue }) => {
        try {
            const id = await DeleteCategory(categoryId);
            toast.success('Category deleted');
            return id;
        } catch (error) {
            toast.error(error as string);
            return rejectWithValue(error);
        }
    }
);

const initialState: CategoryInitialStateType = {
    categories: [],
    isLoading: false,
    createLoading: false,
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
            })
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
                state.createLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, { payload }) => {
                state.categories = [...state.categories, payload];
                state.isLoading = false;
                state.createLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(createCategory.rejected, (state, { error }) => {
                state.isLoading = false;
                state.createLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, { payload }) => {
                state.categories = state.categories.filter((category) => category._id !== payload);
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(deleteCategory.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            });
    },
});

export default categorySlice.reducer;
export const {} = categorySlice.actions;

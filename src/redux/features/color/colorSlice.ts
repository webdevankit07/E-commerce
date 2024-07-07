import { handleAxiosError } from '@/config/axios';
import { getCategories } from '@/services/category';
import { CreateColor, DeleteColor, getColors } from '@/services/color';
import { CategoryInitialStateType, ColorInitialStateType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const getAllColors = createAsyncThunk('color/all-colors', async (_, { rejectWithValue }) => {
    try {
        const colors = await getColors();
        return colors;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

export const createColor = createAsyncThunk('color/create-color', async (name: string, { rejectWithValue }) => {
    try {
        const color = await CreateColor(name);
        toast.success('Color created');
        return color;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

export const deleteColor = createAsyncThunk('brands/delete-brand', async (colorId: string, { rejectWithValue }) => {
    try {
        const id = await DeleteColor(colorId);
        toast.success('Color deleted');
        return id;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

const initialState: ColorInitialStateType = {
    colors: [],
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
            .addCase(getAllColors.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getAllColors.fulfilled, (state, { payload }) => {
                state.colors = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getAllColors.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.colors = [];
                state.message = error;
            })
            .addCase(createColor.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.createLoading = true;
            })
            .addCase(createColor.fulfilled, (state, { payload }) => {
                state.colors = [...state.colors, payload];
                state.isLoading = false;
                state.createLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(createColor.rejected, (state, { error }) => {
                state.isLoading = false;
                state.createLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(deleteColor.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(deleteColor.fulfilled, (state, { payload }) => {
                state.colors = state.colors.filter((color) => color._id !== payload);
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(deleteColor.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            });
    },
});

export default colorSlice.reducer;
export const {} = colorSlice.actions;

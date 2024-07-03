import { getCategories } from '@/services/category';
import { getColors } from '@/services/color';
import { CategoryInitialStateType, ColorInitialStateType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllColors = createAsyncThunk('color/all-colors', async (_, { rejectWithValue }) => {
    try {
        const colors = await getColors();
        return colors;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState: ColorInitialStateType = {
    colors: [],
    isLoading: false,
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
            });
    },
});

export default colorSlice.reducer;
export const {} = colorSlice.actions;

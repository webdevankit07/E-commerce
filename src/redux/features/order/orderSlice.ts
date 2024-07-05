import { getOrders } from '@/services/order';
import { OderInitialStateType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllOrders = createAsyncThunk('order/all-orders', async (_, { rejectWithValue }) => {
    try {
        const orders = await getOrders();
        return orders;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState: OderInitialStateType = {
    orders: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, { payload }) => {
                state.orders = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getAllOrders.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.orders = [];
                state.message = error;
            });
    },
});

export default orderSlice.reducer;
export const {} = orderSlice.actions;
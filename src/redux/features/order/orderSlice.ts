import { handleAxiosError } from '@/config/axios';
import { getOrders, UpdateOrderStatus } from '@/services/order';
import { OderInitialStateType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const getAllOrders = createAsyncThunk('order/all-orders', async (_, { rejectWithValue }) => {
    try {
        const orders = await getOrders();
        return orders;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

export const updateOrderStatus = createAsyncThunk(
    'enquiry/update-enquiry',
    async ({ status, orderId }: { status: string; orderId: string }, { rejectWithValue }) => {
        try {
            const order = await UpdateOrderStatus(status, orderId);
            toast.success('Order status changed');
            return order;
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            throw rejectWithValue(err);
        }
    }
);

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
                state.isError = false;
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
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
                state.orders = state.orders.map((order) => {
                    if (order._id === payload._id) {
                        return payload;
                    }
                    return order;
                });
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(updateOrderStatus.rejected, (state, { error }) => {
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

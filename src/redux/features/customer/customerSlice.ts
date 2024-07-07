import { handleAxiosError } from '@/config/axios';
import { getUsers } from '@/services/customer';
import { CustomerInitialStateType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const getAllusers = createAsyncThunk('customer/getAllUsers', async (_, { rejectWithValue }) => {
    try {
        const users = await getUsers();
        return users;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

const initialState: CustomerInitialStateType = {
    customers: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllusers.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getAllusers.fulfilled, (state, { payload }) => {
                state.customers = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getAllusers.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.customers = [];
                state.message = error;
            });
    },
});

export default customerSlice.reducer;
export const {} = customerSlice.actions;

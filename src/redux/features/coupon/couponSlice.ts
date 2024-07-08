import toast from 'react-hot-toast';
import { CouponSliceInitialStateType, CreateCouponDataType, UpdateCouponDataType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateCoupon, DeleteCoupon, getCoupons, UpdateCoupon } from '@/services/coupon';
import { handleAxiosError } from '@/config/axios';

export const getAllCoupons = createAsyncThunk('coupon/all-coupons', async (_, { rejectWithValue }) => {
    try {
        const coupons = await getCoupons();
        return coupons;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

export const createCoupon = createAsyncThunk(
    'coupon/create-coupon',
    async (couponData: CreateCouponDataType, { rejectWithValue }) => {
        try {
            const coupon = await CreateCoupon(couponData);
            toast.success('Coupon created');
            return coupon;
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            throw rejectWithValue(err);
        }
    }
);

export const updateCoupon = createAsyncThunk(
    'coupon/update-coupon',
    async ({ couponData, couponId }: { couponData: UpdateCouponDataType; couponId: string }, { rejectWithValue }) => {
        try {
            const coupon = await UpdateCoupon(couponData, couponId);
            toast.error('Coupon Updated');
            return coupon;
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            throw rejectWithValue(err);
        }
    }
);

export const deleteCoupon = createAsyncThunk('coupon/delete-coupon', async (couponId: string, { rejectWithValue }) => {
    try {
        const id = await DeleteCoupon(couponId);
        toast.success('Coupon deleted');
        return id;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

const initialState: CouponSliceInitialStateType = {
    coupons: [],
    isLoading: false,
    createLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCoupons.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getAllCoupons.fulfilled, (state, { payload }) => {
                state.coupons = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getAllCoupons.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.coupons = [];
                state.message = error;
            })
            .addCase(createCoupon.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
                state.createLoading = true;
            })
            .addCase(createCoupon.fulfilled, (state, { payload }) => {
                state.coupons = [...state.coupons, payload];
                state.isLoading = false;
                state.createLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(createCoupon.rejected, (state, { error }) => {
                state.isLoading = false;
                state.createLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(updateCoupon.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
                state.createLoading = true;
            })
            .addCase(updateCoupon.fulfilled, (state, { payload }) => {
                state.coupons = state.coupons.map((coupon) => {
                    if (coupon._id === payload._id) {
                        return payload;
                    }
                    return coupon;
                });
                state.isLoading = false;
                state.createLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(updateCoupon.rejected, (state, { error }) => {
                state.isLoading = false;
                state.createLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(deleteCoupon.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(deleteCoupon.fulfilled, (state, { payload }) => {
                state.coupons = state.coupons.filter((coupon) => coupon._id !== payload);
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(deleteCoupon.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            });
    },
});

export default couponSlice.reducer;
export const {} = couponSlice.actions;

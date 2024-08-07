import { handleAxiosError } from '@/config/axios';
import { DeleteEnq, getEnquiries, UpdateEnq } from '@/services/enquiry';
import { EnquiryInitialStateType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const getAllEnquiries = createAsyncThunk('enquiry/all-enquiries', async (_, { rejectWithValue }) => {
    try {
        const enquiries = await getEnquiries();
        return enquiries;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

export const updateEnq = createAsyncThunk(
    'enquiry/update-enquiry',
    async ({ status, enqId }: { status: string; enqId: string }, { rejectWithValue }) => {
        try {
            const enquiriy = await UpdateEnq(status, enqId);
            toast.success('Enquiry updated');
            return enquiriy;
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            throw rejectWithValue(err);
        }
    }
);

export const deleteEnq = createAsyncThunk('enquiry/delete-enquiry', async (enqId: string, { rejectWithValue }) => {
    try {
        const enquiry = await DeleteEnq(enqId);
        toast.error('Enquiry Deleted');
        return enquiry;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

const initialState: EnquiryInitialStateType = {
    enquiries: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

const enquirySlice = createSlice({
    name: 'enquiry',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllEnquiries.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getAllEnquiries.fulfilled, (state, { payload }) => {
                state.enquiries = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getAllEnquiries.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.enquiries = [];
                state.message = error;
            })
            .addCase(updateEnq.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(updateEnq.fulfilled, (state, { payload }) => {
                state.enquiries = state.enquiries.map((enqiry) => {
                    if (enqiry._id === payload._id) {
                        return payload;
                    }
                    return enqiry;
                });
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(updateEnq.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error.message;
            })
            .addCase(deleteEnq.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(deleteEnq.fulfilled, (state, { payload }) => {
                state.enquiries = state.enquiries.filter((enquiry) => enquiry._id !== payload);
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(deleteEnq.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            });
    },
});

export default enquirySlice.reducer;
export const {} = enquirySlice.actions;

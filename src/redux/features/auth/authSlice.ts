import { handleAxiosError } from '@/config/axios';
import { login } from '@/services/auth';
import { AuthInitialStateType, LoginData, UserResType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const adminLogin = createAsyncThunk('auth/admin-login', async (userData: LoginData, { rejectWithValue }) => {
    try {
        const res = await login(true, userData);
        return res;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const userLogin = createAsyncThunk('auth/user-login', async (userData: LoginData, { rejectWithValue }) => {
    try {
        const res = await login(true, userData);
        return res;
    } catch (error) {
        rejectWithValue(error);
    }
});

const initialState: AuthInitialStateType = {
    user: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, { payload }) => {
            state.user = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.isLoading = false;
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                console.log({ payload });
                if (typeof payload !== 'string' && payload !== undefined) {
                    state.user = payload;
                }
            })
            .addCase(userLogin.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
            })
            .addCase(adminLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminLogin.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (typeof payload !== 'string' && payload !== undefined) {
                    state.user = payload;
                }
            })
            .addCase(adminLogin.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
            });
    },
});

export default authSlice.reducer;
export const { setCurrentUser } = authSlice.actions;

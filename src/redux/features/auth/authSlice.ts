import { login, logout, register } from '@/services/auth';
import { AuthInitialStateType, LoginData, SignUpFormData, UserResType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const userRegister = createAsyncThunk(
    'auth/user-register',
    async (userData: SignUpFormData, { rejectWithValue }) => {
        try {
            const res = await register(userData);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const userLogin = createAsyncThunk('auth/user-login', async (userData: LoginData, { rejectWithValue }) => {
    try {
        const res = await login(userData);
        return res;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const userLogout = createAsyncThunk('auth/user-logout', async (_, { rejectWithValue }) => {
    try {
        const res = await logout();
        return res;
    } catch (error) {
        return rejectWithValue(error);
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
            .addCase(userRegister.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userRegister.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = payload;
            })
            .addCase(userRegister.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                state.message = error;
            })
            .addCase(userLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = payload;
            })
            .addCase(userLogin.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                state.message = error;
            })
            .addCase(userLogout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
            })
            .addCase(userLogout.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                state.message = error;
            });
    },
});

export default authSlice.reducer;
export const { setCurrentUser } = authSlice.actions;

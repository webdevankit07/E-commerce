import { UpdateUserData } from '@/app/(user)/my-account/profile/page';
import { handleAxiosError } from '@/config/axios';
import { deleteAccount, login, logout, register, togglecompare, togglewishList, update } from '@/services/auth';
import { AuthInitialStateType, LoginData, SignUpFormData, UserResType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const userRegister = createAsyncThunk(
    'auth/user-register',
    async (userData: SignUpFormData, { rejectWithValue }) => {
        try {
            const res = await register(userData);
            toast.success('Successfully Registered');
            return res;
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            throw rejectWithValue(err);
        }
    }
);

export const userLogin = createAsyncThunk('auth/user-login', async (userData: LoginData, { rejectWithValue }) => {
    try {
        const res = await login(userData);
        toast.success('Logged In');
        return res;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

export const userLogout = createAsyncThunk('auth/user-logout', async (_, { rejectWithValue }) => {
    try {
        const res = await logout();
        toast.success('Logged Out');
        return res;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

export const updateUser = createAsyncThunk(
    'auth/update-user',
    async (userData: UpdateUserData, { rejectWithValue }) => {
        try {
            const res = await update(userData);
            toast.success('User Updated');
            return res;
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            throw rejectWithValue(err);
        }
    }
);

export const deleteUserAccount = createAsyncThunk('auth/delete-user-account', async (_, { rejectWithValue }) => {
    try {
        const res = await deleteAccount();
        toast.success('User Deleted');
        return res;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

export const toggleWishList = createAsyncThunk('auth/wishlist', async (productId: string, { rejectWithValue }) => {
    try {
        const res = await togglewishList(productId);
        return res;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
    }
});

export const toggleCompare = createAsyncThunk('auth/compare', async (productId: string, { rejectWithValue }) => {
    try {
        const res = await togglecompare(productId);
        return res;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw rejectWithValue(err);
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
                state.isError = false;
            })
            .addCase(userRegister.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.isLoading = false;
                state.isSuccess = true;
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
                state.isError = false;
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.isLoading = false;
                state.isSuccess = true;
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
                state.isError = false;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
            })
            .addCase(userLogout.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(updateUser.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(deleteUserAccount.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteUserAccount.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(deleteUserAccount.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(toggleWishList.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(toggleWishList.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(toggleWishList.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            })
            .addCase(toggleCompare.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(toggleCompare.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(toggleCompare.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = error;
            });
    },
});

export default authSlice.reducer;
export const { setCurrentUser } = authSlice.actions;

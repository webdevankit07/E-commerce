import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import customerSlice from './features/customer/customerSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        customer: customerSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

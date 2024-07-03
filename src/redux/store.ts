import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import customerSlice from './features/customer/customerSlice';
import productSlice from './features/product/productSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        customer: customerSlice,
        product: productSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import customerSlice from './features/customer/customerSlice';
import productSlice from './features/product/productSlice';
import brandSlice from './features/brand/brandSlice';
import categorySlice from './features/categories/categorySlice';
import colorSlice from './features/color/colorSlice';
import enquirySlice from './features/enquiry/enquirySlice';
import orderSlice from './features/order/orderSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        customer: customerSlice,
        product: productSlice,
        brand: brandSlice,
        category: categorySlice,
        color: colorSlice,
        enquiry: enquirySlice,
        order: orderSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

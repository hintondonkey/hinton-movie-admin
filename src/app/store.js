import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../services/auth/authSlice';
import categoryReducer from '../services/category/categorySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
    },
});

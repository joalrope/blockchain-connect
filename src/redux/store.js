import { configureStore } from '@reduxjs/toolkit';
import darkModelReducer from './slices/darkSlice';

export const store = configureStore({
    reducer: {
        dark: darkModelReducer
    }
});
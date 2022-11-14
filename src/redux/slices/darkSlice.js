import { createSlice } from '@reduxjs/toolkit';

export const darkSlice = createSlice({
    name: 'dark',
    initialState: { value: false },
    reducers: {
        toggleDarkMode: (state, toggle) => {
            state.value = toggle.payload;
        }
    }
});

export const { toggleDarkMode } = darkSlice.actions;
export default darkSlice.reducer;
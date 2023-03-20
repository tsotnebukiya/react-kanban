import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDark: (state) => {
      state.darkMode = true;
    },
    setLight: (state) => {
      state.darkMode = false;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice;

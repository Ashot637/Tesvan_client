import { createSlice } from '@reduxjs/toolkit';

const getLanguageFromLS = () => {
  const language = localStorage.getItem('language');
  return (
    JSON.parse(language) || {
      label: 'English',
      title: 'en',
    }
  );
};

const initialState = {
  language: getLanguageFromLS(),
  languagesList: [
    {
      label: 'English',
      title: 'en',
    },
    {
      label: 'Russian',
      title: 'ru',
    },
    {
      label: 'Armenian',
      title: 'am',
    },
  ],
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const languageReducer = languageSlice.reducer;

export const { changeLanguage } = languageSlice.actions;

import { createSlice } from '@reduxjs/toolkit';
import en from '../../img/en.webp';
import am from '../../img/am.webp';
import ru from '../../img/ru.webp';

const getLanguageFromLS = () => {
  const language = localStorage.getItem('language');
  return (
    JSON.parse(language) || {
      label: 'English',
      title: 'en',
      img: en,
    }
  );
};

const initialState = {
  language: getLanguageFromLS(),
  languagesList: [
    {
      label: 'English',
      title: 'en',
      img: en,
    },
    {
      label: 'Russian',
      title: 'ru',
      img: ru,
    },
    {
      label: 'Armenian',
      title: 'am',
      img: am,
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

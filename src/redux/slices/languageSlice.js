import { createSlice } from '@reduxjs/toolkit';

const getLanguageFromLS = () => {
  const language = JSON.parse(localStorage.getItem('language'));
  if (!language) {
    localStorage.setItem(
      'language',
      JSON.stringify({
        label: 'Armenian',
        title: 'am',
        img: '/img/am.webp',
      }),
    );
  }
  return (
    language || {
      label: 'Armenian',
      title: 'am',
      img: '/img/am.webp',
    }
  );
};

const initialState = {
  language: getLanguageFromLS(),
  languagesList: [
    {
      label: 'English',
      title: 'en',
      img: '/img/en.webp',
    },
    {
      label: 'Russian',
      title: 'ru',
      img: '/img/ru.webp',
    },
    {
      label: 'Armenian',
      title: 'am',
      img: '/img/am.webp',
    },
  ],
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      localStorage.setItem('language', JSON.stringify(action.payload));
      state.language = action.payload;
    },
  },
});

export const languageReducer = languageSlice.reducer;

export const { changeLanguage } = languageSlice.actions;

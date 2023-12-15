import { configureStore } from '@reduxjs/toolkit';
import { changeLanguage, languageReducer } from './languageSlice';

describe('language slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { language: languageReducer } });
  });

  test('should handle changeLanguage', () => {
    const payload = {
      label: 'English',
      title: 'en',
      img: '/img/en.webp',
    };
    store.dispatch(changeLanguage(payload));

    const state = store.getState().language;

    expect(state.language).toEqual(payload);
  });
});

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './styles/styles.scss';
import './styles/variables.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { initReactI18next } from 'react-i18next';
import { translationsAm, translationsEn, translationsRu } from './languages/langauges';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn },
    ru: { translation: translationsRu },
    am: { translation: translationsAm },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

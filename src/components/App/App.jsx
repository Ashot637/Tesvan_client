import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import AboutUsPage from '../../pages/AboutUsPage';
import CreditTermsPage from '../../pages/CreditTermsPage';
import ContactsPage from '../../pages/ContactsPage';
import CategoriesPage from '../../pages/CategoriesPage';
import ItemsMainPage from '../../pages/ItemsMainPage';
import SimpleDevicePage from '../../pages/SimpleDevicePage';
import ScrollToTop from '../../helpers/ScrollToTop';
import DevicesPage from '../../pages/DevicesPage';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:categorie" element={<DevicesPage />} />
        <Route path="/categories/:categorie/:id" element={<SimpleDevicePage />} />

        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/credit-terms" element={<CreditTermsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />

        <Route path="/sale" element={<ItemsMainPage typeId={1} title={'Sale'} />} />
        <Route
          path="/new-collection"
          element={<ItemsMainPage typeId={2} title={'New Collection'} />}
        />
        <Route path="/bestsellers" element={<ItemsMainPage typeId={3} title={'Bestsellers'} />} />

        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default App;

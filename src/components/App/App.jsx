import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import AboutUsPage from '../../pages/AboutUsPage';
import CreditTermsPage from '../../pages/CreditTermsPage';
import ContactsPage from '../../pages/ContactsPage';
import CategoriesPage from '../../pages/CategoriesPage';
import ItemsMainPage from '../../pages/ItemsMainPage';
import SimpleDevicePage from '../../pages/SimpleDevicePage';
import ScrollToTop from '../../helpers/ScrollToTop';
import DevicesPage from '../../pages/DevicesPage';
import OrderPage from '../../pages/OrderPage';
import ComparePage from '../../pages/ComparePage';
import ThanksPage from '../../pages/ThanksPage';

import AdminHome from '../Admin/components/AdminHome/AdminHome';
import AdminDevices from '../Admin/components/AdminDevices/AdminDevices';
import AdminCategories from '../Admin/components/AdminCategories/AdminCategories';
import AdminBrands from '../Admin/components/AdminBrands/AdminBrands';
import AdminHeaderImages from '../Admin/components/AdminHeaderImages/AdminHeaderImages';
import AdminSliderImages from '../Admin/components/AdminSliderImages/AdminSliderImages';
import AdminMessages from '../Admin/components/AdminMessages/AdminMessages';
import AdminOrders from '../Admin/components/AdminOrders/AdminOrders';
import OrderInfo from '../Admin/components/OrderInfo/OrderInfo';
import EditNewCategorie from '../Admin/components/EditNewCategorie/EditNewCategorie';
import EditNewBrand from '../Admin/components/EditNewBrand/EditNewBrand';
import EditNewDevice from '../Admin/components/EditNewDevice/EditNewDevice';
import EditNewHeaderImg from '../Admin/components/EditNewHeaderImg/EditNewHeaderImg';
import EditNewSliderImg from '../Admin/components/EditNewSliderImg/EditNewSliderImg';
import AdminLogin from '../Admin/components/AdminLogin/AdminLogin';

const App = () => {
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes('/admin') && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:categorie" element={<DevicesPage />} />
        <Route path="/categories/:categorie/:id" element={<SimpleDevicePage />} />
        <Route path="/categories/:categorie/:id/make-order" element={<OrderPage />} />
        <Route path="/make-order" element={<OrderPage />} />
        <Route path="/compare" element={<ComparePage />} />

        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/credit-terms" element={<CreditTermsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/contacts/order" element={<ContactsPage />} />

        <Route path="/sale" element={<ItemsMainPage typeId={1} title={'sale'} />} />
        <Route
          path="/new-collection"
          element={<ItemsMainPage typeId={2} title={'newCollection'} />}
        />
        <Route path="/bestsellers" element={<ItemsMainPage typeId={3} title={'bestsellers'} />} />

        <Route path="/thanks" element={<ThanksPage success />} />
        <Route path="/reject" element={<ThanksPage />} />

        <Route path="*" element={<Navigate to={'/'} />} />

        <Route path="/admin" element={<AdminHome />}>
          <Route path="login" element={<AdminLogin />} />
          <Route path="devices" element={<AdminDevices />} />
          <Route path="devices/:id" element={<EditNewDevice />} />
          <Route path="devices/new" element={<EditNewDevice />} />

          <Route path="brands" element={<AdminBrands />} />
          <Route path="brands/:id" element={<EditNewBrand />} />
          <Route path="brands/new" element={<EditNewBrand />} />

          <Route path="categories" element={<AdminCategories />} />
          <Route path="categories/:id" element={<EditNewCategorie />} />
          <Route path="categories/new" element={<EditNewCategorie />} />

          <Route path="slider-imgs" element={<AdminSliderImages />} />
          <Route path="slider-imgs/:id" element={<EditNewSliderImg />} />
          <Route path="slider-imgs/new" element={<EditNewSliderImg />} />

          <Route path="header-imgs" element={<AdminHeaderImages />} />
          <Route path="header-imgs/:id" element={<EditNewHeaderImg />} />
          <Route path="header-imgs/new" element={<EditNewHeaderImg />} />

          <Route path="messages" element={<AdminMessages />} />

          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<OrderInfo />} />
        </Route>
      </Routes>

      {!location.pathname.includes('/admin') && <Footer />}
      <ScrollToTop />
    </>
  );
};

export default App;

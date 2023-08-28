import React, { Suspense, lazy } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import HomePage from '../../pages/HomePage';
// import AboutUsPage from '../../pages/AboutUsPage';
// import CreditTermsPage from '../../pages/CreditTermsPage';
// import ContactsPage from '../../pages/ContactsPage';
// import CategoriesPage from '../../pages/CategoriesPage';
// import ItemsMainPage from '../../pages/ItemsMainPage';
// import SimpleDevicePage from '../../pages/SimpleDevicePage';
// import DevicesPage from '../../pages/DevicesPage';
// import OrderPage from '../../pages/OrderPage';
// import ComparePage from '../../pages/ComparePage';
// import ThanksPage from '../../pages/ThanksPage';

import ScrollToTop from '../../helpers/ScrollToTop';

import { CategoriesPage, SimpleDevicePage, DevicesPage } from '../../pages';
import Spinner from '../Spinner/Spinner';

const HomePage = lazy(() => import('../../pages/HomePage'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage'));
const OrderPage = lazy(() => import('../../pages/OrderPage'));
const AboutUsPage = lazy(() => import('../../pages/AboutUsPage'));
const CreditTermsPage = lazy(() => import('../../pages/CreditTermsPage'));
const ThanksPage = lazy(() => import('../../pages/ThanksPage'));
const ItemsMainPage = lazy(() => import('../../pages/ItemsMainPage'));
const ComparePage = lazy(() => import('../../pages/ComparePage'));

const AdminHome = lazy(() => import('../Admin/components/AdminHome/AdminHome'));
const AdminDevices = lazy(() => import('../Admin/components/AdminDevices/AdminDevices'));
const AdminCategories = lazy(() => import('../Admin/components/AdminCategories/AdminCategories'));
const AdminBrands = lazy(() => import('../Admin/components/AdminBrands/AdminBrands'));
const AdminHeaderImages = lazy(() =>
  import('../Admin/components/AdminHeaderImages/AdminHeaderImages'),
);
const AdminSliderImages = lazy(() =>
  import('../Admin/components/AdminSliderImages/AdminSliderImages'),
);
const AdminMessages = lazy(() => import('../Admin/components/AdminMessages/AdminMessages'));
const AdminOrders = lazy(() => import('../Admin/components/AdminOrders/AdminOrders'));
const OrderInfo = lazy(() => import('../Admin/components/OrderInfo/OrderInfo'));
const EditNewCategorie = lazy(() =>
  import('../Admin/components/EditNewCategorie/EditNewCategorie'),
);
const EditNewBrand = lazy(() => import('../Admin/components/EditNewBrand/EditNewBrand'));
const EditNewDevice = lazy(() => import('../Admin/components/EditNewDevice/EditNewDevice'));
const EditNewHeaderImg = lazy(() =>
  import('../Admin/components/EditNewHeaderImg/EditNewHeaderImg'),
);
const EditNewSliderImg = lazy(() =>
  import('../Admin/components/EditNewSliderImg/EditNewSliderImg'),
);
const AdminLogin = lazy(() => import('../Admin/components/AdminLogin/AdminLogin'));

const App = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<Spinner />}>
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
          element={<ItemsMainPage typeId={2} title={'new-collection'} />}
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
    </Suspense>
  );
};

export default App;

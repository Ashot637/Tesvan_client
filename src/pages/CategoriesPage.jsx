import React from 'react';
import Categories from '../components/Categories/Categories';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { Helmet } from 'react-helmet';

const CategoriesPage = () => {
  return (
    <>
      <Helmet>
        <title>Categories | Tesvan Electronics</title>
      </Helmet>
      <Breadcrumbs />
      <Categories />
    </>
  );
};

export default CategoriesPage;

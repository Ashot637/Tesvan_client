import React from 'react';
import AboutUs from '../components/AboutUs/AboutUs';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { Helmet } from 'react-helmet';

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>About us | Tesvan Electronics</title>
      </Helmet>
      <Breadcrumbs />
      <AboutUs />
    </>
  );
};

export default AboutUsPage;

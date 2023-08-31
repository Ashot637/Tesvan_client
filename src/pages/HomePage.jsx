import React from 'react';
import Intro from '../components/Intro/Intro';
import Slider from '../components/Slider/Slider';
import Brands from '../components/Brands/Brands';
import CategoriesSlider from '../components/CategoriesSlider/CategoriesSlider';
import TypedItems from '../components/TypedItems/TypedItems';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home | Tesvan Electronics</title>
      </Helmet>
      <Intro />
      <CategoriesSlider />
      <TypedItems title={'sale'} typeId={1} link={'sale'} limit={8} />
      <TypedItems title={'new-collection'} typeId={2} link={'new-collection'} limit={8} />
      <Slider />
      <TypedItems title={'bestsellers'} typeId={3} link={'bestsellers'} limit={4} />
      <Brands />
    </>
  );
};

export default HomePage;

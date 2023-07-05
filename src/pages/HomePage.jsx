import React from 'react';
import Intro from '../components/Intro/Intro';
import SaleItems from '../components/Items/SaleItems';
import NewCollectionItems from '../components/Items/NewCollectionItems';
import Slider from '../components/Slider/Slider';
import BestsellersItems from '../components/Items/Bestsellers';
import Brands from '../components/Brands/Brands';
import CategoriesSlider from '../components/CategoriesSlider/CategoriesSlider';

const HomePage = () => {
  return (
    <>
      <Intro />
      <CategoriesSlider />
      <SaleItems />
      <NewCollectionItems />
      <Slider />
      <BestsellersItems />
      <Brands />
    </>
  );
};

export default HomePage;

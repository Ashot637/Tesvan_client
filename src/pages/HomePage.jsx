import React, { useEffect, useState } from 'react';
import Intro from '../components/Intro/Intro';
import Slider from '../components/Slider/Slider';
import Brands from '../components/Brands/Brands';
import CategoriesSlider from '../components/CategoriesSlider/CategoriesSlider';
import TypedItems from '../components/TypedItems/TypedItems';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  const [_, rerender] = useState('');

  useEffect(() => {
    rerender();
  }, []);

  return (
    <>
      <Intro />
      <CategoriesSlider />
      <TypedItems title={t('sale')} typeId={1} link={'sale'} limit={8} />
      <TypedItems title={t('newCollection')} typeId={2} link={'new-collection'} limit={8} />
      <Slider />
      <TypedItems title={t('bestsellers')} typeId={3} link={'bestsellers'} limit={4} />
      <Brands />
    </>
  );
};

export default HomePage;

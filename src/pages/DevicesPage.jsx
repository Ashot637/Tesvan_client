import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Title from '../ui/Title/Title';
import DevicesList from '../components/DevicesLIst/DevicesList';
import { fetchBrands } from '../redux/slices/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import SortBy from '../components/SortBy/SortBy';
import { useParams } from 'react-router-dom';
import { setCategorieId, setCategorieLabel } from '../redux/slices/devicesSlice';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { fetchCategories } from '../redux/slices/categoriesSlice';

const DevicesPage = () => {
  const dispatch = useDispatch();
  const { categorie } = useParams();
  const { categorieLabel } = useSelector((state) => state.devices);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
    dispatch(setCategorieLabel(categorie));
  }, []);

  useEffect(() => {
    if (categories) {
      if (categories.find((c) => c.title.toLowerCase() === categorie)) {
        let id = categories.find((c) => c.title.toLowerCase() === categorie).id;
        dispatch(setCategorieId(id));
      }
    }
  }, [categories]);

  return (
    <>
      <Breadcrumbs />
      <Title title={categorieLabel}>
        <SortBy />
      </Title>
      <div className="container">
        <div className="flex">
          <Sidebar />
          <DevicesList />
        </div>
      </div>
    </>
  );
};

export default DevicesPage;

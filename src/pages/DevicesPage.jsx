import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Title from '../ui/Title/Title';
import DevicesList from '../components/DevicesLIst/DevicesList';
import { fetchBrands } from '../redux/slices/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import SortBy from '../components/SortBy/SortBy';
import { useParams } from 'react-router-dom';
import {
  fetchFilters,
  removeAllFilters,
  setCategorieId,
  setCategorieLabel,
  setPage,
} from '../redux/slices/devicesSlice';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';

const DevicesPage = () => {
  const dispatch = useDispatch();
  const { categorie } = useParams();
  const { categorieLabel, brandId, activeFilters, minPrice, maxPrice } = useSelector(
    (state) => state.devices,
  );
  const { categories } = useSelector((state) => state.categories);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(setCategorieLabel(categorie));
  }, []);

  useEffect(() => {
    let categorieId =
      categories.find((c) => c.title.toLowerCase() === categorie) &&
      categories.find((c) => c.title.toLowerCase() === categorie).id;
    if (categorieId) {
      dispatch(fetchFilters({ categorieId }));
    }
  }, [categorie]);

  useEffect(() => {
    dispatch(removeAllFilters());
  }, []);

  useEffect(() => {
    dispatch(setPage(1));
  }, [brandId, activeFilters, minPrice, maxPrice]);

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
        <div className="flex between">
          <SortBy />
          <div className="block-850">
            <FontAwesomeIcon
              icon={faFilter}
              onClick={() => setIsOpenFilter((isOpenFilter) => !isOpenFilter)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </Title>
      <div className="container">
        <div className="flex" style={{ position: 'relative' }}>
          <div className="none-850">
            <Sidebar />
          </div>
          <div className="sidebar">
            <div className="sidebar__inner">
              <CSSTransition in={isOpenFilter} timeout={300} classNames="sidebar" unmountOnExit>
                <Sidebar />
              </CSSTransition>
            </div>
            {isOpenFilter && (
              <div className="sidebar__overlay" onClick={() => setIsOpenFilter(false)}></div>
            )}
          </div>
          <DevicesList />
        </div>
      </div>
    </>
  );
};

export default DevicesPage;

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Title from '../ui/Title/Title';
import DevicesList from '../components/DevicesLIst/DevicesList';
import { fetchBrands } from '../redux/slices/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import SortBy from '../components/SortBy/SortBy';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchFilters,
  removeAllFilters,
  setCategorieId,
  setPage,
} from '../redux/slices/devicesSlice';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';

const DevicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorie } = useParams();
  const { brandId, activeFilters, minPrice, maxPrice } = useSelector((state) => state.devices);
  const { categories } = useSelector((state) => state.categories);
  const [categorieTitle, setCategorieTitle] = useState('');
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const { language } = useSelector((state) => state.language);

  useEffect(() => {
    let selectedCategorie = categories.find((c) => c.title_en.toLowerCase() === categorie);
    if (selectedCategorie) {
      let categorieId = selectedCategorie.id;
      setCategorieTitle(selectedCategorie.title);
      dispatch(fetchFilters({ categorieId }));
      dispatch(fetchBrands({ categorieId }));
    } else if (
      categories.length &&
      categorie &&
      !categories.find((c) => c.title_en.toLowerCase() === categorie)
    ) {
      navigate('/');
    }
  }, [categorie, categories]);

  useEffect(() => {
    dispatch(removeAllFilters());
  }, [language]);

  useEffect(() => {
    dispatch(setPage(1));
  }, [brandId, activeFilters, minPrice, maxPrice]);

  useEffect(() => {
    if (categories) {
      if (categories.find((c) => c.title_en.toLowerCase() === categorie)) {
        let id = categories.find((c) => c.title_en.toLowerCase() === categorie).id;
        dispatch(setCategorieId(id));
      }
    }
  }, [categories, categorie]);

  return (
    <>
      <Breadcrumbs />
      <Title title={categorieTitle}>
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

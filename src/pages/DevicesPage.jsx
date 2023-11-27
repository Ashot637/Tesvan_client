import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Title from '../ui/Title/Title';
import DevicesList from '../components/DevicesLIst/DevicesList';
import { useDispatch } from 'react-redux';
import SortBy from '../components/SortBy/SortBy';
import { useParams } from 'react-router-dom';
import { fetchFilters, removeAllFilters, setCategorieId } from '../redux/slices/devicesSlice';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import Page404 from './404';
import Spinner from '../components/Spinner/Spinner';
import { Helmet } from 'react-helmet';
import axios from '../helpers/axios';
import { fetchBrands } from '../redux/slices/brandSlice';

const DevicesPage = () => {
  const dispatch = useDispatch();
  const { categorie } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState();
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios.get('/categories').then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    setSelectedCategorie(categories.find((c) => c.title_en.toLowerCase() === categorie));
  }, [categorie, categories]);

  useEffect(() => {
    if (selectedCategorie) {
      let categorieId = selectedCategorie.id;
      dispatch(fetchFilters({ categorieId }));
      dispatch(fetchBrands({ categorieId }));
    } else if (categories.length && categorie) {
      setIsError(true);
    }
  }, [selectedCategorie]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('categorie')) === categorie) {
    } else {
      localStorage.setItem('categorie', JSON.stringify(categorie));
      dispatch(removeAllFilters());
    }
  }, [categorie]);

  useEffect(() => {
    if (selectedCategorie) {
      dispatch(setCategorieId(selectedCategorie.id));
    }
  }, [selectedCategorie]);

  if (isError) {
    return <Page404 />;
  }

  return (
    <>
      <Helmet>
        <title>{selectedCategorie?.title || ''} | Tesvan Electronics</title>
      </Helmet>
      {selectedCategorie?.title ? (
        <>
          <Breadcrumbs categorieTitle={selectedCategorie?.title} />
          <Title title={selectedCategorie.title}>
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
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default DevicesPage;

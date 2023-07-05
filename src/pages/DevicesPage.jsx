import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Title from '../ui/Title/Title';
import DevicesList from '../components/DevicesLIst/DevicesList';
import { fetchBrands } from '../redux/slices/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import SortBy from '../components/SortBy/SortBy';
import { useParams, useSearchParams } from 'react-router-dom';
import { setCategorieId, setCategorieLabel } from '../redux/slices/devicesSlice';

const DevicesPage = () => {
  const dispatch = useDispatch();
  const { categorie } = useParams();
  const { categorieLabel } = useSelector((state) => state.devices);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(setCategorieLabel(categorie));
    dispatch(setCategorieId(searchParams.get('id')));
  }, []);

  return (
    <>
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

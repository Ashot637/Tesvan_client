import React, { useCallback, useEffect } from 'react';
import classes from './devicesList.module.scss';
import { debounce } from 'debounce';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import { fetchDevices } from '../../redux/slices/devicesSlice';
import Pagination from '../Pagination/Pagination';
import { useTranslation } from 'react-i18next';

const DevicesList = () => {
  const { brands } = useSelector((state) => state.brands);
  const {
    devices,
    status,
    page,
    brandId,
    categorieId,
    minPrice,
    maxPrice,
    sortType,
    activeFilters,
  } = useSelector((state) => state.devices);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    onChangeFilters({
      page,
      brandId,
      categorieId,
      minPrice,
      maxPrice,
      sortName: sortType.name,
      sortFollowing: sortType.following,
      activeFilters,
    });
  }, [page, brandId, categorieId, minPrice, maxPrice, sortType, activeFilters]);

  const onChangeFilters = useCallback(
    debounce(
      ({
        page,
        brandId,
        categorieId,
        minPrice,
        maxPrice,
        sortName,
        sortFollowing,
        activeFilters,
      }) => {
        dispatch(
          fetchDevices({
            page,
            brandId,
            categorieId,
            minPrice,
            maxPrice,
            sortName,
            sortFollowing,
            activeFilters,
          }),
        );
      },
      500,
    ),
    [],
  );

  return (
    <div className={classes.devices}>
      <div className={classes.list}>
        {devices.map((item) => {
          return <Card key={item.id} brands={brands} item={item} />;
        })}
        {!devices.length && status === 'success' && (
          <h3 className={classes.nothing}>{t('nothingFound')}</h3>
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default DevicesList;

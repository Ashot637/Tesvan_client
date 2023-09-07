import React, { memo, useCallback, useEffect } from 'react';
import classes from './devicesList.module.scss';
import { debounce } from 'debounce';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import { fetchDevices } from '../../redux/slices/devicesSlice';
import Pagination from '../Pagination/Pagination';
import { useTranslation } from 'react-i18next';
import nothingFoundImg from '../../img/nothingFound.png';

const DevicesList = memo(() => {
  const { brands } = useSelector((state) => state.brands);
  const {
    devices,
    status,
    page,
    brandIds,
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
      brandIds,
      categorieId,
      minPrice,
      maxPrice,
      sortName: sortType.name,
      sortFollowing: sortType.following,
      activeFilters,
    });
  }, [page, brandIds, categorieId, minPrice, maxPrice, sortType, activeFilters]);

  const onChangeFilters = useCallback(
    debounce(
      ({
        page,
        brandIds,
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
            brandIds,
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
      </div>

      {!devices.length && status === 'success' && (
        <div className={classes.nothingFound}>
          <img src={nothingFoundImg} width={200} height={200} alt="Nothing found" />
          <h3 className={classes.nothing}>{t('nothingFound')}</h3>
        </div>
      )}
      <Pagination />
    </div>
  );
});

export default DevicesList;

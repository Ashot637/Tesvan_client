import React, { useCallback, useEffect } from 'react';
import classes from './devicesList.module.scss';
import { debounce } from 'debounce';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import { fetchDevices } from '../../redux/slices/devicesSlice';
import Pagination from '../Pagination/Pagination';

const DevicesList = () => {
  const { brands } = useSelector((state) => state.brands);
  const { devices, page, brandId, categorieId, minPrice, maxPrice, sortType, status } = useSelector(
    (state) => state.devices,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    onChangeFilters({
      page,
      brandId,
      categorieId,
      minPrice,
      maxPrice,
      sortName: sortType.name,
      sortFollowing: sortType.following,
    });
  }, [page, brandId, categorieId, minPrice, maxPrice, sortType]);

  const onChangeFilters = useCallback(
    debounce(({ page, brandId, categorieId, minPrice, maxPrice, sortName, sortFollowing }) => {
      dispatch(
        fetchDevices({ page, brandId, categorieId, minPrice, maxPrice, sortName, sortFollowing }),
      );
    }, 500),
    [],
  );

  return (
    <div className={classes.devices}>
      <div className={classes.list}>
        {devices.map((item) => {
          return <Card key={item.id} brands={brands} item={item} />;
        })}
        {!devices.length && status === 'success' && (
          <h3 className={classes.nothing}>Nothing found</h3>
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default DevicesList;

import React, { useEffect, useState } from 'react';
import classes from './compare.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompareingDevcies, removeAllComparing } from '../../redux/slices/compareSlice';
import ComparingItems from '../ComparingItems/ComparingItems';
import { useTranslation } from 'react-i18next';

const filters = [
  {
    id: 1,
    label: 'all',
  },
  {
    id: 2,
    label: 'differnces',
  },
];

const Compare = () => {
  const dispatch = useDispatch();
  const { devices, devicesIds } = useSelector((state) => state.compare);

  const { categories } = useSelector((state) => state.categories);
  const [selected, setSelected] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchCompareingDevcies({ ids: devicesIds }));
  }, []);

  return (
    <div className={classes.compare}>
      <div className={classes.top}>
        <h2>{t('compare')}</h2>
        <ul className={classes.filters}>
          {filters.map((filter) => {
            return (
              <li
                key={filter.id}
                onClick={() => setSelected(filter.id)}
                className={selected === filter.id ? classes.selected : undefined}>
                {t(filter.label)}
              </li>
            );
          })}
        </ul>
        <p onClick={() => dispatch(removeAllComparing())}>{t('deleteAll')}</p>
      </div>
      {!devicesIds.length ? (
        <h3>Empty Comparing Items</h3>
      ) : (
        categories &&
        categories.map((categorie) => {
          if (devices.find((device) => device.categorieId === categorie.id)) {
            return (
              <React.Fragment key={categorie.id}>
                <ComparingItems
                  devices={devices.filter((device) => device.categorieId === categorie.id)}
                  title={categorie.title}
                  isFilterMode={selected === 2}
                />
                <br />
                <br />
                <br />
              </React.Fragment>
            );
          }
          return undefined;
        })
      )}
    </div>
  );
};

export default Compare;

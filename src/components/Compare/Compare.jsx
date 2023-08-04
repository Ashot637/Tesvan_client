import React, { useState } from 'react';
import classes from './compare.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllComparing } from '../../redux/slices/compareSlice';
import ComparingItems from '../ComparingItems/ComparingItems';

const filters = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'Only differences',
  },
];

const Compare = () => {
  const dispatch = useDispatch();
  const { devices } = useSelector((state) => state.compare);
  const { categories } = useSelector((state) => state.categories);
  const [selected, setSelected] = useState(1);

  return (
    <div className={classes.compare}>
      <div className={classes.top}>
        <h2>Compare items</h2>
        <ul className={classes.filters}>
          {filters.map((filter) => {
            return (
              <li
                key={filter.id}
                onClick={() => setSelected(filter.id)}
                className={selected === filter.id ? classes.selected : undefined}>
                {filter.label}
              </li>
            );
          })}
        </ul>
        <p onClick={() => dispatch(removeAllComparing())}>Delete all</p>
      </div>
      {!devices.length ? (
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

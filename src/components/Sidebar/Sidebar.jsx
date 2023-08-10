import React, { useEffect, useState } from 'react';
import classes from './sidebar.module.scss';
import AccordionItem from '../AccordionItem/AccordionItem';
import ReactSlider from 'react-slider';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFilter,
  setBrandId,
  setActiveFilters,
  setMaxPrice,
  setMinPrice,
} from '../../redux/slices/devicesSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);
  const { brandId, minPrice, maxPrice, activeFilters, filters } = useSelector(
    (state) => state.devices,
  );

  const onSelectBrand = (id) => {
    dispatch(setBrandId(id));
  };

  const onSelectFilter = (title, description) => {
    if (activeFilters[title] === description) {
      dispatch(
        removeFilter({
          title,
          description,
        }),
      );
    } else {
      dispatch(
        setActiveFilters({
          title,
          description,
        }),
      );
    }
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.accordion}>
        <AccordionItem title={'Brand'}>
          <div className={classes.items}>
            {brands.map((brand) => {
              return (
                <div
                  key={brand.id}
                  className={[classes.item, brandId === brand.id ? classes.active : ''].join(' ')}
                  onClick={() =>
                    brandId === brand.id ? onSelectBrand(0) : onSelectBrand(brand.id)
                  }>
                  {brand.title}
                </div>
              );
            })}
          </div>
        </AccordionItem>
        <AccordionItem title={'Price'}>
          <div style={{ paddingTop: 15 }}>
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[+minPrice, +maxPrice]}
              value={[+minPrice, +maxPrice]}
              min={0}
              max={2000000}
              onChange={(arr) => {
                dispatch(setMinPrice(arr[0]));
                dispatch(setMaxPrice(arr[1]));
              }}
              pearling
              minDistance={20000}
            />
            <div className={classes.fields}>
              <div className={classes.field}>
                <label>Min</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => dispatch(setMinPrice(e.target.value))}
                />
              </div>
              <div className={classes.field}>
                <label>Max</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                />
              </div>
            </div>
          </div>
        </AccordionItem>
        {filters &&
          filters.map((filter) => {
            return (
              <AccordionItem key={filter.title} title={filter.title}>
                <div className={classes.items}>
                  {filter.description.map((desc) => {
                    return (
                      <div
                        key={desc}
                        className={[
                          classes.item,
                          activeFilters[filter.title] === desc ? classes.active : '',
                        ].join(' ')}
                        onClick={() => onSelectFilter(filter.title, desc)}>
                        {desc}
                      </div>
                    );
                  })}
                </div>
              </AccordionItem>
            );
          })}
        <AccordionItem title={'Clear all'} remove />
      </div>
    </div>
  );
};

export default Sidebar;

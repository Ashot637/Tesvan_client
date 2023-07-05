import React, { useState } from 'react';
import classes from './sortBy.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../../redux/slices/devicesSlice';

const SortBy = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState();
  const { sortType, sortList } = useSelector((state) => state.devices);

  return (
    <div className={classes.sort}>
      <span>Sort by</span>
      <div className={classes.select}>
        <div className={classes.option} onClick={() => setIsOpen((isOpen) => !isOpen)}>
          <p>{sortType.label}</p>
          <FontAwesomeIcon
            icon={faAngleDown}
            style={isOpen ? { transform: 'rotateX(180deg)' } : undefined}
          />
        </div>
        {isOpen && (
          <div className={classes.options}>
            {sortList.map((sort) => {
              if (sort.label === sortType.label) return undefined;
              return (
                <div
                  key={sort.label}
                  className={classes.option}
                  onClick={() => {
                    dispatch(setSortType(sort));
                    setIsOpen((isOpen) => !isOpen);
                  }}>
                  <p>{sort.label}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortBy;

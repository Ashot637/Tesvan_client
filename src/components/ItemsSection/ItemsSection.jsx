import React from 'react';
import classes from './itemsSection.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';

const ItemsSection = ({ title, items, main, link, loading }) => {
  const { brands } = useSelector((state) => state.brands);

  return (
    <div>
      <div className="container">
        <h1 className={main ? classes.mainTitle : classes.title}>{title}</h1>
        <div className={classes.grid}>
          {loading
            ? [...Array(8)].map((_, i) => {
                return <Card loading key={i} />;
              })
            : items.map((item) => {
                return <Card key={item.id} brands={brands} item={item} />;
              })}
        </div>
        {!main && (
          <Link to={link} className={classes.all}>
            <span>View all</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ItemsSection;

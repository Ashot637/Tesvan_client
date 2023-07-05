import React from 'react';
import classes from './card.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bestseller from '../../img/bestseller.png';
import neewCollection from '../../img/new-collection.png';

const Card = ({ item, brands }) => {
  const location = useLocation();

  const getItemTypeImg = (id) => {
    switch (id) {
      case 2:
        return (
          <img
            className={[classes.itemType, classes.newCollectionImg].join(' ')}
            src={neewCollection}
            alt="Type"
          />
        );
      case 3:
        return <img className={classes.itemType} src={bestseller} alt="Type" />;
      default:
        return;
    }
  };

  return (
    <Link to={'/device/' + item.id} className={classes.item}>
      {location.pathname.includes('devices') && getItemTypeImg(item.typeId)}
      <div className={classes.top}>
        <span>
          {brands.find((brand) => brand.id === item.brandId) &&
            brands.find((brand) => brand.id === item.brandId).title}
        </span>
        <FontAwesomeIcon icon={faCodeCompare} className={classes.compare} />
      </div>
      <img src={'http://localhost:8080/' + item.img} alt="Macbook" />
      <span className={classes.name}>{item.title}</span>
      <span className={classes.price}>{item.price.toLocaleString().replaceAll(',', ' ')} AMD</span>
      <span className={classes.oldPrice}>
        {item.oldPrice.toLocaleString().replaceAll(',', ' ')} AMD
      </span>
      <div className={classes.btns}>
        <button>Buy</button>
        <button>Add to cart</button>
      </div>
    </Link>
  );
};

export default Card;

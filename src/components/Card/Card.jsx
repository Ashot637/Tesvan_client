import React from 'react';
import classes from './card.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bestseller from '../../img/bestseller.png';
import newCollection from '../../img/new-collection.png';
import { useDispatch, useSelector } from 'react-redux';
import { addDevice } from '../../redux/slices/cartSlice';
import getPrice from '../../helpers/getPrice';
import CardSkeleton from '../Skeletons/CardSkeleton';
import { addDeviceComparing } from '../../redux/slices/compareSlice';

const Card = ({ item, brands, loading }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { categories } = useSelector((state) => state.categories);

  const onAddToCart = (item) => {
    item = {
      ...item,
      count: 1,
    };

    dispatch(addDevice(item));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onAddToCompare = (item) => {
    dispatch(addDeviceComparing(item));
  };

  const getItemTypeImg = (id) => {
    switch (id) {
      case 2:
        return (
          <img
            className={[classes.itemType, classes.newCollectionImg].join(' ')}
            src={newCollection}
            alt="Type"
          />
        );
      case 3:
        return <img className={classes.itemType} src={bestseller} alt="Type" />;
      default:
        return;
    }
  };

  if (loading) {
    return <CardSkeleton />;
  }

  return (
    <div className={classes.item}>
      {location.pathname.includes('categories/') && getItemTypeImg(item.typeId)}
      <div className={classes.top}>
        <span>
          {brands.find((brand) => brand.id === item.brandId) &&
            brands.find((brand) => brand.id === item.brandId).title}
        </span>
        <FontAwesomeIcon
          icon={faCodeCompare}
          className={classes.compare}
          onClick={() => onAddToCompare(item)}
        />
      </div>
      <Link
        className={classes.body}
        to={
          categories.find((c) => c.id === item.categorieId) &&
          '/categories/' +
            categories.find((c) => c.id === item.categorieId).title.toLowerCase() +
            '/' +
            item.id
        }>
        <img src={'http://localhost:8080/' + item.img} alt="Macbook" />
        <span className={classes.name}>{item.title}</span>
        <span className={classes.price}>{getPrice(item.price)} AMD</span>
        <span className={classes.oldPrice}>{getPrice(item.oldPrice)} AMD</span>
      </Link>
      <div className={classes.btns}>
        <Link
          to={
            categories.find((c) => c.id === item.categorieId) &&
            '/categories/' +
              categories.find((c) => c.id === item.categorieId).title.toLowerCase() +
              '/' +
              item.id +
              '/order'
          }>
          <button>Buy</button>
        </Link>
        <button onClick={() => onAddToCart(item)}>Add to cart</button>
      </div>
    </div>
  );
};

export default Card;

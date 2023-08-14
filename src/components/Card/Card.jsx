import React from 'react';
import classes from './card.module.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { addDevice } from '../../redux/slices/cartSlice';
import getPrice from '../../helpers/getPrice';
import { addDeviceComparing } from '../../redux/slices/compareSlice';

import sale from '../../img/sale.png';
import bestseller from '../../img/bestseller.png';
import newCollection from '../../img/new-collection.png';

const Card = ({ item, brands }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories } = useSelector((state) => state.categories);
  const { devices: comparingDevices } = useSelector((state) => state.compare);

  const onAddToCart = (item) => {
    item = {
      ...item,
      count: 1,
    };

    dispatch(addDevice(item));
  };

  const onAddToCompare = (item) => {
    dispatch(addDeviceComparing(item));
  };

  const getItemTypeImg = (id) => {
    switch (id) {
      case 1:
        return (
          <img className={[classes.itemType, classes.saleImg].join(' ')} src={sale} alt="Sale" />
        );
      case 2:
        return (
          <img
            className={[classes.itemType, classes.newCollectionImg].join(' ')}
            src={newCollection}
            alt="New colection"
          />
        );
      case 3:
        return <img className={classes.itemType} src={bestseller} alt="Bestseller" />;
      default:
        return;
    }
  };

  const navigateToOrderOutOfStock = () => {
    localStorage.setItem('outOfStockDeviceTitle', item.title);
    navigate('/contacts/order');
  };

  return (
    <div className={classes.item}>
      {location.pathname.includes('categories/') && !id && getItemTypeImg(item.typeId)}
      <div className={classes.top}>
        <span>
          {brands.find((brand) => brand.id === item.brandId) &&
            brands.find((brand) => brand.id === item.brandId).title}
        </span>
        <FontAwesomeIcon
          icon={faCodeCompare}
          className={[
            classes.compare,
            comparingDevices.find((devices) => devices.id === item.id)
              ? classes.selected
              : undefined,
          ].join(' ')}
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
        <div className={classes.imgHolder}>
          <img src={'http://localhost:8080/' + item?.images[0]} alt="Macbook" />
        </div>
        <span className={classes.name}>{item.title}</span>
        {item?.quantity === 0 ? (
          <div className={classes.out}>Out of stock</div>
        ) : (
          <>
            <span className={classes.price}>{getPrice(item.price)} AMD</span>
            {+item.oldPrice ? (
              <span className={classes.oldPrice}>{getPrice(item.oldPrice)} AMD</span>
            ) : (
              <>
                <br />
                <br />
                <br />
              </>
            )}
          </>
        )}
      </Link>
      {item?.quantity === 0 ? (
        <button className={classes.contactUs} onClick={() => navigateToOrderOutOfStock()}>
          Contact us
        </button>
      ) : (
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
      )}
    </div>
  );
};

export default Card;

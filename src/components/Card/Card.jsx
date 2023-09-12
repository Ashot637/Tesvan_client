import React, { useEffect, useState } from 'react';
import classes from './card.module.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { addDevice, toggleIsOpen } from '../../redux/slices/cartSlice';
import getPrice from '../../helpers/getPrice';
import { addDeviceComparing } from '../../redux/slices/compareSlice';

import sale from '../../img/sale.png';
import bestseller from '../../img/bestseller.png';
import newCollection from '../../img/new-collection.png';
import { useTranslation } from 'react-i18next';

const Card = ({ item, brands }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories } = useSelector((state) => state.categories);
  const { devicesIds: comparingDevices } = useSelector((state) => state.compare);
  const { devices } = useSelector((state) => state.cart);
  const [inCart, setInCart] = useState();
  const { t } = useTranslation();

  const onAddToCart = (item) => {
    if (inCart) {
      dispatch(toggleIsOpen());
    } else {
      item = {
        ...item,
        count: 1,
      };

      dispatch(addDevice(item));
    }
  };

  useEffect(() => {
    setInCart(devices.find((device) => device.id === item.id));
  }, [devices]);

  const onAddToCompare = (item) => {
    dispatch(addDeviceComparing(item.id));
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
    navigate('/contacts/make-order');
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
            comparingDevices.find((id) => id === item.id) ? classes.selected : undefined,
          ].join(' ')}
          onClick={() => onAddToCompare(item)}
        />
      </div>
      <Link
        className={classes.body}
        to={
          '/categories/' +
          categories.find((c) => c.id === item.categorieId)?.title_en.toLowerCase() +
          '/' +
          item.id
        }>
        <div className={classes.imgHolder}>
          <img
            src={'http://localhost:8080/' + item?.images[0]}
            alt="Macbook"
            width={259}
            height={175}
          />
        </div>
        <span className={classes.name}>{item.title}</span>
        {item?.quantity === 0 ? (
          <div className={classes.out}>{t('outOfStock')}</div>
        ) : (
          <>
            <span className={classes.price}>
              {getPrice(item.price)} {t('amd')}
            </span>
            {+item.oldPrice ? (
              <span className={classes.oldPrice}>
                {getPrice(item.oldPrice)} {t('amd')}
              </span>
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
          {t('contactUs')}
        </button>
      ) : (
        <div className={classes.btns}>
          <Link
            to={
              '/categories/' +
              categories.find((c) => c.id === item.categorieId)?.title_en.toLowerCase() +
              '/' +
              item.id +
              '/make-order'
            }>
            <button>{t('buy')}</button>
          </Link>
          <button onClick={() => onAddToCart(item)}>
            {inCart ? t('addedToCart') : t('addToCart')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
